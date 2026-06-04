const fs = require('fs');
const path = require('path');

const suspiciousFile = path.join(__dirname, 'suspicious_sentences.json');
const resultsFile = path.join(__dirname, 'rewritten_sentences_results.json');

const suspicious = JSON.parse(fs.readFileSync(suspiciousFile, 'utf8'));
console.log(`Loaded ${suspicious.length} sentences to rewrite.`);

// Let's load existing results if any to support resuming
let results = [];
if (fs.existsSync(resultsFile)) {
    try {
        results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
        console.log(`Loaded ${results.length} already rewritten sentences. Resuming...`);
    } catch (e) {
        console.log("Could not parse existing results file, starting fresh.");
    }
}

const rewrittenMap = new Map(results.map(r => [r.cycleId + '_' + r.index, r]));

const pending = suspicious.filter(s => !rewrittenMap.has(s.cycleId + '_' + s.index));
console.log(`Pending sentences to rewrite: ${pending.length}`);

async function askLLM(prompt) {
    const url = 'https://text.pollinations.ai/';
    const systemPrompt = 'You are a precise JSON assistant. You must ONLY output a valid JSON array. No markdown, no explanations, no conversational intro/outro.';
    
    const payload = {
        messages: [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        jsonMode: true
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    // Parse JSON safely
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
        cleanText = cleanText.substring(7);
    }
    if (cleanText.startsWith('```')) {
        cleanText = cleanText.substring(3);
    }
    if (cleanText.endsWith('```')) {
        cleanText = cleanText.substring(0, cleanText.length - 3);
    }
    return JSON.parse(cleanText.trim());
}

async function run() {
    const BATCH_SIZE = 8; // Smaller batch size is much faster and more reliable
    
    for (let i = 0; i < pending.length; i += BATCH_SIZE) {
        const chunk = pending.slice(i, i + BATCH_SIZE);
        console.log(`\nProcessing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(pending.length / BATCH_SIZE)} (Size: ${chunk.length})...`);
        
        // Prepare list for prompt
        const listForPrompt = chunk.map((item, idx) => ({
            id: idx,
            word: item.word,
            originalKr: item.sentenceKr,
            originalEn: item.sentenceMeaning,
            originalZh: item.sentenceZh
        }));

        const prompt = `You are an expert Korean language tutor. You will be given a list of Korean word entries.
Each entry has:
- id: an identifier
- word: the target Korean word
- originalKr: a Korean phrase/sentence ending in dictionary form (like "~다")
- originalEn: reference English translation
- originalZh: reference Chinese translation

Your task is to conjugate/rewrite the \`originalKr\` phrase into a natural, complete, everyday polite conversational Korean sentence (informal polite style ending in "~요", e.g. "~아요/어요/여요/해요/이에요/예요", NOT plain/dictionary form ending in "~다").
Then, provide matching, natural English and Chinese translations for this new Korean sentence.

Input list:
${JSON.stringify(listForPrompt, null, 2)}

Return a JSON array of objects with fields:
[
  {
    "id": ...,
    "sentenceKr": "...", // new polite sentence
    "sentenceMeaning": "...", // matching English translation
    "sentenceZh": "..." // matching Chinese translation
  },
  ...
]
Return ONLY the raw JSON array. No explanations, no markdown formatting.`;

        let retries = 3;
        let success = false;
        
        while (retries > 0 && !success) {
            try {
                const responseList = await askLLM(prompt);
                if (Array.isArray(responseList)) {
                    // Match responses back to items
                    responseList.forEach(resp => {
                        const originalItem = chunk[resp.id];
                        if (originalItem) {
                            results.push({
                                cycleId: originalItem.cycleId,
                                index: originalItem.index,
                                word: originalItem.word,
                                originalKr: originalItem.sentenceKr,
                                sentenceKr: resp.sentenceKr,
                                sentenceMeaning: resp.sentenceMeaning,
                                sentenceZh: resp.sentenceZh
                            });
                        }
                    });
                    
                    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2), 'utf8');
                    console.log(`  Success! Rewritten ${chunk.length} sentences. Total results: ${results.length}`);
                    success = true;
                } else {
                    console.log(`  Invalid response (not an array), retrying...`);
                    retries--;
                }
            } catch (e) {
                console.error(`  Error in batch: ${e.message}. Retries left: ${retries - 1}`);
                retries--;
                if (retries > 0) {
                    await new Promise(r => setTimeout(r, 3000));
                }
            }
        }

        if (!success) {
            console.error(`Batch failed after retries. Aborting. Run again to resume.`);
            process.exit(1);
        }

        // Brief delay between API calls to be friendly
        await new Promise(r => setTimeout(r, 1500));
    }

    console.log(`\nAll sentences rewritten! Total count: ${results.length}`);
}

run().catch(console.error);

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid messages list' }, { status: 400 });
        }

        const systemPrompt = `You are "查找字典" (Dictionary Lookup) AI assistant, a friendly and extremely helpful Korean language tutor. 
Your goal is to help students learn Korean vocabulary, grammar, spelling, pronunciation, and usage differences between synonyms.

When explaining synonyms or word differences (for example, "값" vs "가격", "것" vs "거", or "검정" vs "검은색"):
1. Structure the response clearly and professionally.
2. Use Comparison Tables (Markdown tables) comparing grammatical properties, usage contexts (e.g., written vs spoken, formal vs informal), and collocations.
3. Provide clear bullet points summarizing key differences.
4. Give natural example sentences in Korean, with pronunciation guides (romanization) and Chinese/English translations.

Keep your tone encouraging, engaging, and warm. Use emojis where appropriate. Respond in the language that the user used (Chinese if the prompt is in Chinese, English if in English).`;

        // Format history for Pollinations AI
        // Since Pollinations AI standard endpoint accepts OpenAI format via POST, we send it directly:
        const url = 'https://text.pollinations.ai/';
        
        const payload = {
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages
            ],
            model: 'openai'
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain, */*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: JSON.stringify(payload),
            next: { revalidate: 0 } // Always bypass cache
        });

        if (!response.ok) {
            throw new Error(`Pollinations AI responded with status ${response.status}`);
        }

        const text = await response.text();
        return NextResponse.json({ content: text });
    } catch (error: any) {
        console.error('Error in chat API route:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

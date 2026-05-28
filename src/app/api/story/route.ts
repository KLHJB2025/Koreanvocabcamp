import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { words, lang } = body;
        
        if (!words || !Array.isArray(words)) {
            return NextResponse.json({ error: 'Invalid words list' }, { status: 400 });
        }

        const wordTranslations = words.map((w: any) => {
            const raw = (lang === 'zh' ? w.zh : w.en || '').trim();
            if (!raw) return '';
            const cleanPart = (part: string) => part.replace(/\([^)]*\)/g, '').replace(/\（[^）]*\）/g, '').trim();
            const firstPart = raw.split(/[\/,，]/)[0];
            return cleanPart(firstPart);
        }).filter(Boolean);

        const wordListStr = wordTranslations.map(t => `"${t}"`).join(', ');

        const systemPrompt = `You are a creative writer. Write a short, engaging story or dialogue in ${lang === 'zh' ? 'Chinese' : 'English'} (max 180 words) that naturally includes these exact terms: ${wordListStr}. 
Important: 
1. You must use the exact terms provided, without changing them (e.g., if "singer" is given, do not use "song").
2. The story must make logical sense, flow beautifully, and be coherent.
3. Return ONLY a JSON object in this format: { "title": "story title", "story": "story text" }.`;

        const userPrompt = `Write a coherent, creative short story containing: ${wordListStr}.`;
        const url = `https://text.pollinations.ai/${encodeURIComponent(userPrompt)}?system=${encodeURIComponent(systemPrompt)}&jsonMode=true`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            next: { revalidate: 0 } // Disable caching to always get a fresh story
        });

        if (!response.ok) {
            throw new Error(`Pollinations AI responded with status ${response.status}`);
        }

        const text = await response.text();
        
        // Helper to extract JSON
        let data;
        try {
            data = JSON.parse(text.trim());
        } catch {
            const match = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
            if (match) {
                try {
                    data = JSON.parse(match[1].trim());
                } catch {}
            }
            if (!data) {
                const braceMatch = text.match(/\{[\s\S]*\}/);
                if (braceMatch) {
                    try {
                        data = JSON.parse(braceMatch[0].trim());
                    } catch {}
                }
            }
        }

        if (!data || !data.title || !data.story) {
            throw new Error('Failed to parse a valid JSON story from AI response');
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error in story API route:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

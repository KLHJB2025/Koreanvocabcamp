async function run() {
    const wordListStr = '"决心", "烦恼", "江", "小狗", "狗", "头", "猫", "秋天", "苦恼"';
    const prompt = `Write a short story in Chinese (max 150 words) incorporating: ${wordListStr}. Output JSON format: {"title":"...", "story":"..."}. No markdown, no reasoning, just raw JSON.`;
    const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?jsonMode=true`;
    
    console.log("Fetching...");
    try {
        const res = await fetch(url);
        const text = await res.text();
        console.log("Full length:", text.length);
        console.log("Full text:\n", text);
        
        const parsed = JSON.parse(text);
        console.log("Parsed keys:", Object.keys(parsed));
        if (parsed.content) {
            console.log("Content field:", parsed.content);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

run();

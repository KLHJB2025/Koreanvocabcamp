const testBatch = [
    {
        word: "간장",
        phrase: "간장을 넣다",
        en: "Please give me some soy sauce.",
        zh: "请给我一点酱油。"
    },
    {
        word: "고등학생",
        phrase: "고등학생이 되다",
        en: "My younger brother is a high school student.",
        zh: "我弟弟是高中生。"
    },
    {
        word: "고속버스",
        phrase: "고속버스를 타다",
        en: "I took the express bus.",
        zh: "我坐了高速巴士。"
    },
    {
        word: "고민",
        phrase: "고민을 나누다",
        en: "I have a lot of worries.",
        zh: "我有很多烦恼。"
    }
];

async function run() {
    const prompt = `Rewrite these Korean phrases to end in polite conversational style (ending in ~요) and translate them to English and Chinese. Output ONLY as a JSON array in the format: [{"sentenceKr":"...", "sentenceMeaning":"...", "sentenceZh":"..."}].

Phrases to rewrite:
${JSON.stringify(testBatch, null, 2)}`;

    const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?jsonMode=true&model=openai`;
    console.log("Fetching from:", url);

    try {
        const res = await fetch(url);
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Response text:", text);
    } catch (e) {
        console.error("Error:", e);
    }
}

run();

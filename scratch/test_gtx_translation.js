async function translateText(text, targetLang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0][0][0];
    } catch (e) {
        console.error(`Translation to ${targetLang} failed for: "${text}"`, e);
        return null;
    }
}

async function test() {
    const testCases = [
        "간장을 넣어요.",
        "고등학생이 돼요.",
        "고속버스를 타요.",
        "고민을 나눠요."
    ];

    for (const t of testCases) {
        const en = await translateText(t, 'en');
        const zh = await translateText(t, 'zh-CN');
        console.log(`KR: "${t}"\n  EN: "${en}"\n  ZH: "${zh}"\n`);
        await new Promise(r => setTimeout(r, 500));
    }
}

test();

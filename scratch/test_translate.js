async function testTranslate() {
    const text = "날씨가 좋아서 소풍을 갔어요.";
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Chinese Translation:", data[0][0][0]);
        
        const urlEn = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURIComponent(text)}`;
        const responseEn = await fetch(urlEn);
        const dataEn = await responseEn.json();
        console.log("English Translation:", dataEn[0][0][0]);
    } catch (e) {
        console.error("Translation failed:", e);
    }
}

testTranslate();

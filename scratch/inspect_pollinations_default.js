async function run() {
    const words = [
      { kr: "개월", zh: "个月" },
      { kr: "건너가다", zh: "走过去" },
      { kr: "걸리다", zh: "花费/耗费" },
      { kr: "걸어가다", zh: "步行" },
      { kr: "겨울", zh: "冬天" },
      { kr: "계절", zh: "季节" },
      { kr: "가르치다", zh: "教学" }
    ];
    
    const wordListStr = words.map(w => `${w.kr} (${w.zh})`).join(', ');
    
    const prompt = `用中文写一个逻辑非常通顺、情节自然的小短文或对话（字数在150字以内），里面需要自然融入以下特定的词汇，且必须采用“韩语(中文翻译)”的格式（例如：“계절(季节)”或“겨울(冬天)”）：
          
          特定词汇如下：
          ${wordListStr}
          
          输出JSON格式：{"title":"故事标题", "story":"故事内容"}。不要输出任何解释，不要使用markdown，只要原始JSON。`;
          
    const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?jsonMode=true&model=openai`;
    
    console.log("Fetching GET with Gemini-style prompt...");
    const start = Date.now();
    try {
        const res = await fetch(url);
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Time taken:", Date.now() - start, "ms");
        console.log("Response text:\n", text);
    } catch (e) {
        console.error("Error:", e);
    }
}

run();

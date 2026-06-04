const words = [
  { kr: "개월", en: "months (duration)", zh: "个月", pos: "의존명사", category: "time_seasons", sentenceKr: "한국어를 배운 지 삼 개월이 되었어요.", sentenceZh: "我学韩语已经三个月了。", sentenceMeaning: "It has been three months since I started learning Korean." },
  { kr: "건너가다", en: "To go across", zh: "穿过/走过去", pos: "Verb", category: "time_seasons", sentenceKr: "횡단보도를 건너가요.", sentenceZh: "我们过人行横道吧。", sentenceMeaning: "I walk across the crosswalk." },
  { kr: "걸리다", en: "to take (time) / to catch (a cold)", zh: "花费(时间) / 得(病)", pos: "동사", category: "time_seasons", sentenceKr: "시간이 십 분쯤 걸려요.", sentenceZh: "大约需要十分钟。", sentenceMeaning: "It takes about 10 minutes." },
  { kr: "걸어가다", en: "To walk there", zh: "走过去", pos: "Verb", category: "time_seasons", sentenceKr: "학교까지 걸어갔어요.", sentenceZh: "我步行去学校。", sentenceMeaning: "I walked to school." },
  { kr: "겨울", en: "Winter", zh: "冬天", pos: "Noun", category: "time_seasons", sentenceKr: "겨울에는 눈이 와요.", sentenceZh: "冬天会下雪。", sentenceMeaning: "It snows in winter." },
  { kr: "계절", en: "Season", zh: "季节", pos: "Noun", category: "time_seasons", sentenceKr: "한국의 봄은 아름다운 계절이에요.", sentenceZh: "韩国的春天是个美丽的季节。", sentenceMeaning: "Spring in Korea is a beautiful season." },
  { kr: "가다", en: "To go", zh: "去", pos: "Verb", category: "time_seasons", sentenceKr: "시장에 가요.", sentenceZh: "去市场。", sentenceMeaning: "I go to the market." },
  { kr: "가르치다", en: "To teach", zh: "教", pos: "Verb", category: "time_seasons", sentenceKr: "선생님이 학생을 가르쳐요.", sentenceZh: "老师在教学生。", sentenceMeaning: "The teacher teaches the student." }
];

function getCleanCandidate(word, lang) {
    const raw = (lang === 'zh' ? word.zh : word.en || '').trim();
    if (!raw) return '';
    const cleanPart = (part) => {
        return part.replace(/\([^)]*\)/g, '').replace(/\（[^）]*\）/g, '').trim();
    };
    const firstPart = raw.split(/[\/,，]/)[0];
    return cleanPart(firstPart);
}

const FALLBACK_THEMES = [
    {
        title: (lang) => lang === 'zh' ? '一天的精彩旅程' : 'A Wonderful Day\'s Journey',
        intro: (lang) => lang === 'zh' ? '今天清晨，我拉开窗帘，心中突然有了一个特别的想法。我决定来一场温习词汇的旅行。' : 'This morning, I drew the curtains and felt a sudden burst of inspiration. I decided to take a vocabulary learning journey.',
        getSentence: (w, clean, sentence, index, lang) => {
            if (lang === 'zh') {
                if (index === 0) return `首先，脑海里浮现出关于“${clean}”的练习：“${sentence}”。这会是个很好的起点。`;
                if (index === 1) return `出发时，我想起如何使用“${clean}”：“${sentence}”。虽然旅途免不了劳累，但我的热情依然高涨。`;
                if (index === 2) return `一路上，看着两旁的风景，我想到了“${clean}”的例句：“${sentence}”，这让路途显得非常有趣。`;
                if (index === 3) return `路过一个小店时，橱窗上的图案让我想起“${clean}”：“${sentence}”。`;
                if (index === 4) return `走累了，我坐下休息，本子上写着“${clean}”的用法：“${sentence}”。这或许就是旅行中的小确幸吧。`;
                if (index === 5) return `不远处有一位路人，这场景正符合“${clean}”的描述：“${sentence}”。`;
                if (index === 6) return `抬头望去，天边的云彩犹如“${clean}”般诗情画意：“${sentence}”。`;
                if (index === 7) return `虽然在温习“${clean}”时遇到了一点疑惑：“${sentence}”，但这次旅行收获满满。`;
                return `回想今天学到的“${clean}”：“${sentence}”，感到无比充实。`;
            } else {
                if (index === 0) return `First, my thoughts gravitated toward "${clean}", recalling the sentence: "${sentence}". It felt like a perfect starting point.`;
                if (index === 1) return `As I set out, I remembered how to use "${clean}": "${sentence}". Despite the effort, my excitement remained high.`;
                if (index === 2) return `Wandering along the path and seeing the scenery, I reflected on "${clean}": "${sentence}". It made the walk very interesting.`;
                if (index === 3) return `Passing by a small shop, the window display reminded me of "${clean}": "${sentence}".`;
                if (index === 4) return `Feeling a bit tired, I sat down to rest, reading about "${clean}": "${sentence}". This was a pleasant discovery.`;
                if (index === 5) return `Not far away, a scene caught my eye, perfectly matching the usage of "${clean}": "${sentence}".`;
                if (index === 6) return `Looking up at the sky, the view felt as poetic as "${clean}": "${sentence}".`;
                if (index === 7) return `Although I had a minor confusion about "${clean}": "${sentence}", this journey was deeply rewarding.`;
                return `Reflecting on "${clean}": "${sentence}", I felt a sense of completion.`;
            }
        }
    }
];

function generateStory(words, lang) {
    const wordCleanList = words.map(w => {
        const clean = getCleanCandidate(w, lang);
        const sentence = lang === 'zh' ? w.sentenceZh : w.sentenceMeaning;
        return { word: w, clean, sentence };
    }).filter(item => item.clean);

    const hash = words.reduce((acc, w) => acc + (w.kr.charCodeAt(0) || 0), 0);
    const themeIndex = hash % FALLBACK_THEMES.length;
    const theme = FALLBACK_THEMES[themeIndex];

    const parts = [];
    parts.push(theme.intro(lang));

    wordCleanList.forEach((item, index) => {
        const s = theme.getSentence(item.word, item.clean, item.sentence, index, lang);
        parts.push(s);
    });

    console.log("THEME INDEX:", themeIndex);
    console.log("TITLE:", theme.title(lang));
    console.log("STORY:\n", parts.join("\n"));
}

generateStory(words, 'zh');

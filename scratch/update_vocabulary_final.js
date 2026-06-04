const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Parse MOCK_VOCABULARY from vocabulary-data.ts using eval
const match = fileContent.match(/(?:export\s+const\s+MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)(\{[\s\S]*?\});/);
if (!match) {
    console.error("Could not find MOCK_VOCABULARY in vocabulary-data.ts");
    process.exit(1);
}

let MOCK_VOCABULARY;
try {
    MOCK_VOCABULARY = eval('(' + match[1] + ')');
} catch (e) {
    console.error("Failed to eval MOCK_VOCABULARY", e);
    process.exit(1);
}

const fragmentReplacements = {
    "감자": {
        sentenceKr: "저는 감자를 좋아해요.",
        sentenceMeaning: "I like potatoes.",
        sentenceZh: "我喜欢土豆。"
    },
    "검사": {
        sentenceKr: "병원에서 건강 검사를 받았어요.",
        sentenceMeaning: "I got a health checkup at the hospital.",
        sentenceZh: "在医院接受了健康检查。"
    },
    "고모": {
        sentenceKr: "우리 고모는 서울에 살아요.",
        sentenceMeaning: "My aunt lives in Seoul.",
        sentenceZh: "我姑姑住在首尔。"
    },
    "개월": {
        sentenceKr: "한국어를 배운 지 삼 개월이 되었어요.",
        sentenceMeaning: "It has been three months since I started learning Korean.",
        sentenceZh: "我学韩语已经三个月了。"
    },
    "간단히": {
        sentenceKr: "간단히 설명해 주세요.",
        sentenceMeaning: "Please explain it simply.",
        sentenceZh: "请简单解释一下。"
    },
    "검은색": {
        sentenceKr: "검은색 셔츠를 샀어요.",
        sentenceMeaning: "I bought a black shirt.",
        sentenceZh: "我买了一件黑色的衬衫。"
    },
    "검정": {
        sentenceKr: "저는 검정색을 좋아해요.",
        sentenceMeaning: "I like black color.",
        sentenceZh: "我喜欢黑色。"
    },
    "겉": {
        sentenceKr: "이 빵은 겉이 아주 딱딱해요.",
        sentenceMeaning: "This bread is very hard on the outside.",
        sentenceZh: "这个面包外面很硬。"
    },
    "게임": {
        sentenceKr: "저는 컴퓨터 게임을 해요.",
        sentenceMeaning: "I play computer games.",
        sentenceZh: "我玩电脑游戏。"
    },
    "교사": {
        sentenceKr: "제 꿈은 학교 교사가 되는 것이에요.",
        sentenceMeaning: "My dream is to become a school teacher.",
        sentenceZh: "我的梦想是成为一名 school teacher。"
    },
    "관광객": {
        sentenceKr: "이곳에는 많은 관광객이 있어요.",
        sentenceMeaning: "There are many tourists here.",
        sentenceZh: "这里有很多游客。"
    },
    "관광지": {
        sentenceKr: "이곳은 아주 유명한 관광지예요.",
        sentenceMeaning: "This place is a very famous tourist attraction.",
        sentenceZh: "这里是非常著名的旅游景点。"
    },
    "광주": {
        sentenceKr: "저는 광주에 살고 있어요.",
        sentenceMeaning: "I live in Gwangju.",
        sentenceZh: "我住在光州。"
    },
    "그러나": {
        sentenceKr: "비가 왔어요. 그러나 저는 밖에 나갔어요.",
        sentenceMeaning: "It rained. But I went outside.",
        sentenceZh: "下雨了。但我还是出门了。"
    },
    "그럼": {
        sentenceKr: "그럼 저는 먼저 갈게요.",
        sentenceMeaning: "Then I will go first.",
        sentenceZh: "那么我先走了。"
    },
    "관광": {
        sentenceKr: "친구와 함께 국내 관광을 다녀왔어요.",
        sentenceMeaning: "I went on a domestic tour with a friend.",
        sentenceZh: "和朋友一起去国内旅游了。"
    },
    "구": {
        sentenceKr: "저는 이 구에 살고 있어요.",
        sentenceMeaning: "I live in this district.",
        sentenceZh: "我住在这个区。"
    },
    "국적": {
        sentenceKr: "당신의 국적은 어디입니까?",
        sentenceMeaning: "What is your nationality?",
        sentenceZh: "您的国籍是哪里？"
    },
    "그거": {
        sentenceKr: "그건 뭐예요?",
        sentenceMeaning: "What is that?",
        sentenceZh: "那是什么？"
    },
    "남학생": {
        sentenceKr: "그는 아주 성실한 남학생이에요.",
        sentenceMeaning: "He is a very diligent male student.",
        sentenceZh: "他是一个非常诚实的男学生。"
    },
    "깊이": {
        sentenceKr: "문제를 해결하기 위해 깊이 생각했어요.",
        sentenceMeaning: "I thought deeply to solve the problem.",
        sentenceZh: "为了解决问题，我深深地思考了。"
    },
    "깜짝": {
        sentenceKr: "소리를 듣고 깜짝 놀랐어요.",
        sentenceMeaning: "I was startled to hear the sound.",
        sentenceZh: "听到声音我吓了一跳。"
    },
    "낫다": {
        sentenceKr: "감기가 다 나았어요.",
        sentenceMeaning: "My cold is completely cured.",
        sentenceZh: "感冒全都好了。"
    },
    "까만색": {
        sentenceKr: "저는 오늘 까만색 구두를 신었어요.",
        sentenceMeaning: "I wore black shoes today.",
        sentenceZh: "我今天穿了黑色的皮鞋。"
    },
    "둘째": {
        sentenceKr: "이 아이는 제 둘째 아이예요.",
        sentenceMeaning: "This child is my second child.",
        sentenceZh: "这个孩子是我的第二个孩子。"
    },
    "뒤쪽": {
        sentenceKr: "뒤쪽으로 걸어가세요.",
        sentenceMeaning: "Please walk to the back.",
        sentenceZh: "请往后边走。"
    },
    "발바닥": {
        sentenceKr: "많이 걸어서 발바닥이 아파요.",
        sentenceMeaning: "My soles hurt from walking a lot.",
        sentenceZh: "走了很多路，脚底很疼。"
    },
    "방금": {
        sentenceKr: "그 사람은 방금 떠났어요.",
        sentenceMeaning: "That person just left.",
        sentenceZh: "那个人刚刚离开。"
    },
    "방학": {
        sentenceKr: "오늘부터 즐거운 여름 방학이 시작돼요.",
        sentenceMeaning: "The pleasant summer vacation starts from today.",
        sentenceZh: "从今天开始快乐的暑假开始了。"
    },
    "자장면": {
        sentenceKr: "오늘 점심으로 자장면을 먹었어요.",
        sentenceMeaning: "I ate jajangmyeon for lunch today.",
        sentenceZh: "今天中午吃了炸酱面。"
    },
    "잔": {
        sentenceKr: "따뜻한 커피 한 잔 주세요.",
        sentenceMeaning: "Please give me a cup of warm coffee.",
        sentenceZh: "请给我一杯热咖啡。"
    },
    "잡채": {
        sentenceKr: "어머니가 만드신 잡채는 정말 맛있어요.",
        sentenceMeaning: "The japchae made by my mother is really delicious.",
        sentenceZh: "妈妈做的杂菜真好吃。"
    },
    "입학": {
        sentenceKr: "대학 입학을 진심으로 축하합니다.",
        sentenceMeaning: "I sincerely congratulate you on entering college.",
        sentenceZh: "真心祝贺你大学入学。"
    },
    "입원": {
        sentenceKr: "친구가 아파서 병원에 입원했어요.",
        sentenceMeaning: "My friend was sick and hospitalized.",
        sentenceZh: "朋友生病住院了。"
    },
    "잠자다": {
        sentenceKr: "아기가 침대에서 새근새근 잠자고 있어요.",
        sentenceMeaning: "The baby is sleeping peacefully in the bed.",
        sentenceZh: "宝宝正在床上香甜地睡着。"
    },
    "저곳": {
        sentenceKr: "저곳은 경치가 아주 아름다워요.",
        sentenceMeaning: "The scenery over there is very beautiful.",
        sentenceZh: "那个地方的风景非常美。"
    },
    "저분": {
        sentenceKr: "저분은 누구이신가요?",
        sentenceMeaning: "Who is that gentleman/lady?",
        sentenceZh: "那位是谁？"
    },
    "작년": {
        sentenceKr: "우리는 작년에 처음 만났어요.",
        sentenceMeaning: "We met for the first time last year.",
        sentenceZh: "我们去年第一次见面。"
    },
    "저번": {
        sentenceKr: "저번 주에 만났던 친구예요.",
        sentenceMeaning: "It is a friend I met last week.",
        sentenceZh: "是上주见过的朋友。"
    },
    "자꾸": {
        sentenceKr: "왜 자꾸 똑같은 실수를 반복해요?",
        sentenceMeaning: "Why do you keep repeating the same mistake?",
        sentenceZh: "为什么总是重复同样的错误？"
    },
    "자세히": {
        sentenceKr: "이 내용에 대해 자세히 설명해 주세요.",
        sentenceMeaning: "Please explain this content in detail.",
        sentenceZh: "请详细解释一下这个内容。"
    },
    "자주": {
        sentenceKr: "저는 도서관에 자주 가요.",
        sentenceMeaning: "I often go to the library.",
        sentenceZh: "我经常去图书馆。"
    },
    "잘": {
        sentenceKr: "오늘 밤에는 잘 자요.",
        sentenceMeaning: "Sleep well tonight.",
        sentenceZh: "今晚好好睡。"
    },
    "입구": {
        sentenceKr: "지하철역 입구에서 만납시다.",
        sentenceMeaning: "Let's meet at the subway station entrance.",
        sentenceZh: "我们在地铁站入口见面吧。"
    },
    "입술": {
        sentenceKr: "날씨가 건조해서 입술이 텄어요.",
        sentenceMeaning: "My lips are chapped because the weather is dry.",
        sentenceZh: "因为天气干燥，嘴唇裂了。"
    },
    "자신": {
        sentenceKr: "자기 자신을 믿고 용기를 내세요.",
        sentenceMeaning: "Believe in yourself and take courage.",
        sentenceZh: "相信自己，拿出勇气来。"
    },
    "자판기": {
        sentenceKr: "커피 자판기가 고장 났어요.",
        sentenceMeaning: "The coffee vending machine is broken.",
        sentenceZh: "咖啡自动售货机坏了。"
    },
    "잔치": {
        sentenceKr: "어제 신나는 생일 잔치를 열었어요.",
        sentenceMeaning: "We held an exciting birthday party yesterday.",
        sentenceZh: "昨天举办了开心的生日宴会。"
    },
    "잠깐": {
        sentenceKr: "잠깐만 기다려 주세요.",
        sentenceMeaning: "Please wait for a moment.",
        sentenceZh: "请稍等一下。"
    },
    "잠시": {
        sentenceKr: "잠시만 여기서 기다려 주십시오.",
        sentenceMeaning: "Please wait here for a moment.",
        sentenceZh: "请在这里稍等片刻。"
    },
    "장": {
        sentenceKr: "영화 표 두 장 예매해 주세요.",
        sentenceMeaning: "Please book two movie tickets.",
        sentenceZh: "请帮我买两张电影票。"
    },
    "장미": {
        sentenceKr: "여자친구에게 빨간 장미 꽃을 선물했어요.",
        sentenceMeaning: "I gifted red roses to my girlfriend.",
        sentenceZh: "给女朋友送了红玫瑰花。"
    },
    "저거": {
        sentenceKr: "저거 한 개만 주세요.",
        sentenceMeaning: "Please give me just one of those.",
        sentenceZh: "请给我那个一个。"
    },
    "저것": {
        sentenceKr: "저것은 무슨 물건이에요?",
        sentenceMeaning: "What is that object over there?",
        sentenceZh: "那个是什么东西？"
    },
    "저기": {
        sentenceKr: "저기 도서관 옆에 서 있는 사람이 제 친구예요.",
        sentenceMeaning: "The person standing next to the library over there is my friend.",
        sentenceZh: "在那边图书馆旁边站着的人是我朋友。"
    },
    "저런": {
        sentenceKr: "저런 나쁜 소리는 듣고 싶지 않아요.",
        sentenceMeaning: "I don't want to hear such bad news/words.",
        sentenceZh: "我不想听那种不好的话。"
    },
    "저쪽": {
        sentenceKr: "저쪽 방향으로 가시면 출구가 나옵니다.",
        sentenceMeaning: "If you go in that direction, you will find the exit.",
        sentenceZh: "往那个方向走就会有出口。"
    },
    "저희": {
        sentenceKr: "저희 회사에 오신 것을 환영합니다.",
        sentenceMeaning: "Welcome to our company.",
        sentenceZh: "欢迎来到我们公司。"
    },
    "호랑이": {
        sentenceKr: "동물원에 있는 호랑이가 정말 무서워요.",
        sentenceMeaning: "The tiger at the zoo is really scary.",
        sentenceZh: "动物园里的老虎真可怕。"
    },
    "활발히": {
        sentenceKr: "우리 동아리 회원들은 활발히 활동하고 있어요.",
        sentenceMeaning: "Our club members are active.",
        sentenceZh: "我们社团的会员们活动很活跃。"
    },
    "흰색": {
        sentenceKr: "저는 깨끗한 흰색 옷을 좋아해요.",
        sentenceMeaning: "I like clean white clothes.",
        sentenceZh: "我喜欢干净的白色衣服。"
    }
};

// Spacing correction logic
function fixSpacing(sentence) {
    if (!sentence) return sentence;
    let fixed = sentence;
    
    // Replace multiple spaces with a single space first
    fixed = fixed.replace(/\s+/g, ' ');
    
    const particles = ['을', '를', '이', '가', '은', '는', '에', '서', '로', '으로', '와', '과', '의', '도', '만'];
    
    particles.forEach(p => {
        const regex = new RegExp(`\\s(${p})(?=\\s|[\\.,\\?!~]|$|다)`, 'g');
        
        fixed = fixed.replace(regex, (match, particle, offset) => {
            // Check exceptions:
            if (particle === '만') {
                const after = fixed.substring(offset + match.length).trim();
                if (after.startsWith('원') || after.startsWith('국') || after.startsWith('세')) {
                    return match;
                }
                if (fixed.includes('만 원')) {
                    return match;
                }
            }
            
            if (particle === '서') {
                const after = fixed.substring(offset + match.length).trim();
                if (after.startsWith('있') || after.startsWith('서') || after.startsWith('다') || after.startsWith('안')) {
                    return match;
                }
            }
            
            if (particle === '이') {
                const after = fixed.substring(offset + match.length).trim();
                const determinerNouns = ['약', '책', '사람', '것', '곳', '씨', '킬로그램', 'kg', '나라', '번', '해', '차례', '가지'];
                if (determinerNouns.some(n => after.startsWith(n))) {
                    return match;
                }
            }
            
            if (particle === '가') {
                const after = fixed.substring(offset + match.length).trim();
                if (after.startsWith('다') || after.startsWith('지') || after.startsWith('요') || after.startsWith('왔') || after.startsWith('갔')) {
                    return match;
                }
            }
            
            return particle;
        });
    });
    
    return fixed;
}

// Google Translate helper
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

async function run() {
    let replacedCount = 0;
    let spacingFixedCount = 0;
    let translationCount = 0;
    
    console.log("Processing cycles...");
    
    for (const cycleId of Object.keys(MOCK_VOCABULARY)) {
        const words = MOCK_VOCABULARY[cycleId];
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            // 1. Fragment replacements
            // Specific overrides for duplicates or complex terms
            if (word.kr === '감다') {
                if (word.sentenceKr === '감다 눈을') {
                    word.sentenceKr = '눈을 감고 음악을 들어요.';
                    word.sentenceMeaning = 'I close my eyes and listen to music.';
                    word.sentenceZh = '我闭上眼睛听音乐。';
                    replacedCount++;
                } else if (word.sentenceKr === '감다 머리를') {
                    word.sentenceKr = '따뜻한 물로 머리를 감아요.';
                    word.sentenceMeaning = 'I wash my hair with warm water.';
                    word.sentenceZh = '用温水洗头。';
                    replacedCount++;
                }
            } else if (word.kr === '걸리다' && word.sentenceKr === '걸리다 그림이') {
                word.sentenceKr = '시간이 십 분쯤 걸려요.';
                word.sentenceMeaning = 'It takes about 10 minutes.';
                word.sentenceZh = '大约需要十分钟。';
                replacedCount++;
            } else if (word.kr === '고르다' && word.sentenceKr === '고르다 선물을') {
                word.sentenceKr = '마음에 드는 선물을 고르세요.';
                word.sentenceMeaning = 'Please choose a gift that you like.';
                word.sentenceZh = '请挑选一个你喜欢的礼物。';
                replacedCount++;
            } else if (word.kr === '저' && word.sentenceKr === '저 사람(1인칭)') {
                word.sentenceKr = '저는 한국 대학교에 다니는 학생입니다.';
                word.sentenceMeaning = 'I am a student attending Korea University.';
                word.sentenceZh = '我是韩国大学的学生。';
                replacedCount++;
            } else if (word.kr === '저' && word.sentenceKr === '저 "저') {
                word.sentenceKr = '저는 한국 대학교에 다니는 학생입니다.';
                word.sentenceMeaning = 'I am a student attending Korea University.';
                word.sentenceZh = '我是韩国大学的学生。';
                replacedCount++;
            } else if (word.kr === '전' && word.sentenceKr === '전 전 세계') {
                word.sentenceKr = '오래 전에 그 사람을 만난 적이 있어요.';
                word.sentenceMeaning = 'I met that person a long time ago.';
                word.sentenceZh = '很久以前我见过那个人。';
                replacedCount++;
            } else if (word.kr === '전' && word.sentenceKr === '전 오래 전') {
                word.sentenceKr = '오래 전에 그 사람을 만난 적이 있어요.';
                word.sentenceMeaning = 'I met that person a long time ago.';
                word.sentenceZh = '很久以前我见过那个人。';
                replacedCount++;
            } else if (word.kr === '그럼' && (word.sentenceKr === '그럼 그러면' || word.sentenceKr === '그럼 "그럼')) {
                word.sentenceKr = '그럼 저는 먼저 갈게요.';
                word.sentenceMeaning = 'Then I will go first.';
                word.sentenceZh = '那么我先走了。';
                replacedCount++;
            } else if (fragmentReplacements[word.kr]) {
                const rep = fragmentReplacements[word.kr];
                word.sentenceKr = rep.sentenceKr;
                word.sentenceMeaning = rep.sentenceMeaning;
                word.sentenceZh = rep.sentenceZh;
                replacedCount++;
            }
            
            // 2. Fix spacing in sentenceKr
            if (word.sentenceKr) {
                const orig = word.sentenceKr;
                const fixed = fixSpacing(orig);
                if (fixed !== orig) {
                    word.sentenceKr = fixed;
                    spacingFixedCount++;
                }
            }
        }
    }
    
    console.log(`Replaced fragments: ${replacedCount}`);
    console.log(`Fixed spacing issues: ${spacingFixedCount}`);
    
    // 3. Translate missing sentences
    console.log("Starting translations of missing meanings/Chinese...");
    let tCount = 0;
    for (const cycleId of Object.keys(MOCK_VOCABULARY)) {
        const words = MOCK_VOCABULARY[cycleId];
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (word.sentenceKr) {
                let needed = false;
                if (!word.sentenceMeaning || word.sentenceMeaning === 'TBD') {
                    needed = true;
                    // Translate to English
                    const translation = await translateText(word.sentenceKr, 'en');
                    if (translation) {
                        word.sentenceMeaning = translation;
                        tCount++;
                    }
                    await new Promise(r => setTimeout(r, 100)); // be nice to endpoint
                }
                
                if (!word.sentenceZh || word.sentenceZh === 'TBD') {
                    needed = true;
                    // Translate to Chinese
                    const translation = await translateText(word.sentenceKr, 'zh-CN');
                    if (translation) {
                        word.sentenceZh = translation;
                        tCount++;
                    }
                    await new Promise(r => setTimeout(r, 100)); // be nice to endpoint
                }
                
                if (needed) {
                    translationCount++;
                    if (translationCount % 20 === 0) {
                        console.log(`Translated ${translationCount} sentences...`);
                    }
                }
            }
        }
    }
    
    console.log(`Finished translations! Total translations applied: ${tCount} across ${translationCount} sentences.`);
    
    // 4. Output the updated vocabulary-data.ts file
    const newVocabString = JSON.stringify(MOCK_VOCABULARY, null, 4)
        .replace(/"([^"]+)":/g, '$1:'); // remove quotes around keys to match typical TS styling

    const regex = /(export const MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)\{[\s\S]*?\};/;
    const newContent = fileContent.replace(regex, `$1${newVocabString};`);
    
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log("Updated vocabulary-data.ts successfully!");
}

run();

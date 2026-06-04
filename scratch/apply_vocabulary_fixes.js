const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/vocabulary-data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Parse MOCK_VOCABULARY
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

// 1. Missing EN/ZH translations
const specialFixes = {
    "양식집": {
        sentenceMeaning: "I decided to go to a Western restaurant downtown."
    },
    "슈퍼마켓": {
        sentenceZh: "我从超市买了新鲜水果。"
    },
    "아직": {
        sentenceZh: "我还没有做完作业。"
    },
    "왼손": {
        sentenceZh: "我有用左手吃饭的习惯。"
    },
    "요리사": {
        sentenceZh: "那家餐馆的厨师非常有名。"
    },
    "열": {
        sentenceZh: "身体在发烧，可能感冒了。"
    },
    "없다": {
        sentenceZh: "冰箱里一点吃的东西也没有。"
    },
    "주로": {
        sentenceZh: "周末我一般喜欢在家里休息。"
    },
    "케이크": {
        sentenceZh: "吃生日蛋糕。"
    },
    "파티": {
        sentenceZh: "举办生日派对。"
    }
};

// 2. Fragment fixes
const fragmentFixes = {
    "적다": {}, // evaluated with special logic below
    "저": {},   // evaluated with special logic below
    "괴로워하다": {
        sentenceKr: "환자가 통증으로 괴로워하고 있어요.",
        sentenceMeaning: "The patient is suffering from pain.",
        sentenceZh: "病人正因疼痛而痛苦。"
    },
    "귀여워하다": {
        sentenceKr: "아이들이 귀여운 강아지를 귀여워해요.",
        sentenceMeaning: "Children adore the cute puppy.",
        sentenceZh: "孩子们很疼爱可爱的狗狗。"
    },
    "고프다": {
        sentenceKr: "열심히 일했더니 배가 고픕니다.",
        sentenceMeaning: "After working hard, I am hungry.",
        sentenceZh: "努力工作后肚子饿了。"
    },
    "굵다": {
        sentenceKr: "그 피아니스트는 손가락이 굵은 편입니다.",
        sentenceMeaning: "The pianist has rather thick fingers.",
        sentenceZh: "那个钢琴家的手指偏粗。"
    },
    "궁금하다": {
        sentenceKr: "오랫동안 만나지 못한 친구의 소식이 궁금합니다.",
        sentenceMeaning: "I am curious about the news of the friend I haven't met for a long time.",
        sentenceZh: "我很想知道好久没见的朋友的消息。"
    },
    "귀찮다": {
        sentenceKr: "요즘은 만사가 다 귀찮게 느껴집니다.",
        sentenceMeaning: "Lately, everything feels like a hassle.",
        sentenceZh: "最近觉得什么事都很麻烦。"
    },
    "굳다": {
        sentenceKr: "비가 온 뒤에 땅이 단단하게 굳습니다.",
        sentenceMeaning: "The ground hardens firmly after rain.",
        sentenceZh: "雨后地面会变得坚硬。"
    },
    "남자": {
        sentenceKr: "우리는 그 남자를 잘 모릅니다.",
        sentenceMeaning: "We do not know that man well.",
        sentenceZh: "我们不怎么认识那个男人。"
    },
    "남편": {
        sentenceKr: "제 친구의 남편은 요리사입니다.",
        sentenceMeaning: "My friend's husband is a chef.",
        sentenceZh: "我朋友的丈夫是厨师。"
    },
    "깎다": {
        sentenceKr: "과도로 사과를 조심스럽게 깎았어요.",
        sentenceMeaning: "I carefully peeled the apple with a fruit knife.",
        sentenceZh: "用水果刀小心地削了苹果。"
    },
    "깨다": {
        sentenceKr: "아침 일찍 알람 소리에 잠이 깼어요.",
        sentenceMeaning: "I woke up early in the morning to the sound of the alarm.",
        sentenceZh: "早上很早就被闹钟声吵醒了。"
    },
    "까맣다": {
        sentenceKr: "시골의 밤하늘은 아주 까맣고 아름다워요.",
        sentenceMeaning: "The night sky in the countryside is very dark and beautiful.",
        sentenceZh: "乡下的夜空非常漆黑且美丽。"
    },
    "늙다": {
        sentenceKr: "사람은 누구나 나이가 들면 늙기 마련입니다.",
        sentenceMeaning: "Everyone is bound to grow old as they age.",
        sentenceZh: "任何人上了年纪都难免会变老。"
    },
    "대부분": {
        sentenceKr: "대부분의 사람들은 이 사실을 알고 있습니다.",
        sentenceMeaning: "Most people know this fact.",
        sentenceZh: "大多数人都知道这个事实。"
    },
    "못하다": {
        sentenceKr: "저는 노래를 잘 부르지 못합니다.",
        sentenceMeaning: "I am not good at singing songs.",
        sentenceZh: "我唱歌唱得不好。"
    },
    "밝다": {
        sentenceKr: "방 안의 불빛이 아주 밝아서 좋습니다.",
        sentenceMeaning: "The light in the room is very bright, which is nice.",
        sentenceZh: "房间里的光线很亮，真好。"
    },
    "뽑다": {
        sentenceKr: "치과에 가서 아픈 이를 뽑았습니다.",
        sentenceMeaning: "I went to the dentist and got a painful tooth pulled out.",
        sentenceZh: "去牙科拔了疼的牙齿。"
    },
    "사": {
        sentenceKr: "일 년은 사 계절로 나뉩니다.",
        sentenceMeaning: "One year is divided into four seasons.",
        sentenceZh: "一年分为四个季节。"
    },
    "사십": {
        sentenceKr: "우리 부모님은 올해 사십 대이십니다.",
        sentenceMeaning: "Our parents are in their forties this year.",
        sentenceZh: "我们的父母今年四十多岁。"
    },
    "삼": {
        sentenceKr: "우리는 초등학교를 삼 년 동안 다녔습니다.",
        sentenceMeaning: "We attended elementary school for three years.",
        sentenceZh: "我们读了三年小学。"
    },
    "삼십": {
        sentenceKr: "이 버스는 삼십 분마다 운행합니다.",
        sentenceMeaning: "This bus runs every thirty minutes.",
        sentenceZh: "这辆公交车每三十分钟运行一次。"
    },
    "여쭙다": {
        sentenceKr: "모르는 문제를 선생님께 공손하게 여쭙고 싶어요.",
        sentenceMeaning: "I want to politely ask my teacher about a question I don't know.",
        sentenceZh: "我想向老师恭敬地请教不懂的问题。"
    },
    "잡수시다": {
        sentenceKr: "할아버지께서 맛있게 진지를 잡수십니다.",
        sentenceMeaning: "Grandfather is eating his meal with relish.",
        sentenceZh: "爷爷正在津津有味地用餐。"
    },
    "자자": {
    },
    "자다": {
        sentenceKr: "어젯밤에 잠을 아주 푹 잤습니다.",
        sentenceMeaning: "I slept very soundly last night.",
        sentenceZh: "昨晚睡得很香。"
    },
    "저렇다": {
        sentenceKr: "하늘에 있는 구름이 왜 저렇게 어두울까요?",
        sentenceMeaning: "Why are the clouds in the sky so dark?",
        sentenceZh: "天空中的云为什么那么暗？"
    },
    "입다": {
        sentenceKr: "추운 날씨에는 따뜻한 옷을 입어야 합니다.",
        sentenceMeaning: "In cold weather, you must wear warm clothes.",
        sentenceZh: "冷天必须穿暖和的衣服。"
    },
    "잊다": {
        sentenceKr: "비밀번호를 자꾸 잊어서 고민입니다.",
        sentenceMeaning: "I'm worried because I keep forgetting my password.",
        sentenceZh: "因为总是忘记密码而烦恼。"
    },
    "잊어버리다": {
        sentenceKr: "친구의 전화번호를 깜빡 잊어버렸어요.",
        sentenceMeaning: "I completely forgot my friend's phone number.",
        sentenceZh: "I completely forgot my friend's phone number."
    },
    "자라다": {
        sentenceKr: "화분에서 예쁜 꽃이 무럭무럭 자라고 있어요.",
        sentenceMeaning: "A pretty flower is growing rapidly in the flowerpot.",
        sentenceZh: "花盆里美丽的花朵正在茁壮成长。"
    },
    "자르다": {
        sentenceKr: "미용실에 가서 머리를 짧게 잘랐어요.",
        sentenceMeaning: "I went to the hair salon and cut my hair short.",
        sentenceZh: "去美发店把头发剪短了。"
    },
    "잘되다": {
        sentenceKr: "올해에는 모든 일이 다 잘되면 좋겠습니다.",
        sentenceMeaning: "I hope everything goes well this year.",
        sentenceZh: "希望今年一切事情都能顺利。"
    },
    "잘못되다": {
        sentenceKr: "일이 잘못되더라도 너무 낙담하지 마세요.",
        sentenceMeaning: "Even if things go wrong, don't be too discouraged.",
        sentenceZh: "即使事情搞砸了，也不要太气馁。"
    },
    "잘못하다": {
        sentenceKr: "제가 잘못한 일이 있으면 용서해 주세요.",
        sentenceMeaning: "If there is anything I did wrong, please forgive me.",
        sentenceZh: "如果有我做错的事，请原谅我。"
    },
    "잘하다": {
        sentenceKr: "제 여동생은 영어를 아주 잘합니다.",
        sentenceMeaning: "My younger sister speaks English very well.",
        sentenceZh: "我妹妹英语说得非常好。"
    },
    "잡다": {
        sentenceKr: "서로의 손을 꼭 잡고 걸어갔어요.",
        sentenceMeaning: "We walked holding each other's hands tightly.",
        sentenceZh: "紧紧握着彼此的手走了过去。"
    },
    "작다": {
        sentenceKr: "이 신발은 제 발에 너무 작습니다.",
        sentenceMeaning: "These shoes are too small for my feet.",
        sentenceZh: "这双鞋对我的脚来说太小了。"
    },
    "잘생기다": {
        sentenceKr: "그 배우는 키도 크고 아주 잘생겼습니다.",
        sentenceMeaning: "That actor is tall and very handsome.",
        sentenceZh: "那个演员个子又高，长得又帅。"
    },
    "재미없다": {
        sentenceKr: "어제 본 영화는 스토리 구성이 재미없었어요.",
        sentenceMeaning: "The movie I watched yesterday had an uninteresting plot.",
        sentenceZh: "昨天看的电影剧情构思没意思。"
    },
    "재미있다": {
        sentenceKr: "이 소설책은 내용이 정말 재미있습니다.",
        sentenceMeaning: "This novel book has really interesting content.",
        sentenceZh: "这本小说书的内容真的很有趣。"
    },
    "적당하다": {
        sentenceKr: "이 음식은 맵지 않고 아이들이 먹기에 적당합니다.",
        sentenceMeaning: "This food is not spicy and is suitable for children to eat.",
        sentenceZh: "这个食物不辣，适合孩子们吃。"
    },
    "있다": {
        sentenceKr: "지금 거실에 책상과 의자가 있습니다.",
        sentenceMeaning: "There are a desk and a chair in the living room now.",
        sentenceZh: "现在客厅里有书桌和椅子。"
    },
    "친척": {
        sentenceKr: "추석 명절에 온 친척들이 한자리에 모였습니다.",
        sentenceMeaning: "All relatives gathered together for the Chuseok holiday.",
        sentenceZh: "中秋佳节，所有亲戚都聚集在了一起。"
    },
    "출발": {
        sentenceKr: "기차가 서울역을 향해 정시에 출발했습니다.",
        sentenceMeaning: "The train departed for Seoul Station on time.",
        sentenceZh: "火车准时向首尔站出发了。"
    },
    "토마토": {
        sentenceKr: "샐러드를 만들기 위해 싱싱한 토마토를 샀어요.",
        sentenceMeaning: "I bought fresh tomatoes to make a salad.",
        sentenceZh: "为了做沙拉，买了新鲜的西红柿。"
    },
    "한": {
        sentenceKr: "선생님이 한 학생을 칭찬하고 계십니다.",
        sentenceMeaning: "The teacher is praising a student.",
        sentenceZh: "老师正在表扬一名学生。"
    },
    "할인": {
        sentenceKr: "백화점에서 시즌 종료 세일로 큰 할인을 해 줍니다.",
        sentenceMeaning: "The department store gives a big discount for the end-of-season sale.",
        sentenceZh: "百货商店因为季末促销给予很大的折扣。"
    },
    "호": {
        sentenceKr: "제가 사는 아파트는 102동 501호입니다.",
        sentenceMeaning: "The apartment I live in is building 102, room 501.",
        sentenceZh: "我住的公寓是102栋501号。"
    },
    "형": {
        sentenceKr: "우리 형은 대학에서 컴퓨터 공학을 전공합니다.",
        sentenceMeaning: "My older brother majors in computer engineering at university.",
        sentenceZh: "我哥哥在大学主修计算机工程。"
    },
    "형제": {
        sentenceKr: "우리 부모님은 일남일녀 형제를 두셨습니다.",
        sentenceMeaning: "Our parents have a brother and a sister.",
        sentenceZh: "我们的父母育有一子一女两个孩子。"
    },
    "화나다": {
        sentenceKr: "동생이 약속을 어겨서 너무 화가 났어요.",
        sentenceMeaning: "I was so angry because my younger sibling broke the promise.",
        sentenceZh: "妹妹违背了约定，我真的很生气。"
    },
    "현재": {
        sentenceKr: "현재 상황에서는 이 방법이 최선입니다.",
        sentenceMeaning: "In the current situation, this method is the best.",
        sentenceZh: "在目前情况下，这个方法是最好的。"
    },
    "회": {
        sentenceKr: "이 드라마는 총 16회로 구성되어 있습니다.",
        sentenceMeaning: "This drama consists of a total of 16 episodes.",
        sentenceZh: "这部电视剧总共由16集组成。"
    },
    "화내다": {
        sentenceKr: "그는 사소한 일에 자꾸 화를 냅니다.",
        sentenceMeaning: "He keeps getting angry over trivial matters.",
        sentenceZh: "他总是为了一点小事发火。"
    },
    "환전": {
        sentenceKr: "해외여행을 가기 전에 은행에서 환전을 했습니다.",
        sentenceMeaning: "I exchanged money at the bank before going on a trip abroad.",
        sentenceZh: "出国旅游前在银行兑换了外币。"
    },
    "혹시": {
        sentenceKr: "혹시 그 사람이 어디에 사는지 아습니까?",
        sentenceMeaning: "Do you by any chance know where that person lives?",
        sentenceZh: "您或许知道那个人住在哪儿吗？"
    },
    "화려하다": {
        sentenceKr: "그 무대의 의상이 아주 화려하고 멋졌습니다.",
        sentenceMeaning: "The costumes on that stage were very glamorous and cool.",
        sentenceZh: "那个舞台的服装非常华丽帅气。"
    }
};

let appliedSpecial = 0;
let appliedFragments = 0;

for (const cycleId of Object.keys(MOCK_VOCABULARY)) {
    const words = MOCK_VOCABULARY[cycleId];
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        // Match special fixes
        if (specialFixes[word.kr]) {
            const fix = specialFixes[word.kr];
            if (fix.sentenceMeaning) word.sentenceMeaning = fix.sentenceMeaning;
            if (fix.sentenceZh) word.sentenceZh = fix.sentenceZh;
            appliedSpecial++;
        }
        
        // Match fragment fixes
        if (fragmentFixes[word.kr] !== undefined) {
            // Distinguish the two "적다" words
            if (word.kr === '적다') {
                if (word.sentenceKr === '적다 이름을') {
                    word.sentenceKr = "메모지에 연락처와 이름을 적었습니다.";
                    word.sentenceMeaning = "I wrote down the contact details and name on a memo pad.";
                    word.sentenceZh = "在便签纸上写下了联系方式和名字。";
                    appliedFragments++;
                } else if (word.sentenceKr === '적다 양이') {
                    word.sentenceKr = "오늘은 손님이 평소보다 적은 편입니다.";
                    word.sentenceMeaning = "Today there are fewer customers than usual.";
                    word.sentenceZh = "今天的顾客比平时偏少。";
                    appliedFragments++;
                }
            } else if (word.kr === '저' && word.sentenceKr === '저 이도 저도') {
                word.sentenceKr = "저기 저 산 위에 하얀 구름이 걸려 있어요.";
                word.sentenceMeaning = "White clouds are hanging over that mountain over there.";
                word.sentenceZh = "那边那座山挂着白云。";
                appliedFragments++;
            } else if (fragmentFixes[word.kr].sentenceKr) {
                const fix = fragmentFixes[word.kr];
                word.sentenceKr = fix.sentenceKr;
                word.sentenceMeaning = fix.sentenceMeaning;
                word.sentenceZh = fix.sentenceZh;
                appliedFragments++;
            }
        }
    }
}

console.log(`Applied special fixes: ${appliedSpecial}`);
console.log(`Applied fragment fixes: ${appliedFragments}`);

// Stringify MOCK_VOCABULARY back
const newVocabString = JSON.stringify(MOCK_VOCABULARY, null, 4)
    .replace(/"([^"]+)":/g, '$1:'); // remove quotes around keys

const regex = /(export const MOCK_VOCABULARY(?::\s*Record<string,\s*Word\[\]>)?\s*=\s*)\{[\s\S]*?\};/;
const newContent = fileContent.replace(regex, `$1${newVocabString};`);

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log("Successfully wrote updates to vocabulary-data.ts!");

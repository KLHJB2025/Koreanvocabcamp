export interface Word {
    kr: string;
    en: string;
    zh: string;
    pos: string;
    sentenceKr?: string;
    sentenceMeaning?: string;
    sentenceZh?: string;
    sentences?: {
        kr: string;
        en: string;
        zh: string;
    }[];
    illustrationUrl?: string;
    animationData?: any;
    animationUrl?: string;
    category?: string;
}

export function normalizePos(pos: string): string {
    if (!pos) return 'default';
    const mapping: Record<string, string> = {
        '명사': 'Noun',
        'Noun': 'Noun',
        '동사': 'Verb',
        'Verb': 'Verb',
        '형용사': 'Adjective',
        'Adjective': 'Adjective',
        '부사': 'Adverb',
        'Adverb': 'Adverb',
        '대명사': 'Pronoun',
        'Pronoun': 'Pronoun',
        '의존명사': 'Noun',
        '조사': 'Particle',
        '감탄사': 'Exclamation',
        'Exclamation': 'Exclamation',
        'Interjection': 'Exclamation',
    };
    return mapping[pos] || pos;
}

export const MOCK_VOCABULARY: Record<string, Word[]> = {
    beginner_cycle_1: [
        {
            kr: "가위",
            en: "Scissors",
            zh: "剪刀",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "가위로 종이를 잘라요.",
            sentenceMeaning: "I cut paper with scissors.",
            sentenceZh: "用剪刀剪纸。",
            illustrationUrl: "/illustrations/scissors.png"
        },
        {
            kr: "간식",
            en: "Snack",
            zh: "零食",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "오후에 간식을 먹어요.",
            sentenceMeaning: "I eat snacks in the afternoon.",
            sentenceZh: "下午吃零食。",
            illustrationUrl: "/illustrations/snack.png"
        },
        {
            kr: "간장",
            en: "soy sauce",
            zh: "酱油",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "간장을 넣어요.",
            sentenceMeaning: "Add soy sauce.",
            sentenceZh: "添加酱油。"
        },
        {
            kr: "갈비",
            en: "Ribs",
            zh: "排骨",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "저녁에 갈비를 먹었어요.",
            sentenceMeaning: "I ate ribs for dinner.",
            sentenceZh: "晚上吃了排骨。"
        },
        {
            kr: "갈비탕",
            en: "Rib soup",
            zh: "排骨汤",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "따뜻한 갈비탕을 좋아해요.",
            sentenceMeaning: "I like warm rib soup.",
            sentenceZh: "喜欢热腾腾的排骨汤。"
        },
        {
            kr: "감",
            en: "Persimmon",
            zh: "柿子",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "잘 익은 감이 달아요.",
            sentenceMeaning: "The well-ripened persimmon is sweet.",
            sentenceZh: "熟透的柿子很甜。"
        },
        {
            kr: "감자",
            en: "potato",
            zh: "土豆",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "저는 감자를 좋아해요.",
            sentenceMeaning: "I like potatoes.",
            sentenceZh: "我喜欢土豆。"
        },
        {
            kr: "계란",
            en: "Egg",
            zh: "鸡蛋",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "아침에 계란을 먹어요.",
            sentenceMeaning: "I eat eggs in the morning.",
            sentenceZh: "我早餐吃鸡蛋。"
        },
        {
            kr: "고기",
            en: "Meat",
            zh: "肉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "저녁에 고기를 구워 먹어요.",
            sentenceMeaning: "We'll grill and eat meat for dinner.",
            sentenceZh: "我晚餐吃烤肉。"
        },
        {
            kr: "가방",
            en: "Bag",
            zh: "包",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "예쁜 가방을 샀어요.",
            sentenceMeaning: "I bought a pretty bag.",
            sentenceZh: "买了一个漂亮的包。",
            illustrationUrl: "/illustrations/bag.png"
        },
        {
            kr: "검사",
            en: "examination, test",
            zh: "检查",
            pos: "명사",
            category: "school_education",
            sentenceKr: "병원에서 건강 검사를 받았어요.",
            sentenceMeaning: "I got a health checkup at the hospital.",
            sentenceZh: "在医院接受了健康检查。"
        },
        {
            kr: "고등학교",
            en: "High school",
            zh: "高中",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "동생은 고등학교 1학년이에요.",
            sentenceMeaning: "My younger sibling is a high school freshman.",
            sentenceZh: "我的弟弟是一名高中一年级学生。"
        },
        {
            kr: "고등학생",
            en: "high school student",
            zh: "高中生",
            pos: "명사",
            category: "school_education",
            sentenceKr: "고등학생이 돼요.",
            sentenceMeaning: "I become a high school student.",
            sentenceZh: "我成为一名高中生。"
        },
        {
            kr: "가구",
            en: "Furniture",
            zh: "家具",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "새 집의 가구를 골라요.",
            sentenceMeaning: "I'm choosing furniture for the new house.",
            sentenceZh: "为新房子挑选家具。",
            illustrationUrl: "/illustrations/furniture.png"
        },
        {
            kr: "가요",
            en: "Song/K-pop",
            zh: "歌谣",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "최신 가요를 들어요.",
            sentenceMeaning: "I listen to the latest K-pop songs.",
            sentenceZh: "听最新的流行歌曲。",
            illustrationUrl: "/illustrations/kpop.png"
        },
        {
            kr: "감다",
            en: "to close (eyes) / to wash (hair)",
            zh: "闭(眼) / 洗(头)",
            pos: "동사",
            category: "home_living",
            sentenceKr: "눈을 감고 음악을 들어요.",
            sentenceMeaning: "I close my eyes and listen to music.",
            sentenceZh: "我闭上眼睛听音乐。",
            sentences: [
                {
                    kr: "눈을 감고 음악을 들어요.",
                    en: "I close my eyes and listen to music.",
                    zh: "我闭上眼睛听音乐。"
                },
                {
                    kr: "머리를 감고 말렸어요.",
                    en: "I washed my hair and dried it.",
                    zh: "我洗了头发并吹干了。"
                }
            ]
        },
        {
            kr: "거실",
            en: "Living room",
            zh: "客厅",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "가족들이 거실에 모여 있어요.",
            sentenceMeaning: "The family is gathered in the living room.",
            sentenceZh: "一家人聚集在客厅。"
        },
        {
            kr: "거울",
            en: "Mirror",
            zh: "镜子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "거울을 보며 화장을 해요.",
            sentenceMeaning: "I put on makeup while looking in the mirror.",
            sentenceZh: "我一边照镜子，一边化妆。"
        },
        {
            kr: "가게",
            en: "Store",
            zh: "商店",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "가게에서 우유를 사요.",
            sentenceMeaning: "I buy milk at the store.",
            sentenceZh: "在商店买牛奶。",
            illustrationUrl: "/illustrations/store.png"
        },
        {
            kr: "거리",
            en: "Distance/Street",
            zh: "距离/街道",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "집에서 거리가 꽤 멀어요.",
            sentenceMeaning: "The distance from home is quite far.",
            sentenceZh: "离家还蛮远的。",
            sentences: [
                {
                    kr: "집에서 거리가 꽤 멀어요.",
                    en: "The distance from home is quite far.",
                    zh: "离家还蛮远的。"
                },
                {
                    kr: "거리에 사람들이 가득해요.",
                    en: "The street is full of people.",
                    zh: "街道上挤满了人。"
                }
            ]
        },
        {
            kr: "건물",
            en: "Building",
            zh: "建筑物",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "이 건물은 아주 높아요.",
            sentenceMeaning: "This building is very tall.",
            sentenceZh: "这栋楼很高。"
        },
        {
            kr: "경찰서",
            en: "Police station",
            zh: "警察署",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "경찰서에 신고를 했어요.",
            sentenceMeaning: "I reported to the police station.",
            sentenceZh: "我向警察局报了案。"
        },
        {
            kr: "고속버스",
            en: "express bus",
            zh: "高速巴士",
            pos: "명사",
            category: "city_travel_places",
            sentenceKr: "고속버스를 타요.",
            sentenceMeaning: "Take the express bus.",
            sentenceZh: "乘坐高速巴士。"
        },
        {
            kr: "가수",
            en: "Singer",
            zh: "歌手",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "그는 유명한 가수예요.",
            sentenceMeaning: "He is a famous singer.",
            sentenceZh: "他是一位著名的歌手。",
            illustrationUrl: "/illustrations/singer.png"
        },
        {
            kr: "가족",
            en: "Family",
            zh: "家族",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 가족은 네 명이에요.",
            sentenceMeaning: "My family has four people.",
            sentenceZh: "我们家有四口人。",
            illustrationUrl: "/illustrations/family.png"
        },
        {
            kr: "간호사",
            en: "Nurse",
            zh: "护士",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "병원에서 간호사가 일해요.",
            sentenceMeaning: "The nurse works at the hospital.",
            sentenceZh: "护士在医院工作。",
            illustrationUrl: "/illustrations/nurse.png"
        },
        {
            kr: "경찰",
            en: "Police",
            zh: "警察",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "길을 잃어서 경찰에게 물어봤어요.",
            sentenceMeaning: "I got lost and asked the police.",
            sentenceZh: "我迷路了，所以我向警察求助。"
        },
        {
            kr: "고모",
            en: "aunt (father's side)",
            zh: "姑姑",
            pos: "명사",
            category: "people_jobs_family",
            sentenceKr: "우리 고모는 서울에 살아요.",
            sentenceMeaning: "My aunt lives in Seoul.",
            sentenceZh: "我姑姑住在首尔。"
        },
        {
            kr: "가슴",
            en: "Chest/Heart",
            zh: "胸/心",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "가슴이 두근거려요.",
            sentenceMeaning: "My heart is pounding.",
            sentenceZh: "心里扑通扑通直跳。",
            illustrationUrl: "/illustrations/heart.png"
        },
        {
            kr: "감기",
            en: "Cold (illness)",
            zh: "感冒",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "추워서 감기에 걸렸어요.",
            sentenceMeaning: "I caught a cold because it was cold.",
            sentenceZh: "因为太冷，感冒了。"
        },
        {
            kr: "감사",
            en: "Thanks",
            zh: "感谢",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "도와주셔서 감사를 드립니다.",
            sentenceMeaning: "I give thanks for your help.",
            sentenceZh: "感谢您的帮助。"
        },
        {
            kr: "걱정",
            en: "Worry",
            zh: "担心",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "시험 때문에 걱정이 많아요.",
            sentenceMeaning: "I have many worries because of the exam.",
            sentenceZh: "我对考试非常担心。"
        },
        {
            kr: "결심",
            en: "Resolution",
            zh: "决心",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "새해 결심을 했어요.",
            sentenceMeaning: "I made a New Year's resolution.",
            sentenceZh: "我制定了新年决心。"
        },
        {
            kr: "고민",
            en: "worry, trouble",
            zh: "苦恼",
            pos: "명사",
            category: "feelings_emotions",
            sentenceKr: "고민을 나눠요.",
            sentenceMeaning: "Share your concerns.",
            sentenceZh: "分享您的担忧。"
        },
        {
            kr: "강",
            en: "River",
            zh: "江",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "한강에서 자전거를 타요.",
            sentenceMeaning: "I ride a bike at the Han River.",
            sentenceZh: "在汉江骑自行车。",
            illustrationUrl: "/illustrations/river.png"
        },
        {
            kr: "강아지",
            en: "Puppy",
            zh: "小狗",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "강아지가 꼬리를 흔들어요.",
            sentenceMeaning: "The puppy is wagging its tail.",
            sentenceZh: "小狗在摇尾巴。",
            illustrationUrl: "/illustrations/puppy.png"
        },
        {
            kr: "개",
            en: "Dog/Counter",
            zh: "狗/个",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "마당에서 개가 짖어요.",
            sentenceMeaning: "The dog is barking in the yard.",
            sentenceZh: "狗在院子里叫。",
            sentences: [
                {
                    kr: "마당에서 개가 짖어요.",
                    en: "The dog is barking in the yard.",
                    zh: "狗在院子里叫。"
                },
                {
                    kr: "사과 세 개를 샀어요.",
                    en: "I bought three apples.",
                    zh: "我买了三个苹果。"
                }
            ]
        },
        {
            kr: "고개",
            en: "head / hill",
            zh: "头 / 山岭",
            pos: "명사",
            category: "nature_animals_plants",
            sentenceKr: "고개를 들어 하늘을 봐요.",
            sentenceMeaning: "Lift your head and look at the sky.",
            sentenceZh: "抬起头看天空。",
            sentences: [
                {
                    kr: "고개를 들어 하늘을 봐요.",
                    en: "Lift your head and look at the sky.",
                    zh: "抬起头看天空。"
                },
                {
                    kr: "힘들게 높은 고개를 넘어갔어요.",
                    en: "I crossed the high hill with difficulty.",
                    zh: "费力地翻越了高山岭。"
                }
            ]
        },
        {
            kr: "고양이",
            en: "Cat",
            zh: "猫",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "귀여운 고양이가 잠을 자요.",
            sentenceMeaning: "A cute cat is sleeping.",
            illustrationUrl: "/illustrations/cat.png",
            sentenceZh: "可爱的猫在睡觉。"
        },
        {
            kr: "가을",
            en: "Autumn",
            zh: "秋天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "가을에는 단풍이 예뻐요.",
            sentenceMeaning: "The maple leaves are pretty in autumn.",
            sentenceZh: "秋天的枫叶很漂亮。",
            illustrationUrl: "/illustrations/autumn.png"
        },
        {
            kr: "개월",
            en: "months (duration)",
            zh: "个月",
            pos: "의존명사",
            category: "time_seasons",
            sentenceKr: "한국어를 배운 지 삼 개월이 되었어요.",
            sentenceMeaning: "It has been three months since I started learning Korean.",
            sentenceZh: "我学韩语已经三个月了。"
        },
        {
            kr: "건너가다",
            en: "To go across",
            zh: "穿过/走过去",
            pos: "Verb",
            category: "time_seasons",
            sentenceKr: "횡단보도를 건너가요.",
            sentenceMeaning: "I walk across the crosswalk.",
            sentenceZh: "我们过人行横道吧。"
        },
        {
            kr: "걸리다",
            en: "to take (time) / to catch (a cold)",
            zh: "花费(时间) / 得(病)",
            pos: "동사",
            category: "time_seasons",
            sentenceKr: "시간이 십 분쯤 걸려요.",
            sentenceMeaning: "It takes about 10 minutes.",
            sentenceZh: "大约需要十分钟。",
            sentences: [
                {
                    kr: "시간이 십 분쯤 걸려요.",
                    en: "It takes about 10 minutes.",
                    zh: "大约需要十分钟。"
                },
                {
                    kr: "감기에 걸려서 병원에 갔어요.",
                    en: "I caught a cold and went to the hospital.",
                    zh: "我得了感冒，去了医院。"
                }
            ]
        },
        {
            kr: "걸어가다",
            en: "To walk there",
            zh: "走过去",
            pos: "Verb",
            category: "time_seasons",
            sentenceKr: "학교까지 걸어갔어요.",
            sentenceMeaning: "I walked to school.",
            sentenceZh: "我步行去学校。"
        },
        {
            kr: "겨울",
            en: "Winter",
            zh: "冬天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "겨울에는 눈이 와요.",
            sentenceMeaning: "It snows in winter.",
            sentenceZh: "冬天会下雪。"
        },
        {
            kr: "계절",
            en: "Season",
            zh: "季节",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "좋아하는 계절이 뭐예요?",
            sentenceMeaning: "What is your favorite season?",
            sentenceZh: "你最喜欢什么季节？"
        },
        {
            kr: "가다",
            en: "To go",
            zh: "去",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "매일 아침 학교에 가요.",
            sentenceMeaning: "I go to school every morning.",
            sentenceZh: "每天早上都去学校。",
            illustrationUrl: "/illustrations/go.png"
        },
        {
            kr: "가르치다",
            en: "To teach",
            zh: "教",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "선생님이 한국어를 가르쳐요.",
            sentenceMeaning: "The teacher teaches Korean.",
            sentenceZh: "老师教韩语。",
            illustrationUrl: "/illustrations/teach.png"
        },
        {
            kr: "가리키다",
            en: "To point",
            zh: "指",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "손가락으로 저기를 가리켜요.",
            sentenceMeaning: "I point there with my finger.",
            sentenceZh: "用手指着那里。",
            illustrationUrl: "/illustrations/point.png"
        },
        {
            kr: "가져가다",
            en: "To take",
            zh: "带走",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "우산을 꼭 가져가세요.",
            sentenceMeaning: "Please make sure to take an umbrella.",
            sentenceZh: "一定要带走伞。"
        },
        {
            kr: "가져오다",
            en: "To bring",
            zh: "带来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "숙제를 학교에 가져왔어요.",
            sentenceMeaning: "I brought my homework to school.",
            sentenceZh: "我把作业带到了学校。"
        },
        {
            kr: "가지다",
            en: "To have",
            zh: "拥有",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "저는 꿈을 가지고 있어요.",
            sentenceMeaning: "I have a dream.",
            sentenceZh: "我怀揣着梦想。"
        },
        {
            kr: "갈아입다",
            en: "To change clothes",
            zh: "换衣服",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "운동복으로 갈아입어요.",
            sentenceMeaning: "I change into workout clothes.",
            sentenceZh: "换上运动服。"
        },
        {
            kr: "갈아타다",
            en: "To transfer",
            zh: "换乘",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "강남역에서 2호선으로 갈아타요.",
            sentenceMeaning: "Transfer to Line 2 at Gangnam Station.",
            sentenceZh: "在江南站换乘2号线。"
        },
        {
            kr: "갖다",
            en: "To have",
            zh: "持有",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "관심을 좀 가져 주세요.",
            sentenceMeaning: "Please have some interest.",
            sentenceZh: "请给予一些关注。"
        },
        {
            kr: "갚다",
            en: "To repay",
            zh: "偿还",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "빌린 돈을 꼭 갚을게요.",
            sentenceMeaning: "I will definitely repay the borrowed money.",
            sentenceZh: "一定会偿还借来的钱。"
        },
        {
            kr: "건너다",
            en: "To cross",
            zh: "穿过",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "길을 건널 때는 조심하세요.",
            sentenceMeaning: "Please be careful when crossing the road.",
            sentenceZh: "过马路时要小心。"
        },
        {
            kr: "걷다",
            en: "To walk",
            zh: "走",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "날씨가 좋아서 좀 걷고 싶어요.",
            sentenceMeaning: "I want to walk a bit because the weather is nice.",
            sentenceZh: "天气很好，所以我想去散步。"
        },
        {
            kr: "걸다",
            en: "To hang/make a call",
            zh: "挂/打电话",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "벽에 그림을 걸었어요.",
            sentenceMeaning: "I hung a picture on the wall.",
            sentenceZh: "我在墙上挂了一幅画。"
        },
        {
            kr: "걸어오다",
            en: "To walk here",
            zh: "走过来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "집까지 걸어왔어요.",
            sentenceMeaning: "I walked home.",
            sentenceZh: "我步行回家。"
        },
        {
            kr: "계시다",
            en: "To be (Honorific)",
            zh: "在",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "선생님은 집에 계세요.",
            sentenceMeaning: "The teacher is at home.",
            sentenceZh: "老师，你在家待着吧。"
        },
        {
            kr: "고르다",
            en: "to choose, pick",
            zh: "挑选",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "마음에 드는 선물을 고르세요.",
            sentenceMeaning: "Please choose a gift that you like.",
            sentenceZh: "请挑选一个你喜欢的礼物。"
        },
        {
            kr: "가깝다",
            en: "Near",
            zh: "近",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "학교가 집에서 아주 가까워요.",
            sentenceMeaning: "The school is very near the house.",
            sentenceZh: "学校离家很近。",
            illustrationUrl: "/illustrations/near.png"
        },
        {
            kr: "가끔",
            en: "Sometimes",
            zh: "有时",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "가끔 한국 음식을 먹어요.",
            sentenceMeaning: "I sometimes eat Korean food.",
            sentenceZh: "有时吃韩国菜。"
        },
        {
            kr: "가늘다",
            en: "Thin/Slender",
            zh: "细",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "손가락이 길고 가늘어요.",
            sentenceMeaning: "The fingers are long and thin.",
            sentenceZh: "手指又长又细。",
            illustrationUrl: "/illustrations/thin.png"
        },
        {
            kr: "가득",
            en: "Full",
            zh: "满",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "가방에 책이 가득 있어요.",
            sentenceMeaning: "The bag is full of books.",
            sentenceZh: "书包里装满了书。"
        },
        {
            kr: "가볍다",
            en: "Light",
            zh: "轻",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "이 상자는 아주 가벼워요.",
            sentenceMeaning: "This box is very light.",
            sentenceZh: "这个箱子很轻。",
            illustrationUrl: "/illustrations/light_weight_illustration_1778744929222.png"
        },
        {
            kr: "가운데",
            en: "Middle",
            zh: "中间",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "방 한가운데에 식탁이 있어요.",
            sentenceMeaning: "There is a dining table in the middle of the room.",
            sentenceZh: "房间正中间有一张餐桌。",
            illustrationUrl: "/illustrations/middle.png"
        },
        {
            kr: "가장",
            en: "Most/Best",
            zh: "最",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "이게 세상에서 가장 맛있어요.",
            sentenceMeaning: "This is the most delicious thing in the world.",
            sentenceZh: "这是世界上最好吃的东西。"
        },
        {
            kr: "가지",
            en: "Kind/Sort",
            zh: "种",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "여러 가지 과일이 있어요.",
            sentenceMeaning: "There are various kinds of fruits.",
            sentenceZh: "有各种各样的水果。"
        },
        {
            kr: "각각",
            en: "Each",
            zh: "各自",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "학생들에게 각각 선물을 줬어요.",
            sentenceMeaning: "I gave a gift to each student.",
            sentenceZh: "分别给学生们送了礼物。"
        },
        {
            kr: "간단하다",
            en: "Simple",
            zh: "简单",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "문제가 아주 간단해요.",
            sentenceMeaning: "The problem is very simple.",
            sentenceZh: "问题非常简单。"
        },
        {
            kr: "간단히",
            en: "simply, briefly",
            zh: "简单地",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "간단히 설명해 주세요.",
            sentenceMeaning: "Please explain it simply.",
            sentenceZh: "请简单解释一下。"
        },
        {
            kr: "갑자기",
            en: "Suddenly",
            zh: "突然",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "비가 갑자기 내리기 시작했어요.",
            sentenceMeaning: "It suddenly started to rain.",
            sentenceZh: "突然开始下雨了。"
        },
        {
            kr: "강하다",
            en: "Strong",
            zh: "强",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "그는 의지가 아주 강해요.",
            sentenceMeaning: "He has a very strong will.",
            sentenceZh: "他的意志力非常坚强。"
        },
        {
            kr: "같다",
            en: "Same",
            zh: "相同",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "우리는 생각이 서로 같아요.",
            sentenceMeaning: "We have the same thoughts.",
            sentenceZh: "我们的想法是一样的。"
        },
        {
            kr: "같이",
            en: "Together",
            zh: "一起",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "우리 같이 점심 먹어요.",
            sentenceMeaning: "我们一起吃午饭吧。",
            sentenceZh: "我们一起吃午饭吧。"
        },
        {
            kr: "거의",
            en: "Almost",
            zh: "几乎",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "숙제를 거의 다 했어요.",
            sentenceMeaning: "I have almost finished my homework.",
            sentenceZh: "我的作业快做完了。"
        },
        {
            kr: "게으르다",
            en: "Lazy",
            zh: "懒惰",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "그는 조금 게으른 편이에요.",
            sentenceMeaning: "He is on the lazy side.",
            sentenceZh: "他有点懒。"
        },
        {
            kr: "계속",
            en: "Continuous",
            zh: "继续",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "공부를 계속 하고 있어요.",
            sentenceMeaning: "I am continuing to study.",
            sentenceZh: "我正在继续我的学业。"
        },
        {
            kr: "고맙다",
            en: "Thankful",
            zh: "谢谢",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "도와주셔서 정말 고마워요.",
            sentenceMeaning: "Thank you very much for your help.",
            sentenceZh: "非常感谢您的帮助。"
        },
        {
            kr: "가격",
            en: "Price",
            zh: "价格",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "이 물건은 가격이 비싸요.",
            sentenceMeaning: "This item's price is expensive.",
            sentenceZh: "这个物品的价格很贵。",
            illustrationUrl: "/illustrations/price.png"
        },
        {
            kr: "갈색",
            en: "Brown",
            zh: "褐色",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "머리색이 갈색이에요.",
            sentenceMeaning: "The hair color is brown.",
            sentenceZh: "头发颜色是褐色的。"
        },
        {
            kr: "감기약",
            en: "cold medicine",
            zh: "感冒药",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "감기약을 먹어요.",
            sentenceMeaning: "Take cold medicine.",
            sentenceZh: "吃感冒药。"
        },
        {
            kr: "값",
            en: "Value/Price",
            zh: "价格",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "물건 값이 너무 올랐어요.",
            sentenceMeaning: "The price of goods has risen too much.",
            sentenceZh: "物价上涨了很多。"
        },
        {
            kr: "거",
            en: "Thing/Item",
            zh: "东西",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "이게 내 거니까 건드리지 마.",
            sentenceMeaning: "This is mine, so don't touch it.",
            sentenceZh: "这是我的，所以不要碰它。"
        },
        {
            kr: "거기",
            en: "There",
            zh: "那里",
            pos: "Pronoun",
            category: "miscellaneous",
            sentenceKr: "거기 누구 있어요?",
            sentenceMeaning: "Is anyone there?",
            sentenceZh: "那里有人吗？"
        },
        {
            kr: "거절",
            en: "Refusal",
            zh: "拒绝",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "그는 부탁을 정중히 거절했어요.",
            sentenceMeaning: "He politely refused the request.",
            sentenceZh: "他礼貌地拒绝了这个请求。"
        },
        {
            kr: "거짓말",
            en: "Lie",
            zh: "谎言",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "거짓말을 하면 안 돼요.",
            sentenceMeaning: "You shouldn't tell lies.",
            sentenceZh: "你不能说谎。"
        },
        {
            kr: "건강",
            en: "Health",
            zh: "健康",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "운동은 건강에 아주 좋아요.",
            sentenceMeaning: "Exercise is very good for health.",
            sentenceZh: "锻炼对您的健康非常有益。"
        },
        {
            kr: "건너편",
            en: "Opposite side",
            zh: "对面",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "학교 건너편에 서점이 있어요.",
            sentenceMeaning: "There is a bookstore on the opposite side of the school.",
            sentenceZh: "学校对面有一家书店。"
        },
        {
            kr: "걸음",
            en: "Step",
            zh: "步",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "한 걸음씩 천천히 가세요.",
            sentenceMeaning: "Please go slowly one step at a time.",
            sentenceZh: "慢慢来，一次一步。"
        },
        {
            kr: "검은색",
            en: "black color",
            zh: "黑色",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "검은색 셔츠를 샀어요.",
            sentenceMeaning: "I bought a black shirt.",
            sentenceZh: "我买了一件黑色的衬衫。"
        },
        {
            kr: "검정",
            en: "black",
            zh: "黑色",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "저는 검정색을 좋아해요.",
            sentenceMeaning: "I like black color.",
            sentenceZh: "我喜欢黑色。"
        },
        {
            kr: "것",
            en: "Thing",
            zh: "东西",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "좋은 것이 많이 있어요.",
            sentenceMeaning: "There are many good things.",
            sentenceZh: "有很多好的。"
        },
        {
            kr: "겉",
            en: "surface, outside",
            zh: "表面",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "이 빵은 겉이 아주 딱딱해요.",
            sentenceMeaning: "This bread is very hard on the outside.",
            sentenceZh: "这个面包外面很硬。"
        },
        {
            kr: "게임",
            en: "game",
            zh: "游戏",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "저는 컴퓨터 게임을 해요.",
            sentenceMeaning: "I play computer games.",
            sentenceZh: "我玩电脑游戏。"
        },
        {
            kr: "결과",
            en: "Result",
            zh: "结果",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "시험 결과가 나왔어요.",
            sentenceMeaning: "The exam results came out.",
            sentenceZh: "测试结果出来了。"
        },
        {
            kr: "결석",
            en: "absence",
            zh: "缺席",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "결석을 해요.",
            sentenceMeaning: "I'm skipping school.",
            sentenceZh: "我要逃学了"
        },
        {
            kr: "결정",
            en: "Decision",
            zh: "决定",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "아직 결정을 못 했어요.",
            sentenceMeaning: "I haven't made a decision yet.",
            sentenceZh: "我还没决定。"
        },
        {
            kr: "결혼",
            en: "Marriage",
            zh: "结婚",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "두 사람은 결혼을 약속했어요.",
            sentenceMeaning: "The two promised to marry.",
            sentenceZh: "两人答应结婚。"
        },
        {
            kr: "결혼식",
            en: "Wedding",
            zh: "婚礼",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "내일 친구 결혼식에 가요.",
            sentenceMeaning: "I am going to a friend's wedding tomorrow.",
            sentenceZh: "明天我要去参加我朋友的婚礼。"
        },
        {
            kr: "경기",
            en: "Game/Economy",
            zh: "竞技/经济",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "축구 경기를 구경해요.",
            sentenceMeaning: "I watch a soccer game.",
            sentenceZh: "我看一场足球比赛。"
        },
        {
            kr: "경치",
            en: "Scenery",
            zh: "景色",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "여기는 경치가 정말 좋아요.",
            sentenceMeaning: "The scenery here is really good.",
            sentenceZh: "这里的风景真的很好。"
        },
        {
            kr: "경험",
            en: "Experience",
            zh: "经验",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "다양한 경험을 하고 싶어요.",
            sentenceMeaning: "I want to have various experiences.",
            sentenceZh: "我想要有各种各样的经历。"
        },
        {
            kr: "계단",
            en: "Stairs",
            zh: "楼梯",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "계단을 조심히 올라가세요.",
            sentenceMeaning: "Please go up the stairs carefully.",
            sentenceZh: "小心地爬楼梯。"
        },
        {
            kr: "계산",
            en: "Calculation",
            zh: "计算",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "식사 후에 계산을 했어요.",
            sentenceMeaning: "I paid after the meal.",
            sentenceZh: "吃完饭我就结账了。"
        },
        {
            kr: "계획",
            en: "Plan",
            zh: "计划",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "방학 계획을 세웠어요.",
            sentenceMeaning: "I made vacation plans.",
            sentenceZh: "我制定了假期计划。"
        },
        {
            kr: "고장",
            en: "breakdown",
            zh: "故障",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "고장이 나요.",
            sentenceMeaning: "It breaks down.",
            sentenceZh: "它崩溃了。"
        }
    ],
    beginner_cycle_2: [
        {
            kr: "고추장",
            en: "gochujang (red pepper paste)",
            zh: "辣椒酱",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "고추장을 넣어요.",
            sentenceMeaning: "Add red pepper paste.",
            sentenceZh: "加入红辣椒酱。"
        },
        {
            kr: "과일",
            en: "Fruit",
            zh: "水果",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "식후에 과일을 먹어요.",
            sentenceMeaning: "Eat fruit after a meal.",
            sentenceZh: "饭后吃水果。"
        },
        {
            kr: "과자",
            en: "Snack",
            zh: "点心",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "아이들이 과자를 좋아해요.",
            sentenceMeaning: "Children like snacks.",
            sentenceZh: "孩子们喜欢甜食。"
        },
        {
            kr: "괴로워하다",
            en: "to suffer, be tormented",
            zh: "感到痛苦",
            pos: "동사",
            category: "food_dining",
            sentenceKr: "환자가 통증으로 괴로워하고 있어요.",
            sentenceMeaning: "The patient is suffering from pain.",
            sentenceZh: "病人正因疼痛而痛苦。"
        },
        {
            kr: "국",
            en: "Soup",
            zh: "汤",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "밥과 국을 같이 먹어요.",
            sentenceMeaning: "Eat rice and soup together.",
            sentenceZh: "饭和汤一起吃。"
        },
        {
            kr: "국수",
            en: "Noodles",
            zh: "面条",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "점심으로 국수를 먹었어요.",
            sentenceMeaning: "I ate noodles for lunch.",
            sentenceZh: "我午餐吃了面条。"
        },
        {
            kr: "공부",
            en: "Study",
            zh: "学习",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "한국어 공부가 재미있어요.",
            sentenceMeaning: "Studying Korean is fun.",
            sentenceZh: "学习韩语很有趣。"
        },
        {
            kr: "공책",
            en: "notebook",
            zh: "笔记本",
            pos: "명사",
            category: "school_education",
            sentenceKr: "공책에 써요.",
            sentenceMeaning: "I use it in my notebook.",
            sentenceZh: "我在笔记本上使用它。"
        },
        {
            kr: "교과서",
            en: "textbook",
            zh: "教科书",
            pos: "명사",
            category: "school_education",
            sentenceKr: "교과서 에서 배워요.",
            sentenceMeaning: "Learn from textbooks.",
            sentenceZh: "从教科书中学习。"
        },
        {
            kr: "교사",
            en: "teacher",
            zh: "教师",
            pos: "명사",
            category: "school_education",
            sentenceKr: "제 꿈은 학교 교사가 되는 것이에요.",
            sentenceMeaning: "My dream is to become a school teacher.",
            sentenceZh: "我的梦想是成为一名 school teacher。"
        },
        {
            kr: "교실",
            en: "Classroom",
            zh: "教室",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "교실에 학생들이 모였어요.",
            sentenceMeaning: "Students gathered in the classroom.",
            sentenceZh: "学生们聚集在教室里。"
        },
        {
            kr: "교육",
            en: "education",
            zh: "教育",
            pos: "명사",
            category: "school_education",
            sentenceKr: "교육을 받아요.",
            sentenceMeaning: "Get an education.",
            sentenceZh: "接受教育。"
        },
        {
            kr: "권",
            en: "Volume (book counter)",
            zh: "卷/本",
            pos: "Counter",
            category: "school_education",
            sentenceKr: "책 세 권을 읽었어요.",
            sentenceMeaning: "I read three books.",
            sentenceZh: "我读了三本书。"
        },
        {
            kr: "기말시험",
            en: "Final exam",
            zh: "期末考试",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "기말시험을 봐요.",
            sentenceMeaning: "Take the final exam.",
            sentenceZh: "参加期末考试。"
        },
        {
            kr: "곳",
            en: "Place",
            zh: "地方",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "이곳은 조용한 곳이에요.",
            sentenceMeaning: "This is a quiet place.",
            sentenceZh: "这是一个安静的地方。"
        },
        {
            kr: "공원",
            en: "Park",
            zh: "公园",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "공원에서 산책을 해요.",
            sentenceMeaning: "I take a walk in the park.",
            sentenceZh: "我在公园散步。"
        },
        {
            kr: "공항",
            en: "Airport",
            zh: "机场",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "비행기를 타러 공항에 가요.",
            sentenceMeaning: "I go to the airport to take a flight.",
            sentenceZh: "我要去机场赶飞机。"
        },
        {
            kr: "관광객",
            en: "tourist",
            zh: "游客",
            pos: "명사",
            category: "city_travel_places",
            sentenceKr: "이곳에는 많은 관광객이 있어요.",
            sentenceMeaning: "There are many tourists here.",
            sentenceZh: "这里有很多游客。"
        },
        {
            kr: "관광지",
            en: "tourist attraction",
            zh: "旅游胜地",
            pos: "명사",
            category: "city_travel_places",
            sentenceKr: "이곳은 아주 유명한 관광지예요.",
            sentenceMeaning: "This place is a very famous tourist attraction.",
            sentenceZh: "这里是非常著名的旅游景点。"
        },
        {
            kr: "광주",
            en: "Gwangju (city)",
            zh: "光州",
            pos: "명사",
            category: "city_travel_places",
            sentenceKr: "저는 광주에 살고 있어요.",
            sentenceMeaning: "I live in Gwangju.",
            sentenceZh: "我住在光州。"
        },
        {
            kr: "그곳",
            en: "That place",
            zh: "那个地方",
            pos: "Pronoun",
            category: "city_travel_places",
            sentenceKr: "그곳에 다시 가고 싶어요.",
            sentenceMeaning: "I want to go to that place again.",
            sentenceZh: "我想再去那里。"
        },
        {
            kr: "극장",
            en: "Theater",
            zh: "剧场",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "극장에서 영화를 봐요.",
            sentenceMeaning: "I watch a movie at the theater.",
            sentenceZh: "在剧院看电影。"
        },
        {
            kr: "군인",
            en: "Soldier",
            zh: "军人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "군인이 나라를 지켜요.",
            sentenceMeaning: "Soldiers protect the country.",
            sentenceZh: "军人保卫国家。"
        },
        {
            kr: "그분",
            en: "That person (formal)",
            zh: "那位",
            pos: "Pronoun",
            category: "people_jobs_family",
            sentenceKr: "그분은 우리 선생님이세요.",
            sentenceMeaning: "That person is our teacher.",
            illustrationUrl: "/illustrations/person.png",
            sentenceZh: "他是我们的老师。"
        },
        {
            kr: "관심",
            en: "Interest",
            zh: "关心",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "한국 문화에 관심이 많아요.",
            sentenceMeaning: "I have a lot of interest in Korean culture.",
            sentenceZh: "我对韩国文化很感兴趣。"
        },
        {
            kr: "귀여워하다",
            en: "to adore, dote on",
            zh: "疼爱",
            pos: "동사",
            category: "feelings_emotions",
            sentenceKr: "아이들이 귀여운 강아지를 귀여워해요.",
            sentenceMeaning: "Children adore the cute puppy.",
            sentenceZh: "孩子们很疼爱可爱的狗狗。"
        },
        {
            kr: "귀엽다",
            en: "Cute",
            zh: "可爱",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "아기가 정말 귀엽네요.",
            sentenceMeaning: "The baby is really cute.",
            sentenceZh: "宝宝真的很可爱。"
        },
        {
            kr: "기분",
            en: "Mood/Feeling",
            zh: "心情",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "오늘 기분이 좋아요.",
            sentenceMeaning: "I feel good today.",
            sentenceZh: "我今天感觉很好。"
        },
        {
            kr: "기뻐하다",
            en: "To be happy",
            zh: "高兴",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "졸업을 기뻐해요.",
            sentenceMeaning: "Be happy about graduation.",
            sentenceZh: "我很高兴你毕业了。"
        },
        {
            kr: "기쁘다",
            en: "To be happy/glad",
            zh: "开心",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "마음이 정말 기뻐요.",
            sentenceMeaning: "I am truly happy.",
            sentenceZh: "我的心里真是高兴极了。"
        },
        {
            kr: "곧",
            en: "Soon",
            zh: "马上",
            pos: "Adverb",
            category: "nature_animals_plants",
            sentenceKr: "곧 도착할 예정입니다.",
            sentenceMeaning: "I am scheduled to arrive soon.",
            sentenceZh: "很快就会到达。"
        },
        {
            kr: "구름",
            en: "Cloud",
            zh: "云",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "하늘에 구름이 많아요.",
            sentenceMeaning: "There are many clouds in the sky.",
            sentenceZh: "天空中有很多云。"
        },
        {
            kr: "금방",
            en: "Soon/Just now",
            zh: "马上",
            pos: "Adverb",
            category: "nature_animals_plants",
            sentenceKr: "금방 돌아올게요.",
            sentenceMeaning: "I'll be back soon.",
            sentenceZh: "我很快就会回来。"
        },
        {
            kr: "공휴일",
            en: "public holiday",
            zh: "公休日",
            pos: "명사",
            category: "time_seasons",
            sentenceKr: "공휴일로 정해요.",
            sentenceMeaning: "Make it a public holiday.",
            sentenceZh: "将其定为公共假期。"
        },
        {
            kr: "과거",
            en: "Past",
            zh: "过去",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "과거를 잊고 미래를 봐요.",
            sentenceMeaning: "Forget the past and look at the future.",
            sentenceZh: "忘记过去，展望未来。"
        },
        {
            kr: "구월",
            en: "September",
            zh: "九月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "구월은 가을의 시작이에요.",
            sentenceMeaning: "September is the start of autumn.",
            sentenceZh: "九月是秋天的开始。"
        },
        {
            kr: "그날",
            en: "That day",
            zh: "那天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "그날 우리는 정말 즐거웠어요.",
            sentenceMeaning: "We were really happy that day.",
            sentenceZh: "那天我们玩得很开心。"
        },
        {
            kr: "그동안",
            en: "During that time",
            zh: "这段时间",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "그동안 잘 지냈어요?",
            sentenceMeaning: "Have you been doing well during that time?",
            sentenceZh: "你最近怎么样？"
        },
        {
            kr: "그때",
            en: "That time",
            zh: "那时候",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "그때가 기억나네요.",
            sentenceMeaning: "I remember that time.",
            sentenceZh: "我记得那一次。"
        },
        {
            kr: "그저께",
            en: "Day before yesterday",
            zh: "前天",
            pos: "Adverb/Noun",
            category: "time_seasons",
            sentenceKr: "그저께 밤에 도착했어요.",
            sentenceMeaning: "I arrived the night before yesterday.",
            sentenceZh: "我是前天晚上到达的。"
        },
        {
            kr: "금요일",
            en: "Friday",
            zh: "星期五",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "금요일에 만나요.",
            sentenceMeaning: "Let's meet on Friday.",
            sentenceZh: "星期五见。"
        },
        {
            kr: "고치다",
            en: "To repair",
            zh: "修理",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "고장 난 시계를 고쳤어요.",
            sentenceMeaning: "I fixed the broken watch.",
            sentenceZh: "我修好了一个坏了的钟。"
        },
        {
            kr: "굽다",
            en: "To roast/bake",
            zh: "烤",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "오븐에 빵을 구워요.",
            sentenceMeaning: "I bake bread in the oven.",
            sentenceZh: "在烤箱里烤面包。"
        },
        {
            kr: "그리다",
            en: "To draw",
            zh: "画",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "도화지에 그림을 그려요.",
            sentenceMeaning: "I draw a picture on the paper.",
            sentenceZh: "在画纸上画一幅画。"
        },
        {
            kr: "그만두다",
            en: "To quit",
            zh: "辞去/放弃",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "회사를 그만두기로 했어요.",
            sentenceMeaning: "I decided to quit the company.",
            sentenceZh: "我决定辞去工作。"
        },
        {
            kr: "그치다",
            en: "To stop",
            zh: "停止",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "비가 곧 그칠 거예요.",
            sentenceMeaning: "The rain will stop soon.",
            sentenceZh: "雨很快就会停。"
        },
        {
            kr: "기다리다",
            en: "To wait",
            zh: "等",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "친구를 기다려요.",
            sentenceMeaning: "I wait for my friend.",
            sentenceZh: "等你的朋友。"
        },
        {
            kr: "기르다",
            en: "To raise/grow",
            zh: "养",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "강아지를 길러요.",
            sentenceMeaning: "I raise a puppy.",
            sentenceZh: "我养了一只小狗。"
        },
        {
            kr: "고프다",
            en: "to be hungry",
            zh: "饿",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "열심히 일했더니 배가 고픕니다.",
            sentenceMeaning: "After working hard, I am hungry.",
            sentenceZh: "努力工作后肚子饿了。"
        },
        {
            kr: "괜찮다",
            en: "Okay",
            zh: "没关系",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "저는 정말 괜찮아요.",
            sentenceMeaning: "I am really okay.",
            sentenceZh: "我真的很好。"
        },
        {
            kr: "굵다",
            en: "thick",
            zh: "粗",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "그 피아니스트는 손가락이 굵은 편입니다.",
            sentenceMeaning: "The pianist has rather thick fingers.",
            sentenceZh: "那个钢琴家的手指偏粗。"
        },
        {
            kr: "궁금하다",
            en: "to be curious",
            zh: "好奇",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "오랫동안 만나지 못한 친구의 소식이 궁금합니다.",
            sentenceMeaning: "I am curious about the news of the friend I haven't met for a long time.",
            sentenceZh: "我很想知道好久没见的朋友的消息。"
        },
        {
            kr: "귀찮다",
            en: "to be annoying, bothersome",
            zh: "麻烦",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "요즘은 만사가 다 귀찮게 느껴집니다.",
            sentenceMeaning: "Lately, everything feels like a hassle.",
            sentenceZh: "最近觉得什么事都很麻烦。"
        },
        {
            kr: "그냥",
            en: "Just",
            zh: "就这样",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "그냥 여기 있을게요.",
            sentenceMeaning: "I'll just stay here.",
            sentenceZh: "我就待在这里。"
        },
        {
            kr: "그대로",
            en: "As it is",
            zh: "照原样",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "있는 그대로 보여 주세요.",
            sentenceMeaning: "Please show it as it is.",
            sentenceZh: "按原样显示。"
        },
        {
            kr: "그래",
            en: "Yes/So",
            zh: "是/就这样",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "그래, 내가 할게.",
            sentenceMeaning: "Okay, I'll do it.",
            sentenceZh: "好的，我会做的。"
        },
        {
            kr: "그래서",
            en: "So",
            zh: "所以",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "늦었어요, 그래서 뛰었어요.",
            sentenceMeaning: "I was late, so I ran.",
            sentenceZh: "天色已晚，我就跑了。"
        },
        {
            kr: "그러나",
            en: "but, however",
            zh: "但是",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "비가 왔어요. 그러나 저는 밖에 나갔어요.",
            sentenceMeaning: "It rained. But I went outside.",
            sentenceZh: "下雨了。但我还是出门了。"
        },
        {
            kr: "그러니까",
            en: "Therefore",
            zh: "所以",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "공부해, 그러니까 좋은 점수를 받지.",
            sentenceMeaning: "Study, that's why you get good grades.",
            sentenceZh: "学习，让你取得好成绩。"
        },
        {
            kr: "그러면",
            en: "If so/Then",
            zh: "那么",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "안 되면 그러면 어떡하지?",
            sentenceMeaning: "If it doesn't work, then what should we do?",
            sentenceZh: "如果不成功怎么办？"
        },
        {
            kr: "그러므로",
            en: "Therefore",
            zh: "因此",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "그는 아프다, 그러므로 쉬어요.",
            sentenceMeaning: "He is sick, so rest.",
            sentenceZh: "他病了，所以休息吧。"
        },
        {
            kr: "그런데",
            en: "But/By the way",
            zh: "但是",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "공부했어요. 그런데 성적이 낮아요.",
            sentenceMeaning: "I studied. But the grades are low.",
            sentenceZh: "我学。但我的成绩很低。"
        },
        {
            kr: "그럼",
            en: "then, in that case",
            zh: "那么",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "그럼 저는 먼저 갈게요.",
            sentenceMeaning: "Then I will go first.",
            sentenceZh: "那么我先走了。"
        },
        {
            kr: "그렇다",
            en: "To be so",
            zh: "是那样",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "정말 그렇습니까?",
            sentenceMeaning: "Is that really so?",
            sentenceZh: "这是真的吗？"
        },
        {
            kr: "그렇지만",
            en: "But/However",
            zh: "但是",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "피곤해요. 그렇지만 일을 해요.",
            sentenceMeaning: "I'm tired. However, I'm working.",
            sentenceZh: "我累了。 그렇지만 일을 해요。"
        },
        {
            kr: "그리고",
            en: "And",
            zh: "和/然后",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "빵 그리고 우유를 샀어요.",
            sentenceMeaning: "I bought bread and milk.",
            sentenceZh: "我买了面包和牛奶。"
        },
        {
            kr: "그립다",
            en: "To miss",
            zh: "想念",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "가족이 너무 그리워요.",
            sentenceMeaning: "I miss my family so much.",
            sentenceZh: "我非常想念我的家人。"
        },
        {
            kr: "그만",
            en: "Stop/That's enough",
            zh: "停止",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "이제 그만 하세요.",
            sentenceMeaning: "Please stop now.",
            sentenceZh: "现在停止吧。"
        },
        {
            kr: "급하다",
            en: "To be urgent",
            zh: "急",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "사정이 급해요.",
            sentenceMeaning: "The circumstances are urgent.",
            sentenceZh: "情况紧急。"
        },
        {
            kr: "고향",
            en: "Hometown",
            zh: "故乡",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "고향에 계신 부모님이 보고 싶어요.",
            sentenceMeaning: "I miss my parents in my hometown.",
            sentenceZh: "我想念家乡的父母。"
        },
        {
            kr: "공",
            en: "ball",
            zh: "球",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "공을 굴려요.",
            sentenceMeaning: "Get the ball rolling.",
            sentenceZh: "让球滚动起来。"
        },
        {
            kr: "공무원",
            en: "Public official",
            zh: "公务员",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "형은 시청 공무원이에요.",
            sentenceMeaning: "My older brother is a city hall official.",
            sentenceZh: "我哥哥是市政厅官员。"
        },
        {
            kr: "공장",
            en: "Factory",
            zh: "工厂",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "공장에서 물건을 만들어요.",
            sentenceMeaning: "They make things in the factory.",
            sentenceZh: "东西是在工厂制造的。"
        },
        {
            kr: "공짜",
            en: "free of charge",
            zh: "免费",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "공짜로 줘요.",
            sentenceMeaning: "Give it to me for free.",
            sentenceZh: "免费给我。"
        },
        {
            kr: "관계",
            en: "relationship",
            zh: "关系",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "관계를 맺어요.",
            sentenceMeaning: "Build relationships.",
            sentenceZh: "建立关系。"
        },
        {
            kr: "관광",
            en: "sightseeing",
            zh: "观光",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "친구와 함께 국내 관광을 다녀왔어요.",
            sentenceMeaning: "I went on a domestic tour with a friend.",
            sentenceZh: "和朋友一起去国内旅游了。"
        },
        {
            kr: "광고",
            en: "Advertisement",
            zh: "广告",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "TV 광고가 재미있어요.",
            sentenceMeaning: "The TV ad is funny.",
            sentenceZh: "电视广告很有趣。"
        },
        {
            kr: "교수",
            en: "Professor",
            zh: "教授",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "교수님이 강의를 하세요.",
            sentenceMeaning: "The professor is lecturing.",
            sentenceZh: "教授发表演讲。"
        },
        {
            kr: "교통",
            en: "Traffic",
            zh: "交通",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "교통이 매우 복잡해요.",
            sentenceMeaning: "The traffic is very complicated.",
            sentenceZh: "交通运输非常复杂。"
        },
        {
            kr: "교통비",
            en: "transportation fee",
            zh: "交通费",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "교통비가 들어요.",
            sentenceMeaning: "There are transportation costs.",
            sentenceZh: "有运输费用。"
        },
        {
            kr: "교통사고",
            en: "Traffic accident",
            zh: "交通事故",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "사거리에 교통사고가 났어요.",
            sentenceMeaning: "There was a traffic accident at the intersection.",
            sentenceZh: "十字路口发生了一起车祸。"
        },
        {
            kr: "교환",
            en: "exchange",
            zh: "交换",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "교환을 해요.",
            sentenceMeaning: "Let's exchange.",
            sentenceZh: "我们交换一下吧"
        },
        {
            kr: "교회",
            en: "Church",
            zh: "教会",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "일요일에 교회에 가요.",
            sentenceMeaning: "I go to church on Sunday.",
            sentenceZh: "我周日去教堂。"
        },
        {
            kr: "구",
            en: "nine / district",
            zh: "九 / 区",
            pos: "수사/관형사",
            category: "miscellaneous",
            sentenceKr: "저는이 구에 살고 있어요.",
            sentenceMeaning: "I live in this district.",
            sentenceZh: "我住在这个区。"
        },
        {
            kr: "구경",
            en: "Sightseeing",
            zh: "观光",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "동대문 시장 구경을 갔어요.",
            sentenceMeaning: "I went sightseeing at Dongdaemun Market.",
            sentenceZh: "我去了东大门市场。"
        },
        {
            kr: "구두",
            en: "Shoes",
            zh: "皮鞋",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "새 구두를 신었어요.",
            sentenceMeaning: "I put on new shoes.",
            sentenceZh: "我穿了新鞋。"
        },
        {
            kr: "구십",
            en: "90",
            zh: "九十",
            pos: "Number",
            category: "miscellaneous",
            sentenceKr: "할머니는 구십 세이십니다.",
            sentenceMeaning: "My grandmother is 90 years old.",
            sentenceZh: "我的祖母九十岁了。"
        },
        {
            kr: "국내",
            en: "Domestic",
            zh: "国内",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "국내 여행을 떠나요.",
            sentenceMeaning: "I am going on a domestic trip.",
            sentenceZh: "我们去国内旅行吧。"
        },
        {
            kr: "국적",
            en: "nationality",
            zh: "国籍",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "당신의 국적은 어디입니까?",
            sentenceMeaning: "What is your nationality?",
            sentenceZh: "您的国籍是哪里？"
        },
        {
            kr: "국제",
            en: "International",
            zh: "国际",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "국제 공항에 사람이 많아요.",
            sentenceMeaning: "There are many people at the international airport.",
            sentenceZh: "国际机场里人很多。"
        },
        {
            kr: "굳다",
            en: "to harden",
            zh: "坚硬",
            pos: "동사/형용사",
            category: "miscellaneous",
            sentenceKr: "비가 온 뒤에 땅이 단단하게 굳습니다.",
            sentenceMeaning: "The ground hardens firmly after rain.",
            sentenceZh: "雨后地面会变得坚硬。"
        },
        {
            kr: "귀",
            en: "Ear",
            zh: "耳",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "토끼 귀는 아주 길어요.",
            sentenceMeaning: "Rabbit ears are very long.",
            sentenceZh: "兔子的耳朵很长。"
        },
        {
            kr: "귀걸이",
            en: "earrings",
            zh: "耳环",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "귀걸이를 달아요.",
            sentenceMeaning: "Put on earrings.",
            sentenceZh: "戴上耳环。"
        },
        {
            kr: "규칙",
            en: "Rule",
            zh: "规则",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "교통 규칙을 지켜야 해요.",
            sentenceMeaning: "You must follow traffic rules.",
            sentenceZh: "您必须遵守交通规则。"
        },
        {
            kr: "귤",
            en: "Tangerine",
            zh: "橘子",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "겨울에 귤을 많이 먹어요.",
            sentenceMeaning: "I eat many tangerines in winter.",
            sentenceZh: "冬天我吃了很多橘子。"
        },
        {
            kr: "그",
            en: "He/That",
            zh: "他/那个",
            pos: "Pronoun",
            category: "miscellaneous",
            sentenceKr: "그 사람은 내 친구예요.",
            sentenceMeaning: "That person is my friend.",
            sentenceZh: "那个人是我的朋友。"
        },
        {
            kr: "그거",
            en: "that thing",
            zh: "那个",
            pos: "대명사",
            category: "miscellaneous",
            sentenceKr: "그건 뭐예요?",
            sentenceMeaning: "What is that?",
            sentenceZh: "那是什么？"
        },
        {
            kr: "그것",
            en: "That thing",
            zh: "那个",
            pos: "Pronoun",
            category: "miscellaneous",
            sentenceKr: "그것은 아주 중요해요.",
            sentenceMeaning: "That is very important.",
            sentenceZh: "这非常重要。"
        },
        {
            kr: "그런",
            en: "Such/That kind of",
            zh: "那种",
            pos: "Determiner",
            category: "miscellaneous",
            sentenceKr: "그런 말은 하지 마세요.",
            sentenceMeaning: "Please don't say such things.",
            sentenceZh: "别这么说。"
        },
        {
            kr: "그릇",
            en: "Bowl/Dish",
            zh: "碗",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "그릇에 음식을 담아요.",
            sentenceMeaning: "Put food in the bowl.",
            sentenceZh: "将食物放入碗中。"
        },
        {
            kr: "그림",
            en: "picture, painting",
            zh: "画",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "그림을 그려요.",
            sentenceMeaning: "Draw a picture.",
            sentenceZh: "画一幅画。"
        },
        {
            kr: "그쪽",
            en: "That side/way",
            zh: "那边",
            pos: "Pronoun",
            category: "miscellaneous",
            sentenceKr: "그쪽으로 가세요.",
            sentenceMeaning: "Please go that way.",
            sentenceZh: "去那里吧。"
        },
        {
            kr: "근처",
            en: "Vicinity/Near",
            zh: "附近",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "집 근처에 공원이 있어요.",
            sentenceMeaning: "There is a park near my house.",
            sentenceZh: "我家附近有一个公园。"
        },
        {
            kr: "글",
            en: "Writing/Text",
            zh: "文章",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "글을 써요.",
            sentenceMeaning: "I write.",
            sentenceZh: "我写的。"
        },
        {
            kr: "글쎄",
            en: "Well...",
            zh: "这个嘛",
            pos: "Interjection",
            category: "miscellaneous",
            sentenceKr: "글쎄, 잘 모르겠어요.",
            sentenceMeaning: "Well, I don't really know.",
            sentenceZh: "嗯，我不确定。"
        },
        {
            kr: "글쎄요",
            en: "Well... (Polite)",
            zh: "这个嘛",
            pos: "Interjection",
            category: "miscellaneous",
            sentenceKr: "글쎄요, 잘 모르겠네요.",
            sentenceMeaning: "Well, I'm not sure.",
            sentenceZh: "嗯，我不确定。"
        },
        {
            kr: "글씨",
            en: "handwriting",
            zh: "字迹",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "글씨를 써요.",
            sentenceMeaning: "Write some letters.",
            sentenceZh: "写一些信。"
        },
        {
            kr: "글자",
            en: "letter, character",
            zh: "文字",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "글자를 써요.",
            sentenceMeaning: "Write letters.",
            sentenceZh: "写信。"
        },
        {
            kr: "금지",
            en: "Prohibition",
            zh: "禁止",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "이곳은 주차 금지예요.",
            sentenceMeaning: "Parking is prohibited here.",
            sentenceZh: "这里禁止停车。"
        },
        {
            kr: "기간",
            en: "Period/Duration",
            zh: "期间",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "기간이 지났어요.",
            sentenceMeaning: "The period has passed.",
            sentenceZh: "时期已经过去了。"
        },
        {
            kr: "기름",
            en: "Oil",
            zh: "油",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "기름에 튀겨요.",
            sentenceMeaning: "Fry in oil.",
            sentenceZh: "将其放入油中煎炸。"
        }
    ],
    beginner_cycle_3: [
        {
            kr: "껌",
            en: "Gum",
            zh: "口香糖",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "껌을 씹어요.",
            sentenceMeaning: "Chew gum.",
            sentenceZh: "嚼口香糖。"
        },
        {
            kr: "끓이다",
            en: "To boil something",
            zh: "煮",
            pos: "Verb",
            category: "food_dining",
            sentenceKr: "라면을 끓여요.",
            sentenceMeaning: "Boil ramen.",
            sentenceZh: "煮拉面。"
        },
        {
            kr: "낚시",
            en: "Fishing",
            zh: "钓鱼",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "낚시를 하러 가요.",
            sentenceMeaning: "Go fishing.",
            sentenceZh: "我们去钓鱼吧。"
        },
        {
            kr: "냉면",
            en: "Cold noodles",
            zh: "冷面",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "냉면을 먹으러 가요.",
            sentenceMeaning: "Let's go eat cold noodles.",
            sentenceZh: "去吃冷面吧。"
        },
        {
            kr: "남학생",
            en: "male student",
            zh: "男学生",
            pos: "명사",
            category: "school_education",
            sentenceKr: "그는 아주 성실한 남학생이에요.",
            sentenceMeaning: "He is a very diligent male student.",
            sentenceZh: "他是一个非常诚实的男学生。"
        },
        {
            kr: "깨끗하다",
            en: "To be clean",
            zh: "干净",
            pos: "Adjective",
            category: "home_living",
            sentenceKr: "방이 깨끗해요.",
            sentenceMeaning: "The room is clean.",
            sentenceZh: "房间很干净。"
        },
        {
            kr: "남대문",
            en: "Namdaemun",
            zh: "南大门",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "남대문에 가요.",
            sentenceMeaning: "Go to Namdaemun.",
            sentenceZh: "我们去南大门吧。"
        },
        {
            kr: "내용",
            en: "Content",
            zh: "内容",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "수업 내용을 복습해요.",
            sentenceMeaning: "I review the class content.",
            sentenceZh: "复习课的内容。"
        },
        {
            kr: "냄비",
            en: "Pot",
            zh: "锅",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "냄비에 물을 끓여요.",
            sentenceMeaning: "I boil water in a pot.",
            sentenceZh: "在锅里烧水。"
        },
        {
            kr: "냄새",
            en: "Smell",
            zh: "气味",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "좋은 냄새가 나요.",
            sentenceMeaning: "It smells good.",
            sentenceZh: "闻起来很香。"
        },
        {
            kr: "냉장고",
            en: "Refrigerator",
            zh: "冰箱",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "냉장고에 우유가 있어요.",
            sentenceMeaning: "There is milk in the refrigerator.",
            sentenceZh: "冰箱里有牛奶。"
        },
        {
            kr: "넥타이",
            en: "Necktie",
            zh: "领带",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "넥타이를 매요.",
            sentenceMeaning: "I wear a necktie.",
            sentenceZh: "系领带。"
        },
        {
            kr: "넷",
            en: "Four",
            zh: "四",
            pos: "Numeral",
            category: "home_living",
            sentenceKr: "사과가 넷 있어요.",
            sentenceMeaning: "There are four apples.",
            sentenceZh: "有四个苹果。"
        },
        {
            kr: "기차",
            en: "Train",
            zh: "火车",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "기차를 타요.",
            sentenceMeaning: "Take a train.",
            sentenceZh: "坐火车。"
        },
        {
            kr: "기차역",
            en: "Train station",
            zh: "火车站",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "기차역에 도착했어요.",
            sentenceMeaning: "Arrived at the train station.",
            sentenceZh: "我到达火车站。"
        },
        {
            kr: "기차표",
            en: "Train ticket",
            zh: "火车票",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "기차표를 끊어요.",
            sentenceMeaning: "Buy a train ticket.",
            sentenceZh: "买一张火车票。"
        },
        {
            kr: "길",
            en: "Road/Way",
            zh: "路",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "길이 막혀요.",
            sentenceMeaning: "The road is blocked.",
            sentenceZh: "路被堵住了。"
        },
        {
            kr: "꽃집",
            en: "Flower shop",
            zh: "花店",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "꽃집을 열어요.",
            sentenceMeaning: "Open a flower shop.",
            sentenceZh: "开一家花店。"
        },
        {
            kr: "나라",
            en: "Country",
            zh: "国家",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "우리 나라는 아름다워요.",
            sentenceMeaning: "Our country is beautiful.",
            sentenceZh: "我们的国家很美丽。"
        },
        {
            kr: "남",
            en: "Others",
            zh: "别人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "남을 도와줘요.",
            sentenceMeaning: "Help others.",
            sentenceZh: "帮助别人。"
        },
        {
            kr: "남동생",
            en: "Younger brother",
            zh: "弟弟",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "남동생을 돌봐요.",
            sentenceMeaning: "Look after younger brother.",
            sentenceZh: "照顾好我的弟弟。"
        },
        {
            kr: "남자",
            en: "Man",
            zh: "男人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리는 그 남자를 잘 모릅니다.",
            sentenceMeaning: "We do not know that man well.",
            sentenceZh: "我们不怎么认识那个男人。"
        },
        {
            kr: "남편",
            en: "Husband",
            zh: "丈夫",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "제 친구의 남편은 요리사입니다.",
            sentenceMeaning: "My friend's husband is a chef.",
            sentenceZh: "我朋友的丈夫是厨师。"
        },
        {
            kr: "너",
            en: "You",
            zh: "你",
            pos: "Pronoun",
            category: "people_jobs_family",
            sentenceKr: "너는 내 친구야.",
            sentenceMeaning: "You are my friend.",
            sentenceZh: "你是我的朋友。"
        },
        {
            kr: "너희",
            en: "You (plural)",
            zh: "你们",
            pos: "Pronoun",
            category: "people_jobs_family",
            sentenceKr: "너희들은 어디 가니?",
            sentenceMeaning: "Where are you guys going?",
            sentenceZh: "你们去哪儿？"
        },
        {
            kr: "기쁨",
            en: "Joy/Happiness",
            zh: "喜悦",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "기쁨을 나눠요.",
            sentenceMeaning: "Share the joy.",
            sentenceZh: "分享喜悦。"
        },
        {
            kr: "긴장",
            en: "Nervousness/Tension",
            zh: "紧张",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "긴장을 풀어요.",
            sentenceMeaning: "Relax the tension.",
            sentenceZh: "放松。"
        },
        {
            kr: "꽃",
            en: "Flower",
            zh: "花",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "꽃이 피었어요.",
            sentenceMeaning: "The flower has bloomed.",
            sentenceZh: "鲜花已经盛开。"
        },
        {
            kr: "꽃다발",
            en: "flower bouquet",
            zh: "花束",
            pos: "명사",
            category: "nature_animals_plants",
            sentenceKr: "꽃다발을 선물해요.",
            sentenceMeaning: "I give you a bouquet of flowers.",
            sentenceZh: "我给你一束鲜花。"
        },
        {
            kr: "꽃병",
            en: "Flower vase",
            zh: "花瓶",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "꽃병이 예뻐요.",
            sentenceMeaning: "The flower vase is pretty.",
            sentenceZh: "花瓶很漂亮。"
        },
        {
            kr: "나무",
            en: "Tree",
            zh: "树",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "나무를 심어요.",
            sentenceMeaning: "Plant a tree.",
            sentenceZh: "种一棵树。"
        },
        {
            kr: "날다",
            en: "To fly",
            zh: "飞",
            pos: "Verb",
            category: "nature_animals_plants",
            sentenceKr: "새가 날아요.",
            sentenceMeaning: "A bird flies.",
            sentenceZh: "鸟儿正在飞翔。"
        },
        {
            kr: "날씨",
            en: "Weather",
            zh: "天气",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "날씨가 좋아요.",
            sentenceMeaning: "The weather is good.",
            sentenceZh: "天气很好。"
        },
        {
            kr: "날아다니다",
            en: "To fly around",
            zh: "飞来飞去",
            pos: "Verb",
            category: "nature_animals_plants",
            sentenceKr: "나비가 날아다녀요.",
            sentenceMeaning: "A butterfly is flying around.",
            sentenceZh: "蝴蝶在飞翔。"
        },
        {
            kr: "남산",
            en: "Namsan",
            zh: "南山",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "남산 타워가 보여요.",
            sentenceMeaning: "I can see Namsan Tower.",
            sentenceZh: "我可以看到南山塔。"
        },
        {
            kr: "나이",
            en: "Age",
            zh: "年龄",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "나이가 많아요.",
            sentenceMeaning: "I am old.",
            sentenceZh: "我老了。"
        },
        {
            kr: "나흘",
            en: "Four days",
            zh: "四天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "나흘이 걸려요.",
            sentenceMeaning: "It takes four days.",
            sentenceZh: "需要四天时间。"
        },
        {
            kr: "날",
            en: "Day",
            zh: "日子",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "마지막 날이에요.",
            sentenceMeaning: "It is the last day.",
            sentenceZh: "这是最后一天了。"
        },
        {
            kr: "날짜",
            en: "Date",
            zh: "日期",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "날짜를 정해요.",
            sentenceMeaning: "Set a date.",
            sentenceZh: "设定一个日期。"
        },
        {
            kr: "낮",
            en: "Daytime",
            zh: "白天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "낮에는 일해요.",
            sentenceMeaning: "I work during the day.",
            sentenceZh: "我白天工作。"
        },
        {
            kr: "내년",
            en: "Next year",
            zh: "明年",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "내년에 만나요.",
            sentenceMeaning: "Let's meet next year.",
            sentenceZh: "明年见。"
        },
        {
            kr: "내리다",
            en: "To fall",
            zh: "落下",
            pos: "Verb",
            category: "time_seasons",
            sentenceKr: "비가 내려요.",
            sentenceMeaning: "It is raining.",
            sentenceZh: "在下雨。"
        },
        {
            kr: "내일",
            en: "Tomorrow",
            zh: "明天",
            pos: "Noun/Adverb",
            category: "time_seasons",
            sentenceKr: "내일 만나요.",
            sentenceMeaning: "See you tomorrow.",
            sentenceZh: "明天见。"
        },
        {
            kr: "넘어지다",
            en: "To fall down",
            zh: "摔倒",
            pos: "Verb",
            category: "time_seasons",
            sentenceKr: "길에서 넘어졌어요.",
            sentenceMeaning: "I fell down on the street.",
            sentenceZh: "在路上摔倒了。"
        },
        {
            kr: "년",
            en: "Year",
            zh: "年",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "일 년 동안 공부했어요.",
            sentenceMeaning: "I studied for a year.",
            sentenceZh: "学了一年。"
        },
        {
            kr: "기억나다",
            en: "To remember",
            zh: "想起",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "이름이 기억나요.",
            sentenceMeaning: "I remember the name.",
            sentenceZh: "我记得你的名字。"
        },
        {
            kr: "깎다",
            en: "to peel / to discount",
            zh: "削 / 讲价",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "과도로 사과를 조심스럽게 깎았어요.",
            sentenceMeaning: "I carefully peeled the apple with a fruit knife.",
            sentenceZh: "用水果刀小心地削了苹果。"
        },
        {
            kr: "깨다",
            en: "to break / to wake up",
            zh: "打破 / 醒",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "아침 일찍 알람 소리에 잠이 깼어요.",
            sentenceMeaning: "I woke up early in the morning to the sound of the alarm.",
            sentenceZh: "早上很早就被闹钟声吵醒了。"
        },
        {
            kr: "꺼내다",
            en: "To take out",
            zh: "拿出",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "지갑에서 돈을 꺼내요.",
            sentenceMeaning: "Take out money from the wallet.",
            sentenceZh: "从钱包里拿出钱。"
        },
        {
            kr: "꾸다",
            en: "To dream",
            zh: "做梦",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "꿈을 꿔요.",
            sentenceMeaning: "Dream a dream.",
            sentenceZh: "做一个梦吧。"
        },
        {
            kr: "끄다",
            en: "To turn off",
            zh: "关/熄灭",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "불을 꺼요.",
            sentenceMeaning: "Turn off the light.",
            sentenceZh: "关掉灯。"
        },
        {
            kr: "끊다",
            en: "To cut/quit",
            zh: "切断/戒掉",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "담배를 끊었어요.",
            sentenceMeaning: "I quit smoking.",
            sentenceZh: "我戒烟了。"
        },
        {
            kr: "끓다",
            en: "To boil",
            zh: "沸腾",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "물이 끓어요.",
            sentenceMeaning: "The water is boiling.",
            sentenceZh: "水沸腾了。"
        },
        {
            kr: "끝나다",
            en: "To end/finish",
            zh: "结束",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "수업이 끝났어요.",
            sentenceMeaning: "The class has ended.",
            sentenceZh: "下课了。"
        },
        {
            kr: "끝내다",
            en: "To finish",
            zh: "完成",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "숙제를 끝냈어요.",
            sentenceMeaning: "I finished my homework.",
            sentenceZh: "我完成了作业。"
        },
        {
            kr: "끼다",
            en: "To wear (ring/gloves)",
            zh: "戴",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "반지를 껴요.",
            sentenceMeaning: "Wear a ring.",
            sentenceZh: "戴上戒指。"
        },
        {
            kr: "나가다",
            en: "To go out",
            zh: "出去",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "밖으로 나가요.",
            sentenceMeaning: "Go outside.",
            sentenceZh: "到外面去。"
        },
        {
            kr: "나누다",
            en: "To divide/share",
            zh: "分享",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "둘로 나눠요.",
            sentenceMeaning: "Divide into two.",
            sentenceZh: "把它分成两部分。"
        },
        {
            kr: "나다",
            en: "To occur",
            zh: "发生",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "소문이 났어요.",
            sentenceMeaning: "A rumor has spread.",
            sentenceZh: "有一个谣言。"
        },
        {
            kr: "나오다",
            en: "To come out",
            zh: "出来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "밖으로 나와요.",
            sentenceMeaning: "Come outside.",
            sentenceZh: "到外面来吧。"
        },
        {
            kr: "나타나다",
            en: "To appear",
            zh: "出现",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "건물이 나타났어요.",
            sentenceMeaning: "A building appeared.",
            sentenceZh: "一座建筑物出现了。"
        },
        {
            kr: "남기다",
            en: "To leave behind",
            zh: "留下",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "음식을 남겼어요.",
            sentenceMeaning: "Left food behind.",
            sentenceZh: "我留下了一些食物。"
        },
        {
            kr: "남다",
            en: "To remain",
            zh: "剩下",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "시간이 남았어요.",
            sentenceMeaning: "Time remains.",
            sentenceZh: "还有时间。"
        },
        {
            kr: "낫다",
            en: "to be better / to recover",
            zh: "更好 / 痊愈",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "감기가 다 나았어요.",
            sentenceMeaning: "My cold is completely cured.",
            sentenceZh: "感冒全都好了。"
        },
        {
            kr: "내다",
            en: "To pay/submit",
            zh: "付/交",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "돈을 내요.",
            sentenceMeaning: "Pay money.",
            sentenceZh: "付钱。"
        },
        {
            kr: "내려가다",
            en: "To go down",
            zh: "下去",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "아래로 내려가요.",
            sentenceMeaning: "Go down.",
            sentenceZh: "下去。"
        },
        {
            kr: "내려오다",
            en: "To come down",
            zh: "下来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "밑으로 내려와요.",
            sentenceMeaning: "Come down.",
            sentenceZh: "下来吧。"
        },
        {
            kr: "넘다",
            en: "To exceed",
            zh: "超过",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "세 시간이 넘었어요.",
            sentenceMeaning: "It's been over three hours.",
            sentenceZh: "超过三个小时了。"
        },
        {
            kr: "넣다",
            en: "To put in",
            zh: "放入",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "가방에 책을 넣어요.",
            sentenceMeaning: "I put the book in the bag.",
            sentenceZh: "把书放进包里。"
        },
        {
            kr: "길다",
            en: "To be long",
            zh: "长",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "다리가 길어요.",
            sentenceMeaning: "Legs are long.",
            sentenceZh: "我有长腿。"
        },
        {
            kr: "깊다",
            en: "To be deep",
            zh: "深",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "바다가 깊어요.",
            sentenceMeaning: "The sea is deep.",
            sentenceZh: "海很深。"
        },
        {
            kr: "깊이",
            en: "deeply",
            zh: "深",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "문제를 해결하기 위해 깊이 생각했어요.",
            sentenceMeaning: "I thought deeply to solve the problem.",
            sentenceZh: "为了解决问题，我深深地思考了。"
        },
        {
            kr: "까맣다",
            en: "to be black",
            zh: "黑",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "시골의 밤하늘은 아주 까맣고 아름다워요.",
            sentenceMeaning: "The night sky in the countryside is very dark and beautiful.",
            sentenceZh: "乡下的夜空非常漆黑且美丽。"
        },
        {
            kr: "깜짝",
            en: "startlingly, surprisingly",
            zh: "吓一跳",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "소리를 듣고 깜짝 놀랐어요.",
            sentenceMeaning: "I was startled to hear the sound.",
            sentenceZh: "听到声音我吓了一跳。"
        },
        {
            kr: "깨끗이",
            en: "Cleanly",
            zh: "干净地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "깨끗이 씻어요.",
            sentenceMeaning: "Wash cleanly.",
            sentenceZh: "彻底清洗。"
        },
        {
            kr: "꼭",
            en: "Surely/Definitely",
            zh: "一定",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "꼭 약속할게요.",
            sentenceMeaning: "I will definitely promise.",
            sentenceZh: "我保证。"
        },
        {
            kr: "나쁘다",
            en: "To be bad",
            zh: "坏",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "공기가 나빠요.",
            sentenceMeaning: "The air is bad.",
            sentenceZh: "空气不好。"
        },
        {
            kr: "날씬하다",
            en: "To be slim",
            zh: "苗条",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "몸매가 날씬해요.",
            sentenceMeaning: "The body is slim.",
            sentenceZh: "我的身体很苗条。"
        },
        {
            kr: "낮다",
            en: "To be low",
            zh: "低",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "산이 낮아요.",
            sentenceMeaning: "The mountain is low.",
            sentenceZh: "山很低。"
        },
        {
            kr: "너무",
            en: "Too/Very",
            zh: "太/非常",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "너무 배가 고파요.",
            sentenceMeaning: "I am so hungry.",
            sentenceZh: "太饿了。"
        },
        {
            kr: "넓다",
            en: "Wide",
            zh: "宽",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "방이 아주 넓어요.",
            sentenceMeaning: "The room is very wide.",
            sentenceZh: "房间很宽敞。"
        },
        {
            kr: "네",
            en: "Yes",
            zh: "是",
            pos: "Interjection",
            category: "descriptions_qualities",
            sentenceKr: "네, 알겠습니다.",
            sentenceMeaning: "Yes, I understand.",
            sentenceZh: "是的，知道了。"
        },
        {
            kr: "넷째",
            en: "Fourth",
            zh: "第四个",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "넷째 아들이에요.",
            sentenceMeaning: "He is the fourth son.",
            sentenceZh: "他是第四个儿子。"
        },
        {
            kr: "노란색",
            en: "Yellow",
            zh: "黄色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "노란색을 좋아해요.",
            sentenceMeaning: "I like yellow.",
            sentenceZh: "我喜欢黄色。"
        },
        {
            kr: "노랗다",
            en: "Yellow",
            zh: "黄",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "꽃이 노랗게 피었어요.",
            sentenceMeaning: "The flower bloomed yellow.",
            sentenceZh: "花开得很黄。"
        },
        {
            kr: "기숙사",
            en: "Dormitory",
            zh: "宿舍",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "기숙사에서 살아요.",
            sentenceMeaning: "I live in a dormitory.",
            sentenceZh: "我住在宿舍里。"
        },
        {
            kr: "기억",
            en: "Memory",
            zh: "记忆",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "기억이 나지 않아요.",
            sentenceMeaning: "I don't remember.",
            sentenceZh: "我不记得了。"
        },
        {
            kr: "기온",
            en: "Temperature",
            zh: "气温",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "기온이 높아요.",
            sentenceMeaning: "The temperature is high.",
            sentenceZh: "温度很高。"
        },
        {
            kr: "기자",
            en: "Reporter/Journalist",
            zh: "记者",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "신문 기자예요.",
            sentenceMeaning: "I am a newspaper reporter.",
            sentenceZh: "我是一名报社记者。"
        },
        {
            kr: "기침",
            en: "Cough",
            zh: "咳嗽",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "기침이 나요.",
            sentenceMeaning: "I have a cough.",
            sentenceZh: "我咳嗽。"
        },
        {
            kr: "기타",
            en: "Guitar",
            zh: "吉他",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "기타를 쳐요.",
            sentenceMeaning: "Play the guitar.",
            sentenceZh: "我弹吉他。"
        },
        {
            kr: "기회",
            en: "Opportunity",
            zh: "机会",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "기회를 놓쳤어요.",
            sentenceMeaning: "I missed the opportunity.",
            sentenceZh: "我错过了机会。"
        },
        {
            kr: "길이",
            en: "Length",
            zh: "长度",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "길이를 재요.",
            sentenceMeaning: "Measure the length.",
            sentenceZh: "测量长度。"
        },
        {
            kr: "김",
            en: "seaweed / steam",
            zh: "紫菜 / 蒸汽",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "김을 먹어요.",
            sentenceMeaning: "Eat seaweed.",
            sentenceZh: "吃海藻。"
        },
        {
            kr: "김밥",
            en: "Kimbap",
            zh: "紫菜包饭",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "김밥을 싸요.",
            sentenceMeaning: "Pack kimbap.",
            sentenceZh: "做紫菜包饭。"
        },
        {
            kr: "김치",
            en: "Kimchi",
            zh: "泡菜",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "김치를 담가요.",
            sentenceMeaning: "Make kimchi.",
            sentenceZh: "我们来做泡菜吧。"
        },
        {
            kr: "김치찌개",
            en: "Kimchi stew",
            zh: "泡菜锅",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "김치찌개를 끓여요.",
            sentenceMeaning: "Boil kimchi stew.",
            sentenceZh: "煮泡菜汤。"
        },
        {
            kr: "까만색",
            en: "black color",
            zh: "黑色",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "저는 오늘 까만색 구두를 신었어요.",
            sentenceMeaning: "I wore black shoes today.",
            sentenceZh: "我今天穿了黑色的皮鞋。"
        },
        {
            kr: "꿈",
            en: "dream",
            zh: "梦",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "꿈을 꿔요.",
            sentenceMeaning: "Have a dream.",
            sentenceZh: "做一个梦吧。"
        },
        {
            kr: "끝",
            en: "End",
            zh: "结束",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "끝이 보여요.",
            sentenceMeaning: "The end is in sight.",
            sentenceZh: "我能看到结局。"
        },
        {
            kr: "나",
            en: "I/Me",
            zh: "我",
            pos: "Pronoun",
            category: "miscellaneous",
            sentenceKr: "나는 학생이에요.",
            sentenceMeaning: "I am a student.",
            sentenceZh: "我是一名学生。"
        },
        {
            kr: "나머지",
            en: "Rest/Remainder",
            zh: "剩下",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "나머지 돈을 주세요.",
            sentenceMeaning: "Give me the remaining money.",
            sentenceZh: "请把剩下的钱给我。"
        },
        {
            kr: "나중",
            en: "Later",
            zh: "以后",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "나중에 해요.",
            sentenceMeaning: "Do it later.",
            sentenceZh: "我稍后再做。"
        },
        {
            kr: "남녀",
            en: "Men and women",
            zh: "男女",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "남녀 평등이 중요해요.",
            sentenceMeaning: "Gender equality is important.",
            sentenceZh: "性别平等很重要。"
        },
        {
            kr: "남성",
            en: "Male",
            zh: "男性",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "남성 의류예요.",
            sentenceMeaning: "It's male clothing.",
            sentenceZh: "这是男装。"
        },
        {
            kr: "남쪽",
            en: "South",
            zh: "南边",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "남쪽으로 가요.",
            sentenceMeaning: "Go south.",
            sentenceZh: "向南走。"
        },
        {
            kr: "낮잠",
            en: "Nap",
            zh: "午睡",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "낮잠을 자요.",
            sentenceMeaning: "Take a nap.",
            sentenceZh: "小睡一下。"
        },
        {
            kr: "내",
            en: "My",
            zh: "我的",
            pos: "Pronoun",
            category: "miscellaneous",
            sentenceKr: "내 가방이에요.",
            sentenceMeaning: "It is my bag.",
            sentenceZh: "这是我的包。"
        },
        {
            kr: "내과",
            en: "Internal medicine",
            zh: "内科",
            pos: "Noun",
            category: "miscellaneous",
            sentenceKr: "내과에 가요.",
            sentenceMeaning: "Go to internal medicine.",
            sentenceZh: "我要去内科诊所。"
        }
    ],
    beginner_cycle_4: [
        {
            kr: "녹차",
            en: "Green tea",
            zh: "绿茶",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "녹차를 마셔요.",
            sentenceMeaning: "I drink green tea.",
            sentenceZh: "喝绿茶。"
        },
        {
            kr: "놀라다",
            en: "To be surprised",
            zh: "吃惊",
            pos: "Verb",
            category: "food_dining",
            sentenceKr: "깜짝 놀랐어요.",
            sentenceMeaning: "I was very surprised.",
            sentenceZh: "吓了一跳。"
        },
        {
            kr: "달걀",
            en: "Egg",
            zh: "鸡蛋",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "달걀을 삶아요.",
            sentenceMeaning: "Boil an egg.",
            sentenceZh: "煮鸡蛋。"
        },
        {
            kr: "달다",
            en: "To be sweet",
            zh: "甜",
            pos: "Adjective",
            category: "food_dining",
            sentenceKr: "맛이 달아요.",
            sentenceMeaning: "The taste is sweet.",
            sentenceZh: "味道很甜。"
        },
        {
            kr: "닭",
            en: "Chicken",
            zh: "鸡",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "닭을 키워요.",
            sentenceMeaning: "Raise a chicken.",
            sentenceZh: "养鸡。"
        },
        {
            kr: "닭고기",
            en: "Chicken meat",
            zh: "鸡肉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "닭고기를 볶아요.",
            sentenceMeaning: "Stir-fry chicken meat.",
            sentenceZh: "炒鸡肉。"
        },
        {
            kr: "돈가스",
            en: "Pork cutlet",
            zh: "猪排",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "돈가스가 아주 바삭해요.",
            sentenceMeaning: "The pork cutlet is very crispy.",
            sentenceZh: "猪排非常脆。"
        },
        {
            kr: "노트",
            en: "Notebook",
            zh: "笔记本",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "노트에 써요.",
            sentenceMeaning: "I write in a notebook.",
            sentenceZh: "在笔记本上写字。"
        },
        {
            kr: "대학",
            en: "university",
            zh: "大学",
            pos: "명사",
            category: "school_education",
            sentenceKr: "대학에 들어가요.",
            sentenceMeaning: "Enter college.",
            sentenceZh: "进入大学。"
        },
        {
            kr: "대학교",
            en: "University",
            zh: "大学",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "대학교에 다녀요.",
            sentenceMeaning: "I attend university.",
            sentenceZh: "在上大学。"
        },
        {
            kr: "대학생",
            en: "University student",
            zh: "大学生",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "대학생이 되었어요.",
            sentenceMeaning: "I became a university student.",
            sentenceZh: "成了大学生。"
        },
        {
            kr: "대학원",
            en: "Graduate school",
            zh: "研究生院",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "대학원을 다녀요.",
            sentenceMeaning: "I attend graduate school.",
            sentenceZh: "上研究生院。"
        },
        {
            kr: "도",
            en: "Degree",
            zh: "度",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "오늘 기온은 25도예요.",
            sentenceMeaning: "Today's temperature is 25 degrees.",
            sentenceZh: "今天气温是25度。"
        },
        {
            kr: "도서관",
            en: "Library",
            zh: "图书馆",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "도서관에서 책을 빌렸어요.",
            sentenceMeaning: "I borrowed a book from the library.",
            sentenceZh: "在图书馆借了书。"
        },
        {
            kr: "독서",
            en: "Reading",
            zh: "读书",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "가을은 독서의 계절이에요.",
            sentenceMeaning: "Autumn is the season for reading.",
            sentenceZh: "秋天是读书的季节。"
        },
        {
            kr: "노래",
            en: "Song",
            zh: "歌",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "노래를 불러요.",
            sentenceMeaning: "I sing a song.",
            sentenceZh: "唱歌。"
        },
        {
            kr: "뉴스",
            en: "News",
            zh: "新闻",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "뉴스를 봐요.",
            sentenceMeaning: "Watch the news.",
            sentenceZh: "看新闻。"
        },
        {
            kr: "다섯",
            en: "Five",
            zh: "五",
            pos: "Numeral",
            category: "home_living",
            sentenceKr: "다섯 개 있어요.",
            sentenceMeaning: "There are five.",
            sentenceZh: "有五个。"
        },
        {
            kr: "단어",
            en: "Word",
            zh: "单词",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "단어를 외워요.",
            sentenceMeaning: "Memorize words.",
            sentenceZh: "背单词。"
        },
        {
            kr: "담배",
            en: "Cigarette",
            zh: "香烟",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "담배를 피워요.",
            sentenceMeaning: "Smoke a cigarette.",
            sentenceZh: "抽烟。"
        },
        {
            kr: "답",
            en: "Answer",
            zh: "答案",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "답이 없어요.",
            sentenceMeaning: "There is no answer.",
            sentenceZh: "没有答案。"
        },
        {
            kr: "대",
            en: "Counter for machines",
            zh: "台",
            pos: "Counter",
            category: "home_living",
            sentenceKr: "차 한 대가 있어요.",
            sentenceMeaning: "There is one car.",
            sentenceZh: "有一辆车。"
        },
        {
            kr: "댁",
            en: "House (Honorific)",
            zh: "府上/家",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "선생님 댁을 방문했어요.",
            sentenceMeaning: "I visited the teacher's house.",
            sentenceZh: "访问了老师家。"
        },
        {
            kr: "돈",
            en: "Money",
            zh: "钱",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "돈을 아껴서 써야 해요.",
            sentenceMeaning: "You should save your money.",
            sentenceZh: "应该省钱用。"
        },
        {
            kr: "동대문",
            en: "Dongdaemun",
            zh: "东大门",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "동대문 시장에 쇼핑하러 가요.",
            sentenceMeaning: "I go to Dongdaemun Market for shopping.",
            sentenceZh: "去东大门市场买东西。"
        },
        {
            kr: "노래방",
            en: "Karaoke",
            zh: "练歌房",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "노래방에 가요.",
            sentenceMeaning: "I go to karaoke.",
            sentenceZh: "去练歌房。"
        },
        {
            kr: "다리",
            en: "Bridge",
            zh: "桥",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "다리를 건너요.",
            sentenceMeaning: "Cross the bridge.",
            sentenceZh: "过桥。"
        },
        {
            kr: "대구",
            en: "Daegu",
            zh: "大邱",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "대구에 살아요.",
            sentenceMeaning: "I live in Daegu.",
            sentenceZh: "在大邱住。"
        },
        {
            kr: "대사관",
            en: "Embassy",
            zh: "大使馆",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "대사관에 가요.",
            sentenceMeaning: "Go to the embassy.",
            sentenceZh: "去大使馆。"
        },
        {
            kr: "대전",
            en: "Daejeon",
            zh: "大田",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "대전에 살아요.",
            sentenceMeaning: "I live in Daejeon.",
            sentenceZh: "在大田住。"
        },
        {
            kr: "도로",
            en: "Road",
            zh: "道路",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "도로에 차가 아주 많아요.",
            sentenceMeaning: "There are many cars on the road.",
            sentenceZh: "马路上车很多。"
        },
        {
            kr: "도시",
            en: "City",
            zh: "城市",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "서울은 아주 큰 도시예요.",
            sentenceMeaning: "Seoul is a very large city.",
            sentenceZh: "首尔是一个很大的城市。"
        },
        {
            kr: "독일",
            en: "Germany",
            zh: "德国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "독일에서 온 유학생이에요.",
            sentenceMeaning: "I am an international student from Germany.",
            sentenceZh: "是从德国来的留学生。"
        },
        {
            kr: "동네",
            en: "Neighborhood",
            zh: "小区/村庄",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "우리 동네는 아주 조용해요.",
            sentenceMeaning: "Our neighborhood is very quiet.",
            sentenceZh: "我们小区很安静。"
        },
        {
            kr: "노인",
            en: "Elderly person",
            zh: "老人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "노인을 공경해요.",
            sentenceMeaning: "Respect the elderly.",
            sentenceZh: "尊敬老人。"
        },
        {
            kr: "누구",
            en: "Who",
            zh: "谁",
            pos: "Pronoun",
            category: "people_jobs_family",
            sentenceKr: "누구세요?",
            sentenceMeaning: "Who is it?",
            sentenceZh: "是谁？"
        },
        {
            kr: "누나",
            en: "Older sister",
            zh: "姐姐",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "누나가 있어요.",
            sentenceMeaning: "I have an older sister.",
            sentenceZh: "我有姐姐。"
        },
        {
            kr: "농담",
            en: "Joke",
            zh: "玩笑",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "농담을 해요.",
            sentenceMeaning: "I tell a joke.",
            sentenceZh: "开玩笑。"
        },
        {
            kr: "눈물",
            en: "Tear",
            zh: "眼泪",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "눈물이 나요.",
            sentenceMeaning: "Tears are coming out.",
            sentenceZh: "流眼泪了。"
        },
        {
            kr: "느끼다",
            en: "To feel",
            zh: "感觉",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "추위를 느껴요.",
            sentenceMeaning: "Feel the cold.",
            sentenceZh: "感觉到冷。"
        },
        {
            kr: "느낌",
            en: "Feeling",
            zh: "感觉",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "느낌이 좋아요.",
            sentenceMeaning: "I have a good feeling.",
            sentenceZh: "感觉很好。"
        },
        {
            kr: "눈",
            en: "Snow",
            zh: "雪",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "눈이 내려요.",
            sentenceMeaning: "It is snowing.",
            sentenceZh: "在下雪。"
        },
        {
            kr: "달",
            en: "Month/Moon",
            zh: "月",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "다음 달에 가요.",
            sentenceMeaning: "Go next month.",
            sentenceZh: "下个月去。"
        },
        {
            kr: "덥다",
            en: "Hot (Weather)",
            zh: "热",
            pos: "Adjective",
            category: "nature_animals_plants",
            sentenceKr: "여름은 날씨가 너무 더워요.",
            sentenceMeaning: "The weather is too hot in summer.",
            sentenceZh: "夏天天气太热了。"
        },
        {
            kr: "돌",
            en: "Stone/Rock",
            zh: "石头",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "길에 돌이 많아요.",
            sentenceMeaning: "There are many stones on the road.",
            sentenceZh: "路上有很多石头。"
        },
        {
            kr: "동물",
            en: "Animal",
            zh: "动物",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "동물을 사랑해야 해요.",
            sentenceMeaning: "We should love animals.",
            sentenceZh: "应该爱护动物。"
        },
        {
            kr: "동물원",
            en: "Zoo",
            zh: "动物园",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "주말에 동물원에 놀러 갔어요.",
            sentenceMeaning: "I went to the zoo over the weekend.",
            sentenceZh: "周末去动物园玩了。"
        },
        {
            kr: "늦다",
            en: "Late",
            zh: "晚",
            pos: "Adjective/Verb",
            category: "time_seasons",
            sentenceKr: "시간이 늦었어요.",
            sentenceMeaning: "It is late.",
            sentenceZh: "时间晚了。"
        },
        {
            kr: "다음날",
            en: "Next day",
            zh: "第二天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "다음날 일어났어요.",
            sentenceMeaning: "I woke up the next day.",
            sentenceZh: "第二天起床了。"
        },
        {
            kr: "단풍",
            en: "Autumn leaves",
            zh: "枫叶",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "단풍이 들었어요.",
            sentenceMeaning: "The leaves turned red.",
            sentenceZh: "枫叶红了。"
        },
        {
            kr: "달력",
            en: "Calendar",
            zh: "日历",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "달력을 걸어요.",
            sentenceMeaning: "Hang a calendar.",
            sentenceZh: "挂日历。"
        },
        {
            kr: "데이트",
            en: "Date",
            zh: "约会",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오늘 첫 데이트를 해요.",
            sentenceMeaning: "I'm having my first date today.",
            sentenceZh: "今天进行第一次约会。"
        },
        {
            kr: "노력",
            en: "Effort",
            zh: "努力",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "노력을 많이 했어요.",
            sentenceMeaning: "I made a lot of effort.",
            sentenceZh: "付出了很多努力。"
        },
        {
            kr: "놀다",
            en: "To play",
            zh: "玩",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "친구와 놀아요.",
            sentenceMeaning: "I play with a friend.",
            sentenceZh: "和朋友玩。"
        },
        {
            kr: "놀이",
            en: "Play/Game",
            zh: "游戏",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "아이들이 놀이를 해요.",
            sentenceMeaning: "Children are playing.",
            sentenceZh: "孩子们在玩耍。"
        },
        {
            kr: "농구",
            en: "Basketball",
            zh: "篮球",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "농구를 좋아해요.",
            sentenceMeaning: "I like basketball.",
            sentenceZh: "我喜欢篮球。"
        },
        {
            kr: "놓다",
            en: "To put down",
            zh: "放",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "책상에 놓아요.",
            sentenceMeaning: "Put it on the desk.",
            sentenceZh: "放在桌子上。"
        },
        {
            kr: "누르다",
            en: "To press",
            zh: "按",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "버튼을 눌러요.",
            sentenceMeaning: "Press the button.",
            sentenceZh: "按按钮。"
        },
        {
            kr: "눕다",
            en: "To lie down",
            zh: "躺",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "바닥에 누워요.",
            sentenceMeaning: "Lie down on the floor.",
            sentenceZh: "躺在地上。"
        },
        {
            kr: "늘다",
            en: "To expand",
            zh: "扩大",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "사업이 늘어요.",
            sentenceMeaning: "The business is expanding.",
            sentenceZh: "事业在扩大。"
        },
        {
            kr: "늙다",
            en: "to grow old",
            zh: "老",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "사람은 누구나 나이가 들면 늙기 마련입니다.",
            sentenceMeaning: "Everyone is bound to grow old as they age.",
            sentenceZh: "任何人上了年纪都难免会变老。"
        },
        {
            kr: "다녀오다",
            en: "To go and come back",
            zh: "回来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "학교에 다녀왔어요.",
            sentenceMeaning: "I am back from school.",
            sentenceZh: "从学校回来了。"
        },
        {
            kr: "다니다",
            en: "To attend",
            zh: "上(学/班)",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "회사에 다녀요.",
            sentenceMeaning: "I go to work.",
            sentenceZh: "在上班。"
        },
        {
            kr: "다림질",
            en: "Ironing",
            zh: "熨烫",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "다림질을 해요.",
            sentenceMeaning: "I do ironing.",
            sentenceZh: "烫衣服。"
        },
        {
            kr: "다이어트",
            en: "Diet",
            zh: "减肥",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "다이어트를 해요.",
            sentenceMeaning: "I am on a diet.",
            sentenceZh: "在减肥。"
        },
        {
            kr: "다치다",
            en: "To get hurt",
            zh: "受伤",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "팔을 다쳤어요.",
            sentenceMeaning: "I hurt my arm.",
            sentenceZh: "手臂受伤了。"
        },
        {
            kr: "다하다",
            en: "To use up",
            zh: "用尽",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "기력이 다했어요.",
            sentenceMeaning: "My strength is used up.",
            sentenceZh: "精疲力竭了。"
        },
        {
            kr: "닦다",
            en: "To wipe",
            zh: "擦",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "구두를 닦아요.",
            sentenceMeaning: "Wipe the shoes.",
            sentenceZh: "擦皮鞋。"
        },
        {
            kr: "닫다",
            en: "To close",
            zh: "关",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "문을 닫아요.",
            sentenceMeaning: "Close the door.",
            sentenceZh: "关门。"
        },
        {
            kr: "달리기",
            en: "Running",
            zh: "跑步",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "달리기가 빨라요.",
            sentenceMeaning: "Running is fast.",
            sentenceZh: "跑步很快。"
        },
        {
            kr: "달리다",
            en: "To run",
            zh: "跑",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "빨리 달려요.",
            sentenceMeaning: "Run fast.",
            sentenceZh: "快跑。"
        },
        {
            kr: "닮다",
            en: "To resemble",
            zh: "像",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "아빠를 닮았어요.",
            sentenceMeaning: "I resemble my dad.",
            sentenceZh: "像爸爸。"
        },
        {
            kr: "답장",
            en: "Reply",
            zh: "回信",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "답장을 보내요.",
            sentenceMeaning: "Send a reply.",
            sentenceZh: "寄回信。"
        },
        {
            kr: "대답",
            en: "Answer",
            zh: "回答",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "대답을 기다려요.",
            sentenceMeaning: "Wait for an answer.",
            sentenceZh: "等回答。"
        },
        {
            kr: "대화",
            en: "Conversation",
            zh: "对话",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "친구와 대화를 나누고 있어요.",
            sentenceMeaning: "I am having a conversation with a friend.",
            sentenceZh: "正在和朋友对话。"
        },
        {
            kr: "대회",
            en: "Competition",
            zh: "大会/竞赛",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "수영 대회에서 1등을 했어요.",
            sentenceMeaning: "I won first place in the swimming competition.",
            sentenceZh: "在游泳比赛中获得了第一名。"
        },
        {
            kr: "던지다",
            en: "To throw",
            zh: "扔/投",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "공을 멀리 던졌어요.",
            sentenceMeaning: "I threw the ball far.",
            sentenceZh: "把球扔得很远。"
        },
        {
            kr: "데려가다",
            en: "To take (someone)",
            zh: "带去",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "아이를 학교에 데려가요.",
            sentenceMeaning: "I take the child to school.",
            sentenceZh: "带孩子去学校。"
        },
        {
            kr: "데려오다",
            en: "To bring (someone)",
            zh: "带来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "친구를 집에 데려왔어요.",
            sentenceMeaning: "I brought a friend home.",
            sentenceZh: "把朋友带回家了。"
        },
        {
            kr: "도와주다",
            en: "To help",
            zh: "帮助",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "어려운 사람을 도와주세요.",
            sentenceMeaning: "Please help people in need.",
            sentenceZh: "请帮助有困难的人。"
        },
        {
            kr: "도움",
            en: "Help/Assistance",
            zh: "帮助",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "많은 도움을 받았습니다.",
            sentenceMeaning: "I received a lot of help.",
            sentenceZh: "得到了很多帮助。"
        },
        {
            kr: "도착",
            en: "Arrival",
            zh: "到达",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "비행기 도착 시간이 늦어졌어요.",
            sentenceMeaning: "The plane's arrival time was delayed.",
            sentenceZh: "飞机的到达时间推迟了。"
        },
        {
            kr: "돌다",
            en: "To turn/rotate",
            zh: "转/旋转",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "지구가 태양 주위를 돌아요.",
            sentenceMeaning: "The Earth rotates around the sun.",
            sentenceZh: "地球绕着太阳转。"
        },
        {
            kr: "돌려주다",
            en: "To return/give back",
            zh: "还/归还",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "빌린 책을 내일 돌려줄게요.",
            sentenceMeaning: "I will return the borrowed book tomorrow.",
            sentenceZh: "明天会归还借的书。"
        },
        {
            kr: "돌리다",
            en: "To turn/spin",
            zh: "转动/分发",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "손잡이를 오른쪽으로 돌리세요.",
            sentenceMeaning: "Please turn the handle to the right.",
            sentenceZh: "请向右转动手柄。"
        },
        {
            kr: "돌아가다",
            en: "To go back/return",
            zh: "回去/回转",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "빨리 집으로 돌아가세요.",
            sentenceMeaning: "Please go home quickly.",
            sentenceZh: "请快点回家。"
        },
        {
            kr: "돌아오다",
            en: "To come back/return",
            zh: "回来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "내일 고향에서 돌아와요.",
            sentenceMeaning: "I'm coming back from my hometown tomorrow.",
            sentenceZh: "明天从老家回来。"
        },
        {
            kr: "돕다",
            en: "To help",
            zh: "帮/帮助",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "부모님 일을 도와드려요.",
            sentenceMeaning: "I help my parents with their work.",
            sentenceZh: "帮助父母做事。"
        },
        {
            kr: "녹색",
            en: "Green",
            zh: "绿色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "녹색 숲이 보여요.",
            sentenceMeaning: "I see a green forest.",
            sentenceZh: "看到绿色的森林。"
        },
        {
            kr: "높다",
            en: "High",
            zh: "高",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "산이 높아요.",
            sentenceMeaning: "The mountain is high.",
            sentenceZh: "山很高。"
        },
        {
            kr: "높이",
            en: "High (adverb)",
            zh: "高高地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "높이 날아요.",
            sentenceMeaning: "Fly high.",
            sentenceZh: "高高飞翔。"
        },
        {
            kr: "느리다",
            en: "Slow",
            zh: "慢",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "걸음이 느려요.",
            sentenceMeaning: "The steps are slow.",
            sentenceZh: "走路很慢。"
        },
        {
            kr: "늘",
            en: "Always",
            zh: "总是",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "늘 고마워요.",
            sentenceMeaning: "I am always thankful.",
            sentenceZh: "总是很感谢。"
        },
        {
            kr: "능력",
            en: "Ability",
            zh: "能力",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "능력이 있어요.",
            sentenceMeaning: "He has the ability.",
            sentenceZh: "有能力。"
        },
        {
            kr: "다",
            en: "All",
            zh: "全",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "다 먹었어요.",
            sentenceMeaning: "I ate it all.",
            sentenceZh: "全吃完了。"
        },
        {
            kr: "다르다",
            en: "Different",
            zh: "不同",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "모양이 달라요.",
            sentenceMeaning: "The shapes are different.",
            sentenceZh: "形状不同。"
        },
        {
            kr: "다른",
            en: "Other",
            zh: "其他",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "다른 거 주세요.",
            sentenceMeaning: "Please give me another one.",
            sentenceZh: "请给我其他的。"
        },
        {
            kr: "다섯째",
            en: "Fifth",
            zh: "第五个",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "다섯째 사람이에요.",
            sentenceMeaning: "It's the fifth person.",
            sentenceZh: "是第五个人。"
        },
        {
            kr: "다시",
            en: "Again",
            zh: "再次",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "다시 시작해요.",
            sentenceMeaning: "Start again.",
            sentenceZh: "再次开始。"
        },
        {
            kr: "다양",
            en: "Variety",
            zh: "多样",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "다양한 방법이 있어요.",
            sentenceMeaning: "There are various methods.",
            sentenceZh: "有各种各样的方法。"
        },
        {
            kr: "다음",
            en: "Next",
            zh: "下一个",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "다음 날 만나요.",
            sentenceMeaning: "Meet the next day.",
            sentenceZh: "第二天见。"
        },
        {
            kr: "단순",
            en: "Simple",
            zh: "简单",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "생각이 단순해요.",
            sentenceMeaning: "Thinking is simple.",
            sentenceZh: "想法很单纯。"
        },
        {
            kr: "답답하다",
            en: "Frustrated/Stuffy",
            zh: "郁闷",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "가슴이 답답해요.",
            sentenceMeaning: "I feel frustrated.",
            sentenceZh: "心里很郁闷。"
        },
        {
            kr: "대부분",
            en: "Most",
            zh: "大部分",
            pos: "Noun/Adverb",
            category: "descriptions_qualities",
            sentenceKr: "대부분의 사람들은 이 사실을 알고 있습니다.",
            sentenceMeaning: "Most people know this fact.",
            sentenceZh: "大多数人都知道这个事实。"
        },
        {
            kr: "더",
            en: "More",
            zh: "更/再",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "커피 한 잔 더 주세요.",
            sentenceMeaning: "Please give me one more cup of coffee.",
            sentenceZh: "请再给我一杯咖啡。"
        },
        {
            kr: "더럽다",
            en: "Dirty",
            zh: "脏",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "방이 아주 더러워요.",
            sentenceMeaning: "The room is very dirty.",
            sentenceZh: "房间很脏。"
        },
        {
            kr: "더욱",
            en: "More/Even more",
            zh: "更加",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "공부를 더욱 열심히 하세요.",
            sentenceMeaning: "Please study even harder.",
            sentenceZh: "请更加努力学习。"
        },
        {
            kr: "덕분",
            en: "Thanks to",
            zh: "多亏",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "선생님 덕분에 합격했어요.",
            sentenceMeaning: "I passed thanks to the teacher.",
            sentenceZh: "多亏老师，我考上了。"
        },
        {
            kr: "단추",
            en: "button",
            zh: "纽扣",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "단추가 떨어져요.",
            sentenceMeaning: "The button falls off.",
            sentenceZh: "按钮脱落。"
        }
    ],
    beginner_cycle_5: [
        {
            kr: "돼지고기",
            en: "Pork",
            zh: "猪肉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "저녁에 돼지고기를 구워 먹었어요.",
            sentenceMeaning: "I grilled and ate pork for dinner.",
            sentenceZh: "晚上烤猪肉吃了。"
        },
        {
            kr: "된장찌개",
            en: "Soybean paste stew",
            zh: "大酱汤",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "구수한 된장찌개가 맛있어요.",
            sentenceMeaning: "The savory soybean paste stew is delicious.",
            sentenceZh: "香浓的大酱汤很好吃。"
        },
        {
            kr: "떡",
            en: "Rice cake",
            zh: "糕/年糕",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "명절에 떡을 만들었어요.",
            sentenceMeaning: "We made rice cakes for the holiday.",
            sentenceZh: "节日里做了年糕。"
        },
        {
            kr: "떡국",
            en: "Rice cake soup",
            zh: "年糕汤",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "설날에 떡국을 먹어요.",
            sentenceMeaning: "We eat rice cake soup on New Year's Day.",
            sentenceZh: "元旦吃年糕汤。"
        },
        {
            kr: "라면",
            en: "Ramen/Instant noodles",
            zh: "拉面/方便面",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "밤에 먹는 라면이 제일 맛있어요.",
            sentenceMeaning: "Ramen eaten at night is the most delicious.",
            sentenceZh: "晚上吃的拉面最香。"
        },
        {
            kr: "레스토랑",
            en: "Restaurant",
            zh: "餐厅/餐馆",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "레스토랑에서 스테이크를 먹었어요.",
            sentenceMeaning: "I ate steak at a restaurant.",
            sentenceZh: "在餐厅吃了牛排。"
        },
        {
            kr: "마시다",
            en: "To drink",
            zh: "喝",
            pos: "Verb",
            category: "food_dining",
            sentenceKr: "물을 자주 마시는 게 좋아요.",
            sentenceMeaning: "It's good to drink water often.",
            sentenceZh: "经常喝水比较好。"
        },
        {
            kr: "막걸리",
            en: "Makgeolli",
            zh: "米酒",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "막걸리를 마셔요.",
            sentenceMeaning: "I drink Makgeolli.",
            sentenceZh: "喝米酒。"
        },
        {
            kr: "만두",
            en: "Dumpling",
            zh: "饺子",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "만두가 아주 맛있어요.",
            sentenceMeaning: "The dumplings are very delicious.",
            sentenceZh: "饺子很好吃。"
        },
        {
            kr: "맛",
            en: "Taste",
            zh: "味道",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "이 음식은 맛이 좋아요.",
            sentenceMeaning: "This food tastes good.",
            sentenceZh: "这道菜味道很好。"
        },
        {
            kr: "맛없다",
            en: "Tasteless",
            zh: "不好吃",
            pos: "Adjective",
            category: "food_dining",
            sentenceKr: "이 빵은 맛없어요.",
            sentenceMeaning: "This bread is not delicious.",
            sentenceZh: "这个面包不好吃。"
        },
        {
            kr: "맛있다",
            en: "Delicious",
            zh: "好吃",
            pos: "Adjective",
            category: "food_dining",
            sentenceKr: "한국 음식이 맛있어요.",
            sentenceMeaning: "Korean food is delicious.",
            sentenceZh: "韩国菜很好吃。"
        },
        {
            kr: "맥주",
            en: "Beer",
            zh: "啤酒",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "시원한 맥주 한 잔 하세요.",
            sentenceMeaning: "Have a cold glass of beer.",
            sentenceZh: "喝杯凉啤酒吧。"
        },
        {
            kr: "맵다",
            en: "Spicy",
            zh: "辣",
            pos: "Adjective",
            category: "food_dining",
            sentenceKr: "김치가 조금 매워요.",
            sentenceMeaning: "The Kimchi is a bit spicy.",
            sentenceZh: "泡菜有点辣。"
        },
        {
            kr: "먹다",
            en: "To eat",
            zh: "吃",
            pos: "Verb",
            category: "food_dining",
            sentenceKr: "점심을 맛있게 먹었어요.",
            sentenceMeaning: "I enjoyed my lunch.",
            sentenceZh: "吃了美味的午餐。"
        },
        {
            kr: "동전",
            en: "Coin",
            zh: "硬币",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "백 원짜리 동전 세 개가 있어요.",
            sentenceMeaning: "I have three 100-won coins.",
            sentenceZh: "有三个一百韩元的硬币。"
        },
        {
            kr: "된장",
            en: "Soybean paste",
            zh: "大酱",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "된장으로 국을 끓여요.",
            sentenceMeaning: "I boil soup with soybean paste.",
            sentenceZh: "用大酱煮汤。"
        },
        {
            kr: "두부",
            en: "Tofu",
            zh: "豆腐",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "두부로 요리를 했어요.",
            sentenceMeaning: "I cooked with tofu.",
            sentenceZh: "用豆腐做了料理。"
        },
        {
            kr: "드라마",
            en: "Drama",
            zh: "电视剧",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "요즘 한국 드라마가 인기예요.",
            sentenceMeaning: "Korean dramas are popular these days.",
            sentenceZh: "最近韩剧很受欢迎。"
        },
        {
            kr: "라디오",
            en: "Radio",
            zh: "收音机",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "차에서 라디오를 들어요.",
            sentenceMeaning: "I listen to the radio in the car.",
            sentenceZh: "在车里听收音机。"
        },
        {
            kr: "마당",
            en: "Yard/Garden",
            zh: "院子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "강아지가 마당에서 놀고 있어요.",
            sentenceMeaning: "The puppy is playing in the yard.",
            sentenceZh: "小狗正在院子里玩。"
        },
        {
            kr: "만화",
            en: "Cartoon/Comic",
            zh: "漫画",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "만화 그리는 것을 좋아해요.",
            sentenceMeaning: "I like drawing cartoons.",
            sentenceZh: "喜欢画漫画。"
        },
        {
            kr: "땅",
            en: "Land/Ground",
            zh: "土地/地上",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "땅이 비에 젖어서 질어요.",
            sentenceMeaning: "The ground is muddy because of the rain.",
            sentenceZh: "地被雨淋湿了，很泥泞。"
        },
        {
            kr: "러시아",
            en: "Russia",
            zh: "俄罗斯",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "러시아는 아주 넓은 나라예요.",
            sentenceMeaning: "Russia is a very large country.",
            sentenceZh: "俄罗斯是一个非常辽阔的国家。"
        },
        {
            kr: "마을",
            en: "Village",
            zh: "村庄/小镇",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "우리 마을은 인심이 아주 좋아요.",
            sentenceMeaning: "Our village is very warm-hearted.",
            sentenceZh: "我们村的人心很好。"
        },
        {
            kr: "매표소",
            en: "Ticket office",
            zh: "售票处",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "매표소에서 표를 사요.",
            sentenceMeaning: "Buy tickets at the ticket office.",
            sentenceZh: "在售票处买票。"
        },
        {
            kr: "동생",
            en: "Younger sibling",
            zh: "弟弟/妹妹",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "동생이랑 같이 학교에 가요.",
            sentenceMeaning: "I go to school with my younger sibling.",
            sentenceZh: "和弟弟（或妹妹）一起去学校。"
        },
        {
            kr: "등",
            en: "Back",
            zh: "背",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "가방이 무거워서 등이 아파요.",
            sentenceMeaning: "My back hurts because the bag is heavy.",
            sentenceZh: "包太沉，背疼。"
        },
        {
            kr: "딸",
            en: "Daughter",
            zh: "女儿",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 딸은 그림을 아주 잘 그려요.",
            sentenceMeaning: "Our daughter draws very well.",
            sentenceZh: "我女儿画画画得很好。"
        },
        {
            kr: "머리",
            en: "Head",
            zh: "头",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "머리가 너무 아파요.",
            sentenceMeaning: "My head hurts so much.",
            sentenceZh: "头很疼。"
        },
        {
            kr: "머리카락",
            en: "Hair",
            zh: "头发",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "머리카락을 잘랐어요.",
            sentenceMeaning: "I cut my hair.",
            sentenceZh: "剪头发了。"
        },
        {
            kr: "마음",
            en: "Mind/Heart",
            zh: "心/心情",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "마음이 아주 따뜻한 사람이에요.",
            sentenceMeaning: "He is a person with a very warm heart.",
            sentenceZh: "是个内心很温暖的人。"
        },
        {
            kr: "돼지",
            en: "Pig",
            zh: "猪",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "돼지가 꿀꿀 소리를 내요.",
            sentenceMeaning: "The pig makes an oink sound.",
            sentenceZh: "猪发出哼哼的声音。"
        },
        {
            kr: "등산",
            en: "Hiking/Mountain climbing",
            zh: "登山/爬山",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "주말에 친구들과 등산을 갔어요.",
            sentenceMeaning: "I went hiking with friends over the weekend.",
            sentenceZh: "周末和朋友们去爬山了。"
        },
        {
            kr: "딸기",
            en: "Strawberry",
            zh: "草莓",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "달콤한 딸기가 제철이에요.",
            sentenceMeaning: "Sweet strawberries are in season.",
            sentenceZh: "又甜又美的草莓正是季节。"
        },
        {
            kr: "마리",
            en: "Counter for animals",
            zh: "只/头",
            pos: "Counter",
            category: "nature_animals_plants",
            sentenceKr: "고양이 두 마리를 키워요.",
            sentenceMeaning: "I raise two cats.",
            sentenceZh: "养了两只猫。"
        },
        {
            kr: "말레이시아",
            en: "Malaysia",
            zh: "马来西亚",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "저는 말레이시아에서 왔어요.",
            sentenceMeaning: "I am from Malaysia.",
            sentenceZh: "我来自马来西亚。"
        },
        {
            kr: "동시",
            en: "same time",
            zh: "同时",
            pos: "명사",
            category: "time_seasons",
            sentenceKr: "동시에 일어나요.",
            sentenceMeaning: "wake up at the same time",
            sentenceZh: "同时醒来"
        },
        {
            kr: "동안",
            en: "Duration/Period",
            zh: "期间/一段时间",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "사흘 동안 비가 왔어요.",
            sentenceMeaning: "It rained for three days.",
            sentenceZh: "下了三天的雨。"
        },
        {
            kr: "둘째",
            en: "second",
            zh: "第二",
            pos: "수사·관형사/명사",
            category: "time_seasons",
            sentenceKr: "이 아이는 제 둘째 아이예요.",
            sentenceMeaning: "This child is my second child.",
            sentenceZh: "这个孩子是我的第二个孩子。"
        },
        {
            kr: "때",
            en: "Time/When",
            zh: "时候",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "어릴 때 생각이 나요.",
            sentenceMeaning: "I remember when I was young.",
            sentenceZh: "想起了小时候。"
        },
        {
            kr: "떡볶이",
            en: "Tteokbokki",
            zh: "炒年糕",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "시장 떡볶이가 정말 매워요.",
            sentenceMeaning: "The market tteokbokki is really spicy.",
            sentenceZh: "市场的炒年糕非常辣。"
        },
        {
            kr: "떨어지다",
            en: "To fall/drop/run out of",
            zh: "掉/落/用尽",
            pos: "Verb",
            category: "time_seasons",
            sentenceKr: "볼펜을 바닥에 떨어뜨렸어요.",
            sentenceMeaning: "I dropped the ballpoint pen on the floor.",
            sentenceZh: "把圆珠笔掉到地上了。"
        },
        {
            kr: "뛰어가다",
            en: "To run (there)",
            zh: "跑过去",
            pos: "Verb",
            category: "time_seasons",
            sentenceKr: "동생이 학교로 뛰어가요.",
            sentenceMeaning: "My younger brother is running to school.",
            sentenceZh: "弟弟跑着去学校。"
        },
        {
            kr: "매년",
            en: "Every year",
            zh: "每年",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "매년 한국에 가요.",
            sentenceMeaning: "I go to Korea every year.",
            sentenceZh: "每年都去韩国。"
        },
        {
            kr: "매달",
            en: "Every month",
            zh: "每月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "매달 저축을 해요.",
            sentenceMeaning: "I save money every month.",
            sentenceZh: "每个月都攒钱。"
        },
        {
            kr: "매일",
            en: "Every day",
            zh: "每天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "매일 운동을 해요.",
            sentenceMeaning: "I exercise every day.",
            sentenceZh: "每天都运动。"
        },
        {
            kr: "매주",
            en: "Every week",
            zh: "每周",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "매주 등산을 가요.",
            sentenceMeaning: "I go hiking every week.",
            sentenceZh: "每周都去爬山。"
        },
        {
            kr: "되다",
            en: "To become/be",
            zh: "成为/行",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "커서 의사가 되고 싶어요.",
            sentenceMeaning: "I want to become a doctor when I grow up.",
            sentenceZh: "长大后想成为医生。"
        },
        {
            kr: "두다",
            en: "To put/leave",
            zh: "放/搁",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "책상 위에 가방을 두었어요.",
            sentenceMeaning: "I put my bag on the desk.",
            sentenceZh: "把包放在桌子上了。"
        },
        {
            kr: "드리다",
            en: "To give (Honorific)",
            zh: "给/奉送",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "할머니께 선물을 드렸어요.",
            sentenceMeaning: "I gave a gift to my grandmother.",
            sentenceZh: "给奶奶送了礼物。"
        },
        {
            kr: "듣다",
            en: "To listen/hear",
            zh: "听",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "음악을 듣는 것을 좋아해요.",
            sentenceMeaning: "I like listening to music.",
            sentenceZh: "我喜欢听音乐。"
        },
        {
            kr: "들다",
            en: "To lift/carry/cost/enter",
            zh: "提/拿/费/进",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "무거운 짐을 들었어요.",
            sentenceMeaning: "I lifted heavy luggage.",
            sentenceZh: "拿了沉重的行李。"
        },
        {
            kr: "들르다",
            en: "To drop by",
            zh: "顺便去",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "집에 가는 길에 편의점에 들렀어요.",
            sentenceMeaning: "I dropped by a convenience store on my way home.",
            sentenceZh: "回家的路上顺便去了趟便利店。"
        },
        {
            kr: "들리다",
            en: "To be heard",
            zh: "听见/响起",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "멀리서 파도 소리가 들려요.",
            sentenceMeaning: "I can hear the sound of waves from afar.",
            sentenceZh: "听见远处传来的海浪声。"
        },
        {
            kr: "들어가다",
            en: "To go in/enter",
            zh: "进去",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "수업 시간에 늦게 들어갔어요.",
            sentenceMeaning: "I went into the class late.",
            sentenceZh: "上课迟到了（进教室晚了）。"
        },
        {
            kr: "들어오다",
            en: "To come in/enter",
            zh: "进来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "추우니까 빨리 방으로 들어오세요.",
            sentenceMeaning: "It's cold, so please come into the room quickly.",
            sentenceZh: "天冷，快进屋吧。"
        },
        {
            kr: "디자인",
            en: "Design",
            zh: "设计",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "이 옷은 디자인이 아주 예뻐요.",
            sentenceMeaning: "This clothing has a very pretty design.",
            sentenceZh: "这件衣服的设计非常漂亮。"
        },
        {
            kr: "떠나다",
            en: "To leave/depart",
            zh: "离开/出发",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "기차가 역을 떠났어요.",
            sentenceMeaning: "The train has left the station.",
            sentenceZh: "火车离开车站了。"
        },
        {
            kr: "떠들다",
            en: "To make noise/chatter",
            zh: "吵闹/喧哗",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "교실에서 너무 떠들면 안 돼요.",
            sentenceMeaning: "You shouldn't make too much noise in the classroom.",
            sentenceZh: "不可以在教室里太吵闹。"
        },
        {
            kr: "뛰다",
            en: "To run/jump",
            zh: "跑/跳",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "지각할까 봐 빨리 뛰었어요.",
            sentenceMeaning: "I ran fast for fear of being late.",
            sentenceZh: "怕迟到，飞快地跑了。"
        },
        {
            kr: "뜨다",
            en: "To open eyes/float/rise",
            zh: "睁开/浮/升",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "아침 일찍 눈을 떴어요.",
            sentenceMeaning: "I opened my eyes early in the morning.",
            sentenceZh: "一大早就睁开了眼。"
        },
        {
            kr: "마치다",
            en: "To finish/complete",
            zh: "结束/完成",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "수업을 마친 후에 운동을 해요.",
            sentenceMeaning: "I exercise after finishing class.",
            sentenceZh: "下课后做运动。"
        },
        {
            kr: "막히다",
            en: "Blocked/Congested",
            zh: "堵/塞",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "길이 많이 막혀요.",
            sentenceMeaning: "The road is very congested.",
            sentenceZh: "路很堵。"
        },
        {
            kr: "만나다",
            en: "To meet",
            zh: "见面",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "친구를 만나요.",
            sentenceMeaning: "I meet a friend.",
            sentenceZh: "和朋友见面。"
        },
        {
            kr: "만들다",
            en: "To make",
            zh: "做",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "음식을 만들어요.",
            sentenceMeaning: "I am making food.",
            sentenceZh: "做饭。"
        },
        {
            kr: "만지다",
            en: "To touch",
            zh: "摸",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "손으로 만지지 마세요.",
            sentenceMeaning: "Please don't touch it with your hands.",
            sentenceZh: "请勿用手摸。"
        },
        {
            kr: "말다",
            en: "To stop/Don't",
            zh: "别/停止",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "걱정하지 마세요.",
            sentenceMeaning: "Please don't worry.",
            sentenceZh: "请别担心。"
        },
        {
            kr: "말씀",
            en: "Speech (Honorific)",
            zh: "话",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "선생님 말씀이 맞아요.",
            sentenceMeaning: "The teacher's words are correct.",
            sentenceZh: "老师的话是对的。"
        },
        {
            kr: "맞다",
            en: "To be correct",
            zh: "对",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "정답이 맞아요.",
            sentenceMeaning: "The answer is correct.",
            sentenceZh: "答案是对的。"
        },
        {
            kr: "맞추다",
            en: "To adjust/set",
            zh: "对准/调",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "시계를 맞췄어요.",
            sentenceMeaning: "I set the clock.",
            sentenceZh: "调了表。"
        },
        {
            kr: "매다",
            en: "To tie",
            zh: "系",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "넥타이를 매요.",
            sentenceMeaning: "I tie a necktie.",
            sentenceZh: "系领带。"
        },
        {
            kr: "동쪽",
            en: "East",
            zh: "东/东边",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "해는 동쪽에서 떠요.",
            sentenceMeaning: "The sun rises in the east.",
            sentenceZh: "太阳从东方升起。"
        },
        {
            kr: "두",
            en: "Two",
            zh: "两",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "사과 두 개 주세요.",
            sentenceMeaning: "Please give me two apples.",
            sentenceZh: "请给我两个苹果。"
        },
        {
            kr: "두껍다",
            en: "Thick",
            zh: "厚",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "이 사전은 아주 두꺼워요.",
            sentenceMeaning: "This dictionary is very thick.",
            sentenceZh: "这本词典非常厚。"
        },
        {
            kr: "두세",
            en: "Two or three",
            zh: "两三个",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "두세 명 정도 더 올 거예요.",
            sentenceMeaning: "About two or three more people will come.",
            sentenceZh: "大概还会再来两三个人。"
        },
        {
            kr: "둘",
            en: "Two",
            zh: "二/两个",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "하나 더하기 하나는 둘이에요.",
            sentenceMeaning: "One plus one is two.",
            sentenceZh: "一加一等于二。"
        },
        {
            kr: "뒤",
            en: "Behind/Back",
            zh: "后/后面",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "건물 뒤에 주차장이 있어요.",
            sentenceMeaning: "There is a parking lot behind the building.",
            sentenceZh: "建筑物后面有停车场。"
        },
        {
            kr: "드디어",
            en: "Finally",
            zh: "终于",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "드디어 시험이 끝났어요.",
            sentenceMeaning: "Finally, the exam is over.",
            sentenceZh: "考试终于结束了。"
        },
        {
            kr: "따뜻하다",
            en: "To be warm",
            zh: "暖和/温暖",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "따뜻한 차 한 잔 마시고 싶어요.",
            sentenceMeaning: "I want to drink a cup of warm tea.",
            sentenceZh: "想喝杯热茶。"
        },
        {
            kr: "따로",
            en: "Separately",
            zh: "单独/另外",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "포장을 따로따로 해 주세요.",
            sentenceMeaning: "Please pack them separately.",
            sentenceZh: "请分别包装。"
        },
        {
            kr: "또",
            en: "Again/And",
            zh: "又/再",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "우리 다음에 또 만나요.",
            sentenceMeaning: "Let's meet again next time.",
            sentenceZh: "我们下次再见吧。"
        },
        {
            kr: "또는",
            en: "Or",
            zh: "或者/或",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "월요일 또는 화요일에 갈게요.",
            sentenceMeaning: "I'll go on Monday or Tuesday.",
            sentenceZh: "我会在周一 or 周二去。"
        },
        {
            kr: "똑같다",
            en: "Exactly the same",
            zh: "一模一样",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "둘의 목소리가 똑같아요.",
            sentenceMeaning: "The two voices are exactly the same.",
            sentenceZh: "两人的声音一模一样。"
        },
        {
            kr: "똑같이",
            en: "Equally/Exactly the same",
            zh: "同样/一模一样地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "케이크를 똑같이 나누어 먹어요.",
            sentenceMeaning: "Share and eat the cake equally.",
            sentenceZh: "平分蛋糕吃。"
        },
        {
            kr: "똑똑하다",
            en: "To be smart/clever",
            zh: "聪明",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "그 아이는 아주 똑똑해요.",
            sentenceMeaning: "That child is very smart.",
            sentenceZh: "那个孩子非常聪明。"
        },
        {
            kr: "똑바로",
            en: "Straight/Correctly",
            zh: "一直/挺直",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "허리를 똑바로 펴고 앉으세요.",
            sentenceMeaning: "Please sit with your back straight.",
            sentenceZh: "请挺直腰坐好。"
        },
        {
            kr: "뚱뚱하다",
            en: "To be fat/chubby",
            zh: "胖/肥胖",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "운동을 안 해서 몸이 뚱뚱해졌어요.",
            sentenceMeaning: "I became fat because I didn't exercise.",
            sentenceZh: "因为不运动，身体变胖了。"
        },
        {
            kr: "뜨겁다",
            en: "To be hot (to the touch)",
            zh: "烫/热",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "커피가 너무 뜨거우니 조심하세요.",
            sentenceMeaning: "The coffee is very hot, so be careful.",
            sentenceZh: "咖啡很烫，请小心。"
        },
        {
            kr: "뜻",
            en: "Meaning/Intent",
            zh: "意思/用意",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이 단어의 뜻이 뭐예요?",
            sentenceMeaning: "What is the meaning of this word?",
            sentenceZh: "这个单词是什么意思？"
        },
        {
            kr: "마르다",
            en: "To dry/be thin",
            zh: "干/瘦",
            pos: "Verb/Adjective",
            category: "descriptions_qualities",
            sentenceKr: "빨래가 햇볕에 잘 말랐어요.",
            sentenceMeaning: "The laundry dried well in the sun.",
            sentenceZh: "衣服在阳光下晒干了。"
        },
        {
            kr: "마지막",
            en: "Last",
            zh: "最后",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이번이 마지막 기회예요.",
            sentenceMeaning: "This is the last opportunity.",
            sentenceZh: "这是最后一次机会。"
        },
        {
            kr: "마흔",
            en: "Forty",
            zh: "四十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "아버지는 올해 마흔이십니다.",
            sentenceMeaning: "My father is forty years old this year.",
            sentenceZh: "父亲今年四十岁。"
        },
        {
            kr: "만",
            en: "Ten thousand",
            zh: "万",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "이 가방은 만 원이에요.",
            sentenceMeaning: "This bag is 10,000 won.",
            sentenceZh: "这个包一万韩元。"
        },
        {
            kr: "만약",
            en: "If/Supposing",
            zh: "万一/如果",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "만약 비가 오면 어떡해요?",
            sentenceMeaning: "What if it rains?",
            sentenceZh: "如果下雨怎么办？"
        },
        {
            kr: "만일",
            en: "If/Just in case",
            zh: "万一",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "만일의 경우를 생각해요.",
            sentenceMeaning: "Think about just in case.",
            sentenceZh: "考虑万一的情况。"
        },
        {
            kr: "많다",
            en: "Many/Much",
            zh: "多",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "사람이 아주 많아요.",
            sentenceMeaning: "There are many people.",
            sentenceZh: "人很多。"
        },
        {
            kr: "많이",
            en: "A lot",
            zh: "很多/多地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "밥을 많이 먹었어요.",
            sentenceMeaning: "I ate a lot of rice.",
            sentenceZh: "吃了很多饭。"
        },
        {
            kr: "말",
            en: "End",
            zh: "末",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이번 달 말에 만나요.",
            sentenceMeaning: "Let's meet at the end of this month.",
            sentenceZh: "这个月底见面吧。"
        },
        {
            kr: "맑다",
            en: "Clear",
            zh: "晴朗/清澈",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "오늘 하늘이 아주 맑아요.",
            sentenceMeaning: "Today the sky is very clear.",
            sentenceZh: "今天天气很晴朗。"
        },
        {
            kr: "매우",
            en: "Very",
            zh: "非常",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "한국말은 매우 어려워요.",
            sentenceMeaning: "Korean is very difficult.",
            sentenceZh: "韩语非常难。"
        },
        {
            kr: "먼저",
            en: "First",
            zh: "首先",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "먼저 가세요.",
            sentenceMeaning: "Please go first.",
            sentenceZh: "您先走。"
        },
        {
            kr: "멀다",
            en: "Far",
            zh: "远",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "학교가 집에서 멀어요.",
            sentenceMeaning: "School is far from home.",
            sentenceZh: "学校离家很远。"
        },
        {
            kr: "-되다",
            en: "to become",
            zh: "成为",
            pos: "접사",
            category: "miscellaneous",
            sentenceKr: "-되다 취소돼요.",
            sentenceMeaning: "- It gets cancelled.",
            sentenceZh: "- 它被取消了。"
        },
        {
            kr: "두통",
            en: "headache",
            zh: "头痛",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "두통을 앓아요.",
            sentenceMeaning: "I have a headache.",
            sentenceZh: "我头疼。"
        },
        {
            kr: "뒤쪽",
            en: "back side",
            zh: "后面",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "뒤쪽으로 걸어가세요.",
            sentenceMeaning: "Please walk to the back.",
            sentenceZh: "请往后边走。"
        },
        {
            kr: "땀",
            en: "sweat",
            zh: "汗",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "땀이 나요.",
            sentenceMeaning: "I'm sweating.",
            sentenceZh: "我出汗了。"
        },
        {
            kr: "마중",
            en: "meeting, picking up",
            zh: "迎接",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "마중을 가요.",
            sentenceMeaning: "Let's meet you.",
            sentenceZh: "我们来见见你吧。"
        },
        {
            kr: "마트",
            en: "mart, supermarket",
            zh: "超市",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "마트 에서 사요.",
            sentenceMeaning: "I buy it at the supermarket.",
            sentenceZh: "我在超市买的。"
        }
    ],
    beginner_cycle_6: [
        {
            kr: "무",
            en: "Radish",
            zh: "萝卜",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "무로 국을 끓여요.",
            sentenceMeaning: "I boil soup with radish.",
            sentenceZh: "用萝卜煮汤。"
        },
        {
            kr: "물",
            en: "Water",
            zh: "水",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "시원한 물 좀 주세요.",
            sentenceMeaning: "Please give some cold water.",
            sentenceZh: "请给我点凉水。"
        },
        {
            kr: "물고기",
            en: "Fish",
            zh: "鱼",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "바다에 물고기가 살아요.",
            sentenceMeaning: "Fish live in the sea.",
            sentenceZh: "海里生活着鱼。"
        },
        {
            kr: "미역국",
            en: "Seaweed Soup",
            zh: "海带汤",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "생일에 미역국을 먹어요.",
            sentenceMeaning: "I eat seaweed soup on my birthday.",
            sentenceZh: "过生日喝海带汤。"
        },
        {
            kr: "밀가루",
            en: "Flour",
            zh: "面粉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "밀가루로 빵을 만들어요.",
            sentenceMeaning: "I make bread with flour.",
            sentenceZh: "用面粉做面包。"
        },
        {
            kr: "바나나",
            en: "Banana",
            zh: "香蕉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "바나나는 노란색이에요.",
            sentenceMeaning: "Bananas are yellow.",
            sentenceZh: "香蕉是黄色的。"
        },
        {
            kr: "반찬",
            en: "Side dish",
            zh: "小菜",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "반찬이 아주 맛있어요.",
            sentenceMeaning: "The side dishes are very delicious.",
            sentenceZh: "小菜很好吃。"
        },
        {
            kr: "밥",
            en: "Rice/Meal",
            zh: "饭",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "밥을 맛있게 먹어요.",
            sentenceMeaning: "I eat a delicious meal.",
            sentenceZh: "吃香喷喷的饭。"
        },
        {
            kr: "반",
            en: "Class",
            zh: "班",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "우리 반 친구들이 많아요.",
            sentenceMeaning: "There are many friends in my class.",
            sentenceZh: "我们班朋友很多。"
        },
        {
            kr: "받아쓰다",
            en: "To take dictation",
            zh: "听写",
            pos: "Verb",
            category: "school_education",
            sentenceKr: "선생님 말씀을 받아써요.",
            sentenceMeaning: "Take dictation of the teacher's words.",
            sentenceZh: "听写老师的话。"
        },
        {
            kr: "메뉴",
            en: "Menu",
            zh: "菜单",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "메뉴판 좀 보여주세요.",
            sentenceMeaning: "Please show me the menu.",
            sentenceZh: "请给我看一下菜单。"
        },
        {
            kr: "메모",
            en: "Memo",
            zh: "笔记",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "중요한 내용을 메모해요.",
            sentenceMeaning: "Write down important contents.",
            sentenceZh: "记录重要的内容。"
        },
        {
            kr: "메시지",
            en: "Message",
            zh: "信息",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "친구에게 메시지를 보내요.",
            sentenceMeaning: "I send a message to a friend.",
            sentenceZh: "给朋友发信息。"
        },
        {
            kr: "모자",
            en: "Hat",
            zh: "帽子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "빨간 모자를 썼어요.",
            sentenceMeaning: "I wore a red hat.",
            sentenceZh: "戴了红帽子。"
        },
        {
            kr: "목걸이",
            en: "Necklace",
            zh: "项链",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "금 목걸이를 선물받았어요.",
            sentenceMeaning: "I received a gold necklace as a gift.",
            sentenceZh: "收到了一条金项链作为礼物。"
        },
        {
            kr: "목도리",
            en: "Scarf",
            zh: "围巾",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "겨울에는 목도리를 해요.",
            sentenceMeaning: "Wear a scarf in winter.",
            sentenceZh: "冬天围围巾。"
        },
        {
            kr: "목욕",
            en: "Bath",
            zh: "洗澡",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "자기 전에 목욕을 해요.",
            sentenceMeaning: "I take a bath before sleeping.",
            sentenceZh: "睡觉前洗澡。"
        },
        {
            kr: "문",
            en: "Door",
            zh: "门",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "문을 열어 주세요.",
            sentenceMeaning: "Please open the door.",
            sentenceZh: "请开门。"
        },
        {
            kr: "문제",
            en: "Problem/Question",
            zh: "问题",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "시험 문제가 어려웠어요.",
            sentenceMeaning: "The exam questions were difficult.",
            sentenceZh: "考试题很难。"
        },
        {
            kr: "물건",
            en: "Object/Thing",
            zh: "东西",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "가방에 물건이 많아요.",
            sentenceMeaning: "There are many things in the bag.",
            sentenceZh: "包里有很多东西。"
        },
        {
            kr: "바닥",
            en: "Floor/Bottom",
            zh: "地板/底",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "바닥에 앉아서 쉬어요.",
            sentenceMeaning: "Sit on the floor and rest.",
            sentenceZh: "坐在地板上休息。"
        },
        {
            kr: "바이올린",
            en: "Violin",
            zh: "小提琴",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "바이올린을 켜요.",
            sentenceMeaning: "Play the violin.",
            sentenceZh: "拉小提琴。"
        },
        {
            kr: "바지",
            en: "Pants",
            zh: "裤子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "청바지를 입어요.",
            sentenceMeaning: "I wear jeans.",
            sentenceZh: "穿牛仔裤。"
        },
        {
            kr: "반바지",
            en: "Shorts",
            zh: "短裤",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "여름에는 반바지를 입어요.",
            sentenceMeaning: "I wear shorts in summer.",
            sentenceZh: "夏天穿短裤。"
        },
        {
            kr: "반지",
            en: "Ring",
            zh: "戒指",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "반지를 꼈어요.",
            sentenceMeaning: "I wore a ring.",
            sentenceZh: "戴了戒指。"
        },
        {
            kr: "방",
            en: "Room",
            zh: "房间",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "방이 아주 깨끗해요.",
            sentenceMeaning: "The room is very clean.",
            sentenceZh: "房间很干净。"
        },
        {
            kr: "목욕탕",
            en: "Bathhouse",
            zh: "澡堂",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "동네 목욕탕에 갔어요.",
            sentenceMeaning: "I went to the neighborhood bathhouse.",
            sentenceZh: "去了小区澡堂。"
        },
        {
            kr: "몽골",
            en: "Mongolia",
            zh: "蒙古",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "몽골은 하늘이 예뻐요.",
            sentenceMeaning: "Mongolia has a beautiful sky.",
            sentenceZh: "蒙古的天空很漂亮。"
        },
        {
            kr: "미국",
            en: "USA",
            zh: "美国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "미국은 아주 큰 나라예요.",
            sentenceMeaning: "USA is a very large country.",
            sentenceZh: "美国是一个很大的国家。"
        },
        {
            kr: "미술관",
            en: "Museum/Art Gallery",
            zh: "美术馆/博物馆",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "국립 미술관에 가요.",
            sentenceMeaning: "I go to the National Art Gallery.",
            sentenceZh: "去国立美术馆。"
        },
        {
            kr: "미용실",
            en: "Beauty Salon",
            zh: "美容院",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "미용실에서 머리를 잘라요.",
            sentenceMeaning: "I cut my hair at the beauty salon.",
            sentenceZh: "在美容院剪头发。"
        },
        {
            kr: "밑",
            en: "Bottom/Under",
            zh: "下面",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "책상 밑에 가방이 있어요.",
            sentenceMeaning: "There is a bag under the desk.",
            sentenceZh: "书桌下面有包。"
        },
        {
            kr: "바깥",
            en: "Outside",
            zh: "外面",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "바깥 날씨가 아주 추워요.",
            sentenceMeaning: "The weather outside is very cold.",
            sentenceZh: "外面天气很冷。"
        },
        {
            kr: "바깥쪽",
            en: "Outer side",
            zh: "外侧",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "바깥쪽으로 나가 보세요.",
            sentenceMeaning: "Try going out to the outer side.",
            sentenceZh: "往外侧走走看。"
        },
        {
            kr: "박물관",
            en: "Museum",
            zh: "博物馆",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "박물관에서 옛날 물건을 봐요.",
            sentenceMeaning: "See old things at the museum.",
            sentenceZh: "在博物馆看老物件。"
        },
        {
            kr: "밖",
            en: "Outside",
            zh: "外",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "창밖을 봐요.",
            sentenceMeaning: "Look out the window.",
            sentenceZh: "看窗外。"
        },
        {
            kr: "방문",
            en: "Visit",
            zh: "回乡访问",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "고향을 방문해요.",
            sentenceMeaning: "I am visiting my hometown.",
            sentenceZh: "回乡访问。"
        },
        {
            kr: "명",
            en: "Person (counter)",
            zh: "名/位",
            pos: "Counter",
            category: "people_jobs_family",
            sentenceKr: "우리 가족은 네 명이에요.",
            sentenceMeaning: "There are four people in my family.",
            sentenceZh: "我家有四口人。"
        },
        {
            kr: "목",
            en: "Neck",
            zh: "脖子",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "목이 너무 말라요.",
            sentenceMeaning: "My throat is so dry.",
            sentenceZh: "嗓子很干。"
        },
        {
            kr: "목소리",
            en: "Voice",
            zh: "声音",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "목소리가 아주 좋아요.",
            sentenceMeaning: "Your voice is very good.",
            sentenceZh: "声音很好听。"
        },
        {
            kr: "몸",
            en: "Body",
            zh: "身体",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "몸이 안 좋아서 쉬었어요.",
            sentenceMeaning: "I rested because I was not feeling well.",
            sentenceZh: "身体不舒服，休息了。"
        },
        {
            kr: "무릎",
            en: "Knee",
            zh: "膝盖",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "무릎을 다쳤어요.",
            sentenceMeaning: "I hurt my knee.",
            sentenceZh: "膝盖受伤了。"
        },
        {
            kr: "발",
            en: "Foot",
            zh: "脚",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "발이 조금 아파요.",
            sentenceMeaning: "My feet hurt a bit.",
            sentenceZh: "脚有点疼。"
        },
        {
            kr: "발가락",
            en: "Toe",
            zh: "脚趾",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "발가락을 다쳤어요.",
            sentenceMeaning: "I hurt my toe.",
            sentenceZh: "脚趾受伤了。"
        },
        {
            kr: "무섭다",
            en: "Scary",
            zh: "害怕",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "공포 영화는 너무 무서워요.",
            sentenceMeaning: "Horror movies are so scary.",
            sentenceZh: "恐怖片太可怕了。"
        },
        {
            kr: "미안",
            en: "Sorry/Apology",
            zh: "抱歉",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "미안하다는 말을 해요.",
            sentenceMeaning: "Say 'I am sorry'.",
            sentenceZh: "说声抱歉。"
        },
        {
            kr: "믿다",
            en: "To believe/trust",
            zh: "相信",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "친구의 약속을 믿어요.",
            sentenceMeaning: "I believe my friend's promise.",
            sentenceZh: "相信朋友的约定。"
        },
        {
            kr: "바라다",
            en: "To hope/wish",
            zh: "希望",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "건강하기를 바라요.",
            sentenceMeaning: "I hope you stay healthy.",
            sentenceZh: "希望健康。"
        },
        {
            kr: "반갑다",
            en: "Glad/Happy to meet",
            zh: "高兴",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "만나서 반갑습니다.",
            sentenceMeaning: "Nice to meet you.",
            sentenceZh: "见到你很高兴。"
        },
        {
            kr: "반대",
            en: "Oppose/Against",
            zh: "反对",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "친구의 생각에 반대해요.",
            sentenceMeaning: "I oppose my friend's idea.",
            sentenceZh: "反对朋友的想法。"
        },
        {
            kr: "멋",
            en: "Style",
            zh: "帅气/风度",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "멋을 부려요.",
            sentenceMeaning: "Put on a stylish look.",
            sentenceZh: "耍帅。"
        },
        {
            kr: "모기",
            en: "Mosquito",
            zh: "蚊子",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "모기에 물렸어요.",
            sentenceMeaning: "I was bitten by a mosquito.",
            sentenceZh: "被蚊子咬了。"
        },
        {
            kr: "무궁화",
            en: "Rose of Sharon",
            zh: "木槿花",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "무궁화는 한국의 국화예요.",
            sentenceMeaning: "Rose of Sharon is Korea's national flower.",
            sentenceZh: "木槿花是韩国的国花。"
        },
        {
            kr: "바다",
            en: "Sea",
            zh: "大海",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "여름에 바다에 가요.",
            sentenceMeaning: "I go to the sea in summer.",
            sentenceZh: "夏天去大海。"
        },
        {
            kr: "바닷가",
            en: "Seashore",
            zh: "海边",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "바닷가에서 산책을 해요.",
            sentenceMeaning: "I take a walk along the seashore.",
            sentenceZh: "在海边散步。"
        },
        {
            kr: "바람",
            en: "Wind",
            zh: "风",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "바람이 시원하게 불어요.",
            sentenceMeaning: "The wind is blowing coolly.",
            sentenceZh: "风吹得很凉快。"
        },
        {
            kr: "바로",
            en: "Right/Immediately",
            zh: "马上/就",
            pos: "Adverb",
            category: "nature_animals_plants",
            sentenceKr: "바로 시작할게요.",
            sentenceMeaning: "I will start right away.",
            sentenceZh: "马上开始。"
        },
        {
            kr: "며칠",
            en: "A few days",
            zh: "几天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "며칠 동안 여행을 가요.",
            sentenceMeaning: "I'm going on a trip for a few days.",
            sentenceZh: "去旅游几天。"
        },
        {
            kr: "명절",
            en: "Holiday",
            zh: "节日",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "명절에 고향에 가요.",
            sentenceMeaning: "I go to my hometown during the holidays.",
            sentenceZh: "节日回老家。"
        },
        {
            kr: "모레",
            en: "Day after tomorrow",
            zh: "后天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "우리 모레 만나요.",
            sentenceMeaning: "Let's meet the day after tomorrow.",
            sentenceZh: "我们后天见。"
        },
        {
            kr: "목요일",
            en: "Thursday",
            zh: "星期四",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "목요일에 영화를 봐요.",
            sentenceMeaning: "I watch a movie on Thursday.",
            sentenceZh: "星期四看电影。"
        },
        {
            kr: "미래",
            en: "Future",
            zh: "未来",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "미래의 꿈이 뭐예요?",
            sentenceMeaning: "What is your dream for the future?",
            sentenceZh: "未来的梦想是什么？"
        },
        {
            kr: "밤",
            en: "Night",
            zh: "晚上",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "깊은 밤에 잠을 자요.",
            sentenceMeaning: "I sleep deep in the night.",
            sentenceZh: "深夜睡觉。"
        },
        {
            kr: "멈추다",
            en: "To stop",
            zh: "停止",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "차가 갑자기 멈췄어요.",
            sentenceMeaning: "The car suddenly stopped.",
            sentenceZh: "车突然停了。"
        },
        {
            kr: "메다",
            en: "To carry (on shoulder)",
            zh: "背",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "가방을 어깨에 멨어요.",
            sentenceMeaning: "I carried the bag on my shoulder.",
            sentenceZh: "把包背在肩上。"
        },
        {
            kr: "모르다",
            en: "To not know",
            zh: "不知道",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "그 소식은 잘 몰라요.",
            sentenceMeaning: "I don't know that news well.",
            sentenceZh: "不太清楚那个消息。"
        },
        {
            kr: "모시다",
            en: "To serve/accompany",
            zh: "陪/侍奉",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "부모님을 모시고 살아요.",
            sentenceMeaning: "I live with my parents.",
            sentenceZh: "和父母一起生活。"
        },
        {
            kr: "모으다",
            en: "To collect/gather",
            zh: "收集/积攒",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "우표를 모으는 게 취미예요.",
            sentenceMeaning: "Collecting stamps is my hobby.",
            sentenceZh: "收集邮票是我的爱好。"
        },
        {
            kr: "모이다",
            en: "To gather/assemble",
            zh: "聚集",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "광장에 사람들이 모였어요.",
            sentenceMeaning: "People gathered in the square.",
            sentenceZh: "广场上聚集了人们。"
        },
        {
            kr: "모임",
            en: "Meeting/Gathering",
            zh: "聚会",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "오늘 저녁에 모임이 있어요.",
            sentenceMeaning: "There is a meeting this evening.",
            sentenceZh: "今天晚上有聚会。"
        },
        {
            kr: "모자라다",
            en: "To be insufficient",
            zh: "不足/不够",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "시간이 좀 모자라요.",
            sentenceMeaning: "Time is a bit insufficient.",
            sentenceZh: "时间有点不够。"
        },
        {
            kr: "묻다",
            en: "To ask",
            zh: "问",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "길을 좀 물어볼게요.",
            sentenceMeaning: "I will ask for directions.",
            sentenceZh: "问一下路。"
        },
        {
            kr: "물어보다",
            en: "To ask",
            zh: "问",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "선생님께 물어보세요.",
            sentenceMeaning: "Please ask the teacher.",
            sentenceZh: "请问老师。"
        },
        {
            kr: "미끄러지다",
            en: "To slip",
            zh: "滑",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "빙판길에서 미끄러졌어요.",
            sentenceMeaning: "I slipped on the icy road.",
            sentenceZh: "在冰路上滑倒了。"
        },
        {
            kr: "밀다",
            en: "To push",
            zh: "推",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "문을 밀고 들어가요.",
            sentenceMeaning: "Push the door and enter.",
            sentenceZh: "推门进去。"
        },
        {
            kr: "바꾸다",
            en: "To change/exchange",
            zh: "换",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "새 것으로 바꿔 주세요.",
            sentenceMeaning: "Please exchange it for a new one.",
            sentenceZh: "请换个新的。"
        },
        {
            kr: "바뀌다",
            en: "To be changed",
            zh: "被换/改变",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "계절이 바뀌었어요.",
            sentenceMeaning: "The season has changed.",
            sentenceZh: "季节变了。"
        },
        {
            kr: "바라보다",
            en: "To look at",
            zh: "注视/望",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "하늘을 바라봐요.",
            sentenceMeaning: "Look up at the sky.",
            sentenceZh: "注视天空。"
        },
        {
            kr: "바르다",
            en: "To apply/smear",
            zh: "涂/抹",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "빵에 잼을 발라요.",
            sentenceMeaning: "Spread jam on bread.",
            sentenceZh: "在面包上抹果酱。"
        },
        {
            kr: "박수",
            en: "Clapping",
            zh: "鼓掌",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "큰 박수를 쳐요.",
            sentenceMeaning: "Give a big hand.",
            sentenceZh: "大声鼓掌。"
        },
        {
            kr: "받다",
            en: "To receive",
            zh: "收到",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "선물을 받았어요.",
            sentenceMeaning: "I received a gift.",
            sentenceZh: "收到了礼物。"
        },
        {
            kr: "멀리",
            en: "Far away",
            zh: "远远地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "멀리서 친구가 와요.",
            sentenceMeaning: "A friend is coming from far away.",
            sentenceZh: "朋友从远处走来。"
        },
        {
            kr: "멋있다",
            en: "Cool/Stylish",
            zh: "帅气/酷",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "가수가 정말 멋있어요.",
            sentenceMeaning: "The singer is really cool.",
            sentenceZh: "歌手真的很帅。"
        },
        {
            kr: "몇",
            en: "How many",
            zh: "几个",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "사과 몇 개 드릴까요?",
            sentenceMeaning: "How many apples should I give you?",
            sentenceZh: "给你几个苹果？"
        },
        {
            kr: "모두",
            en: "All",
            zh: "全部",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "모두 얼마예요?",
            sentenceMeaning: "How much is it all together?",
            sentenceZh: "一共多少钱？"
        },
        {
            kr: "모든",
            en: "All/Every",
            zh: "所有",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "모든 사람이 행복했으면 좋겠어요.",
            sentenceMeaning: "I wish everyone would be happy.",
            sentenceZh: "希望所有人都能幸福。"
        },
        {
            kr: "모습",
            en: "Appearance",
            zh: "样子",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "웃는 모습이 예뻐요.",
            sentenceMeaning: "The appearance of smiling is pretty.",
            sentenceZh: "笑的样子很漂亮。"
        },
        {
            kr: "모양",
            en: "Shape",
            zh: "形状",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "별 모양 쿠키를 만들었어요.",
            sentenceMeaning: "I made star-shaped cookies.",
            sentenceZh: "做了星星形状的饼干。"
        },
        {
            kr: "목적",
            en: "Purpose",
            zh: "目的",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "여행의 목적이 뭐예요?",
            sentenceMeaning: "What is the purpose of the trip?",
            sentenceZh: "旅行的目的是什么？"
        },
        {
            kr: "못",
            en: "Cannot",
            zh: "不能",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "김치를 못 먹어요.",
            sentenceMeaning: "I cannot eat Kimchi.",
            sentenceZh: "不能吃泡菜。"
        },
        {
            kr: "못생기다",
            en: "Ugly",
            zh: "丑",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "저는 제 얼굴이 못생겼다고 생각해요.",
            sentenceMeaning: "I think my face is ugly.",
            sentenceZh: "我觉得我长得丑。"
        },
        {
            kr: "무겁다",
            en: "Heavy",
            zh: "重",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "짐이 너무 무거워요.",
            sentenceMeaning: "The luggage is too heavy.",
            sentenceZh: "行李太重了。"
        },
        {
            kr: "무게",
            en: "Weight",
            zh: "重量",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "무게를 재 보세요.",
            sentenceMeaning: "Please weigh it.",
            sentenceZh: "请称一下重量。"
        },
        {
            kr: "무료",
            en: "Free",
            zh: "免费",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "입장료는 무료예요.",
            sentenceMeaning: "The entrance fee is free.",
            sentenceZh: "门票免费。"
        },
        {
            kr: "무슨",
            en: "What kind of",
            zh: "什么",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "무슨 일을 하세요?",
            sentenceMeaning: "What kind of work do you do?",
            sentenceZh: "你做什么工作？"
        },
        {
            kr: "무엇",
            en: "What",
            zh: "什么",
            pos: "Pronoun",
            category: "descriptions_qualities",
            sentenceKr: "지금 무엇을 하고 있어요?",
            sentenceMeaning: "What are you doing now?",
            sentenceZh: "现在在做什么？"
        },
        {
            kr: "무척",
            en: "Very/Extremely",
            zh: "非常",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "오늘 날씨가 무척 더워요.",
            sentenceMeaning: "Today's weather is very hot.",
            sentenceZh: "今天天气非常热。"
        },
        {
            kr: "문화",
            en: "Culture",
            zh: "文化",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "한국 문화를 배우고 싶어요.",
            sentenceMeaning: "I want to learn Korean culture.",
            sentenceZh: "我想学习韩国文化。"
        },
        {
            kr: "물론",
            en: "Of course",
            zh: "当然",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "물론이죠, 같이 가요.",
            sentenceMeaning: "Of course, let's go together.",
            sentenceZh: "当然了，一起去吧。"
        },
        {
            kr: "뭐",
            en: "What",
            zh: "什么",
            pos: "Pronoun",
            category: "descriptions_qualities",
            sentenceKr: "이름이 뭐예요?",
            sentenceMeaning: "What is your name?",
            sentenceZh: "你叫什么名字？"
        },
        {
            kr: "미리",
            en: "In advance",
            zh: "事先",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "미리 예약을 했어요.",
            sentenceMeaning: "I made a reservation in advance.",
            sentenceZh: "事先预约了。"
        },
        {
            kr: "미터",
            en: "Meter",
            zh: "米",
            pos: "Counter",
            category: "descriptions_qualities",
            sentenceKr: "백 미터를 달려요.",
            sentenceMeaning: "I run a hundred meters.",
            sentenceZh: "跑一百米。"
        },
        {
            kr: "바쁘다",
            en: "Busy",
            zh: "忙",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "오늘은 아주 바빠요.",
            sentenceMeaning: "I am very busy today.",
            sentenceZh: "今天很忙。"
        },
        {
            kr: "반드시",
            en: "Surely/Necessarily",
            zh: "一定",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "반드시 약속을 지켜요.",
            sentenceMeaning: "Be sure to keep your promise.",
            sentenceZh: "一定要守约。"
        },
        {
            kr: "방법",
            en: "Method",
            zh: "方法",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "좋은 방법이 있어요.",
            sentenceMeaning: "There is a good method.",
            sentenceZh: "有个好方法。"
        },
        {
            kr: "메일",
            en: "email",
            zh: "邮件",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "메일을 써요.",
            sentenceMeaning: "Write an email.",
            sentenceZh: "写一封电子邮件。"
        },
        {
            kr: "못하다",
            en: "cannot do, to be poor at",
            zh: "做不到",
            pos: "동사/형용사",
            category: "miscellaneous",
            sentenceKr: "저는 노래를 잘 부르지 못합니다.",
            sentenceMeaning: "I am not good at singing songs.",
            sentenceZh: "我唱歌唱得不好。"
        },
        {
            kr: "발바닥",
            en: "sole of the foot",
            zh: "脚底",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "많이 걸어서 발바닥이 아파요.",
            sentenceMeaning: "My soles hurt from walking a lot.",
            sentenceZh: "走了很多路，脚底很疼。"
        },
        {
            kr: "밝다",
            en: "to be bright",
            zh: "明亮",
            pos: "동사/형용사",
            category: "miscellaneous",
            sentenceKr: "방 안의 불빛이 아주 밝아서 좋습니다.",
            sentenceMeaning: "The light in the room is very bright, which is nice.",
            sentenceZh: "房间里的光线很亮，真好。"
        },
        {
            kr: "방금",
            en: "just now",
            zh: "刚刚",
            pos: "명사/부사",
            category: "miscellaneous",
            sentenceKr: "그 사람은 방금 떠났어요.",
            sentenceMeaning: "That person just left.",
            sentenceZh: "那个人刚刚离开。"
        }
    ],
    beginner_cycle_7: [
        {
            kr: "볶음밥",
            en: "Fried rice",
            zh: "炒饭",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "볶음밥을 주문했어요.",
            sentenceMeaning: "I ordered fried rice.",
            sentenceZh: "点了炒饭。"
        },
        {
            kr: "부엌",
            en: "Kitchen",
            zh: "厨房",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "부엌에서 요리해요.",
            sentenceMeaning: "Cook in the kitchen.",
            sentenceZh: "在厨房做饭。"
        },
        {
            kr: "분식",
            en: "flour-based food, snack",
            zh: "面食，小吃",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "분식을 먹어요.",
            sentenceMeaning: "I eat snacks.",
            sentenceZh: "我吃零食。"
        },
        {
            kr: "불고기",
            en: "Bulgogi",
            zh: "烤肉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "불고기를 먹어요.",
            sentenceMeaning: "Eat Bulgogi.",
            sentenceZh: "吃烤肉。"
        },
        {
            kr: "비빔밥",
            en: "Bibimbap",
            zh: "拌饭",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "비빔밥을 먹어요.",
            sentenceMeaning: "Eat Bibimbap.",
            sentenceZh: "吃拌饭。"
        },
        {
            kr: "빵",
            en: "Bread",
            zh: "面包",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "빵을 먹어요.",
            sentenceMeaning: "Eat bread.",
            sentenceZh: "吃面包。"
        },
        {
            kr: "빵집",
            en: "Bakery",
            zh: "面包店",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "빵집에서 일해요.",
            sentenceMeaning: "Work at a bakery.",
            sentenceZh: "在面包店工作。"
        },
        {
            kr: "방학",
            en: "school vacation",
            zh: "假期",
            pos: "명사",
            category: "school_education",
            sentenceKr: "오늘부터 즐거운 여름 방학이 시작돼요.",
            sentenceMeaning: "The pleasant summer vacation starts from today.",
            sentenceZh: "从今天开始快乐的暑假开始了。"
        },
        {
            kr: "배우다",
            en: "To learn",
            zh: "学习",
            pos: "Verb",
            category: "school_education",
            sentenceKr: "한국어를 배워요.",
            sentenceMeaning: "I learn Korean.",
            sentenceZh: "学习韩语。"
        },
        {
            kr: "봉투",
            en: "Envelope/Bag",
            zh: "信封/纸袋",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "편지를 봉투에 넣어요.",
            sentenceMeaning: "Put the letter in the envelope.",
            sentenceZh: "把信装进信封。"
        },
        {
            kr: "방송국",
            en: "TV/Radio Station",
            zh: "电视台",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "방송국에서 일해요.",
            sentenceMeaning: "I work at a broadcasting station.",
            sentenceZh: "在电视台工作。"
        },
        {
            kr: "번호",
            en: "Number",
            zh: "号码",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "전화번호를 알려 주세요.",
            sentenceMeaning: "Please let me know your phone number.",
            sentenceZh: "请告诉我电话号码。"
        },
        {
            kr: "벽",
            en: "Wall",
            zh: "墙",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "벽에 달력을 걸어요.",
            sentenceMeaning: "I hang a calendar on the wall.",
            sentenceZh: "在墙上挂挂历。"
        },
        {
            kr: "볼펜",
            en: "Ballpoint pen",
            zh: "圆珠笔",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "볼펜으로 써요.",
            sentenceMeaning: "Write with a ballpoint pen.",
            sentenceZh: "用圆珠笔写。"
        },
        {
            kr: "불",
            en: "Fire/Light",
            zh: "火/灯",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "불을 피워요.",
            sentenceMeaning: "Light a fire.",
            sentenceZh: "生火。"
        },
        {
            kr: "블라우스",
            en: "Blouse",
            zh: "衬衫",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "블라우스를 입어요.",
            sentenceMeaning: "Wear a blouse.",
            sentenceZh: "穿衬衫。"
        },
        {
            kr: "비누",
            en: "Soap",
            zh: "肥皂",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "비누로 씻어요.",
            sentenceMeaning: "Wash with soap.",
            sentenceZh: "用肥皂洗。"
        },
        {
            kr: "비디오",
            en: "Video",
            zh: "视频",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "비디오를 봐요.",
            sentenceMeaning: "Watch a video.",
            sentenceZh: "看视频。"
        },
        {
            kr: "비행기",
            en: "Airplane",
            zh: "飞机",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "비행기를 타요.",
            sentenceMeaning: "Take an airplane.",
            sentenceZh: "坐飞机。"
        },
        {
            kr: "빨다",
            en: "To wash (clothes)",
            zh: "洗",
            pos: "Verb",
            category: "home_living",
            sentenceKr: "옷을 빨아요.",
            sentenceMeaning: "Wash clothes.",
            sentenceZh: "洗衣服。"
        },
        {
            kr: "빨래",
            en: "Laundry",
            zh: "洗好的衣服/洗衣服",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "빨래를 해요.",
            sentenceMeaning: "Do the laundry.",
            sentenceZh: "洗衣服。"
        },
        {
            kr: "백화점",
            en: "Department Store",
            zh: "百货商店",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "백화점에서 쇼핑해요.",
            sentenceMeaning: "I shop at a department store.",
            sentenceZh: "在百货商店购物。"
        },
        {
            kr: "버스",
            en: "Bus",
            zh: "公交车",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "버스를 기다려요.",
            sentenceMeaning: "I wait for the bus.",
            sentenceZh: "等公交车。"
        },
        {
            kr: "베트남",
            en: "Vietnam",
            zh: "越南",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "베트남 음식이 맛있어요.",
            sentenceMeaning: "Vietnamese food is delicious.",
            sentenceZh: "越南菜很好吃。"
        },
        {
            kr: "병원",
            en: "Hospital",
            zh: "医院",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "병원에 가서 진찰받아요.",
            sentenceMeaning: "I go to the hospital and get examined.",
            sentenceZh: "去医院接受诊察。"
        },
        {
            kr: "빌딩",
            en: "Building",
            zh: "大厦/楼",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "빌딩을 지어요.",
            sentenceMeaning: "Build a building.",
            sentenceZh: "盖大楼。"
        },
        {
            kr: "사거리",
            en: "Intersection/Crossroads",
            zh: "十字路口",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "사거리를 지나요.",
            sentenceMeaning: "Pass the intersection.",
            sentenceZh: "穿过十字路口。"
        },
        {
            kr: "배우",
            en: "Actor/Actress",
            zh: "演员",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "유명한 배우를 봤어요.",
            sentenceMeaning: "I saw a famous actor.",
            sentenceZh: "见到了有名的演员。"
        },
        {
            kr: "변호사",
            en: "Lawyer",
            zh: "律师",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "변호사와 상담해요.",
            sentenceMeaning: "I consult with a lawyer.",
            sentenceZh: "和律师咨询。"
        },
        {
            kr: "병문안",
            en: "Visiting a sick person",
            zh: "看望病人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "친구 병문안을 가요.",
            sentenceMeaning: "I go to visit a sick friend.",
            sentenceZh: "去看望生病的朋友。"
        },
        {
            kr: "부모님",
            en: "Parents",
            zh: "父母",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "부모님께 효도해요.",
            sentenceMeaning: "Be filial to your parents.",
            sentenceZh: "孝顺父母。"
        },
        {
            kr: "부부",
            en: "Married couple",
            zh: "夫妇",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "부부 싸움은 칼로 물 베기예요.",
            sentenceMeaning: "A lovers' quarrel is like cutting water with a knife.",
            sentenceZh: "夫妻吵架，床头吵床尾和。"
        },
        {
            kr: "부인",
            en: "Wife (formal)",
            zh: "夫人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "아내를 부인이라고도 해요.",
            sentenceMeaning: "A wife is also called 'buin'.",
            sentenceZh: "妻子也叫夫人。"
        },
        {
            kr: "부자",
            en: "Rich person",
            zh: "富翁",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "부자가 되고 싶어요.",
            sentenceMeaning: "I want to be rich.",
            sentenceZh: "我想成为富翁。"
        },
        {
            kr: "부장",
            en: "Department manager",
            zh: "部长/经理",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "부장으로 승진했어요.",
            sentenceMeaning: "I was promoted to department manager.",
            sentenceZh: "晋升为部长了。"
        },
        {
            kr: "불안",
            en: "Anxiety/Unease",
            zh: "不安",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "불안이 가셨어요.",
            sentenceMeaning: "The anxiety is gone.",
            sentenceZh: "不安消除了。"
        },
        {
            kr: "뱀",
            en: "Snake",
            zh: "蛇",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "뱀이 무서워요.",
            sentenceMeaning: "Snakes are scary.",
            sentenceZh: "害怕蛇。"
        },
        {
            kr: "별",
            en: "Star",
            zh: "星",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "밤하늘에 별이 많아요.",
            sentenceMeaning: "There are many stars in the night sky.",
            sentenceZh: "夜空里有很多星星。"
        },
        {
            kr: "부산",
            en: "Busan",
            zh: "釜山",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "부산은 바다가 아름다워요.",
            sentenceMeaning: "Busan has a beautiful sea.",
            sentenceZh: "釜山的海很美。"
        },
        {
            kr: "비",
            en: "Rain",
            zh: "雨",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "비가 그쳤어요.",
            sentenceMeaning: "The rain has stopped.",
            sentenceZh: "雨停了。"
        },
        {
            kr: "배",
            en: "Double/Times",
            zh: "倍",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "두 배로 늘었어요.",
            sentenceMeaning: "It increased twofold.",
            sentenceZh: "增加到两倍。"
        },
        {
            kr: "번",
            en: "Time/Number",
            zh: "次",
            pos: "Counter",
            category: "time_seasons",
            sentenceKr: "여러 번 연습했어요.",
            sentenceMeaning: "I practiced many times.",
            sentenceZh: "练习了很多次。"
        },
        {
            kr: "봄",
            en: "Spring",
            zh: "春天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "봄에 꽃이 피어요.",
            sentenceMeaning: "Flowers bloom in spring.",
            sentenceZh: "春天开花。"
        },
        {
            kr: "분",
            en: "Minute",
            zh: "分",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "60분은 한 시간이에요.",
            sentenceMeaning: "60 minutes is one hour.",
            sentenceZh: "60分钟是一小时。"
        },
        {
            kr: "빠지다",
            en: "To fall into",
            zh: "掉进",
            pos: "Verb",
            category: "time_seasons",
            sentenceKr: "강에 빠졌어요.",
            sentenceMeaning: "Fell into the river.",
            sentenceZh: "掉进江里了。"
        },
        {
            kr: "방송",
            en: "Broadcasting",
            zh: "广播/节目",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "라디오 방송을 들어요.",
            sentenceMeaning: "I listen to a radio broadcast.",
            sentenceZh: "听广播。"
        },
        {
            kr: "배드민턴",
            en: "Badminton",
            zh: "羽毛球",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "배드민턴을 쳐요.",
            sentenceMeaning: "I play badminton.",
            sentenceZh: "打羽毛球。"
        },
        {
            kr: "버리다",
            en: "To throw away",
            zh: "扔",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "쓰레기를 버려요.",
            sentenceMeaning: "I throw away the trash.",
            sentenceZh: "扔垃圾。"
        },
        {
            kr: "벌다",
            en: "To earn",
            zh: "赚",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "돈을 벌어요.",
            sentenceMeaning: "I earn money.",
            sentenceZh: "赚钱。"
        },
        {
            kr: "벗다",
            en: "To take off",
            zh: "脱",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "외투를 벗어요.",
            sentenceMeaning: "I take off my coat.",
            sentenceZh: "脱外套。"
        },
        {
            kr: "변하다",
            en: "To change",
            zh: "变化",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "세상이 많이 변했어요.",
            sentenceMeaning: "The world has changed a lot.",
            sentenceZh: "世界变了很多。"
        },
        {
            kr: "보내다",
            en: "To send",
            zh: "寄/发",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "메일을 보냈어요.",
            sentenceMeaning: "I sent an email.",
            sentenceZh: "发了邮件。"
        },
        {
            kr: "보이다",
            en: "To show",
            zh: "给...看",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "사진을 보여 주세요.",
            sentenceMeaning: "Please show me the photo.",
            sentenceZh: "请给我看照片。"
        },
        {
            kr: "복습",
            en: "Review",
            zh: "复习",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "오늘 배운 것을 복습해요.",
            sentenceMeaning: "I review what I learned today.",
            sentenceZh: "复习今天学的内容。"
        },
        {
            kr: "볶다",
            en: "To stir-fry",
            zh: "炒",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "야채를 볶아요.",
            sentenceMeaning: "I stir-fry the vegetables.",
            sentenceZh: "炒菜。"
        },
        {
            kr: "뵙다",
            en: "To meet (humble)",
            zh: "见/拜见",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "어른을 뵙고 인사해요.",
            sentenceMeaning: "Meet the elder and greet them.",
            sentenceZh: "拜见长辈并打招呼。"
        },
        {
            kr: "부치다",
            en: "To send (mail)",
            zh: "寄/邮寄",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "편지를 부쳐요.",
            sentenceMeaning: "Send a letter.",
            sentenceZh: "寄信。"
        },
        {
            kr: "부탁",
            en: "Request/Favor",
            zh: "拜托/嘱托",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "부탁을 받았어요.",
            sentenceMeaning: "I received a request.",
            sentenceZh: "收到了嘱托。"
        },
        {
            kr: "불다",
            en: "To blow",
            zh: "吹",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "바람이 불어요.",
            sentenceMeaning: "The wind is blowing.",
            sentenceZh: "刮风。"
        },
        {
            kr: "붙다",
            en: "To stick",
            zh: "粘/贴",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "먼지가 붙었어요.",
            sentenceMeaning: "Dust is sticking.",
            sentenceZh: "粘上灰尘了。"
        },
        {
            kr: "붙이다",
            en: "To stick/attach",
            zh: "贴/粘",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "우표를 붙여요.",
            sentenceMeaning: "Stick a stamp.",
            sentenceZh: "贴邮票。"
        },
        {
            kr: "비다",
            en: "To be empty",
            zh: "空",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "집이 비어 있어요.",
            sentenceMeaning: "The house is empty.",
            sentenceZh: "房子空着。"
        },
        {
            kr: "빌리다",
            en: "To borrow",
            zh: "借",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "돈을 빌려요.",
            sentenceMeaning: "Borrow money.",
            sentenceZh: "借钱。"
        },
        {
            kr: "빼다",
            en: "To take out/subtract",
            zh: "拿掉/减/拔",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "이를 뺐어요.",
            sentenceMeaning: "I pulled a tooth.",
            sentenceZh: "拔牙了。"
        },
        {
            kr: "뽑다",
            en: "to pull out, to select",
            zh: "拔，挑选",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "치과에 가서 아픈 이를 뽑았습니다.",
            sentenceMeaning: "I went to the dentist and got a painful tooth pulled out.",
            sentenceZh: "去牙科拔了疼的牙齿。"
        },
        {
            kr: "방향",
            en: "Direction",
            zh: "方向",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "방향이 틀렸어요.",
            sentenceMeaning: "The direction is wrong.",
            sentenceZh: "方向错了。"
        },
        {
            kr: "백",
            en: "Hundred",
            zh: "百",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "백 명이 모였어요.",
            sentenceMeaning: "A hundred people gathered.",
            sentenceZh: "聚集了一百人。"
        },
        {
            kr: "백만",
            en: "Million",
            zh: "百万",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "백만 원을 모았어요.",
            sentenceMeaning: "I saved a million won.",
            sentenceZh: "攒了一百万韩元。"
        },
        {
            kr: "버릇",
            en: "Habit",
            zh: "习惯",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "나쁜 버릇을 고쳐요.",
            sentenceMeaning: "I fix a bad habit.",
            sentenceZh: "改掉坏习惯。"
        },
        {
            kr: "번째",
            en: "Ordinal counter",
            zh: "第...次/个",
            pos: "Counter",
            category: "descriptions_qualities",
            sentenceKr: "세 번째 줄에 앉으세요.",
            sentenceMeaning: "Please sit in the third row.",
            sentenceZh: "请坐在第三排。"
        },
        {
            kr: "벌",
            en: "Counter for clothes",
            zh: "套/件",
            pos: "Counter",
            category: "descriptions_qualities",
            sentenceKr: "옷 한 벌을 샀어요.",
            sentenceMeaning: "I bought a suit/set of clothes.",
            sentenceZh: "买了一套衣服。"
        },
        {
            kr: "벌써",
            en: "Already",
            zh: "已经",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "벌써 도착했어요.",
            sentenceMeaning: "I already arrived.",
            sentenceZh: "已经到了。"
        },
        {
            kr: "별로",
            en: "Not really/Not particularly",
            zh: "不怎么",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "별로 안 매워요.",
            sentenceMeaning: "It is not really spicy.",
            sentenceZh: "不怎么辣。"
        },
        {
            kr: "병",
            en: "Bottle",
            zh: "瓶",
            pos: "Counter",
            category: "descriptions_qualities",
            sentenceKr: "우유 두 병을 샀어요.",
            sentenceMeaning: "I bought two bottles of milk.",
            sentenceZh: "买了两瓶牛奶。"
        },
        {
            kr: "보다",
            en: "More",
            zh: "比/更加",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "어제보다 더워요.",
            sentenceMeaning: "It is hotter than yesterday.",
            sentenceZh: "比昨天热。"
        },
        {
            kr: "보라색",
            en: "Purple",
            zh: "紫色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "보라색 옷을 좋아해요.",
            sentenceMeaning: "I like purple clothes.",
            sentenceZh: "喜欢紫色的衣服。"
        },
        {
            kr: "보통",
            en: "common, ordinary",
            zh: "普通",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "보통 때와 같아요.",
            sentenceMeaning: "It's the same as usual.",
            sentenceZh: "和平常一样。"
        },
        {
            kr: "복잡하다",
            en: "Complex/Crowded",
            zh: "复杂/拥挤",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "길이 너무 복잡해요.",
            sentenceMeaning: "The road is too crowded.",
            sentenceZh: "路太挤了。"
        },
        {
            kr: "부끄럽다",
            en: "To be shy/embarrassed",
            zh: "害羞/不好意思",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "칭찬을 받으면 부끄러워요.",
            sentenceMeaning: "I am shy when I receive a compliment.",
            sentenceZh: "受到称赞时很害羞。"
        },
        {
            kr: "부드럽다",
            en: "To be soft/smooth",
            zh: "柔软/温柔",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "머릿결이 아주 부드러워요.",
            sentenceMeaning: "The hair texture is very soft.",
            sentenceZh: "发质非常柔软。"
        },
        {
            kr: "부럽다",
            en: "To be envious",
            zh: "羡慕",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "다른 사람이 부러워요.",
            sentenceMeaning: "I am envious of others.",
            sentenceZh: "我很羡慕别人。"
        },
        {
            kr: "부르다",
            en: "To be full (stomach)",
            zh: "饱",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "배가 너무 불러요.",
            sentenceMeaning: "I am so full.",
            sentenceZh: "肚子太饱了。"
        },
        {
            kr: "부분",
            en: "Part/Portion",
            zh: "部分",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "부분으로 나눠요.",
            sentenceMeaning: "Divide it into parts.",
            sentenceZh: "将其分成几部分。"
        },
        {
            kr: "부족",
            en: "Lack/Shortage",
            zh: "不足",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "산소가 부족해요.",
            sentenceMeaning: "There is a lack of oxygen.",
            sentenceZh: "缺氧。"
        },
        {
            kr: "부지런하다",
            en: "To be diligent",
            zh: "勤奋",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "그는 아주 부지런해요.",
            sentenceMeaning: "He is very diligent.",
            sentenceZh: "他非常勤奋。"
        },
        {
            kr: "북쪽",
            en: "North",
            zh: "北边",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "북쪽 방향으로 가세요.",
            sentenceMeaning: "Please go in the north direction.",
            sentenceZh: "请往北边走。"
        },
        {
            kr: "분명하다",
            en: "To be clear/distinct",
            zh: "分明/明确",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "발음이 분명해요.",
            sentenceMeaning: "The pronunciation is clear.",
            sentenceZh: "发音很清晰。"
        },
        {
            kr: "분위기",
            en: "Atmosphere/Mood",
            zh: "气氛",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "분위기가 어색해요.",
            sentenceMeaning: "The atmosphere is awkward.",
            sentenceZh: "气氛很尴尬。"
        },
        {
            kr: "분홍색",
            en: "Pink",
            zh: "粉红色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "분홍색 옷을 입어요.",
            sentenceMeaning: "Wear pink clothes.",
            sentenceZh: "穿粉红色的衣服。"
        },
        {
            kr: "불쌍하다",
            en: "To be pitiful",
            zh: "可怜",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "표정이 불쌍해요.",
            sentenceMeaning: "The expression is pitiful.",
            sentenceZh: "表情很可怜。"
        },
        {
            kr: "불편",
            en: "Inconvenience",
            zh: "不便",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "불편이 따를 수 있어요.",
            sentenceMeaning: "Inconvenience may follow.",
            sentenceZh: "可能会有不便。"
        },
        {
            kr: "붉다",
            en: "To be red",
            zh: "红",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "색깔이 붉어요.",
            sentenceMeaning: "The color is red.",
            sentenceZh: "颜色很红。"
        },
        {
            kr: "비교",
            en: "Comparison",
            zh: "比较",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "비교 대상을 찾아요.",
            sentenceMeaning: "Look for a comparison target.",
            sentenceZh: "寻找比较对象。"
        },
        {
            kr: "비밀",
            en: "Secret",
            zh: "秘密",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "비밀을 지켜요.",
            sentenceMeaning: "Keep a secret.",
            sentenceZh: "保守秘密。"
        },
        {
            kr: "비슷하다",
            en: "To be similar",
            zh: "相似",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "색깔이 비슷해요.",
            sentenceMeaning: "The colors are similar.",
            sentenceZh: "颜色很相似。"
        },
        {
            kr: "비싸다",
            en: "To be expensive",
            zh: "贵",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "값이 비싸요.",
            sentenceMeaning: "The price is expensive.",
            sentenceZh: "价格很贵。"
        },
        {
            kr: "빠르다",
            en: "To be fast",
            zh: "快",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "걸음이 빨라요.",
            sentenceMeaning: "The steps are fast.",
            sentenceZh: "走路很快。"
        },
        {
            kr: "빨간색",
            en: "Red color",
            zh: "红色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "빨간색을 좋아해요.",
            sentenceMeaning: "I like red.",
            sentenceZh: "我喜欢红色。"
        },
        {
            kr: "빨갛다",
            en: "To be red",
            zh: "红",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "사과가 빨개요.",
            sentenceMeaning: "The apple is red.",
            sentenceZh: "苹果是红色的。"
        },
        {
            kr: "빨리",
            en: "Fast/Quickly",
            zh: "快",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "빨리 걸어요.",
            sentenceMeaning: "Walk fast.",
            sentenceZh: "快走。"
        },
        {
            kr: "사",
            en: "Four",
            zh: "四",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "일 년은 사 계절로 나뉩니다.",
            sentenceMeaning: "One year is divided into four seasons.",
            sentenceZh: "一年分为四个季节。"
        },
        {
            kr: "배달",
            en: "delivery",
            zh: "外卖，配送",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "배달을 시켜요.",
            sentenceMeaning: "Have it delivered.",
            sentenceZh: "让它交付。"
        },
        {
            kr: "배추",
            en: "napa cabbage",
            zh: "白菜",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "배추를 다듬어요.",
            sentenceMeaning: "Trim the cabbage.",
            sentenceZh: "修剪卷心菜。"
        },
        {
            kr: "배탈",
            en: "stomachache",
            zh: "拉肚子，胃痛",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "배탈이 나요.",
            sentenceMeaning: "I have an upset stomach.",
            sentenceZh: "我胃不舒服。"
        }
    ],
    beginner_cycle_8: [
        {
            kr: "사과",
            en: "Apple",
            zh: "苹果",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "사과를 먹어요.",
            sentenceMeaning: "Eat an apple.",
            sentenceZh: "吃苹果。"
        },
        {
            kr: "사이다",
            en: "Cider/Soda",
            zh: "汽水",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "사이다를 마셔요.",
            sentenceMeaning: "Drink soda.",
            sentenceZh: "喝汽水。"
        },
        {
            kr: "사탕",
            en: "Candy",
            zh: "糖果",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "사탕을 먹어요.",
            sentenceMeaning: "Eat candy.",
            sentenceZh: "吃糖。"
        },
        {
            kr: "삼겹살",
            en: "Samgyeopsal",
            zh: "五花肉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "삼겹살을 구워요.",
            sentenceMeaning: "Grill Samgyeopsal.",
            sentenceZh: "烤五花肉。"
        },
        {
            kr: "삼계탕",
            en: "Samgyetang",
            zh: "参鸡汤",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "삼계탕을 먹어요.",
            sentenceMeaning: "Eat Samgyetang.",
            sentenceZh: "吃参鸡汤。"
        },
        {
            kr: "상추",
            en: "Lettuce",
            zh: "生菜",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "상추에 싸 먹어요.",
            sentenceMeaning: "Wrap in lettuce to eat.",
            sentenceZh: "用生菜包着吃。"
        },
        {
            kr: "샌드위치",
            en: "sandwich",
            zh: "三明治",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "점심으로 샌드위치를 만들었습니다.",
            sentenceMeaning: "I made a sandwich for lunch.",
            sentenceZh: "午饭做了三明治。"
        },
        {
            kr: "생선",
            en: "fish (food)",
            zh: "鱼",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "어제 시장에서 신선한 생선을 샀습니다.",
            sentenceMeaning: "I bought fresh fish at the market yesterday.",
            sentenceZh: "昨天在市场买了新鲜的鱼。"
        },
        {
            kr: "설렁탕",
            en: "Seolleongtang",
            zh: "雪浓汤",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "설렁탕 한 그릇 주세요.",
            sentenceMeaning: "Please give me a bowl of Seolleongtang.",
            sentenceZh: "请给我一碗雪浓汤。"
        },
        {
            kr: "설탕",
            en: "sugar",
            zh: "糖",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "커피에 설탕을 넣지 마세요.",
            sentenceMeaning: "Don't put sugar in the coffee.",
            sentenceZh: "不要在咖啡里放糖。"
        },
        {
            kr: "소고기",
            en: "beef",
            zh: "牛肉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "저녁으로 소고기를 구워 먹었어요.",
            sentenceMeaning: "I ate grilled beef for dinner.",
            sentenceZh: "晚餐我吃了烤牛肉。"
        },
        {
            kr: "소금",
            en: "salt",
            zh: "盐",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "음식이 싱거우면 소금을 넣으세요.",
            sentenceMeaning: "If the food is bland, add salt.",
            sentenceZh: "如果食物清淡，加盐。"
        },
        {
            kr: "소주",
            en: "soju",
            zh: "烧酒",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "삼겹살에 소주를 마셨어요.",
            sentenceMeaning: "I had pork belly and drank soju.",
            sentenceZh: "我吃了五花肉，喝了烧酒。"
        },
        {
            kr: "서류",
            en: "document, paper",
            zh: "文件",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "회의에 필요한 서류를 준비했습니다.",
            sentenceMeaning: "I prepared the documents needed for the meeting.",
            sentenceZh: "准备了会议需要的文件。"
        },
        {
            kr: "서점",
            en: "bookstore",
            zh: "书店",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "서점에서 한국어 책을 샀습니다.",
            sentenceMeaning: "I bought a Korean book at the bookstore.",
            sentenceZh: "在书店买了韩国语书。"
        },
        {
            kr: "선생님",
            en: "teacher",
            zh: "老师",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "선생님, 질문이 있습니다.",
            sentenceMeaning: "Teacher, I have a question.",
            sentenceZh: "老师，我有一个问题。"
        },
        {
            kr: "사전",
            en: "Dictionary",
            zh: "词典",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "사전을 찾아요.",
            sentenceMeaning: "Look up a dictionary.",
            sentenceZh: "查词典。"
        },
        {
            kr: "사진",
            en: "Photo",
            zh: "照片",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "사진을 찍어요.",
            sentenceMeaning: "Take a photo.",
            sentenceZh: "拍照。"
        },
        {
            kr: "살다",
            en: "To live",
            zh: "生活/住",
            pos: "Verb",
            category: "home_living",
            sentenceKr: "오래 살아요.",
            sentenceMeaning: "Live a long time.",
            sentenceZh: "长寿。"
        },
        {
            kr: "상자",
            en: "Box",
            zh: "箱子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "상자에 넣어요.",
            sentenceMeaning: "Put in the box.",
            sentenceZh: "装进箱子。"
        },
        {
            kr: "상품",
            en: "Prize/Product",
            zh: "商品/奖品",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "상품을 타요.",
            sentenceMeaning: "Win a prize.",
            sentenceZh: "领奖品。"
        },
        {
            kr: "샤워",
            en: "shower",
            zh: "洗澡",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "운동을 하고 샤워를 했습니다.",
            sentenceMeaning: "I took a shower after exercising.",
            sentenceZh: "运动后洗了澡。"
        },
        {
            kr: "서랍",
            en: "drawer",
            zh: "抽屉",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "서랍 속에서 열쇠를 찾았습니다.",
            sentenceMeaning: "I found the key in the drawer.",
            sentenceZh: "在抽屉里找到了钥匙。"
        },
        {
            kr: "선물",
            en: "gift",
            zh: "礼物",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "친구에게 줄 선물을 샀습니다.",
            sentenceMeaning: "I bought a gift to give to a friend.",
            sentenceZh: "买了送给朋友的礼物。"
        },
        {
            kr: "설거지",
            en: "dishwashing",
            zh: "洗碗",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "제가 저녁을 먹고 설거지를 할게요.",
            sentenceMeaning: "I will do the dishes after eating dinner.",
            sentenceZh: "我吃完晚饭后洗碗。"
        },
        {
            kr: "세수",
            en: "washing face",
            zh: "洗脸",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "아침에 일어나서 먼저 세수를 해요.",
            sentenceMeaning: "I wake up in the morning and wash my face first.",
            sentenceZh: "我早上醒来，先洗脸。"
        },
        {
            kr: "세탁",
            en: "laundry",
            zh: "洗涤/洗衣服",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "주말에 몰아서 세탁을 해요.",
            sentenceMeaning: "I do laundry on the weekends.",
            sentenceZh: "我周末洗衣服。"
        },
        {
            kr: "세탁기",
            en: "washing machine",
            zh: "洗衣机",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "세탁기를 돌려서 옷을 빨아요.",
            sentenceMeaning: "Run the washing machine and wash the clothes.",
            sentenceZh: "启动洗衣机并洗衣服。"
        },
        {
            kr: "세탁소",
            en: "laundromat/dry cleaner",
            zh: "洗衣店",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "세탁소에 정장을 맡겼어요.",
            sentenceMeaning: "I left my suit at the dry cleaners.",
            sentenceZh: "我把西装留在干洗店了。"
        },
        {
            kr: "소설",
            en: "novel",
            zh: "小说",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "자기 전에 소설을 읽어요.",
            sentenceMeaning: "I read novels before going to bed.",
            sentenceZh: "我在睡觉前看小说。"
        },
        {
            kr: "소파",
            en: "sofa",
            zh: "沙发",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "거실에 편안한 소파를 놓았어요.",
            sentenceMeaning: "I placed a comfortable sofa in the living room.",
            sentenceZh: "我在客厅里放了一张舒适的沙发。"
        },
        {
            kr: "사무실",
            en: "Office",
            zh: "办公室",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "사무실에 출근해요.",
            sentenceMeaning: "Go to the office.",
            sentenceZh: "去办公室上班。"
        },
        {
            kr: "삼거리",
            en: "Three-way intersection",
            zh: "三岔口",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "삼거리가 나와요.",
            sentenceMeaning: "A three-way intersection appears.",
            sentenceZh: "出现一个三岔路口。"
        },
        {
            kr: "서양",
            en: "the West",
            zh: "西方",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "서양 음식을 먹으러 갈까요?",
            sentenceMeaning: "Shall we go eat Western food?",
            sentenceZh: "去吃西方料理吗？"
        },
        {
            kr: "서울",
            en: "Seoul",
            zh: "首尔",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "서울은 한국의 수도입니다.",
            sentenceMeaning: "Seoul is the capital of Korea.",
            sentenceZh: "首尔是韩国的首都。"
        },
        {
            kr: "서쪽",
            en: "west",
            zh: "西边",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "우리 집은 창문이 서쪽으로 나 있습니다.",
            sentenceMeaning: "My house has windows facing west.",
            sentenceZh: "我家的窗户朝西。"
        },
        {
            kr: "섬",
            en: "island",
            zh: "岛",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "바다 한가운데에 작은 섬이 있습니다.",
            sentenceMeaning: "There is a small island in the middle of the sea.",
            sentenceZh: "大海中间有一个小岛。"
        },
        {
            kr: "세계",
            en: "world",
            zh: "世界",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "세계 여러 나라를 여행하고 싶어요.",
            sentenceMeaning: "I want to travel to many countries around the world.",
            sentenceZh: "我想去世界各国旅行。"
        },
        {
            kr: "세상",
            en: "world",
            zh: "世界",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "세상은 넓고 할 일은 많아요.",
            sentenceMeaning: "The world is big and there is a lot to do.",
            sentenceZh: "世界很大，有很多事情要做。"
        },
        {
            kr: "사귀다",
            en: "To make friends",
            zh: "交朋友",
            pos: "Verb",
            category: "people_jobs_family",
            sentenceKr: "친구를 사귀어요.",
            sentenceMeaning: "Make friends.",
            sentenceZh: "交朋友。"
        },
        {
            kr: "사람",
            en: "Person",
            zh: "人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "사람이 살아요.",
            sentenceMeaning: "People live.",
            sentenceZh: "有人住。"
        },
        {
            kr: "사장",
            en: "Boss/President",
            zh: "社长/老板",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "사장이 되었어요.",
            sentenceMeaning: "Became a boss.",
            sentenceZh: "当上老板了。"
        },
        {
            kr: "삼촌",
            en: "Uncle",
            zh: "叔叔",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "삼촌을 만나요.",
            sentenceMeaning: "Meet uncle.",
            sentenceZh: "见叔叔。"
        },
        {
            kr: "선배",
            en: "senior",
            zh: "前辈",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "회사 선배에게 일을 배웠습니다.",
            sentenceMeaning: "I learned the work from my company senior.",
            sentenceZh: "向前辈学习了工作。"
        },
        {
            kr: "선수",
            en: "player, athlete",
            zh: "选手",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "저는 유명한 야구 선수가 되고 싶습니다.",
            sentenceMeaning: "I want to become a famous baseball player.",
            sentenceZh: "我想成为一名著名的棒球选手。"
        },
        {
            kr: "성",
            en: "last name",
            zh: "姓",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "제 성은 이 씨입니다.",
            sentenceMeaning: "My last name is Lee.",
            sentenceZh: "我姓李。"
        },
        {
            kr: "성함",
            en: "name (honorific)",
            zh: "姓名（敬语）",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "선생님 성함이 어떻게 되십니까?",
            sentenceMeaning: "What is the teacher's name?",
            sentenceZh: "老师的名字叫什么？"
        },
        {
            kr: "사랑",
            en: "Love",
            zh: "爱",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "연인 간의 사랑.",
            sentenceMeaning: "Love between lovers.",
            sentenceZh: "恋人之间的爱。"
        },
        {
            kr: "생각",
            en: "thought, idea",
            zh: "想法",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "무슨 생각을 그렇게 하세요?",
            sentenceMeaning: "What are you thinking so much about?",
            sentenceZh: "你在想什么呢？"
        },
        {
            kr: "생기다",
            en: "to be formed, to look like",
            zh: "产生",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "학교 앞에 새 식당이 생겼습니다.",
            sentenceMeaning: "A new restaurant opened in front of the school.",
            sentenceZh: "学校前面开了一家新餐厅。"
        },
        {
            kr: "섭섭하다",
            en: "sad, disappointed",
            zh: "难过，可惜",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "친구가 이사를 간다니 좀 섭섭하네요.",
            sentenceMeaning: "I'm a bit sad that my friend is moving.",
            sentenceZh: "听说朋友要搬家，有点难过。"
        },
        {
            kr: "성격",
            en: "personality",
            zh: "性格",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "그는 성격이 밝고 활발합니다.",
            sentenceMeaning: "He has a bright and active personality.",
            sentenceZh: "他的性格开朗活泼。"
        },
        {
            kr: "센터",
            en: "center",
            zh: "中心",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "쇼핑 센터에서 친구를 만나요.",
            sentenceMeaning: "Meet a friend at the shopping center.",
            sentenceZh: "在购物中心见朋友。"
        },
        {
            kr: "산",
            en: "Mountain",
            zh: "山",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "산에 올라요.",
            sentenceMeaning: "Go up the mountain.",
            sentenceZh: "爬山。"
        },
        {
            kr: "선풍기",
            en: "fan",
            zh: "风扇",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "너무 더워서 선풍기를 켰습니다.",
            sentenceMeaning: "It was too hot, so I turned on the fan.",
            sentenceZh: "太热了，所以开了风扇。"
        },
        {
            kr: "소",
            en: "cow",
            zh: "牛",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "농장에서 소가 풀을 먹고 있어요.",
            sentenceMeaning: "Cows are eating grass on the farm.",
            sentenceZh: "奶牛正在农场里吃草。"
        },
        {
            kr: "사계절",
            en: "Four seasons",
            zh: "四季",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "사계절이 뚜렷해요.",
            sentenceMeaning: "The four seasons are distinct.",
            sentenceZh: "四季分明。"
        },
        {
            kr: "사월",
            en: "April",
            zh: "四月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "사월에 꽃이 피어요.",
            sentenceMeaning: "Flowers bloom in April.",
            sentenceZh: "四月开花。"
        },
        {
            kr: "사흘",
            en: "Three days",
            zh: "三天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "사흘 동안 쉬어요.",
            sentenceMeaning: "Rest for three days.",
            sentenceZh: "休息三天。"
        },
        {
            kr: "살",
            en: "Age counter",
            zh: "岁",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "세 살이에요.",
            sentenceMeaning: "I am three years old.",
            sentenceZh: "三岁。"
        },
        {
            kr: "삼월",
            en: "March",
            zh: "三月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "삼월이 왔어요.",
            sentenceMeaning: "March has come.",
            sentenceZh: "三月来了。"
        },
        {
            kr: "새벽",
            en: "dawn, early morning",
            zh: "凌晨",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "저는 보통 새벽에 일어납니다.",
            sentenceMeaning: "I usually wake up at dawn.",
            sentenceZh: "我通常在凌晨起床。"
        },
        {
            kr: "새해",
            en: "new year",
            zh: "新年",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "새해 복 많이 받으세요.",
            sentenceMeaning: "Happy New Year.",
            sentenceZh: "新年快乐。"
        },
        {
            kr: "생신",
            en: "birthday (honorific)",
            zh: "生日（敬语）",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "내일은 할아버지 생신입니다.",
            sentenceMeaning: "Tomorrow is my grandfather's birthday.",
            sentenceZh: "明天是爷爷的生日。"
        },
        {
            kr: "생일",
            en: "birthday",
            zh: "生日",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "제 생일은 5월 14일입니다.",
            sentenceMeaning: "My birthday is May 14th.",
            sentenceZh: "我的生日是5月14日。"
        },
        {
            kr: "설날",
            en: "Lunar New Year",
            zh: "春节",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "설날에는 가족들이 모두 모입니다.",
            sentenceMeaning: "On Lunar New Year, the whole family gathers.",
            sentenceZh: "春节时，全家人都聚在一起。"
        },
        {
            kr: "세",
            en: "years old",
            zh: "岁",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "그는 올해 서른 세입니다.",
            sentenceMeaning: "He is thirty years old this year.",
            sentenceZh: "他今年三十岁。"
        },
        {
            kr: "세배",
            en: "New Year's bow",
            zh: "拜年",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "설날에 부모님께 세배를 드렸어요.",
            sentenceMeaning: "On Lunar New Year’s Day, I gave a blessing to my parents.",
            sentenceZh: "大年初一，我给父母送上了祝福。"
        },
        {
            kr: "사다",
            en: "To buy",
            zh: "买",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "물건을 사요.",
            sentenceMeaning: "Buy things.",
            sentenceZh: "买东西。"
        },
        {
            kr: "사업",
            en: "Business",
            zh: "事业",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "사업 수완이 좋아요.",
            sentenceMeaning: "Has good business skills.",
            sentenceZh: "很有经商头脑。"
        },
        {
            kr: "사용",
            en: "Use/Usage",
            zh: "使用",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "사용을 해요.",
            sentenceMeaning: "Use it.",
            sentenceZh: "使用。"
        },
        {
            kr: "산책",
            en: "Walk/Stroll",
            zh: "散步",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "산책을 나가요.",
            sentenceMeaning: "Go out for a walk.",
            sentenceZh: "出去散步。"
        },
        {
            kr: "생각나다",
            en: "to remember, to occur to",
            zh: "想起来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "갑자기 좋은 아이디어가 생각났습니다.",
            sentenceMeaning: "Suddenly a good idea occurred to me.",
            sentenceZh: "突然想到了一个好主意。"
        },
        {
            kr: "서다",
            en: "to stand",
            zh: "站立",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "길가에 차가 서 있습니다.",
            sentenceMeaning: "A car is standing on the street.",
            sentenceZh: "路边停着一辆车。"
        },
        {
            kr: "서두르다",
            en: "to hurry",
            zh: "赶快",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "시간이 없으니 좀 서두르세요.",
            sentenceMeaning: "We don't have much time, so please hurry.",
            sentenceZh: "没有时间了，请快点。"
        },
        {
            kr: "서비스",
            en: "service",
            zh: "服务",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "이 식당은 서비스가 아주 좋습니다.",
            sentenceMeaning: "This restaurant has very good service.",
            sentenceZh: "这家餐厅的服务非常好。"
        },
        {
            kr: "섞다",
            en: "to mix",
            zh: "混合",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "밀가루와 물을 잘 섞으세요.",
            sentenceMeaning: "Mix the flour and water well.",
            sentenceZh: "把面粉 and 水混合好。"
        },
        {
            kr: "선택",
            en: "choice, selection",
            zh: "选择",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "메뉴가 많아서 선택이 어렵네요.",
            sentenceMeaning: "There are so many items on the menu, it's hard to choose.",
            sentenceZh: "菜单很多，很难选择。"
        },
        {
            kr: "설명",
            en: "explanation",
            zh: "说明",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "제품에 대한 설명을 자세히 들었습니다.",
            sentenceMeaning: "I listened carefully to the explanation of the product.",
            sentenceZh: "详细听了关于产品的说明。"
        },
        {
            kr: "세우다",
            en: "to stop/stand/set up",
            zh: "停/站/建立",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "버스 정류장에 차를 세웠어요.",
            sentenceMeaning: "I parked the car at the bus stop.",
            sentenceZh: "我把车停在公交车站。"
        },
        {
            kr: "소개",
            en: "introduction",
            zh: "介绍",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "새로운 친구에게 제 직업을 소개했어요.",
            sentenceMeaning: "I introduced my job to my new friend.",
            sentenceZh: "我向我的新朋友介绍了我的工作。"
        },
        {
            kr: "사고",
            en: "Accident",
            zh: "事故",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "사고가 났어요.",
            sentenceMeaning: "An accident happened.",
            sentenceZh: "出事故了。"
        },
        {
            kr: "사십",
            en: "Forty",
            zh: "四十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "우리 부모님은 올해 사십 대이십니다.",
            sentenceMeaning: "Our parents are in their forties this year.",
            sentenceZh: "我们的父母今年四十多岁。"
        },
        {
            kr: "사이",
            en: "Between/Relationship",
            zh: "之间/关系",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "사이에 놓아요.",
            sentenceMeaning: "Put it in between.",
            sentenceZh: "把它放在中间。"
        },
        {
            kr: "사이즈",
            en: "Size",
            zh: "尺寸",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "사이즈가 커요.",
            sentenceMeaning: "The size is big.",
            sentenceZh: "尺寸很大。"
        },
        {
            kr: "삼",
            en: "Three",
            zh: "三",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "우리는 초등학교를 삼 년 동안 다녔습니다.",
            sentenceMeaning: "We attended elementary school for three years.",
            sentenceZh: "我们读了三年小学。"
        },
        {
            kr: "삼십",
            en: "Thirty",
            zh: "三十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "이 버스는 삼십 분마다 운행합니다.",
            sentenceMeaning: "This bus runs every thirty minutes.",
            sentenceZh: "这辆公交车每三十分钟运行一次。"
        },
        {
            kr: "상",
            en: "Award/Prize",
            zh: "奖",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "상을 받았어요.",
            sentenceMeaning: "Received an award.",
            sentenceZh: "得奖了。"
        },
        {
            kr: "상처",
            en: "Wound/Injury",
            zh: "伤口",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "상처가 났어요.",
            sentenceMeaning: "Got a wound.",
            sentenceZh: "受伤了。"
        },
        {
            kr: "새",
            en: "New",
            zh: "新",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "새 옷을 사요.",
            sentenceMeaning: "Buy new clothes.",
            sentenceZh: "买新衣服。"
        },
        {
            kr: "새로",
            en: "newly",
            zh: "重新",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "새로 산 구두가 아주 예뻐요.",
            sentenceMeaning: "The newly bought shoes are very pretty.",
            sentenceZh: "新买的鞋子非常漂亮。"
        },
        {
            kr: "새롭다",
            en: "new, fresh",
            zh: "新",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "오랜만에 학교에 오니 기분이 새롭습니다.",
            sentenceMeaning: "Coming to school after a long time, I feel fresh.",
            sentenceZh: "时隔很久来到学校，心情很新鲜。"
        },
        {
            kr: "색",
            en: "color",
            zh: "颜色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이 옷은 색이 참 고와요.",
            sentenceMeaning: "This dress has very beautiful colors.",
            sentenceZh: "这件衣服的颜色真漂亮。"
        },
        {
            kr: "색깔",
            en: "color",
            zh: "颜色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "좋아하는 색깔이 무엇입니까?",
            sentenceMeaning: "What is your favorite color?",
            sentenceZh: "你喜欢的颜色是什么？"
        },
        {
            kr: "생활",
            en: "life, living",
            zh: "生活",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "한국 생활이 아주 즐겁습니다.",
            sentenceMeaning: "Life in Korea is very enjoyable.",
            sentenceZh: "在韩国的生活非常愉快。"
        },
        {
            kr: "서너",
            en: "three or four",
            zh: "三四个",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "집에 친구들이 서너 명 왔습니다.",
            sentenceMeaning: "Three or four friends came to my house.",
            sentenceZh: "家里来了三四个朋友。"
        },
        {
            kr: "서로",
            en: "each other",
            zh: "互相",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "우리는 서로 돕고 살아야 합니다.",
            sentenceMeaning: "We should live helping each other.",
            sentenceZh: "我们应该互相帮助。"
        },
        {
            kr: "서른",
            en: "thirty",
            zh: "三十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "그는 서른 살에 결혼을 했습니다.",
            sentenceMeaning: "He got married at the age of thirty.",
            sentenceZh: "他在三十岁时结婚了。"
        },
        {
            kr: "선선하다",
            en: "cool, refreshing",
            zh: "凉爽",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "가을이 되니 날씨가 선선합니다.",
            sentenceMeaning: "Now that it's autumn, the weather is cool.",
            sentenceZh: "到了秋天，天气很凉爽。"
        },
        {
            kr: "성공",
            en: "success",
            zh: "成功",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "그는 끊임없는 노력으로 성공했습니다.",
            sentenceMeaning: "He succeeded through constant effort.",
            sentenceZh: "他通过不断的努力获得了成功。"
        },
        {
            kr: "성적",
            en: "grade, score",
            zh: "成绩",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이번 학기 성적이 아주 잘 나왔습니다.",
            sentenceMeaning: "The grades for this semester came out very well.",
            sentenceZh: "这学期的成绩很好。"
        },
        {
            kr: "세다",
            en: "strong",
            zh: "强",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "오늘은 바람이 무척 셉니다.",
            sentenceMeaning: "The wind is very strong today.",
            sentenceZh: "今天的风很大。"
        },
        {
            kr: "센티미터",
            en: "centimeter",
            zh: "厘米",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "키가 몇 센티미터예요?",
            sentenceMeaning: "How tall are you in centimeters?",
            sentenceZh: "你的身高是多少厘米？"
        },
        {
            kr: "셋",
            en: "three",
            zh: "三",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "사과가 셋 있어요.",
            sentenceMeaning: "There are three apples.",
            sentenceZh: "有三个苹果。"
        },
        {
            kr: "셋째",
            en: "third",
            zh: "第三",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "우리 집의 셋째 아이예요.",
            sentenceMeaning: "He is the third child in our family.",
            sentenceZh: "他是我们家的第三个孩子。"
        },
        {
            kr: "소리",
            en: "sound",
            zh: "声音",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "밖에서 이상한 소리가 나요.",
            sentenceMeaning: "There's a strange noise outside.",
            sentenceZh: "外面有奇怪的声音。"
        },
        {
            kr: "소식",
            en: "news",
            zh: "消息",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "고향 친구의 소식을 들었어요.",
            sentenceMeaning: "I heard news from a friend from back home.",
            sentenceZh: "我从家乡的一个朋友那里听到了消息。"
        },
        {
            kr: "소중하다",
            en: "precious",
            zh: "珍贵",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "가족은 저에게 가장 소중해요.",
            sentenceMeaning: "Family is the most important thing to me.",
            sentenceZh: "家庭对我来说是最重要的。"
        },
        {
            kr: "사실",
            en: "fact, truth",
            zh: "事实",
            pos: "명사/부사",
            category: "miscellaneous",
            sentenceKr: "사실을 밝혀요.",
            sentenceMeaning: "Let's reveal the facts.",
            sentenceZh: "让我们来揭晓事实吧。"
        }
    ],
    beginner_cycle_9: [
        {
            kr: "소풍",
            en: "picnic",
            zh: "野餐/郊游",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "날씨가 좋아서 소풍을 갔어요.",
            sentenceMeaning: "The weather was nice, so we went on a picnic.",
            sentenceZh: "天气很好，所以我们去野餐了。"
        },
        {
            kr: "송편",
            en: "Songpyeon",
            zh: "松饼/松片",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "추석에 가족들과 송편을 만들었어요.",
            sentenceMeaning: "I made songpyeon with my family during Chuseok.",
            sentenceZh: "中秋节期间我和家人一起做了松饼。"
        },
        {
            kr: "수고",
            en: "effort/trouble",
            zh: "辛苦",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "오늘 정말 수고 많으셨습니다.",
            sentenceMeaning: "Thank you for your hard work today.",
            sentenceZh: "感谢您今天的辛勤工作。"
        },
        {
            kr: "수박",
            en: "watermelon",
            zh: "西瓜",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "여름에는 시원한 수박이 최고예요.",
            sentenceMeaning: "Cool watermelon is the best in summer.",
            sentenceZh: "夏天最好吃清凉的西瓜。"
        },
        {
            kr: "수저",
            en: "spoon and chopsticks",
            zh: "勺子和筷子",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "식탁 위에 수저를 놓아 주세요.",
            sentenceMeaning: "Please place the spoon on the table.",
            sentenceZh: "请把勺子放在桌子上。"
        },
        {
            kr: "순두부찌개",
            en: "soft tofu stew",
            zh: "嫩豆腐汤",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "점심으로 따뜻한 순두부찌개를 먹었어요.",
            sentenceMeaning: "I had warm soft tofu stew for lunch.",
            sentenceZh: "午餐我吃了热软豆腐。"
        },
        {
            kr: "숟가락",
            en: "spoon",
            zh: "勺子",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "숟가락을 들고 식사를 시작해요.",
            sentenceMeaning: "Pick up a spoon and start eating.",
            sentenceZh: "拿起勺子开始吃。"
        },
        {
            kr: "술",
            en: "alcohol",
            zh: "酒",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "어른들과 술을 마실 때는 예의를 지켜야 해요.",
            sentenceMeaning: "You have to be polite when drinking with adults.",
            sentenceZh: "和大人喝酒时一定要有礼貌。"
        },
        {
            kr: "술집",
            en: "bar/pub",
            zh: "酒吧/酒馆",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "친구와 술집에서 술을 한잔했어요.",
            sentenceMeaning: "I had a drink at a bar with my friend.",
            sentenceZh: "我和朋友在酒吧喝了一杯。"
        },
        {
            kr: "스파게티",
            en: "spaghetti",
            zh: "意大利面",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "제가 가장 좋아하는 음식은 스파게티예요.",
            sentenceMeaning: "My favorite food is spaghetti.",
            sentenceZh: "我最喜欢的食物是意大利面。"
        },
        {
            kr: "시다",
            en: "to be sour",
            zh: "酸",
            pos: "Adjective",
            category: "food_dining",
            sentenceKr: "레몬은 맛이 아주 셔요.",
            sentenceMeaning: "Lemon tastes very sour.",
            sentenceZh: "柠檬的味道很酸。"
        },
        {
            kr: "식당",
            en: "restaurant",
            zh: "餐厅/食堂",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "학교 근처 식당에서 식사를 했어요.",
            sentenceMeaning: "I ate at a restaurant near the school.",
            sentenceZh: "我在学校附近的一家餐馆吃饭。"
        },
        {
            kr: "식빵",
            en: "loaf bread",
            zh: "吐司/切片面包",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "아침으로 식빵을 구워 먹었어요.",
            sentenceMeaning: "I baked bread for breakfast.",
            sentenceZh: "我烤面包当早餐。"
        },
        {
            kr: "식사",
            en: "meal",
            zh: "饭/餐",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "맛있는 식사를 대접하고 싶어요.",
            sentenceMeaning: "I want to treat you to a delicious meal.",
            sentenceZh: "我想请你吃顿可口的饭菜。"
        },
        {
            kr: "식초",
            en: "vinegar",
            zh: "醋",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "냉면에 식초를 조금 넣었어요.",
            sentenceMeaning: "I added a little vinegar to the cold noodles.",
            sentenceZh: "我在冷面里加了一点醋。"
        },
        {
            kr: "식탁",
            en: "dining table",
            zh: "餐桌",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "가족들과 식탁에 둘러앉아 饭을 먹어요.",
            sentenceMeaning: "I sit around the table with my family and eat food.",
            sentenceZh: "我和家人围坐在桌子旁吃食物。"
        },
        {
            kr: "식품",
            en: "food/groceries",
            zh: "食品",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "건강 식품을 골고루 섭취해야 해요.",
            sentenceMeaning: "You should eat a variety of healthy foods.",
            sentenceZh: "你应该吃各种健康食品。"
        },
        {
            kr: "쌀",
            en: "rice",
            zh: "大米",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "마트에서 쌀 한 포대를 샀어요.",
            sentenceMeaning: "I bought a bag of rice at the supermarket.",
            sentenceZh: "我在超市买了一袋大米。"
        },
        {
            kr: "수업",
            en: "class/lesson",
            zh: "课/课程",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "한국어 수업을 듣고 있어요.",
            sentenceMeaning: "I'm taking a Korean class.",
            sentenceZh: "我正在上韩语课。"
        },
        {
            kr: "수첩",
            en: "notebook",
            zh: "手册/笔记本",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "중요한 내용은 수첩에 써 두세요.",
            sentenceMeaning: "Write down important information in your notebook.",
            sentenceZh: "在笔记本上记下重要信息。"
        },
        {
            kr: "숙제",
            en: "homework",
            zh: "作业",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "수업이 끝나고 숙제를 했어요.",
            sentenceMeaning: "After class, I did my homework.",
            sentenceZh: "下课后，我做了作业。"
        },
        {
            kr: "시험",
            en: "exam",
            zh: "考试",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "다음 주에 한국어 시험을 볼 거예요.",
            sentenceMeaning: "I'm going to take the Korean test next week.",
            sentenceZh: "下周我要去参加韩语考试。"
        },
        {
            kr: "신문",
            en: "newspaper",
            zh: "报纸",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "아버지는 아침마다 신문을 읽으세요.",
            sentenceMeaning: "My father reads the newspaper every morning.",
            sentenceZh: "我父亲每天早上都读报纸。"
        },
        {
            kr: "소포",
            en: "parcel",
            zh: "包裹",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "우체국에서 소포를 보냈어요.",
            sentenceMeaning: "I sent a package from the post office.",
            sentenceZh: "我从邮局寄了一个包裹。"
        },
        {
            kr: "소화제",
            en: "digestive medicine",
            zh: "助消化药",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "체해서 소화제를 먹었어요.",
            sentenceMeaning: "I was sick and took digestive medicine.",
            sentenceZh: "我生病了，吃了消化药。"
        },
        {
            kr: "속옷",
            en: "underwear",
            zh: "内衣",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "여행을 위해 새 속옷을 샀어요.",
            sentenceMeaning: "I bought new underwear for the trip.",
            sentenceZh: "我为旅行买了新内衣。"
        },
        {
            kr: "손",
            en: "hand",
            zh: "手",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "비누로 손을 깨끗이 씻으세요.",
            sentenceMeaning: "Wash your hands thoroughly with soap.",
            sentenceZh: "用肥皂彻底洗手。"
        },
        {
            kr: "손가락",
            en: "finger",
            zh: "手指",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "손가락에 반지를 끼웠어요.",
            sentenceMeaning: "I put a ring on my finger.",
            sentenceZh: "我把戒指戴在手指上。"
        },
        {
            kr: "손바닥",
            en: "palm",
            zh: "手掌",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "손바닥에 땀이 나요.",
            sentenceMeaning: "My palms are sweaty.",
            sentenceZh: "我的手心出汗了。"
        },
        {
            kr: "손수건",
            en: "handkerchief",
            zh: "手绢",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "손수건으로 땀을 닦았어요.",
            sentenceMeaning: "I wiped my sweat with a handkerchief.",
            sentenceZh: "我用手帕擦了擦汗。"
        },
        {
            kr: "수건",
            en: "towel",
            zh: "毛巾",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "샤워하고 수건으로 몸을 닦아요.",
            sentenceMeaning: "I take a shower and dry myself with a towel.",
            sentenceZh: "我洗澡并用毛巾擦干身体。"
        },
        {
            kr: "수영복",
            en: "swimsuit",
            zh: "泳衣",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "수영장에서 입을 수영복을 샀어요.",
            sentenceMeaning: "I bought a swimsuit to wear at the pool.",
            sentenceZh: "我买了一件泳衣去游泳池穿。"
        },
        {
            kr: "스웨터",
            en: "sweater",
            zh: "毛衣",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "날씨가 추워져서 두꺼운 스웨터를 입었어요.",
            sentenceMeaning: "The weather got cold, so I wore a thick sweater.",
            sentenceZh: "天气变冷了，我穿了一件厚毛衣。"
        },
        {
            kr: "스카프",
            en: "scarf",
            zh: "围巾",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "목에 예쁜 스카프를 매었어요.",
            sentenceMeaning: "I tied a pretty scarf around my neck.",
            sentenceZh: "我在脖子上系了一条漂亮的围巾。"
        },
        {
            kr: "스케이트",
            en: "skates",
            zh: "溜冰鞋",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "겨울에 스케이트를 신으러 가요.",
            sentenceMeaning: "I go wear skates in the winter.",
            sentenceZh: "冬天我去穿溜冰鞋。"
        },
        {
            kr: "신발",
            en: "shoes",
            zh: "鞋子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "입구에서 신발을 벗고 들어오세요.",
            sentenceMeaning: "Please take off your shoes at the entrance and come in.",
            sentenceZh: "请在入口处脱鞋并进入。"
        },
        {
            kr: "신분증",
            en: "ID card",
            zh: "身份证",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "본인 확인을 위해 신분증을 보여 주세요.",
            sentenceMeaning: "Please show your ID to verify your identity.",
            sentenceZh: "请出示您的身份证件以验证您的身份。"
        },
        {
            kr: "신호등",
            en: "traffic light",
            zh: "红绿灯",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "신호등이 초록색으로 바뀌었어요.",
            sentenceMeaning: "The traffic light turned green.",
            sentenceZh: "交通灯变绿了。"
        },
        {
            kr: "수영장",
            en: "swimming pool",
            zh: "游泳池",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "여름에 수영장에 자주 다녀요.",
            sentenceMeaning: "I often go to the swimming pool in the summer.",
            sentenceZh: "夏天我经常去游泳池。"
        },
        {
            kr: "슈퍼마켓",
            en: "supermarket",
            zh: "超市",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "슈퍼마켓에서 신선한 과일을 샀어요.",
            sentenceMeaning: "I bought fresh fruit at the supermarket.",
            sentenceZh: "我从超市买了新鲜水果。"
        },
        {
            kr: "시골",
            en: "countryside",
            zh: "农村/乡下",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "저는 공기 좋은 시골에 살고 싶어요.",
            sentenceMeaning: "I want to live in the countryside with good air.",
            sentenceZh: "我想住在乡村，空气好。"
        },
        {
            kr: "시장",
            en: "market",
            zh: "市场",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "시장에 가서 장을 봐 왔어요.",
            sentenceMeaning: "I went to the market and bought groceries.",
            sentenceZh: "我去了市场买了杂货。"
        },
        {
            kr: "시청",
            en: "City Hall",
            zh: "市政府",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "시청 공무원과 상담을 했어요.",
            sentenceMeaning: "I consulted with city hall officials.",
            sentenceZh: "我咨询了市政府官员。"
        },
        {
            kr: "신혼여행",
            en: "honeymoon",
            zh: "新婚旅行",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "결혼식 후에 제주도로 신혼여행을 갔어요.",
            sentenceMeaning: "After the wedding, we went on a honeymoon to Jeju Island.",
            sentenceZh: "婚礼结束后，我们去济州岛度蜜月。"
        },
        {
            kr: "손녀",
            en: "granddaughter",
            zh: "孙女",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "할머니께서 손녀를 돌보고 계세요.",
            sentenceMeaning: "A grandmother is taking care of her granddaughter.",
            sentenceZh: "一位祖母正在照顾她的孙女。"
        },
        {
            kr: "손님",
            en: "guest/customer",
            zh: "客人/顾客",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "가게에 손님이 한 명도 없어요.",
            sentenceMeaning: "There are no customers in the store.",
            sentenceZh: "店里没有顾客。"
        },
        {
            kr: "시민",
            en: "citizen",
            zh: "市民",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "시민들을 설득하는 것이 쉽지 않았어요.",
            sentenceMeaning: "It was not easy to persuade citizens.",
            sentenceZh: "说服公民并不容易。"
        },
        {
            kr: "시어머니",
            en: "mother-in-law (for a wife)",
            zh: "婆婆",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "시어머니를 정성껏 모시고 있어요.",
            sentenceMeaning: "I take good care of my mother-in-law.",
            sentenceZh: "我把婆婆照顾得很好。"
        },
        {
            kr: "식구",
            en: "family member",
            zh: "家口/家人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 식구는 모두 네 명이에요.",
            sentenceMeaning: "There are a total of four people in our family.",
            sentenceZh: "我们家一共有四口人。"
        },
        {
            kr: "신랑",
            en: "groom",
            zh: "新郎",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "신랑과 신부가 결혼식을 올려요.",
            sentenceMeaning: "The bride and groom are getting married.",
            sentenceZh: "新娘和新郎要结婚了。"
        },
        {
            kr: "신부",
            en: "bride",
            zh: "新娘",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "신부가 하얀 드레스를 입고 있어요.",
            sentenceMeaning: "The bride is wearing a white dress.",
            sentenceZh: "新娘穿着白色礼服。"
        },
        {
            kr: "스트레스",
            en: "stress",
            zh: "压力",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "음악을 들으며 스트레스를 풀어요.",
            sentenceMeaning: "I relieve stress by listening to music.",
            sentenceZh: "我通过听音乐来缓解压力。"
        },
        {
            kr: "슬퍼하다",
            en: "to feel sad",
            zh: "悲伤",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "친구의 이별을 함께 슬퍼해 주었어요.",
            sentenceMeaning: "We mourned the breakup of our friend together.",
            sentenceZh: "我们一起哀悼我们朋友的分手。"
        },
        {
            kr: "슬프다",
            en: "to be sad",
            zh: "伤心",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "영화가 너무 슬퍼서 눈물이 났어요.",
            sentenceMeaning: "The movie was so sad that I cried.",
            sentenceZh: "这部电影太悲伤了，我哭了。"
        },
        {
            kr: "슬픔",
            en: "sadness",
            zh: "悲伤",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "깊은 슬픔에 잠겨 있었어요.",
            sentenceMeaning: "I was immersed in deep sadness.",
            sentenceZh: "我沉浸在深深的悲伤之中。"
        },
        {
            kr: "시내",
            en: "downtown",
            zh: "市内/市中心",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "주말에는 시내에 사람이 정말 많아요.",
            sentenceMeaning: "There are a lot of people downtown on weekends.",
            sentenceZh: "周末市中心人很多。"
        },
        {
            kr: "싫다",
            en: "to be disliked/hated",
            zh: "讨厌",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "저는 비 오는 날이 정말 싫어요.",
            sentenceMeaning: "I really hate rainy days.",
            sentenceZh: "我真的很讨厌下雨天。"
        },
        {
            kr: "싫어하다",
            en: "to hate/dislike",
            zh: "讨厌",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "동생은 채소를 먹는 것을 싫어해요.",
            sentenceMeaning: "My younger brother hates eating vegetables.",
            sentenceZh: "我弟弟不喜欢吃蔬菜。"
        },
        {
            kr: "심심하다",
            en: "to be bored",
            zh: "无聊",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "할 일이 없어서 너무 심심해요.",
            sentenceMeaning: "I'm so bored because I have nothing to do.",
            sentenceZh: "我很无聊，因为我无事可做。"
        },
        {
            kr: "쌓다",
            en: "to stack/pile up",
            zh: "堆/积累",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "책장에 책을 높이 쌓았어요.",
            sentenceMeaning: "I piled the books high on the bookshelf.",
            sentenceZh: "我把书高高地堆在书架上。"
        },
        {
            kr: "스키",
            en: "skis",
            zh: "滑雪板",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "스키를 신는 법을 배웠어요.",
            sentenceMeaning: "I learned how to put on skis.",
            sentenceZh: "我学会了如何穿上滑雪板。"
        },
        {
            kr: "스키장",
            en: "ski resort",
            zh: "滑雪场",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "친구들과 스키장에서 신나게 놀았어요.",
            sentenceMeaning: "I had a great time at the ski resort with my friends.",
            sentenceZh: "我和朋友们在滑雪场度过了愉快的时光。"
        },
        {
            kr: "스타",
            en: "star/celebrity",
            zh: "明星",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "그는 전 세계적으로 유명한 인기 스타예요.",
            sentenceMeaning: "He is a popular star famous all over the world.",
            sentenceZh: "他是一位享誉全球的当红明星。"
        },
        {
            kr: "심다",
            en: "to plant",
            zh: "种",
            pos: "Verb",
            category: "nature_animals_plants",
            sentenceKr: "마당에 예쁜 꽃을 심었어요.",
            sentenceMeaning: "I planted pretty flowers in the yard.",
            sentenceZh: "我在院子里种了漂亮的花。"
        },
        {
            kr: "수요일",
            en: "Wednesday",
            zh: "星期三",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "수요일은 제가 가장 바쁜 요일이에요.",
            sentenceMeaning: "Wednesday is my busiest day of the week.",
            sentenceZh: "星期三是我一周中最忙的一天。"
        },
        {
            kr: "시",
            en: "time/o'clock",
            zh: "时/点",
            pos: "Noun/Dependent Noun",
            category: "time_seasons",
            sentenceKr: "지금 몇 시예요?",
            sentenceMeaning: "What time is it now?",
            sentenceZh: "现在几点了？"
        },
        {
            kr: "시간",
            en: "time/hour",
            zh: "时间",
            pos: "Noun/Dependent Noun",
            category: "time_seasons",
            sentenceKr: "학교까지 가는 데 시간이 얼마나 걸려요?",
            sentenceMeaning: "How long does it take to get to school?",
            sentenceZh: "到学校需要多长时间？"
        },
        {
            kr: "시간표",
            en: "timetable",
            zh: "时间表/课表",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "새 학기 시간표를 짰어요.",
            sentenceMeaning: "I made a schedule for the new semester.",
            sentenceZh: "我为新学期制定了时间表。"
        },
        {
            kr: "시계",
            en: "clock/watch",
            zh: "时钟/手表",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "벽에 걸린 시계를 보고 시간을 확인해요.",
            sentenceMeaning: "I check the time by looking at the clock on the wall.",
            sentenceZh: "我通过看墙上的时钟来确认时间。"
        },
        {
            kr: "시월",
            en: "October",
            zh: "十月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "시월에는 단풍이 참 예뻐요.",
            sentenceMeaning: "The autumn leaves are very pretty in October.",
            sentenceZh: "十月的秋叶非常漂亮。"
        },
        {
            kr: "십이월",
            en: "December",
            zh: "十二月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "십이월에는 크리스마스가 있어요.",
            sentenceMeaning: "There is Christmas in December.",
            sentenceZh: "十二月有圣诞节。"
        },
        {
            kr: "십일월",
            en: "November",
            zh: "十一月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "십일월부터 날씨가 추워지기 시작해요.",
            sentenceMeaning: "The weather starts to get cold starting in November.",
            sentenceZh: "从11月份开始，天气开始变冷。"
        },
        {
            kr: "쇼핑",
            en: "shopping",
            zh: "购物",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "백화점에 쇼핑을 가요.",
            sentenceMeaning: "Let's go shopping at the department store.",
            sentenceZh: "我们去百货商店购物吧。"
        },
        {
            kr: "수술",
            en: "surgery",
            zh: "手术",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "병원에서 다리 수술을 받았어요.",
            sentenceMeaning: "I had leg surgery at the hospital.",
            sentenceZh: "我在医院做了腿部手术。"
        },
        {
            kr: "수영",
            en: "swimming",
            zh: "游泳",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "매일 아침 수영을 배워요.",
            sentenceMeaning: "I learn to swim every morning.",
            sentenceZh: "我每天早上都学游泳。"
        },
        {
            kr: "쉬다",
            en: "to breathe",
            zh: "呼吸",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "너무 놀라서 숨을 쉬기 힘들었어요.",
            sentenceMeaning: "I was so shocked that I had a hard time breathing.",
            sentenceZh: "我震惊得呼吸困难。"
        },
        {
            kr: "스포츠",
            en: "sports",
            zh: "运动",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "스포츠 경기 관람을 좋아해요.",
            sentenceMeaning: "I like watching sports games.",
            sentenceZh: "我喜欢看体育比赛。"
        },
        {
            kr: "시작",
            en: "start",
            zh: "开始",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "시작이 있으면 끝도 있는 법이에요.",
            sentenceMeaning: "If there is a beginning, there is also an end.",
            sentenceZh: "如果有开始，那么也就有结束。"
        },
        {
            kr: "시키다",
            en: "to order/make someone do",
            zh: "点菜/命令",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "동생에게 심부름 일을 시켰어요.",
            sentenceMeaning: "I asked my younger brother to run an errand for me.",
            sentenceZh: "我让弟弟帮我跑腿。"
        },
        {
            kr: "식다",
            en: "to cool down",
            zh: "变凉",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "국이다 식기 전에 빨리 드세요.",
            sentenceMeaning: "It's soup, so eat it quickly before it gets cold.",
            sentenceZh: "这是汤，所以要趁凉之前快点吃。"
        },
        {
            kr: "신다",
            en: "to wear (shoes/socks)",
            zh: "穿(鞋/袜)",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "새 신발을 신으니까 기분이 좋아요.",
            sentenceMeaning: "I feel good wearing new shoes.",
            sentenceZh: "穿上新鞋感觉很好。"
        },
        {
            kr: "신청",
            en: "application/request",
            zh: "申请",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "문화 센터 수업 신청을 했어요.",
            sentenceMeaning: "I signed up for a class at the cultural center.",
            sentenceZh: "我报名参加了文化中心的课程。"
        },
        {
            kr: "싣다",
            en: "to load",
            zh: "装载",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "차에 짐을 모두 실었어요.",
            sentenceMeaning: "I loaded all my luggage into the car.",
            sentenceZh: "我把所有的行李都装上了车。"
        },
        {
            kr: "싸우다",
            en: "to fight",
            zh: "吵架/战斗",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "친구와 말다툼을 하며 싸웠어요.",
            sentenceMeaning: "I had an argument with my friend and fought.",
            sentenceZh: "我和朋友吵架了，还打架了。"
        },
        {
            kr: "썰다",
            en: "to slice/chop",
            zh: "切",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "도마 위에서 양파를 썰고 있어요.",
            sentenceMeaning: "I'm chopping onions on a cutting board.",
            sentenceZh: "我正在切菜板上切洋葱。"
        },
        {
            kr: "속",
            en: "inside",
            zh: "里面",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "주머니 속에 사탕이 있어요.",
            sentenceMeaning: "There's candy in my pocket.",
            sentenceZh: "我的口袋里有糖果。"
        },
        {
            kr: "속도",
            en: "speed",
            zh: "速度",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "차가 속도가 너무 빨라요.",
            sentenceMeaning: "The car is moving too fast.",
            sentenceZh: "汽车开得太快了。"
        },
        {
            kr: "수",
            en: "number",
            zh: "数/数量",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "학생들의 수를 세어 보세요.",
            sentenceMeaning: "Count the students.",
            sentenceZh: "数一下学生。"
        },
        {
            kr: "순서",
            en: "order/sequence",
            zh: "顺序",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "번호표 순서대로 들어오세요.",
            sentenceMeaning: "Please enter in the order indicated by your number.",
            sentenceZh: "请按照您的号码所示的顺序输入。"
        },
        {
            kr: "숫자",
            en: "number/digit",
            zh: "数字",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "일주일에 한 번씩 숫자를 세요.",
            sentenceMeaning: "Count once a week.",
            sentenceZh: "每周数一次。"
        },
        {
            kr: "쉰",
            en: "fifty",
            zh: "五十",
            pos: "Noun/Determiner",
            category: "descriptions_qualities",
            sentenceKr: "아버지 연세가 올해 쉰이세요.",
            sentenceMeaning: "My father turns 50 this year.",
            sentenceZh: "我父亲今年50岁了。"
        },
        {
            kr: "쉽다",
            en: "to be easy",
            zh: "容易",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "이번 한국어 시험 문제는 정말 쉬웠어요.",
            sentenceMeaning: "The Korean test questions this time were really easy.",
            sentenceZh: "这次的韩语考试题目真的很简单。"
        },
        {
            kr: "스무",
            en: "twenty",
            zh: "二十",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "동생이 올해 스무 살이 되었어요.",
            sentenceMeaning: "My younger brother turned 20 this year.",
            sentenceZh: "我弟弟今年20岁了。"
        },
        {
            kr: "스물",
            en: "twenty",
            zh: "二十",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "사과가 모두 스물 개예요.",
            sentenceMeaning: "There are twenty apples in total.",
            sentenceZh: "一共有二十个苹果。"
        },
        {
            kr: "스스로",
            en: "by oneself/self",
            zh: "独自/自身",
            pos: "Adverb/Noun",
            category: "descriptions_qualities",
            sentenceKr: "나 스스로 문제를 해결했어요.",
            sentenceMeaning: "I solved the problem myself.",
            sentenceZh: "我自己解决了这个问题。"
        },
        {
            kr: "습관",
            en: "habit",
            zh: "习惯",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "좋은 습관을 기르는 것이 중요해요.",
            sentenceMeaning: "It's important to develop good habits.",
            sentenceZh: "养成良好的习惯很重要。"
        },
        {
            kr: "시끄럽다",
            en: "to be noisy",
            zh: "吵闹",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "밖에서 나는 소리가 너무 시끄러워요.",
            sentenceMeaning: "The noise outside is too loud.",
            sentenceZh: "外面的噪音太大了。"
        },
        {
            kr: "시원하다",
            en: "to be cool/refreshing",
            zh: "凉快/爽快",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "창문을 여니 시원한 공기가 들어와요.",
            sentenceMeaning: "When I open the window, cool air comes in.",
            sentenceZh: "当我打开窗户时，凉爽的空气就进来了。"
        },
        {
            kr: "신선하다",
            en: "to be fresh",
            zh: "新鲜",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "이 시장에는 신선한 과일이 많아요.",
            sentenceMeaning: "There are a lot of fresh fruits in this market.",
            sentenceZh: "这个市场里有很多新鲜水果。"
        },
        {
            kr: "신호",
            en: "signal",
            zh: "信号",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "교통 신호를 잘 지켜야 해요.",
            sentenceMeaning: "You must obey the traffic signals.",
            sentenceZh: "您必须遵守交通信号。"
        },
        {
            kr: "실례",
            en: "rudeness/excuse me",
            zh: "失礼/打扰",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "실례지만 말씀 좀 여쭙겠습니다.",
            sentenceMeaning: "Excuse me, but I have to ask you something.",
            sentenceZh: "对不起，但我必须问你一件事。"
        },
        {
            kr: "실수",
            en: "mistake",
            zh: "失误",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "누구나 실수를 할 수 있어요.",
            sentenceMeaning: "Anyone can make mistakes.",
            sentenceZh: "任何人都可能犯错误。"
        },
        {
            kr: "실패",
            en: "failure",
            zh: "失败",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "실패는 성공의 어머니라는 말이 있어요.",
            sentenceMeaning: "There is a saying that failure is the mother of success.",
            sentenceZh: "有句话说，失败是成功之母。"
        },
        {
            kr: "심하다",
            en: "to be severe/excessive",
            zh: "过分/严重",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "농담이 너무 심해서 화가 났어요.",
            sentenceMeaning: "I got angry because the joke was too harsh.",
            sentenceZh: "我很生气，因为这个笑话太严厉了。"
        },
        {
            kr: "십",
            en: "ten",
            zh: "十",
            pos: "Noun/Determiner",
            category: "descriptions_qualities",
            sentenceKr: "사과가 모두 십 개예요.",
            sentenceMeaning: "There are ten apples in total.",
            sentenceZh: "一共有十个苹果。"
        },
        {
            kr: "십만",
            en: "one hundred thousand",
            zh: "十万",
            pos: "Noun/Determiner",
            category: "descriptions_qualities",
            sentenceKr: "이 가방은 십만 원이에요.",
            sentenceMeaning: "This bag costs 100,000 won.",
            sentenceZh: "这个包价值10万韩元。"
        },
        {
            kr: "싱겁다",
            en: "to be bland",
            zh: "淡",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "국이 좀 싱거워서 소금을 넣었어요.",
            sentenceMeaning: "The soup was a bit bland, so I added salt.",
            sentenceZh: "汤有点淡，所以加了盐。"
        },
        {
            kr: "싸다",
            en: "to be cheap",
            zh: "便宜",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "이 물건은 가격이 정말 싸요.",
            sentenceMeaning: "This product is really cheap.",
            sentenceZh: "这个产品真的很便宜。"
        },
        {
            kr: "쌀쌀하다",
            en: "to be chilly",
            zh: "凉飕飕",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "바람이 불어서 날씨가 쌀쌀해요.",
            sentenceMeaning: "The wind is blowing and the weather is chilly.",
            sentenceZh: "风在吹，天气很冷。"
        }
    ],
    beginner_cycle_10: [
        {
            kr: "쓰다",
            en: "to be bitter",
            zh: "苦",
            pos: "Adjective",
            category: "food_dining",
            sentenceKr: "약이 너무 써서 먹기 힘들어요.",
            sentenceMeaning: "The medicine is so bitter that it is difficult to take.",
            sentenceZh: "这药太苦了，很难服下去。"
        },
        {
            kr: "아이스크림",
            en: "Ice cream",
            zh: "冰淇淋",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "여름에는 시원한 아이스크림을 먹는다.",
            sentenceMeaning: "In the summer, I eat cool ice cream.",
            sentenceZh: "夏天，我吃清凉的冰淇淋。"
        },
        {
            kr: "아침",
            en: "Morning/Breakfast",
            zh: "早上/早餐",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "벌써 아침이 되었다.",
            sentenceMeaning: "It's already morning.",
            sentenceZh: "已经早上了。"
        },
        {
            kr: "야채",
            en: "Vegetable",
            zh: "蔬菜",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "몸에 좋은 야채를 많이 먹읍시다.",
            sentenceMeaning: "Let's eat a lot of vegetables that are good for your body.",
            sentenceZh: "我们要多吃对身体有益的蔬菜。"
        },
        {
            kr: "양식",
            en: "Western food",
            zh: "西餐",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "한식보다 양식을 더 좋아해요.",
            sentenceMeaning: "I like Western food more than Korean food.",
            sentenceZh: "比起韩国菜，我更喜欢西餐。"
        },
        {
            kr: "양식집",
            en: "Western restaurant",
            zh: "西餐厅",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "시내에 있는 양식집에 가기로 했어요.",
            sentenceZh: "我决定去市中心的一家西餐厅。",
            sentenceMeaning: "I decided to go to a Western restaurant downtown."
        },
        {
            kr: "얼음",
            en: "Ice",
            zh: "冰",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "더운 여름에 시원한 얼음을 넣은 주스를 마셔요.",
            sentenceMeaning: "Drink cool juice with ice in the hot summer.",
            sentenceZh: "炎热的夏天喝点冰镇的果汁。"
        },
        {
            kr: "언어",
            en: "Language",
            zh: "语言",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "자신의 생각을 언어로 표현하는 법을 배워요.",
            sentenceMeaning: "Learn how to express your thoughts verbally.",
            sentenceZh: "学习如何用语言表达你的想法。"
        },
        {
            kr: "쓰레기",
            en: "trash",
            zh: "垃圾",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "길에 쓰레기를 버리면 안 돼요.",
            sentenceMeaning: "You can't throw trash on the street.",
            sentenceZh: "你不能在街上扔垃圾。"
        },
        {
            kr: "쓰레기통",
            en: "trash can",
            zh: "垃圾桶",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "다 쓴 휴지는 쓰레기통에 넣으세요.",
            sentenceMeaning: "Put used tissues in the trash can.",
            sentenceZh: "将用过的纸巾放入垃圾桶。"
        },
        {
            kr: "씻다",
            en: "to wash",
            zh: "洗",
            pos: "Verb",
            category: "home_living",
            sentenceKr: "외출 후에 손을 깨끗이 씻어요.",
            sentenceMeaning: "Wash your hands thoroughly after going out.",
            sentenceZh: "外出后彻底洗手。"
        },
        {
            kr: "아무것",
            en: "Anything",
            zh: "任何东西",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "배가 고파서 아무것이나 괜찮아요.",
            sentenceMeaning: "I'm hungry so anything is fine.",
            sentenceZh: "我饿了所以什么都好。"
        },
        {
            kr: "아파트",
            en: "Apartment",
            zh: "公寓",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "우리는 새로 지은 아파트에 산아요.",
            sentenceMeaning: "We live in a newly built apartment.",
            sentenceZh: "我们住在新建的公寓里。"
        },
        {
            kr: "악기",
            en: "Musical instrument",
            zh: "乐器",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "여러 가지 악기를 연주하는 것을 좋아한아요.",
            sentenceMeaning: "I like playing various instruments.",
            sentenceZh: "我喜欢演奏各种乐器。"
        },
        {
            kr: "안경",
            en: "Glasses",
            zh: "眼镜",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "그는 책을 볼 때 안경을 쓴어요.",
            sentenceMeaning: "He wears glasses when he reads a book.",
            sentenceZh: "他看书时戴着眼镜。"
        },
        {
            kr: "안내문",
            en: "Notice",
            zh: "通知/告示",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "게시판에서 안내문을 받았다.",
            sentenceMeaning: "I received a notice from the bulletin board.",
            sentenceZh: "我收到了布告栏的通知。"
        },
        {
            kr: "앨범",
            en: "Album",
            zh: "相册",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "앨범을 보며 옛날 사진을 추억했다.",
            sentenceMeaning: "Looking at the album, I reminisced about old photos.",
            sentenceZh: "看着相册，我想起了一些老照片。"
        },
        {
            kr: "약",
            en: "Medicine",
            zh: "药",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "식후 30분에 이 약을 드세요.",
            sentenceMeaning: "Take this medicine 30 minutes after a meal.",
            sentenceZh: "饭后30分钟服用此药。"
        },
        {
            kr: "양말",
            en: "Socks",
            zh: "袜子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "아침에 깨끗한 양말을 신었어요.",
            sentenceMeaning: "I wore clean socks in the morning.",
            sentenceZh: "我早上穿着干净的袜子。"
        },
        {
            kr: "양복",
            en: "Suit",
            zh: "西装",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "중요한 모임이라 양복을 입었어요.",
            sentenceMeaning: "It was an important meeting, so I wore a suit.",
            sentenceZh: "这是一个重要的会议，所以我穿了西装。"
        },
        {
            kr: "어깨",
            en: "Shoulder",
            zh: "肩膀",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "무거운 가방을 멨더니 어깨가 아파요.",
            sentenceMeaning: "My shoulder hurts after carrying a heavy bag.",
            sentenceZh: "拎了很重的包后，我的肩膀很痛。"
        },
        {
            kr: "얼굴",
            en: "Face",
            zh: "脸",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "아침에 일어나서 얼굴을 씻었다.",
            sentenceMeaning: "I woke up in the morning and washed my face.",
            sentenceZh: "我早上醒来，洗了脸。"
        },
        {
            kr: "아래",
            en: "Below/Under",
            zh: "下面",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "책상 아래에 공이 있어요.",
            sentenceMeaning: "There is a ball under the desk.",
            sentenceZh: "桌子下面有一个球。"
        },
        {
            kr: "아래쪽",
            en: "Lower side/Bottom",
            zh: "下方",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "아래쪽 방향을 확인해 보세요.",
            sentenceMeaning: "Check the downward direction.",
            sentenceZh: "检查向下的方向。"
        },
        {
            kr: "안쪽",
            en: "Inside",
            zh: "内侧",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "교실 안쪽은 바깥쪽보다 조용해요.",
            sentenceMeaning: "The inside of the classroom is quieter than the outside.",
            sentenceZh: "教室里比外面安静。"
        },
        {
            kr: "앞",
            en: "Front",
            zh: "前面",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "운동장 앞으로 모두 모여라.",
            sentenceMeaning: "Everyone gather in front of the playground.",
            sentenceZh: "大家聚集在操场前。"
        },
        {
            kr: "앞쪽",
            en: "Front side",
            zh: "前方",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "앞쪽으로 향해 천천히 걸어가세요.",
            sentenceMeaning: "Walk slowly toward the front.",
            sentenceZh: "慢慢地朝前方走去。"
        },
        {
            kr: "약국",
            en: "Pharmacy",
            zh: "药店",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "약국에 가서 감기약을 샀어요.",
            sentenceMeaning: "I went to the pharmacy and bought cold medicine.",
            sentenceZh: "我去药店买了感冒药。"
        },
        {
            kr: "어디",
            en: "Where",
            zh: "哪儿",
            pos: "Pronoun",
            category: "city_travel_places",
            sentenceKr: "지금 계신 곳이 어디예요?",
            sentenceMeaning: "Where are you now?",
            sentenceZh: "你现在在哪里？"
        },
        {
            kr: "씨",
            en: "Mr./Ms.",
            zh: "先生/女士",
            pos: "Dependent Noun",
            category: "people_jobs_family",
            sentenceKr: "민수 씨, 오늘 시간 있어요?",
            sentenceMeaning: "Minsu, are you free today?",
            sentenceZh: "敏苏，今天有空吗？"
        },
        {
            kr: "아가씨",
            en: "young lady",
            zh: "小姐/小姐姐",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "옆집에 사는 아가씨가 인사를 했어요.",
            sentenceMeaning: "The girl who lives next door said hello.",
            sentenceZh: "住在隔壁的女孩打招呼。"
        },
        {
            kr: "아기",
            en: "baby",
            zh: "婴儿",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "아기가 곤히 잠들어 있어요.",
            sentenceMeaning: "The baby is sleeping soundly.",
            sentenceZh: "宝宝睡得很香。"
        },
        {
            kr: "아나운서",
            en: "announcer",
            zh: "播音员/主持人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "저는 나중에 아나운서가 되고 싶어요.",
            sentenceMeaning: "I want to become an announcer later.",
            sentenceZh: "我以后想成为一名播音员。"
        },
        {
            kr: "아내",
            en: "wife",
            zh: "妻子",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "아내와 함께 공원을 산책했어요.",
            sentenceMeaning: "I took a walk in the park with my wife.",
            sentenceZh: "我和妻子在公园散步。"
        },
        {
            kr: "아들",
            en: "Son",
            zh: "儿子",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "그녀는 건강한 아들을 낳았다.",
            sentenceMeaning: "She gave birth to a healthy son.",
            sentenceZh: "她生下了一个健康的儿子。"
        },
        {
            kr: "아르바이트",
            en: "Part-time job",
            zh: "兼职",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "방학 동안 할 아르바이트를 구하고 있어요.",
            sentenceMeaning: "I'm looking for a part-time job during vacation.",
            sentenceZh: "我正在寻找假期期间的兼职工作。"
        },
        {
            kr: "아버님",
            en: "Father (honorific)",
            zh: "父亲（敬语）",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "아버님, 가족들과 함께 오셨어요?",
            sentenceMeaning: "Father, are you here with your family?",
            sentenceZh: "爸爸，你和你的家人在这里吗？"
        },
        {
            kr: "아버지",
            en: "Father",
            zh: "父亲",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리는 아버지와 함께 여행을 갔아요.",
            sentenceMeaning: "We went on a trip with my father.",
            sentenceZh: "我们和父亲一起去旅行。"
        },
        {
            kr: "아빠",
            en: "Dad",
            zh: "爸爸",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "아빠, 같이 놀아 주세요.",
            sentenceMeaning: "Dad, please play with me.",
            sentenceZh: "爸爸，请陪我玩吧。"
        },
        {
            kr: "아이",
            en: "Child/Kid",
            zh: "孩子",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "아이들이 어른보다 더 빨리 배운어요.",
            sentenceMeaning: "Children learn faster than adults.",
            sentenceZh: "孩子们比成人学得更快。"
        },
        {
            kr: "아저씨",
            en: "Mister",
            zh: "大叔",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "옆집 아저씨는 정말 친절하시다.",
            sentenceMeaning: "The guy next door is really kind.",
            sentenceZh: "隔壁的小伙子真的很善良。"
        },
        {
            kr: "아주머니",
            en: "Auntie",
            zh: "大婶",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "식당 아주머니께 인사를 드렸어요.",
            sentenceMeaning: "I said hello to the restaurant lady.",
            sentenceZh: "我向餐厅的那位女士打招呼。"
        },
        {
            kr: "아줌마",
            en: "Auntie",
            zh: "大妈",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "아줌마, 사과 세 개만 주세요.",
            sentenceMeaning: "Lady, please give me three apples.",
            sentenceZh: "女士，请给我三个苹果。"
        },
        {
            kr: "안되다",
            en: "Not work/To be sorry",
            zh: "不行/不好",
            pos: "Verb",
            category: "people_jobs_family",
            sentenceKr: "피곤해서 그런지 오늘 공부가 잘 안된어요.",
            sentenceMeaning: "Maybe it's because I'm tired, but I didn't study well today.",
            sentenceZh: "可能是因为累了，今天没好好学习。"
        },
        {
            kr: "애",
            en: "Child/Kid",
            zh: "孩子",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "저 애는 어른처럼 말을 잘한아요.",
            sentenceMeaning: "That kid speaks well like an adult.",
            sentenceZh: "这孩子说话很好，像大人一样。"
        },
        {
            kr: "애인",
            en: "Lover/Sweetheart",
            zh: "爱人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "나는 애인과 함께 데이트를 했다.",
            sentenceMeaning: "I went on a date with my lover.",
            sentenceZh: "我和我的爱人去约会了。"
        },
        {
            kr: "약사",
            en: "Pharmacist",
            zh: "药剂师",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "그는 나중에 훌륭한 약사가 되었다.",
            sentenceMeaning: "He later became a great pharmacist.",
            sentenceZh: "后来他成为了一位伟大的药剂师。"
        },
        {
            kr: "어른",
            en: "Adult",
            zh: "大人/成年人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "그 아이는 벌써 다 자라서 어른이 되었다.",
            sentenceMeaning: "The child has already grown up and become an adult.",
            sentenceZh: "孩子已经长大成人了。"
        },
        {
            kr: "어린아이",
            en: "Young child",
            zh: "小孩",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "공원에서 어린아이와 신나게 놀았어요.",
            sentenceMeaning: "I had a great time playing with my child at the park.",
            sentenceZh: "我和我的孩子在公园玩得很开心。"
        },
        {
            kr: "어린이",
            en: "Child",
            zh: "儿童",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "어린이들은 나라의 미래예요.",
            sentenceMeaning: "Children are the future of the country.",
            sentenceZh: "儿童是国家的未来。"
        },
        {
            kr: "어머니",
            en: "Mother",
            zh: "母亲",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "어머니께서 맛있는 음식을 해주셨어요.",
            sentenceMeaning: "My mother cooked delicious food.",
            sentenceZh: "我妈妈煮的饭菜很美味。"
        },
        {
            kr: "어머님",
            en: "Mother (honorific)",
            zh: "母亲（敬称）",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "친구의 어머님께 인사를 드렸어요.",
            sentenceMeaning: "I said hello to my friend’s mother.",
            sentenceZh: "我向朋友的妈妈打了招呼。"
        },
        {
            kr: "언니",
            en: "Older sister",
            zh: "姐姐",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 언니는 성격이 참 좋아요.",
            sentenceMeaning: "My sister has a really nice personality.",
            sentenceZh: "我姐姐的性格真的很好。"
        },
        {
            kr: "어떠하다",
            en: "How/Be like what",
            zh: "怎么样",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "새로운 직장 생활은 어떠하신가요?",
            sentenceMeaning: "How is your new job?",
            sentenceZh: "你的新工作怎么样？"
        },
        {
            kr: "어리다",
            en: "Young",
            zh: "小/年纪轻",
            pos: "Adjective",
            category: "time_seasons",
            sentenceKr: "그는 아직 나이가 어려서 학교에 안 다녀요.",
            sentenceMeaning: "He is still young and does not go to school.",
            sentenceZh: "他还年轻，没有上学。"
        },
        {
            kr: "어제",
            en: "Yesterday",
            zh: "昨天",
            pos: "Adverb",
            category: "time_seasons",
            sentenceKr: "어제 본 영화는 정말 슬펐어요.",
            sentenceMeaning: "The movie I saw yesterday was really sad.",
            sentenceZh: "昨天看的电影真的很悲伤。"
        },
        {
            kr: "어젯밤",
            en: "Last night",
            zh: "昨晚",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "어젯밤에 잠을 잘 못 잤어요.",
            sentenceMeaning: "I didn't sleep well last night.",
            sentenceZh: "我昨晚没睡好。"
        },
        {
            kr: "씹다",
            en: "to chew",
            zh: "嚼",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "음식을 천천히 씹어 먹어야 건강에 좋아요.",
            sentenceMeaning: "It is good for your health to chew your food slowly.",
            sentenceZh: "慢慢地咀嚼食物对你的健康有好处。"
        },
        {
            kr: "안내",
            en: "Guidance/Information",
            zh: "引导/信息",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "관광 안내를 받으러 안내소에 갔아요.",
            sentenceMeaning: "I went to the information center to get tourist information.",
            sentenceZh: "我去信息中心获取旅游信息。"
        },
        {
            kr: "안녕",
            en: "Hi/Hello",
            zh: "你好",
            pos: "Exclamation",
            category: "actions_routines",
            sentenceKr: "친구야, 안녕! 잘 지냈어?",
            sentenceMeaning: "Hello friend! ",
            sentenceZh: "朋友你好！你最近怎么样？"
        },
        {
            kr: "안다",
            en: "To hug/hold",
            zh: "抱",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "어머니가 우는 아기를 꼭 안았다.",
            sentenceMeaning: "A mother hugged her crying baby.",
            sentenceZh: "一位母亲拥抱着哭泣的婴儿。"
        },
        {
            kr: "안전",
            en: "Safety",
            zh: "安全",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "운전할 때는 교통 안전을 꼭 지켜야 해요.",
            sentenceMeaning: "When driving, you must follow traffic safety.",
            sentenceZh: "开车时一定要遵守交通安全。"
        },
        {
            kr: "앉다",
            en: "To sit",
            zh: "坐",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "의자에 앉아서 잠시 쉬자.",
            sentenceMeaning: "Let's sit down on a chair and rest for a while.",
            sentenceZh: "我们坐在椅子上休息一会儿吧。"
        },
        {
            kr: "알다",
            en: "To know",
            zh: "知道",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "드디어 그 사실을 알게 되었다.",
            sentenceMeaning: "I finally found out.",
            sentenceZh: "我终于发现了。"
        },
        {
            kr: "알리다",
            en: "To inform/let know",
            zh: "通知/告知",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "부모님께 합격 사실을 알렸어요.",
            sentenceMeaning: "I informed my parents that I passed.",
            sentenceZh: "我通知我的父母我通过了。"
        },
        {
            kr: "알아보다",
            en: "To look into/recognize",
            zh: "打听/认出",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "인터넷으로 여행 정보를 알아보고 있어요.",
            sentenceMeaning: "I am looking for travel information on the Internet.",
            sentenceZh: "我正在互联网上查找旅游信息。"
        },
        {
            kr: "야",
            en: "Hey",
            zh: "喂",
            pos: "Exclamation",
            category: "actions_routines",
            sentenceKr: "야, 같이 가자!",
            sentenceMeaning: "Hey, let's go together!",
            sentenceZh: "嘿嘿，我们一起去吧！"
        },
        {
            kr: "야구",
            en: "Baseball",
            zh: "棒球",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "주말에 친구들과 야구를 했다.",
            sentenceMeaning: "I played baseball with my friends on the weekend.",
            sentenceZh: "周末我和朋友们一起打棒球。"
        },
        {
            kr: "약속",
            en: "Promise/Appointment",
            zh: "约定/承诺",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "친구와 약속을 지키는 것이 중요해요.",
            sentenceMeaning: "It's important to keep your promises to your friends.",
            sentenceZh: "信守对朋友的承诺很重要。"
        },
        {
            kr: "양치질",
            en: "Brushing teeth",
            zh: "刷牙",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "식사 후에는 꼭 양치질을 해야 해요.",
            sentenceMeaning: "You must brush your teeth after eating.",
            sentenceZh: "吃完饭后一定要刷牙。"
        },
        {
            kr: "얘기",
            en: "Story/Talk",
            zh: "故事/谈话",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "할머니께서 재미있는 얘기를 들려주셨어요.",
            sentenceMeaning: "My grandmother told me an interesting story.",
            sentenceZh: "我的祖母给我讲了一个有趣的故事。"
        },
        {
            kr: "어울리다",
            en: "To suit/match/get along",
            zh: "合适/相配/相处",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "그는 다른 사람들과 잘 어울린어요.",
            sentenceMeaning: "He gets along well with other people.",
            sentenceZh: "他与其他人相处得很好。"
        },
        {
            kr: "얻다",
            en: "To get/obtain",
            zh: "得到/获得",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "필요한 물건을 시장에서 얻었다.",
            sentenceMeaning: "I got the items I needed from the market.",
            sentenceZh: "我从市场上得到了我需要的物品。"
        },
        {
            kr: "얼다",
            en: "To freeze",
            zh: "冻/冰冻",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "날씨가 너무 추워서 강물이 얼었다.",
            sentenceMeaning: "The weather was so cold that the river froze.",
            sentenceZh: "天气太冷了，河水都结冰了。"
        },
        {
            kr: "아",
            en: "ah/oh",
            zh: "啊",
            pos: "Exclamation",
            category: "descriptions_qualities",
            sentenceKr: "아, 그렇군요. 이제 알겠어요.",
            sentenceMeaning: "Ah, I see. ",
            sentenceZh: "啊，我明白了。现在我明白了。"
        },
        {
            kr: "아까",
            en: "a while ago",
            zh: "刚才",
            pos: "Adverb/Noun",
            category: "descriptions_qualities",
            sentenceKr: "아까 본 영화가 정말 재미있었어요.",
            sentenceMeaning: "The movie I saw earlier was really fun.",
            sentenceZh: "我之前看过的电影真的很有趣。"
        },
        {
            kr: "아니",
            en: "no/well",
            zh: "不/哎呀",
            pos: "Exclamation",
            category: "descriptions_qualities",
            sentenceKr: "아니, 그게 무슨 말이에요?",
            sentenceMeaning: "No, what does that mean?",
            sentenceZh: "不，这是什么意思？"
        },
        {
            kr: "아니다",
            en: "to not be",
            zh: "不是",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "저는 학생이 아니에요. 직장인이에요.",
            sentenceMeaning: "I'm not a student. ",
            sentenceZh: "我不是学生。我是一名办公室职员。"
        },
        {
            kr: "아니요",
            en: "no",
            zh: "不是/没有",
            pos: "Exclamation",
            category: "descriptions_qualities",
            sentenceKr: "아니요, 아직 안 먹었어요.",
            sentenceMeaning: "No, I haven't eaten it yet.",
            sentenceZh: "不，我还没吃过。"
        },
        {
            kr: "아름답다",
            en: "Beautiful",
            zh: "美丽",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "그녀의 웃는 모습이 참 아름다워요.",
            sentenceMeaning: "Her smile is so beautiful.",
            sentenceZh: "她的笑容是如此美丽。"
        },
        {
            kr: "아마",
            en: "Probably/Maybe",
            zh: "也许",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "아마 내일은 비가 올 것 같아요.",
            sentenceMeaning: "I think it will probably rain tomorrow.",
            sentenceZh: "我想明天可能会下雨。"
        },
        {
            kr: "아무",
            en: "Any/No",
            zh: "任何",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "아무도 그 소식을 모른어요.",
            sentenceMeaning: "No one knows about it.",
            sentenceZh: "没有人知道这件事。"
        },
        {
            kr: "아무리",
            en: "No matter how",
            zh: "无论如何",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "아무리 어려워도 포기하지 마세요.",
            sentenceMeaning: "No matter how difficult it is, don't give up.",
            sentenceZh: "不管有多困难，都不要放弃。"
        },
        {
            kr: "아주",
            en: "Very/Extremely",
            zh: "非常",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "한국어 공부는 아주 쉽고 재미있어요.",
            sentenceMeaning: "Studying Korean is very easy and fun.",
            sentenceZh: "学习韩语非常简单又有趣。"
        },
        {
            kr: "아직",
            en: "Yet/Still",
            zh: "还",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "아직 숙제를 다 하지 못했다.",
            sentenceMeaning: "I haven't finished my homework yet.",
            sentenceZh: "我还没有做完作业。"
        },
        {
            kr: "아프다",
            en: "Sick/Hurt",
            zh: "疼/痛",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "어제부터 다리가 너무 아퍼요.",
            sentenceMeaning: "My legs have been sore since yesterday.",
            sentenceZh: "我的腿从昨天开始就酸痛。"
        },
        {
            kr: "아홉",
            en: "Nine",
            zh: "九",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "고양이 아홉 마리가 지붕 위에 있어요.",
            sentenceMeaning: "There are nine cats on the roof.",
            sentenceZh: "屋顶上有九只猫。"
        },
        {
            kr: "아흔",
            en: "Ninety",
            zh: "九十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "할아버지는 연세가 아흔이시다.",
            sentenceMeaning: "My grandfather is ninety years old.",
            sentenceZh: "我的祖父九十岁了。"
        },
        {
            kr: "안",
            en: "Not",
            zh: "不",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "오늘은 날씨가 별로 안 추워요.",
            sentenceMeaning: "The weather is not very cold today.",
            sentenceZh: "今天天气不太冷。"
        },
        {
            kr: "안개",
            en: "Fog",
            zh: "雾",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "새벽에 안개가 심하게 끼었다.",
            sentenceMeaning: "There was heavy fog in the early morning.",
            sentenceZh: "清晨，有大雾。"
        },
        {
            kr: "안녕히",
            en: "Safely/Peacefully",
            zh: "安宁地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "안녕히 계세요. 다음에 또 봐요.",
            sentenceMeaning: "good bye. ",
            sentenceZh: "再见。下次见。"
        },
        {
            kr: "알맞다",
            en: "To be suitable/fit",
            zh: "合适",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "이 상자는 크기가 딱 알맞아요.",
            sentenceMeaning: "This box is just the right size.",
            sentenceZh: "这个盒子的尺寸刚刚好。"
        },
        {
            kr: "약간",
            en: "A little/Somewhat",
            zh: "稍微/有点",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "이 신발은 저에게 약간 커요.",
            sentenceMeaning: "These shoes are a little big for me.",
            sentenceZh: "这双鞋对我来说有点大。"
        },
        {
            kr: "약하다",
            en: "Weak",
            zh: "弱",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "그는 몸이 약해서 자주 아파요.",
            sentenceMeaning: "He is weak and gets sick often.",
            sentenceZh: "他身体虚弱，经常生病。"
        },
        {
            kr: "얇다",
            en: "Thin",
            zh: "薄",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "이 종이는 두께가 아주 얇아요.",
            sentenceMeaning: "This paper is very thin.",
            sentenceZh: "这张纸很薄。"
        },
        {
            kr: "어",
            en: "Oh",
            zh: "噢/哎呀",
            pos: "Exclamation",
            category: "descriptions_qualities",
            sentenceKr: "어, 이게 도대체 무슨 일이에요?",
            sentenceMeaning: "Uh, what the hell is going on?",
            sentenceZh: "呃，这到底是怎么回事？"
        },
        {
            kr: "어느",
            en: "Which",
            zh: "哪/哪个",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "어느 나라에서 오셨나요?",
            sentenceMeaning: "Which country are you from?",
            sentenceZh: "你来自哪个国家？"
        },
        {
            kr: "어둡다",
            en: "Dark",
            zh: "黑暗/昏暗",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "조명이 없어서 방이 너무 어두워요.",
            sentenceMeaning: "The room is very dark because there is no lighting.",
            sentenceZh: "房间很暗，因为没有照明。"
        },
        {
            kr: "어떤",
            en: "What kind of",
            zh: "什么样的",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "어떤 느낌의 옷을 찾으시나요?",
            sentenceMeaning: "What kind of clothes are you looking for?",
            sentenceZh: "您在寻找什么样的衣服？"
        },
        {
            kr: "어떻다",
            en: "How/What about",
            zh: "怎么样",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "지금 기분이 어떠세요?",
            sentenceMeaning: "How are you feeling now?",
            sentenceZh: "你现在感觉怎么样？"
        },
        {
            kr: "어렵다",
            en: "Difficult",
            zh: "难",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "이 수학 문제는 너무 어려워요.",
            sentenceMeaning: "This math problem is too difficult.",
            sentenceZh: "这道数学题太难了。"
        },
        {
            kr: "어서",
            en: "Quickly/Please",
            zh: "快/赶快",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "어서 일어나서 학교에 가세요.",
            sentenceMeaning: "Get up and go to school.",
            sentenceZh: "起床去学校。"
        },
        {
            kr: "억",
            en: "Hundred million",
            zh: "亿",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "그 집은 가격이 억 소리가 나게 비싸요.",
            sentenceMeaning: "That house is expensive, costing hundreds of millions of dollars.",
            sentenceZh: "那房子很贵，价值数亿美元。"
        },
        {
            kr: "언제",
            en: "When",
            zh: "什么时候",
            pos: "Pronoun",
            category: "descriptions_qualities",
            sentenceKr: "생일이 언제예요?",
            sentenceMeaning: "When is your birthday?",
            sentenceZh: "你的生日是什么时候？"
        },
        {
            kr: "언제나",
            en: "Always",
            zh: "总是/随时",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "우리는 언제나 함께할 거예요.",
            sentenceMeaning: "We will always be together.",
            sentenceZh: "我们会永远在一起。"
        },
        {
            kr: "얼마",
            en: "How much",
            zh: "多少钱",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이 사과 한 박스에 얼마예요?",
            sentenceMeaning: "How much does a box of these apples cost?",
            sentenceZh: "一盒这些苹果要多少钱？"
        },
        {
            kr: "얼마나",
            en: "How much/To what extent",
            zh: "多么/多少",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "그녀가 얼마나 예쁜지 몰라요.",
            sentenceMeaning: "You don't know how pretty she is.",
            sentenceZh: "你不知道她有多漂亮。"
        }
    ],
    beginner_cycle_11: [
        {
            kr: "오렌지",
            en: "orange",
            zh: "橙子",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "시원한 오렌지 주스를 마시고 싶어요.",
            sentenceMeaning: "I want to drink cold orange juice.",
            sentenceZh: "我想喝冷橙汁。"
        },
        {
            kr: "오이",
            en: "cucumber",
            zh: "黄瓜",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "오이로 시원한 냉국을 만들었어요.",
            sentenceMeaning: "I made a refreshing cold soup with cucumbers.",
            sentenceZh: "我用黄瓜做了一道清爽的冷汤。"
        },
        {
            kr: "요리",
            en: "cooking",
            zh: "料理, 烹饪",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "주말에는 제가 직접 요리를 해요.",
            sentenceMeaning: "On the weekends, I cook my own food.",
            sentenceZh: "周末，我自己做饭。"
        },
        {
            kr: "여학생",
            en: "Female student",
            zh: "女学生",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "교실에 여학생들이 많이 모여 있어요.",
            sentenceMeaning: "There are a lot of female students gathered in the classroom.",
            sentenceZh: "教室里聚集了很多女学生。"
        },
        {
            kr: "역사",
            en: "History",
            zh: "历史",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "한국의 역사를 배우는 것은 흥미로워요.",
            sentenceMeaning: "Learning Korean history is interesting.",
            sentenceZh: "学习韩国历史很有趣。"
        },
        {
            kr: "연필",
            en: "Pencil",
            zh: "铅笔",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "연필로 이름을 예쁘게 썼어요.",
            sentenceMeaning: "I wrote my name beautifully in pencil.",
            sentenceZh: "我用铅笔漂亮地写下了我的名字。"
        },
        {
            kr: "영어",
            en: "English language",
            zh: "英语",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "요즘 매일 영어를 배우고 있어요.",
            sentenceMeaning: "I'm learning English every day these days.",
            sentenceZh: "这些天我每天都在学习英语。"
        },
        {
            kr: "외국어",
            en: "foreign language",
            zh: "外语",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "외국어를 배우면 시야가 넓어져요.",
            sentenceMeaning: "Learning a foreign language broadens your horizons.",
            sentenceZh: "学习外语可以拓宽你的视野。"
        },
        {
            kr: "엉덩이",
            en: "Buttocks/Hips",
            zh: "臀部/屁股",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "오래 앉아 있었더니 엉덩이가 아파요.",
            sentenceMeaning: "My butt hurts after sitting for a long time.",
            sentenceZh: "坐久了屁股就疼。"
        },
        {
            kr: "에어컨",
            en: "Air conditioner",
            zh: "空调",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "날씨가 더워서 에어컨을 켰어요.",
            sentenceMeaning: "The weather was hot, so I turned on the air conditioner.",
            sentenceZh: "天气很热，我就打开了空调。"
        },
        {
            kr: "연락처",
            en: "Contact information",
            zh: "联系方式",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "메모지에 연락처를 남겨 두었다.",
            sentenceMeaning: "I left my contact information on a note.",
            sentenceZh: "我在便条上留下了我的联系信息。"
        },
        {
            kr: "열쇠",
            en: "Key",
            zh: "钥匙",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "열쇠로 문을 열고 들어갔아요.",
            sentenceMeaning: "I opened the door with the key and went in.",
            sentenceZh: "我用钥匙打开门走了进去。"
        },
        {
            kr: "엽서",
            en: "Postcard",
            zh: "明信片",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "친구에게 예쁜 엽서를 보냈어요.",
            sentenceMeaning: "I sent a pretty postcard to my friend.",
            sentenceZh: "我给我的朋友寄了一张漂亮的明信片。"
        },
        {
            kr: "영수증",
            en: "Receipt",
            zh: "收据/发票",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "물건을 사고 영수증을 받았다.",
            sentenceMeaning: "I bought an item and received a receipt.",
            sentenceZh: "我购买了一件商品并收到了收据。"
        },
        {
            kr: "옆집",
            en: "Next door house",
            zh: "邻居家",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "옆집에 사는 이웃과 인사를 나누었다.",
            sentenceMeaning: "I exchanged greetings with my neighbor who lives next door.",
            sentenceZh: "我和住在隔壁的邻居互相寒暄。"
        },
        {
            kr: "옷",
            en: "clothes",
            zh: "衣服",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "내일 입을 옷을 미리 준비했어요.",
            sentenceMeaning: "I prepared the clothes I would wear tomorrow.",
            sentenceZh: "我准备了明天要穿的衣服。"
        },
        {
            kr: "옷걸이",
            en: "clothes hanger",
            zh: "衣架",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "옷걸이가 부족해서 더 사야겠어요.",
            sentenceMeaning: "I don't have enough hangers, so I need to buy more.",
            sentenceZh: "我没有足够的衣架，所以我需要买更多。"
        },
        {
            kr: "옷장",
            en: "wardrobe",
            zh: "衣柜",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "옷장에 옷이 꽉 찼어요.",
            sentenceMeaning: "The closet is full of clothes.",
            sentenceZh: "衣柜里装满了衣服。"
        },
        {
            kr: "와이셔츠",
            en: "dress shirt",
            zh: "衬衫",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "아버지는 항상 깨끗한 와이셔츠를 입으세요.",
            sentenceMeaning: "My father always wears a clean dress shirt.",
            sentenceZh: "我父亲总是穿着干净的正装衬衫。"
        },
        {
            kr: "엘리베이터",
            en: "Elevator",
            zh: "电梯",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "10층까지 엘리베이터를 타고 올라갔어요.",
            sentenceMeaning: "I took the elevator up to the 10th floor.",
            sentenceZh: "我乘电梯到了10楼。"
        },
        {
            kr: "여권",
            en: "Passport",
            zh: "护照",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "공항에서 여권을 보여 주었습니다.",
            sentenceMeaning: "I showed my passport at the airport.",
            sentenceZh: "我在机场出示了我的护照。"
        },
        {
            kr: "여기",
            en: "Here",
            zh: "这里",
            pos: "Pronoun",
            category: "city_travel_places",
            sentenceKr: "여기가 바로 우리 집입니다.",
            sentenceMeaning: "This is our home.",
            sentenceZh: "这是我们的家。"
        },
        {
            kr: "여기저기",
            en: "Here and there",
            zh: "到处/到处都是",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "여기저기 장소를 옮기며 여행을 다녔어요.",
            sentenceMeaning: "I traveled here and there, moving from place to place.",
            sentenceZh: "我到处旅行，从一个地方搬到另一个地方。"
        },
        {
            kr: "여행",
            en: "Travel/Trip",
            zh: "旅行",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "내일 친구들과 여행을 가기로 했다.",
            sentenceMeaning: "I decided to go on a trip with my friends tomorrow.",
            sentenceZh: "我决定明天和我的朋友去旅行。"
        },
        {
            kr: "여행사",
            en: "Travel agency",
            zh: "旅行社",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "여행사에서 비행기 표를 예매했어요.",
            sentenceMeaning: "I booked a plane ticket at a travel agency.",
            sentenceZh: "我在旅行社订了机票。"
        },
        {
            kr: "여행지",
            en: "Travel destination",
            zh: "旅游地",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "유명한 여행지로 떠나는 사람들이 많아요.",
            sentenceMeaning: "There are many people who travel to famous travel destinations.",
            sentenceZh: "有很多人去著名的旅游目的地旅行。"
        },
        {
            kr: "역",
            en: "Station",
            zh: "车站",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "서울역에 내리자마자 사람이 아주 많았다.",
            sentenceMeaning: "As soon as I got off at Seoul Station, there were a lot of people.",
            sentenceZh: "到首尔站一下车，人就很多了。"
        },
        {
            kr: "열차",
            en: "Train",
            zh: "火车",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "우리는 다음 역에서 열차를 타야 해요.",
            sentenceMeaning: "We have to catch the train at the next station.",
            sentenceZh: "我们必须在下一站赶火车。"
        },
        {
            kr: "영국",
            en: "United Kingdom",
            zh: "英国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "그는 영국에서 공부하고 돌아왔아요.",
            sentenceMeaning: "He came back from studying in England.",
            sentenceZh: "他从英国留学回来。"
        },
        {
            kr: "영화관",
            en: "Movie theater",
            zh: "电影院",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "영화관에 사람들이 아주 많았다.",
            sentenceMeaning: "There were a lot of people in the movie theater.",
            sentenceZh: "电影院里有很多人。"
        },
        {
            kr: "옆",
            en: "Side/Next to",
            zh: "旁边",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "오른쪽 옆을 확인해 보세요.",
            sentenceMeaning: "Check the right side.",
            sentenceZh: "检查右侧。"
        },
        {
            kr: "오른쪽",
            en: "right side",
            zh: "右边",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "오른쪽으로 가면 편의점이 보여요.",
            sentenceMeaning: "If you go to the right, you will see a convenience store.",
            sentenceZh: "如果你向右走，你会看到一家便利店。"
        },
        {
            kr: "외국",
            en: "foreign country",
            zh: "外国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "저는 나중에 외국에서 살고 싶어요.",
            sentenceMeaning: "I want to live abroad in the future.",
            sentenceZh: "我将来想住在国外。"
        },
        {
            kr: "왼쪽",
            en: "left side",
            zh: "左边",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "다음 모퉁이에서 왼쪽으로 도세요.",
            sentenceMeaning: "Turn left at the next corner.",
            sentenceZh: "在下一个拐角处左转。"
        },
        {
            kr: "엄마",
            en: "Mom",
            zh: "妈妈",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "엄마, 저 배고파요. 밥 주세요.",
            sentenceMeaning: "Mom, I'm hungry. ",
            sentenceZh: "妈妈，我饿了。请给我食物。"
        },
        {
            kr: "여동생",
            en: "Younger sister",
            zh: "妹妹",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "제 여동생은 정말 친절해요.",
            sentenceMeaning: "My sister is really kind.",
            sentenceZh: "我姐姐真的很善良。"
        },
        {
            kr: "여러분",
            en: "Everyone",
            zh: "各位",
            pos: "Pronoun",
            category: "people_jobs_family",
            sentenceKr: "여러분, 제 말을 잘 들어 보세요.",
            sentenceMeaning: "Everyone, please listen to me carefully.",
            sentenceZh: "请大家仔细听我说。"
        },
        {
            kr: "여성",
            en: "Female/Woman",
            zh: "女性",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "이 옷은 여성들에게 인기가 많아요.",
            sentenceMeaning: "This clothing is popular among women.",
            sentenceZh: "这种服装很受女性欢迎。"
        },
        {
            kr: "여자",
            en: "Woman",
            zh: "女人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "저 여자는 아주 똑똑해요.",
            sentenceMeaning: "That woman is very smart.",
            sentenceZh: "那个女人很聪明。"
        },
        {
            kr: "연예인",
            en: "Celebrity/Entertainer",
            zh: "艺人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "텔레비전에 나오는 연예인을 실제로 봤아요.",
            sentenceMeaning: "I actually saw a celebrity on television.",
            sentenceZh: "我实际上在电视上看到了一位名人。"
        },
        {
            kr: "영화배우",
            en: "Movie actor",
            zh: "电影演员",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "그는 나중에 훌륭한 영화배우가 될 거예요.",
            sentenceMeaning: "He will become a great movie star later.",
            sentenceZh: "他以后会成为一个伟大的电影明星。"
        },
        {
            kr: "오른손",
            en: "right hand",
            zh: "右手",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "저는 오른손잡이라서 오른손을 주로 써요.",
            sentenceMeaning: "I'm right-handed, so I mainly use my right hand.",
            sentenceZh: "我是右撇子，所以我主要用右手。"
        },
        {
            kr: "오빠",
            en: "older brother",
            zh: "哥哥",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 오빠는 대학생이에요.",
            sentenceMeaning: "My brother is a college student.",
            sentenceZh: "我弟弟是一名大学生。"
        },
        {
            kr: "왕",
            en: "king",
            zh: "王",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "옛날에 아주 지혜로운 왕이 살았어요.",
            sentenceMeaning: "Once upon a time there lived a very wise king.",
            sentenceZh: "从前，有一位非常英明的国王。"
        },
        {
            kr: "외국인",
            en: "foreigner",
            zh: "外国人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "서울에는 외국인 관광객이 많아요.",
            sentenceMeaning: "There are many foreign tourists in Seoul.",
            sentenceZh: "首尔有很多外国游客。"
        },
        {
            kr: "왼손",
            en: "left hand",
            zh: "左手",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "왼손으로 밥을 먹는 습관이 있어요.",
            sentenceMeaning: "I have a habit of eating with my left hand.",
            sentenceZh: "我有用左手吃饭的习惯。"
        },
        {
            kr: "요리사",
            en: "chef",
            zh: "厨师",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "그 식당의 요리사는 아주 유명해요.",
            sentenceMeaning: "The chef at that restaurant is very famous.",
            sentenceZh: "那家餐馆的厨师非常有名。"
        },
        {
            kr: "열",
            en: "Fever/Heat",
            zh: "热/发烧",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "감기에 걸렸는지 몸에서 열이 난아요.",
            sentenceMeaning: "My body feels feverish as if I have a cold.",
            sentenceZh: "我的身体感觉发烧，就像感冒了一样。"
        },
        {
            kr: "와",
            en: "wow",
            zh: "哇",
            pos: "Exclamation",
            category: "feelings_emotions",
            sentenceKr: "와! 드디어 주말여요.",
            sentenceMeaning: "and! ",
            sentenceZh: "和！终于到周末了。"
        },
        {
            kr: "외롭다",
            en: "to be lonely",
            zh: "孤独",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "가을이 되면 마음이 조금 외로워요.",
            sentenceMeaning: "When fall comes, I feel a little lonely.",
            sentenceZh: "秋天来了，我感到有些孤独。"
        },
        {
            kr: "없다",
            en: "To not exist/be not present",
            zh: "没有",
            pos: "Adjective",
            category: "time_seasons",
            sentenceKr: "냉장고에 먹을 것이 하나도 없어요.",
            sentenceMeaning: "There's nothing to eat in the refrigerator.",
            sentenceZh: "冰箱里没有东西可以吃。"
        },
        {
            kr: "여름",
            en: "Summer",
            zh: "夏天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "여름에는 시원한 바다에 가고 싶어요.",
            sentenceMeaning: "I want to go to the cool sea in the summer.",
            sentenceZh: "夏天我想去清凉的海边。"
        },
        {
            kr: "연말",
            en: "Year-end",
            zh: "年末",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "벌써 연말이 되어 거리가 화려해요.",
            sentenceMeaning: "It's already the end of the year and the streets are colorful.",
            sentenceZh: "已经是年末了，大街小巷都是色彩缤纷的。"
        },
        {
            kr: "연세",
            en: "Age (honorific)",
            zh: "年纪/年龄",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "할아버지께서는 연세가 아주 많으시다.",
            sentenceMeaning: "My grandfather is very old.",
            sentenceZh: "我的祖父很老了。"
        },
        {
            kr: "연휴",
            en: "Long holiday",
            zh: "连休/长假",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "이번 연휴 동안 푹 쉴 계획여요.",
            sentenceMeaning: "I plan to rest well during this holiday.",
            sentenceZh: "我打算在这个假期好好休息。"
        },
        {
            kr: "열흘",
            en: "Ten days",
            zh: "十天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "방학이 시작된 지 벌써 열흘이 지났아요.",
            sentenceMeaning: "It's already been ten days since vacation started.",
            sentenceZh: "距离放假已经过去十天了。"
        },
        {
            kr: "옛날",
            en: "old days",
            zh: "很久以前",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "옛날 이야기는 언제 들어도 재미있어요.",
            sentenceMeaning: "It's always fun to hear old stories.",
            sentenceZh: "听到古老的故事总是很有趣。"
        },
        {
            kr: "오늘",
            en: "today",
            zh: "今天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오늘 날씨가 참 따뜻하네요.",
            sentenceMeaning: "The weather is really warm today.",
            sentenceZh: "今天的天气真的很暖和。"
        },
        {
            kr: "오래",
            en: "for a long time",
            zh: "久",
            pos: "Adverb",
            category: "time_seasons",
            sentenceKr: "이 가방은 오래 써서 낡았어요.",
            sentenceMeaning: "This bag has been used for a long time and is worn out.",
            sentenceZh: "这个包用了很久了，已经破旧了。"
        },
        {
            kr: "오래간만",
            en: "after a long time",
            zh: "隔了很久",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오래간만에 친구를 만나서 즐거웠어요.",
            sentenceMeaning: "It was fun to meet a friend after a long time.",
            sentenceZh: "时隔多年再次见到朋友，很开心。"
        },
        {
            kr: "오랜만",
            en: "after a long time",
            zh: "好久",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오랜만에 만나니 정말 반갑네요.",
            sentenceMeaning: "It's really nice to meet you after such a long time.",
            sentenceZh: "时隔这么久再次见到你真的很高兴。"
        },
        {
            kr: "오랫동안",
            en: "for a long time",
            zh: "很长时间",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "우리는 오랫동안 친구로 지냈어요.",
            sentenceMeaning: "We've been friends for a long time.",
            sentenceZh: "我们已经是很长时间的朋友了。"
        },
        {
            kr: "오월",
            en: "May",
            zh: "五月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오월에는 꽃이 많이 피어요.",
            sentenceMeaning: "Many flowers bloom in May.",
            sentenceZh: "五月有许多花盛开。"
        },
        {
            kr: "오전",
            en: "morning",
            zh: "上午",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오전에는 보통 도서관에 있어요.",
            sentenceMeaning: "I'm usually at the library in the morning.",
            sentenceZh: "我通常早上在图书馆。"
        },
        {
            kr: "오후",
            en: "afternoon",
            zh: "下午",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오후에 같이 공원에 갈까요?",
            sentenceMeaning: "Shall we go to the park together this afternoon?",
            sentenceZh: "今天下午我们一起去公园好吗？"
        },
        {
            kr: "올해",
            en: "this year",
            zh: "今年",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "올해는 꼭 운동을 시작할 거예요.",
            sentenceMeaning: "I will definitely start exercising this year.",
            sentenceZh: "今年我一定会开始锻炼。"
        },
        {
            kr: "요일",
            en: "day of the week",
            zh: "星期",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오늘은 무슨 요일이에요?",
            sentenceMeaning: "What day is today?",
            sentenceZh: "今天是什么日子？"
        },
        {
            kr: "여보세요",
            en: "Hello (phone)",
            zh: "喂",
            pos: "Exclamation",
            category: "actions_routines",
            sentenceKr: "여보세요, 거기 누구 없나요?",
            sentenceMeaning: "Hello, is anyone there?",
            sentenceZh: "你好，有人在吗？"
        },
        {
            kr: "여쭙다",
            en: "to ask (honorific)",
            zh: "请教，询问",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "모르는 문제를 선생님께 공손하게 여쭙고 싶어요.",
            sentenceMeaning: "I want to politely ask my teacher about a question I don't know.",
            sentenceZh: "我想向老师恭敬地请教不懂的问题。"
        },
        {
            kr: "연결",
            en: "Connection",
            zh: "连接",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "전화가 도중에 연결이 끊겼어요.",
            sentenceMeaning: "The call got disconnected midway.",
            sentenceZh: "电话中途就挂断了。"
        },
        {
            kr: "연극",
            en: "Play/Drama",
            zh: "话剧",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "오랜만에 친구들과 연극을 보러 갔아요.",
            sentenceMeaning: "It's been a while since I went to see a play with my friends.",
            sentenceZh: "好久没有和朋友一起去看戏了。"
        },
        {
            kr: "연락",
            en: "Contact",
            zh: "联系",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "도착하면 바로 연락을 주세요.",
            sentenceMeaning: "Please contact us immediately upon arrival.",
            sentenceZh: "请抵达后立即联系我们。"
        },
        {
            kr: "연습",
            en: "Practice",
            zh: "练习",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "매일 한 시간씩 피아노 연습을 해요.",
            sentenceMeaning: "I practice piano for an hour every day.",
            sentenceZh: "我每天练一个小时钢琴。"
        },
        {
            kr: "열다",
            en: "To open",
            zh: "开/打开",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "가게 문을 일찍 열었다.",
            sentenceMeaning: "The store opened early.",
            sentenceZh: "商店开门得很早。"
        },
        {
            kr: "열리다",
            en: "To be opened",
            zh: "被打开",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "바람 때문에 창문이 저절로 열렸어요.",
            sentenceMeaning: "The window opened by itself because of the wind.",
            sentenceZh: "因为有风，窗户自己打开了。"
        },
        {
            kr: "영화",
            en: "Movie/Film",
            zh: "电影",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "주말에 재미있는 영화를 보러 가자.",
            sentenceMeaning: "Let's go see a fun movie this weekend.",
            sentenceZh: "这个周末我们去看一部有趣的电影吧。"
        },
        {
            kr: "예",
            en: "Yes",
            zh: "是",
            pos: "Exclamation",
            category: "actions_routines",
            sentenceKr: "예, 질문에 대답하겠습니다.",
            sentenceMeaning: "Yes, I will answer your question.",
            sentenceZh: "是的，我会回答你的问题。"
        },
        {
            kr: "예매",
            en: "Advanced booking",
            zh: "预购/预定",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "인터넷으로 미리 영화표를 예매했어요.",
            sentenceMeaning: "I booked movie tickets in advance online.",
            sentenceZh: "我提前在网上订了电影票。"
        },
        {
            kr: "예습",
            en: "preview",
            zh: "预习",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "수업 전에 미리 예습을 했어요.",
            sentenceMeaning: "I did a preview before class.",
            sentenceZh: "我在课前做了预习。"
        },
        {
            kr: "예약",
            en: "reservation",
            zh: "预约",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "식당에 예약을 하고 갔어요.",
            sentenceMeaning: "I made a reservation at the restaurant and went.",
            sentenceZh: "我在餐厅预订了位置然后就去了。"
        },
        {
            kr: "오다",
            en: "to come",
            zh: "来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "비가 오면 집에서 쉴 거예요.",
            sentenceMeaning: "If it rains, I will rest at home.",
            sentenceZh: "如果下雨，我就在家休息。"
        },
        {
            kr: "오르다",
            en: "to rise",
            zh: "上升, 登",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "산에 오르니 공기가 정말 맑아요.",
            sentenceMeaning: "When I climb the mountain, the air is really clear.",
            sentenceZh: "当我爬上山的时候，空气真的很清新。"
        },
        {
            kr: "올라가다",
            en: "to go up",
            zh: "上去",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "엘리베이터를 타고 5층으로 올라가요.",
            sentenceMeaning: "Take the elevator and go up to the 5th floor.",
            sentenceZh: "乘电梯上5楼。"
        },
        {
            kr: "올라오다",
            en: "to come up",
            zh: "上来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "계단으로 여기까지 올라오느라 힘들었어요.",
            sentenceMeaning: "It was difficult to come up here by stairs.",
            sentenceZh: "爬楼梯到这里很困难。"
        },
        {
            kr: "올리다",
            en: "to raise",
            zh: "抬, 举, 提高",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "블로그에 글을 새로 올렸어요.",
            sentenceMeaning: "I posted a new post on my blog.",
            sentenceZh: "我在我的博客上发布了一篇新文章。"
        },
        {
            kr: "올림",
            en: "sincerely",
            zh: "敬上",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "정성을 담아, 김철수 올림.",
            sentenceMeaning: "Posted with sincerity by Kim Cheol-soo.",
            sentenceZh: "金哲洙真诚地发帖。"
        },
        {
            kr: "외우다",
            en: "to memorize",
            zh: "背, 记",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "시험을 보려고 공식을 다 외웠어요.",
            sentenceMeaning: "I memorized all the formulas to take the test.",
            sentenceZh: "我记住了参加考试的所有公式。"
        },
        {
            kr: "외출",
            en: "going out",
            zh: "外出",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "바빠서 외출할 시간이 없어요.",
            sentenceMeaning: "I'm so busy that I don't have time to go out.",
            sentenceZh: "我太忙了，没有时间出去。"
        },
        {
            kr: "여덟",
            en: "Eight",
            zh: "八",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "사과 여덟 개를 샀습니다.",
            sentenceMeaning: "I bought eight apples.",
            sentenceZh: "我买了八个苹果。"
        },
        {
            kr: "여든",
            en: "Eighty",
            zh: "八十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "우리 할머니는 올해 여든이십니다.",
            sentenceMeaning: "My grandmother turns 80 this year.",
            sentenceZh: "我奶奶今年80岁了。"
        },
        {
            kr: "여러",
            en: "Many/Several",
            zh: "许多/多个",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "여러 나라의 음식을 먹어보고 싶어요.",
            sentenceMeaning: "I want to try food from different countries.",
            sentenceZh: "我想尝试不同国家的食物。"
        },
        {
            kr: "여섯",
            en: "Six",
            zh: "六",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "우리는 여섯 명의 친구와 함께 놀았다.",
            sentenceMeaning: "We played with six friends.",
            sentenceZh: "我们和六个朋友一起玩。"
        },
        {
            kr: "역시",
            en: "As expected/Also",
            zh: "果然/也是",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "저 역시 그 소식을 들었습니다.",
            sentenceMeaning: "I also heard that news.",
            sentenceZh: "我也听到了这个消息。"
        },
        {
            kr: "열심히",
            en: "Diligently",
            zh: "努力地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "그는 시험 합격을 위해 열심히 공부한아요.",
            sentenceMeaning: "He studies hard to pass the exam.",
            sentenceZh: "他努力学习以通过考试。"
        },
        {
            kr: "영",
            en: "Zero",
            zh: "零",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "기온이 영 밑으로 내려갔아요.",
            sentenceMeaning: "The temperature went below zero.",
            sentenceZh: "温度降到零以下。"
        },
        {
            kr: "영하",
            en: "Below zero",
            zh: "零下",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "오늘 기온이 영하로 떨어졌어요.",
            sentenceMeaning: "The temperature fell below freezing today.",
            sentenceZh: "今天气温降至冰点以下。"
        },
        {
            kr: "예쁘다",
            en: "Beautiful/Pretty",
            zh: "漂亮",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "그녀의 얼굴이 참 예뻐요.",
            sentenceMeaning: "Her face is so pretty.",
            sentenceZh: "她的脸真漂亮。"
        },
        {
            kr: "예순",
            en: "Sixty",
            zh: "六十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "아버지는 연세가 예순이십니다.",
            sentenceMeaning: "My father is sixty years old.",
            sentenceZh: "我的父亲六十岁了。"
        },
        {
            kr: "예술",
            en: "art",
            zh: "艺术",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "예술 작품을 감상하는 것을 좋아해요.",
            sentenceMeaning: "I love looking at works of art.",
            sentenceZh: "我喜欢看艺术品。"
        },
        {
            kr: "옛",
            en: "old",
            zh: "旧, 往",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "어제 길에서 옛 친구를 만났어요.",
            sentenceMeaning: "I met an old friend on the street yesterday.",
            sentenceZh: "昨天我在街上遇见了一位老朋友。"
        },
        {
            kr: "오",
            en: "five",
            zh: "五",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "저는 매일 물 오 잔을 마셔요.",
            sentenceMeaning: "I drink five glasses of water every day.",
            sentenceZh: "我每天喝五杯水。"
        },
        {
            kr: "오래되다",
            en: "to be old",
            zh: "古老, 久",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "우리 집은 지은 지 오래되었어요.",
            sentenceMeaning: "Our house has been built a long time.",
            sentenceZh: "我们的房子已经建了很长时间了。"
        },
        {
            kr: "오십",
            en: "fifty",
            zh: "五十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "이 책의 가격은 오십 달러입니다.",
            sentenceMeaning: "The price of this book is fifty dollars.",
            sentenceZh: "这本书的售价是五十美元。"
        },
        {
            kr: "온도",
            en: "temperature",
            zh: "温度",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "실내 온도를 조금 낮춰 주세요.",
            sentenceMeaning: "Please lower the room temperature a little.",
            sentenceZh: "请稍微降低室温。"
        },
        {
            kr: "올림픽",
            en: "Olympics",
            zh: "奥运会",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "올림픽 경기를 보려고 텔레비전을 켰어요.",
            sentenceMeaning: "I turned on the television to watch the Olympic games.",
            sentenceZh: "我打开电视看奥运会。"
        },
        {
            kr: "옳다",
            en: "to be right",
            zh: "正确, 对",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "네 말이 옳다고 생각해.",
            sentenceMeaning: "I think you're right.",
            sentenceZh: "我认为你是对的。"
        },
        {
            kr: "완전히",
            en: "completely",
            zh: "完全",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "이 일을 완전히 끝내려면 시간이 더 필요해요.",
            sentenceMeaning: "I need more time to finish this completely.",
            sentenceZh: "我需要更多的时间来彻底完成这件事。"
        },
        {
            kr: "왜",
            en: "why",
            zh: "为什么",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "왜 오늘 학교에 안 왔어요?",
            sentenceMeaning: "Why didn't you come to school today?",
            sentenceZh: "你今天怎么没来学校？"
        },
        {
            kr: "왜냐하면",
            en: "because",
            zh: "因为",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "오늘은 일찍 자야 해요. 왜냐하면 내일 시험이 있거든요.",
            sentenceMeaning: "I have to go to bed early today. ",
            sentenceZh: "我今天必须早点睡觉。因为我明天要考试。"
        },
        {
            kr: "요금",
            en: "fee",
            zh: "费用",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "버스 요금이 또 올랐어요.",
            sentenceMeaning: "Bus fares have risen again.",
            sentenceZh: "公交车票价再次上涨。"
        },
        {
            kr: "요즘",
            en: "recently",
            zh: "最近",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "요즘 날씨가 정말 좋아요.",
            sentenceMeaning: "The weather is really nice these days.",
            sentenceZh: "这几天的天气真是太好了。"
        }
    ],
    beginner_cycle_12: [
        {
            kr: "우동",
            en: "udon",
            zh: "乌冬面",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "추운 날에는 따뜻한 우동이 먹고 싶어요.",
            sentenceMeaning: "On cold days, I want to eat warm udon.",
            sentenceZh: "天冷了就想吃热腾腾的乌冬面。"
        },
        {
            kr: "우유",
            en: "milk",
            zh: "牛奶",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "매일 아침 우유를 한 잔 마셔요.",
            sentenceMeaning: "Drink a glass of milk every morning.",
            sentenceZh: "每天早上喝一杯牛奶。"
        },
        {
            kr: "유리",
            en: "glass",
            zh: "玻璃",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "유리 창문이 깨지지 않게 조심하세요.",
            sentenceMeaning: "Be careful not to break the glass windows.",
            sentenceZh: "小心不要打破玻璃窗。"
        },
        {
            kr: "음료",
            en: "beverage",
            zh: "饮料",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "시원한 음료 한 잔 드릴까요?",
            sentenceMeaning: "Would you like a cold drink?",
            sentenceZh: "您想喝点冷饮吗？"
        },
        {
            kr: "음료수",
            en: "beverage",
            zh: "饮料",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "편의점에서 시원한 음료수를 샀어요.",
            sentenceMeaning: "I bought a cold drink at a convenience store.",
            sentenceZh: "我在便利店买了冷饮。"
        },
        {
            kr: "음식",
            en: "food",
            zh: "饮食, 食物",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "한국 음식은 맵지만 맛있어요.",
            sentenceMeaning: "Korean food is spicy but delicious.",
            sentenceZh: "韩国菜很辣但是很美味。"
        },
        {
            kr: "음식점",
            en: "restaurant",
            zh: "饮食店, 餐厅",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "이 근처에 맛있는 음식점이 많아요.",
            sentenceMeaning: "There are many delicious restaurants around here.",
            sentenceZh: "这附近有很多美味的餐馆。"
        },
        {
            kr: "일식",
            en: "Japanese food",
            zh: "日式料理",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "점심으로 맛있는 일식 음식을 먹었어요.",
            sentenceMeaning: "I had delicious Japanese food for lunch.",
            sentenceZh: "午餐我吃了美味的日本料理。"
        },
        {
            kr: "일식집",
            en: "Japanese restaurant",
            zh: "日式餐厅",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "학교 앞 일식집에서 친구를 만났어요.",
            sentenceMeaning: "I met a friend at a Japanese restaurant in front of the school.",
            sentenceZh: "我在学校前面的一家日本餐馆遇见了一个朋友。"
        },
        {
            kr: "유학",
            en: "study abroad",
            zh: "留学",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "졸업 후에 한국으로 유학을 갈 거예요.",
            sentenceMeaning: "After graduation, I will study abroad in Korea.",
            sentenceZh: "毕业后我将去韩国留学。"
        },
        {
            kr: "유학생",
            en: "international student",
            zh: "留学生",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "우리 반에는 여러 나라의 유학생들이 있어요.",
            sentenceMeaning: "There are international students from many countries in our class.",
            sentenceZh: "我们班有来自许多国家的国际学生。"
        },
        {
            kr: "의자",
            en: "chair",
            zh: "椅子",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "편한 의자에 앉아서 책을 읽었어요.",
            sentenceMeaning: "I sat in a comfortable chair and read a book.",
            sentenceZh: "我坐在舒适的椅子上看书。"
        },
        {
            kr: "우표",
            en: "stamp",
            zh: "邮票",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "봉투에 우표를 붙여서 보내세요.",
            sentenceMeaning: "Put a stamp on the envelope and send it.",
            sentenceZh: "在信封上贴上邮票并发送。"
        },
        {
            kr: "운동복",
            en: "sportswear",
            zh: "运动服",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "체육 시간에는 운동복을 입어야 해요.",
            sentenceMeaning: "You must wear sportswear during PE class.",
            sentenceZh: "体育课时必须穿运动服。"
        },
        {
            kr: "운동화",
            en: "sneakers",
            zh: "运动鞋",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "발이 편한 운동화를 샀어요.",
            sentenceMeaning: "I bought comfortable sneakers.",
            sentenceZh: "我买了舒适的运动鞋。"
        },
        {
            kr: "원피스",
            en: "dress",
            zh: "连衣裙",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "여름에는 시원한 원피스를 즐겨 입어요.",
            sentenceMeaning: "In the summer, I like to wear cool dresses.",
            sentenceZh: "夏天，我喜欢穿凉爽的衣服。"
        },
        {
            kr: "음악",
            en: "music",
            zh: "音乐",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "저는 조용한 음악을 듣는 것을 좋아해요.",
            sentenceMeaning: "I like listening to quiet music.",
            sentenceZh: "我喜欢听安静的音乐。"
        },
        {
            kr: "음악가",
            en: "musician",
            zh: "音乐家",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "그 음악가가 피아노를 아주 잘 연주해요.",
            sentenceMeaning: "The musician plays the piano very well.",
            sentenceZh: "这位音乐家钢琴弹得很好。"
        },
        {
            kr: "이거",
            en: "this thing",
            zh: "这个",
            pos: "Pronoun",
            category: "home_living",
            sentenceKr: "이거 제 가방인데 좀 들어줄래요?",
            sentenceMeaning: "This is my bag. Can you hold it for me?",
            sentenceZh: "这是我的袋子。你能帮我拿着吗？"
        },
        {
            kr: "이것",
            en: "this thing",
            zh: "这个",
            pos: "Pronoun",
            category: "home_living",
            sentenceKr: "이것은 제가 가장 아끼는 물건이에요.",
            sentenceMeaning: "This is my favorite item.",
            sentenceZh: "这是我最喜欢的物品。"
        },
        {
            kr: "이마",
            en: "forehead",
            zh: "额头",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "열이 있는지 확인하려고 아이의 이마를 짚어 봤어요.",
            sentenceMeaning: "I felt the child's forehead to check if he had a fever.",
            sentenceZh: "我摸了摸孩子的额头，看他是否发烧。"
        },
        {
            kr: "이불",
            en: "blanket",
            zh: "被子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "날씨가 추워져서 두꺼운 이불을 꺼내 덮었어요.",
            sentenceMeaning: "The weather got cold, so I took out a thick blanket and covered myself.",
            sentenceZh: "天气冷了，我拿出厚厚的被子盖在身上。"
        },
        {
            kr: "이사",
            en: "moving (house)",
            zh: "搬家",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "다음 달에 학교 근처로 이사를 가기로 결정했어요.",
            sentenceMeaning: "I decided to move closer to school next month.",
            sentenceZh: "我决定下个月搬到离学校近的地方。"
        },
        {
            kr: "이삿짐",
            en: "moving items",
            zh: "搬家行李",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "이사하기 전날 하루 종일 이삿짐을 쌌어요.",
            sentenceMeaning: "The day before moving, I packed all day long.",
            sentenceZh: "搬家前一天，我收拾了一整天的行李。"
        },
        {
            kr: "인분",
            en: "serving",
            zh: "份",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "식당에 가서 불고기 삼 인분을 주문했어요.",
            sentenceMeaning: "I went to a restaurant and ordered three servings of bulgogi.",
            sentenceZh: "我去了一家餐馆，点了三份烤肉。"
        },
        {
            kr: "인터넷",
            en: "internet",
            zh: "互联网",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "집에서 인터넷에 접속하여 정보를 찾았어요.",
            sentenceMeaning: "I accessed the Internet at home and looked for information.",
            sentenceZh: "我在家上网查找信息。"
        },
        {
            kr: "인형",
            en: "doll",
            zh: "娃娃",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "동생과 함께 귀여운 인형 놀이를 했어요.",
            sentenceMeaning: "I played cute doll games with my younger brother.",
            sentenceZh: "我和弟弟玩可爱的娃娃游戏。"
        },
        {
            kr: "일어나다",
            en: "to get up",
            zh: "起床",
            pos: "Verb",
            category: "home_living",
            sentenceKr: "아침 일찍 일어나요.",
            sentenceMeaning: "Wake up early in the morning.",
            sentenceZh: "早上很早就醒了。"
        },
        {
            kr: "우리나라",
            en: "our country",
            zh: "我国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "우리나라는 사계절이 뚜렷해요.",
            sentenceMeaning: "Our country has four distinct seasons.",
            sentenceZh: "我们国家有四个不同的季节。"
        },
        {
            kr: "우체국",
            en: "post office",
            zh: "邮局",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "편지를 보내러 우체국에 가요.",
            sentenceMeaning: "I'm going to the post office to send a letter.",
            sentenceZh: "我要去邮局寄信。"
        },
        {
            kr: "운동장",
            en: "playground",
            zh: "运动场",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "아이들이 운동장에서 공놀이를 하고 있어요.",
            sentenceMeaning: "Children are playing ball in the playground.",
            sentenceZh: "孩子们正在操场上打球。"
        },
        {
            kr: "유치원",
            en: "kindergarten",
            zh: "幼儿园",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "동생은 매일 아침 유치원에 가요.",
            sentenceMeaning: "My younger brother goes to kindergarten every morning.",
            sentenceZh: "我弟弟每天早上都去幼儿园。"
        },
        {
            kr: "은행",
            en: "bank",
            zh: "银行",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "은행에 가서 돈을 찾았어요.",
            sentenceMeaning: "I went to the bank and got the money.",
            sentenceZh: "我去了银行取了钱。"
        },
        {
            kr: "이곳",
            en: "this place",
            zh: "这里",
            pos: "Pronoun",
            category: "city_travel_places",
            sentenceKr: "이곳은 경치가 정말 아름다운 장소네요.",
            sentenceMeaning: "This place has really beautiful scenery.",
            sentenceZh: "这个地方风景真的很美。"
        },
        {
            kr: "이쪽",
            en: "this side",
            zh: "这边",
            pos: "Pronoun",
            category: "city_travel_places",
            sentenceKr: "길을 잃지 않으려면 모두 이쪽으로 향해 오세요.",
            sentenceMeaning: "If you don't want to get lost, everyone should head this way.",
            sentenceZh: "如果不想迷路，大家都应该朝这边走。"
        },
        {
            kr: "인도네시아",
            en: "Indonesia",
            zh: "印度尼西亚",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "방학 동안 가족들과 인도네시아로 여행을 다녀왔어요.",
            sentenceMeaning: "During my vacation, I traveled to Indonesia with my family.",
            sentenceZh: "假期期间，我和家人一起去印度尼西亚旅游。"
        },
        {
            kr: "인천",
            en: "Incheon",
            zh: "仁川",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "인천은 한국의 유명한 항구 도시입니다.",
            sentenceMeaning: "Incheon is a famous port city in Korea.",
            sentenceZh: "仁川是韩国著名的港口城市。"
        },
        {
            kr: "우리",
            en: "we",
            zh: "我们",
            pos: "Pronoun",
            category: "people_jobs_family",
            sentenceKr: "우리 같이 영화 보러 갈까요?",
            sentenceMeaning: "Shall we go see a movie together?",
            sentenceZh: "我们一起去看电影吧？"
        },
        {
            kr: "운전사",
            en: "driver",
            zh: "司机",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "버스 운전사 아저씨께 인사했어요.",
            sentenceMeaning: "I said hello to the bus driver.",
            sentenceZh: "我向公交车司机打招呼。"
        },
        {
            kr: "의사",
            en: "doctor",
            zh: "医生",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "제 꿈은 훌륭한 치과 의사가 되는 것이에요.",
            sentenceMeaning: "My dream is to become a great dentist.",
            sentenceZh: "我的梦想是成为一名出色的牙医。"
        },
        {
            kr: "이모",
            en: "aunt (maternal)",
            zh: "姨妈",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "방학 때 시골에 계시는 이모 댁에 놀러 가기로 했어요.",
            sentenceMeaning: "During my vacation, I decided to go to my aunt's house in the countryside.",
            sentenceZh: "放假的时候，我决定去乡下的姑妈家。"
        },
        {
            kr: "이분",
            en: "this person (polite)",
            zh: "这位",
            pos: "Pronoun",
            category: "people_jobs_family",
            sentenceKr: "이분이 바로 저희 회사의 새로 오신 팀장님입니다.",
            sentenceMeaning: "This is our company’s new team leader.",
            sentenceZh: "这是我们公司的新组长。"
        },
        {
            kr: "이웃",
            en: "neighbor",
            zh: "邻居",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "한국과 일본은 바다를 사이에 둔 이웃 나라예요.",
            sentenceMeaning: "Korea and Japan are neighboring countries across the sea.",
            sentenceZh: "韩国和日本是隔海相望的邻国。"
        },
        {
            kr: "인기",
            en: "popularity",
            zh: "人气",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "그 가수는 노래도 잘하고 성격도 좋아서 인기가 많아요.",
            sentenceMeaning: "The singer is popular because he sings well and has a good personality.",
            sentenceZh: "这位歌手之所以受欢迎，是因为他唱歌好，性格也好。"
        },
        {
            kr: "인삼",
            en: "ginseng",
            zh: "人参",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "할아버지의 건강을 위해 정성껏 인삼을 달였어요.",
            sentenceMeaning: "I carefully brewed ginseng for my grandfather’s health.",
            sentenceZh: "为了爷爷的健康，我精心酿造了人参。"
        },
        {
            kr: "울다",
            en: "to cry",
            zh: "哭",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "아기가 배가 고파서 울고 있어요.",
            sentenceMeaning: "The baby is crying because he is hungry.",
            sentenceZh: "宝宝哭是因为他饿了。"
        },
        {
            kr: "울음",
            en: "crying",
            zh: "哭泣",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "아기가 울음을 그치지 않아요.",
            sentenceMeaning: "The baby won't stop crying.",
            sentenceZh: "宝宝不会停止哭泣。"
        },
        {
            kr: "웃다",
            en: "to laugh",
            zh: "笑",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "그 친구는 항상 밝게 웃어요.",
            sentenceMeaning: "That friend always smiles brightly.",
            sentenceZh: "那个朋友总是笑得很灿烂。"
        },
        {
            kr: "웃음",
            en: "laughter",
            zh: "笑声",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "그녀의 웃음 소리는 참 맑아요.",
            sentenceMeaning: "Her laughter is so clear.",
            sentenceZh: "她的笑声是那么的清晰。"
        },
        {
            kr: "음",
            en: "hmm",
            zh: "嗯",
            pos: "Exclamation",
            category: "feelings_emotions",
            sentenceKr: "음, 제 생각에는 이게 더 좋은 것 같아요.",
            sentenceMeaning: "Well, I think this is better.",
            sentenceZh: "嗯，我认为这样更好。"
        },
        {
            kr: "이런",
            en: "such, like this",
            zh: "这种",
            pos: "Determiner",
            category: "feelings_emotions",
            sentenceKr: "살다 보면 이런 일도 생기기 마련이죠.",
            sentenceMeaning: "As you live, things like this are bound to happen.",
            sentenceZh: "人活着，难免会遇到这样的事情。"
        },
        {
            kr: "이렇다",
            en: "to be like this",
            zh: "这样",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "시험 결과가 이렇다니 정말 믿을 수 없어요.",
            sentenceMeaning: "I really can't believe the test results are like this.",
            sentenceZh: "我实在不敢相信测试结果是这样的。"
        },
        {
            kr: "우산",
            en: "umbrella",
            zh: "雨伞",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "비가 오니까 우산을 챙기세요.",
            sentenceMeaning: "It's going to rain, so take an umbrella.",
            sentenceZh: "要下雨了，所以带把伞吧。"
        },
        {
            kr: "울산",
            en: "Ulsan",
            zh: "蔚山",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "울산은 한국의 유명한 공업 도시예요.",
            sentenceMeaning: "Ulsan is a famous industrial city in Korea.",
            sentenceZh: "蔚山是韩国著名的工业城市。"
        },
        {
            kr: "월",
            en: "month",
            zh: "月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "일 년은 십이 월까지 있어요.",
            sentenceMeaning: "There are twelve months in a year.",
            sentenceZh: "一年有十二个月。"
        },
        {
            kr: "월급",
            en: "monthly salary",
            zh: "月薪",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "월급을 받으면 부모님께 선물을 사 드릴 거예요.",
            sentenceMeaning: "When I get my salary, I will buy my parents a gift.",
            sentenceZh: "当我拿到工资时，我会给我的父母买一份礼物。"
        },
        {
            kr: "월요일",
            en: "Monday",
            zh: "星期一",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "월요일 아침은 항상 바빠요.",
            sentenceMeaning: "Monday mornings are always busy.",
            sentenceZh: "周一早上总是很忙。"
        },
        {
            kr: "유월",
            en: "June",
            zh: "六月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "유월에는 날씨가 많이 더워져요.",
            sentenceMeaning: "The weather gets very hot in June.",
            sentenceZh: "六月的天气变得非常炎热。"
        },
        {
            kr: "육교",
            en: "overpass",
            zh: "过街天桥",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "안전을 위해서 육교를 이용하세요.",
            sentenceMeaning: "Please use the overpass for safety.",
            sentenceZh: "为了安全，请使用立交桥。"
        },
        {
            kr: "이날",
            en: "this day",
            zh: "这天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "이날 공연은 아주 성공적이었어요.",
            sentenceMeaning: "The performance that day was very successful.",
            sentenceZh: "当天的演出非常成功。"
        },
        {
            kr: "이때",
            en: "this time",
            zh: "这时",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "기회를 이때 놓치면 다시 오지 않을 거예요.",
            sentenceMeaning: "If you miss this opportunity, it will never come again.",
            sentenceZh: "如果你错过了这个机会，就永远不会再来了。"
        },
        {
            kr: "이르다",
            en: "to be early",
            zh: "早",
            pos: "Adjective",
            category: "time_seasons",
            sentenceKr: "지금 포기하기에는 아직 시기가 너무 일러요.",
            sentenceMeaning: "It's too early to give up now.",
            sentenceZh: "现在放弃还为时过早。"
        },
        {
            kr: "이번",
            en: "this time",
            zh: "这次",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "이번 주 주말에는 친구들과 등산을 가기로 했어요.",
            sentenceMeaning: "I decided to go hiking with my friends this weekend.",
            sentenceZh: "我决定这个周末和我的朋友去爬山。"
        },
        {
            kr: "이월",
            en: "February",
            zh: "二月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "이월은 일 년 중 날짜가 가장 적은 달이에요.",
            sentenceMeaning: "February is the month with the fewest days in the year.",
            sentenceZh: "二月是一年中天数最少的月份。"
        },
        {
            kr: "이제",
            en: "now",
            zh: "现在",
            pos: "Adverb",
            category: "time_seasons",
            sentenceKr: "이제부터 새로운 마음으로 공부를 시작하려 해요.",
            sentenceMeaning: "From now on, I plan to start studying with a fresh mind.",
            sentenceZh: "从现在开始，我打算以全新的心态开始学习。"
        },
        {
            kr: "이틀",
            en: "two days",
            zh: "两天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "열이 나기 시작한 지 이틀이 지났는데 아직도 안 나아요.",
            sentenceMeaning: "It's been two days since my fever started, and it still hasn't gotten better.",
            sentenceZh: "发烧已经两天了，还没好。"
        },
        {
            kr: "일",
            en: "day",
            zh: "日",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "오늘은 중요한 일이 있는 날이에요.",
            sentenceMeaning: "Today is an important day.",
            sentenceZh: "今天是一个重要的日子。"
        },
        {
            kr: "일기",
            en: "diary",
            zh: "日记",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "잠자기 전에 매일 일기를 써요.",
            sentenceMeaning: "I write a diary every day before I go to sleep.",
            sentenceZh: "我每天睡觉前写日记。"
        },
        {
            kr: "일본",
            en: "Japan",
            zh: "日本",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "일본은 한국에서 가까운 나라예요.",
            sentenceMeaning: "Japan is a country close to Korea.",
            sentenceZh: "日本是一个距离韩国很近的国家。"
        },
        {
            kr: "운동",
            en: "exercise",
            zh: "运动",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "건강을 위해서 매일 운동을 해요.",
            sentenceMeaning: "I exercise every day for my health.",
            sentenceZh: "为了我的健康，我每天都锻炼身体。"
        },
        {
            kr: "운전",
            en: "driving",
            zh: "驾驶",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "아버지께 운전을 배우고 있어요.",
            sentenceMeaning: "I am learning to drive from my father.",
            sentenceZh: "我正在向父亲学习开车。"
        },
        {
            kr: "움직이다",
            en: "to move",
            zh: "移动",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "몸을 많이 움직이면 건강에 좋아요.",
            sentenceMeaning: "Moving your body a lot is good for your health.",
            sentenceZh: "经常活动身体对健康有益。"
        },
        {
            kr: "원하다",
            en: "to want",
            zh: "想要",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "당신이 원하는 것이 무엇인가요?",
            sentenceMeaning: "What do you want?",
            sentenceZh: "你想要什么？"
        },
        {
            kr: "윷놀이",
            en: "Yutnori",
            zh: "柶戏",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "설날에 가족들과 윷놀이를 했어요.",
            sentenceMeaning: "I played Yut with my family on New Year’s Day.",
            sentenceZh: "元旦那天我和家人一起玩Yut。"
        },
        {
            kr: "응",
            en: "yes (informal)",
            zh: "嗯",
            pos: "Exclamation",
            category: "actions_routines",
            sentenceKr: "친구의 질문에 응이라고 대답했어요.",
            sentenceMeaning: "I answered yes to my friend's question.",
            sentenceZh: "对于朋友的问题，我的回答是肯定的。"
        },
        {
            kr: "이기다",
            en: "to win",
            zh: "赢",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "우리 팀이 이번 경기에서 꼭 이기면 좋겠어요.",
            sentenceMeaning: "I really hope our team wins this game.",
            sentenceZh: "我真的希望我们队能赢得这场比赛。"
        },
        {
            kr: "이야기",
            en: "story, talk",
            zh: "故事",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "할머니께서 잠자기 전에 재미있는 이야기를 들려주셨어요.",
            sentenceMeaning: "My grandmother told me a funny story before going to bed.",
            sentenceZh: "睡觉前，奶奶给我讲了一个有趣的故事。"
        },
        {
            kr: "이용",
            en: "use, usage",
            zh: "利用",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "이 도서관은 학생들의 이용이 아주 많아요.",
            sentenceMeaning: "This library is used a lot by students.",
            sentenceZh: "这个图书馆被学生大量使用。"
        },
        {
            kr: "이해",
            en: "understanding",
            zh: "理解",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "선생님께서 설명을 잘 해주셔서 내용 이해가 쉬웠어요.",
            sentenceMeaning: "The teacher explained things well so it was easy to understand the content.",
            sentenceZh: "老师解释得很好，所以很容易理解内容。"
        },
        {
            kr: "익다",
            en: "to be ripe",
            zh: "熟",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "햇볕을 듬뿍 받아서 과일이 아주 맛있게 익었어요.",
            sentenceMeaning: "The fruit ripened very deliciously because it received plenty of sunlight.",
            sentenceZh: "由于接受了充足的阳光，果实成熟得非常美味。"
        },
        {
            kr: "인사",
            en: "greeting",
            zh: "问候",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "이웃 사람들을 만나면 밝게 웃으며 아침 인사를 해요.",
            sentenceMeaning: "When I meet my neighbors, I smile brightly and say good morning.",
            sentenceZh: "当我见到邻居时，我会灿烂地微笑并说早上好。"
        },
        {
            kr: "인정받다",
            en: "to be recognized",
            zh: "得到认可",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "그는 회사에서 능력을 인정받아요.",
            sentenceMeaning: "He is recognized for his abilities in the company.",
            sentenceZh: "他的能力在公司得到认可。"
        },
        {
            kr: "일어서다",
            en: "to stand up",
            zh: "站起来",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "모두 자리에서 일어서 주세요.",
            sentenceMeaning: "Everyone, please stand up.",
            sentenceZh: "请大家起立。"
        },
        {
            kr: "우선",
            en: "first",
            zh: "首先",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "우선 숙제부터 끝내야 해요.",
            sentenceMeaning: "First, I have to finish my homework.",
            sentenceZh: "首先，我必须完成我的作业。"
        },
        {
            kr: "원",
            en: "Won",
            zh: "韩元",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "커피 한 잔에 오천 원이에요.",
            sentenceMeaning: "A cup of coffee costs 5,000 won.",
            sentenceZh: "一杯咖啡要5000韩元。"
        },
        {
            kr: "위",
            en: "above",
            zh: "上",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "책상 위에 연필이 있어요.",
            sentenceMeaning: "There is a pencil on the desk.",
            sentenceZh: "桌子上有一支铅笔。"
        },
        {
            kr: "위쪽",
            en: "upper side",
            zh: "上面",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "위쪽을 보면 지도가 보여요.",
            sentenceMeaning: "If you look at the top, you can see a map.",
            sentenceZh: "如果你看顶部，你可以看到一张地图。"
        },
        {
            kr: "위치",
            en: "position",
            zh: "位置",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "우리 집의 위치는 학교 근처예요.",
            sentenceMeaning: "The location of my house is near the school.",
            sentenceZh: "我家的位置在学校附近。"
        },
        {
            kr: "위험",
            en: "danger",
            zh: "危险",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "길을 건널 때는 위험을 조심해야 해요.",
            sentenceMeaning: "When crossing the road, you must be careful of danger.",
            sentenceZh: "过马路时，一定要小心危险。"
        },
        {
            kr: "유명",
            en: "famous",
            zh: "有名",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "그 가수는 전 세계적으로 유명해요.",
            sentenceMeaning: "The singer is famous all over the world.",
            sentenceZh: "这位歌手在全世界都很有名。"
        },
        {
            kr: "유행",
            en: "trend",
            zh: "流行",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "요즘 이런 옷 스타일이 유행이에요.",
            sentenceMeaning: "This style of clothing is popular these days.",
            sentenceZh: "这种款式的衣服现在很流行。"
        },
        {
            kr: "육",
            en: "six",
            zh: "六",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "육 곱하기 삼은 십팔이에요.",
            sentenceMeaning: "Six times three is eighteen.",
            sentenceZh: "六乘三等于十八。"
        },
        {
            kr: "육십",
            en: "sixty",
            zh: "六十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "우리 할아버지는 올해 육십 세이십니다.",
            sentenceMeaning: "My grandfather is sixty years old this year.",
            sentenceZh: "我爷爷今年六十岁了。"
        },
        {
            kr: "의미",
            en: "meaning",
            zh: "意义",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이 단어는 아주 중요한 의미가 있어요.",
            sentenceMeaning: "This word has a very important meaning.",
            sentenceZh: "这个词有非常重要的意义。"
        },
        {
            kr: "이",
            en: "two",
            zh: "二",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "사과 이 킬로그램을 샀어요.",
            sentenceMeaning: "I bought two kilograms of apples.",
            sentenceZh: "我买了两公斤苹果。"
        },
        {
            kr: "이다",
            en: "to be",
            zh: "是",
            pos: "Particle",
            category: "descriptions_qualities",
            sentenceKr: "이것은 제가 읽고 싶었던 책여요.",
            sentenceMeaning: "This is the book I wanted to read.",
            sentenceZh: "这是我想读的书。"
        },
        {
            kr: "이따가",
            en: "later",
            zh: "过会儿",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "지금은 바쁘니까 이따가 가도 될까요?",
            sentenceMeaning: "I'm busy right now, so can I go later?",
            sentenceZh: "我现在很忙，我可以晚点去吗？"
        },
        {
            kr: "이름",
            en: "name",
            zh: "名字",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "처음 만난 사람에게 이름을 정중하게 물었어요.",
            sentenceMeaning: "I politely asked the name of someone I met for the first time.",
            sentenceZh: "我礼貌地询问了第一次见面的人的名字。"
        },
        {
            kr: "이미",
            en: "already",
            zh: "已经",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "공연장에 도착했을 때는 이미 공연이 끝나 있었어요.",
            sentenceMeaning: "When I arrived at the venue, the performance was already over.",
            sentenceZh: "当我到达会场时，演出已经结束了。"
        },
        {
            kr: "이상",
            en: "strange, abnormal",
            zh: "异常",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "올여름에는 이상 기온 현상으로 폭염이 계속되었어요.",
            sentenceMeaning: "This summer, the heat wave continued due to abnormal temperatures.",
            sentenceZh: "今年夏天，由于气温异常，热浪持续。"
        },
        {
            kr: "이십",
            en: "twenty",
            zh: "二十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "선물을 사기 위해 백화점에서 이십만 원을 썼어요.",
            sentenceMeaning: "I spent 200,000 won at the department store to buy a gift.",
            sentenceZh: "我在百货商店花了20万韩元买了一件礼物。"
        },
        {
            kr: "이유",
            en: "reason",
            zh: "理由",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "그가 왜 학교에 결석했는지 그 이유를 물어봤어요.",
            sentenceMeaning: "I asked him why he was absent from school.",
            sentenceZh: "我问他为什么缺课。"
        },
        {
            kr: "이전",
            en: "before",
            zh: "以前",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이전의 경험을 바탕으로 문제를 잘 해결했어요.",
            sentenceMeaning: "I solved the problem well based on my previous experience.",
            sentenceZh: "我根据之前的经验很好的解决了这个问题。"
        },
        {
            kr: "이후",
            en: "after",
            zh: "以后",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "졸업 이후의 삶에 대해 진지하게 고민해 본 적 있나요?",
            sentenceMeaning: "Have you ever seriously thought about life after graduation?",
            sentenceZh: "你有没有认真思考过毕业后的生活？"
        },
        {
            kr: "익숙하다",
            en: "to be familiar",
            zh: "熟悉",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "새로 산 기계에 익숙해지는 데 시간이 꽤 걸렸어요.",
            sentenceMeaning: "It took some time to get used to the new machine.",
            sentenceZh: "花了一些时间来适应新机器。"
        },
        {
            kr: "일곱",
            en: "seven",
            zh: "七",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "사과 일곱 개를 샀어요.",
            sentenceMeaning: "I bought seven apples.",
            sentenceZh: "我买了七个苹果。"
        },
        {
            kr: "일부",
            en: "part, portion",
            zh: "部分",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이 계획의 일부 지역만 변경되었어요.",
            sentenceMeaning: "Only some areas of this plan have changed.",
            sentenceZh: "该计划仅部分领域发生了变化。"
        }
    ],
    beginner_cycle_13: [
        {
            kr: "자장면",
            en: "jajangmyeon (black bean noodles)",
            zh: "炸酱面",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "오늘 점심으로 자장면을 먹었어요.",
            sentenceMeaning: "I ate jajangmyeon for lunch today.",
            sentenceZh: "今天中午吃了炸酱面。"
        },
        {
            kr: "잔",
            en: "cup, glass",
            zh: "杯",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "따뜻한 커피 한 잔 주세요.",
            sentenceMeaning: "Please give me a cup of warm coffee.",
            sentenceZh: "请给我一杯热咖啡。"
        },
        {
            kr: "잡수시다",
            en: "to eat (honorific)",
            zh: "吃 (敬语)",
            pos: "동사",
            category: "food_dining",
            sentenceKr: "할아버지께서 맛있게 진지를 잡수십니다.",
            sentenceMeaning: "Grandfather is eating his meal with relish.",
            sentenceZh: "爷爷正在津津有味地用餐。"
        },
        {
            kr: "잡채",
            en: "japchae (glass noodles)",
            zh: "杂菜",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "어머니가 만드신 잡채는 정말 맛있어요.",
            sentenceMeaning: "The japchae made by my mother is really delicious.",
            sentenceZh: "妈妈做的杂菜真好吃。"
        },
        {
            kr: "저녁",
            en: "evening, dinner",
            zh: "傍晚，晚饭",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "저녁이 돼요.",
            sentenceMeaning: "It's evening.",
            sentenceZh: "已经晚上了。"
        },
        {
            kr: "점심",
            en: "lunch",
            zh: "午餐",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "친구와 점심에 만나다 약속을 했어요.",
            sentenceMeaning: "I made an appointment to meet my friend for lunch.",
            sentenceZh: "我约好和我的朋友一起吃午餐。"
        },
        {
            kr: "점심때",
            en: "lunchtime",
            zh: "午餐时分",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "배가 고픈 걸 보니 점심때가 돼요.",
            sentenceMeaning: "I see you're hungry, so it's lunch time.",
            sentenceZh: "我看你饿了，所以午餐时间到了。"
        },
        {
            kr: "점심시간",
            en: "lunch break",
            zh: "午餐时间",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "회사에서 즐거운 점심시간이 돼요.",
            sentenceMeaning: "It's a fun lunch time at work.",
            sentenceZh: "这是一个有趣的工作午餐时间。"
        },
        {
            kr: "접시",
            en: "plate, dish",
            zh: "盘子",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "맛있는 음식을 접시에 담아요.",
            sentenceMeaning: "Put delicious food on a plate.",
            sentenceZh: "把美味的食物放在盘子里。"
        },
        {
            kr: "읽다",
            en: "to read",
            zh: "读",
            pos: "Verb",
            category: "school_education",
            sentenceKr: "도서관에서 책을 읽는 것을 좋아해요.",
            sentenceMeaning: "I like reading books at the library.",
            sentenceZh: "我喜欢在图书馆看书。"
        },
        {
            kr: "입학",
            en: "admission to school",
            zh: "入学",
            pos: "명사",
            category: "school_education",
            sentenceKr: "대학 입학을 진심으로 축하합니다.",
            sentenceMeaning: "I sincerely congratulate you on entering college.",
            sentenceZh: "真心祝贺你大学入学。"
        },
        {
            kr: "입학시험",
            en: "entrance exam",
            zh: "入学考试",
            pos: "명사",
            category: "school_education",
            sentenceKr: "입학시험에 합격해요.",
            sentenceMeaning: "I pass the entrance exam.",
            sentenceZh: "我通过了入学考试。"
        },
        {
            kr: "적다",
            en: "to be few / to write down",
            zh: "少 / 记下",
            pos: "동사",
            category: "school_education",
            sentenceKr: "메모지에 연락처와 이름을 적었습니다.",
            sentenceMeaning: "I wrote down the contact details and name on a memo pad.",
            sentenceZh: "在便签纸上写下了联系方式和名字。"
        },
        {
            kr: "정도",
            en: "degree, extent",
            zh: "程度",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "어느 정도 준비가 되었나요?",
            sentenceMeaning: "How ready are you?",
            sentenceZh: "你准备好了吗？"
        },
        {
            kr: "입원",
            en: "hospitalization",
            zh: "住院",
            pos: "명사",
            category: "home_living",
            sentenceKr: "친구가 아파서 병원에 입원했어요.",
            sentenceMeaning: "My friend was sick and hospitalized.",
            sentenceZh: "朋友生病住院了。"
        },
        {
            kr: "자다",
            en: "to sleep",
            zh: "睡觉",
            pos: "동사",
            category: "home_living",
            sentenceKr: "어젯밤에 잠을 아주 푹 잤습니다.",
            sentenceMeaning: "I slept very soundly last night.",
            sentenceZh: "昨晚睡得很香。"
        },
        {
            kr: "잠",
            en: "sleep",
            zh: "觉，睡眠",
            pos: "명사",
            category: "home_living",
            sentenceKr: "잠을 자요.",
            sentenceMeaning: "sleep.",
            sentenceZh: "睡觉。"
        },
        {
            kr: "잠자다",
            en: "to sleep",
            zh: "睡觉",
            pos: "동사",
            category: "home_living",
            sentenceKr: "아기가 침대에서 새근새근 잠자고 있어요.",
            sentenceMeaning: "The baby is sleeping peacefully in the bed.",
            sentenceZh: "宝宝正在床上香甜地睡着。"
        },
        {
            kr: "전기",
            en: "electricity",
            zh: "电",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "폭풍 때문에 전기가 끊겨요.",
            sentenceMeaning: "The electricity is cut off because of the storm.",
            sentenceZh: "由于暴风雨，电力被切断。"
        },
        {
            kr: "전화기",
            en: "telephone set",
            zh: "电话机",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "책상 위에서 전화기가 울려요.",
            sentenceMeaning: "The phone rings on my desk.",
            sentenceZh: "我桌上的电话响了。"
        },
        {
            kr: "전화번호",
            en: "phone number",
            zh: "电话号码",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "연락처를 알기 위해 전화번호를 물어요.",
            sentenceMeaning: "Ask for your phone number to get contact information.",
            sentenceZh: "询问您的电话号码以获取联系信息。"
        },
        {
            kr: "젓가락",
            en: "chopsticks",
            zh: "筷子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "면 요리를 먹을 때 젓가락을 써요.",
            sentenceMeaning: "Use chopsticks when eating noodles.",
            sentenceZh: "吃面条时要用筷子。"
        },
        {
            kr: "입장권",
            en: "admission ticket",
            zh: "入场券",
            pos: "명사",
            category: "city_travel_places",
            sentenceKr: "입장권을 사요.",
            sentenceMeaning: "Buy an admission ticket.",
            sentenceZh: "购买门票。"
        },
        {
            kr: "자동차",
            en: "car",
            zh: "汽车",
            pos: "명사",
            category: "city_travel_places",
            sentenceKr: "자동차를 운전해요.",
            sentenceMeaning: "I drive a car.",
            sentenceZh: "我开车。"
        },
        {
            kr: "장소",
            en: "place, location",
            zh: "场所",
            pos: "명사",
            category: "city_travel_places",
            sentenceKr: "장소를 정해요.",
            sentenceMeaning: "Decide on a location.",
            sentenceZh: "决定一个地点。"
        },
        {
            kr: "저곳",
            en: "that place",
            zh: "那个地方",
            pos: "대명사",
            category: "city_travel_places",
            sentenceKr: "저곳은 경치가 아주 아름다워요.",
            sentenceMeaning: "The scenery over there is very beautiful.",
            sentenceZh: "那个地方的风景非常美。"
        },
        {
            kr: "전철",
            en: "subway",
            zh: "地铁",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "출퇴근 시간에 전철을 타요.",
            sentenceMeaning: "I take the subway during rush hour.",
            sentenceZh: "我在高峰时段乘地铁。"
        },
        {
            kr: "정거장",
            en: "station, stop",
            zh: "车站",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "버스 정거장 에서 버스를 기다려요.",
            sentenceMeaning: "Wait for the bus at the bus stop.",
            sentenceZh: "在巴士站等候巴士。"
        },
        {
            kr: "정류장",
            en: "bus stop",
            zh: "停留站",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "집 앞 버스 정류장 에서 내려요.",
            sentenceMeaning: "Get off at the bus stop in front of your house.",
            sentenceZh: "在你家门前的巴士站下车。"
        },
        {
            kr: "저분",
            en: "that person (honorific)",
            zh: "那位",
            pos: "대명사",
            category: "people_jobs_family",
            sentenceKr: "저분은 누구이신가요?",
            sentenceMeaning: "Who is that gentleman/lady?",
            sentenceZh: "那位是谁？"
        },
        {
            kr: "자랑",
            en: "boast, pride",
            zh: "炫耀，骄傲",
            pos: "명사",
            category: "feelings_emotions",
            sentenceKr: "자랑을 해요.",
            sentenceMeaning: "I'm proud of it.",
            sentenceZh: "我为此感到自豪。"
        },
        {
            kr: "저렇다",
            en: "to be like that",
            zh: "那样",
            pos: "형용사",
            category: "feelings_emotions",
            sentenceKr: "하늘에 있는 구름이 왜 저렇게 어두울까요?",
            sentenceMeaning: "Why are the clouds in the sky so dark?",
            sentenceZh: "天空中的云为什么那么暗？"
        },
        {
            kr: "잎",
            en: "leaf",
            zh: "叶子",
            pos: "명사",
            category: "nature_animals_plants",
            sentenceKr: "잎이 떨어져요.",
            sentenceMeaning: "Leaves are falling.",
            sentenceZh: "树叶正在飘落。"
        },
        {
            kr: "자연",
            en: "nature",
            zh: "自然",
            pos: "명사/부사",
            category: "nature_animals_plants",
            sentenceKr: "자연으로 돌아가요.",
            sentenceMeaning: "Go back to nature.",
            sentenceZh: "回归自然。"
        },
        {
            kr: "일요일",
            en: "Sunday",
            zh: "星期天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "일요일에는 보통 집에서 쉬어요.",
            sentenceMeaning: "On Sundays, I usually rest at home.",
            sentenceZh: "周日我通常在家休息。"
        },
        {
            kr: "일월",
            en: "January",
            zh: "一月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "일월은 일 년의 시작인 달이에요.",
            sentenceMeaning: "January is the month that begins the year.",
            sentenceZh: "一月是一年的开始月份。"
        },
        {
            kr: "일주일",
            en: "one week",
            zh: "一周",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "숙제를 끝내는 데 일주일이 걸렸어요.",
            sentenceMeaning: "It took me a week to finish my homework.",
            sentenceZh: "我花了一周的时间才完成作业。"
        },
        {
            kr: "일찍",
            en: "early",
            zh: "早",
            pos: "Adverb",
            category: "time_seasons",
            sentenceKr: "평소보다 일찍 일어나서 운동을 했어요.",
            sentenceMeaning: "I woke up earlier than usual and exercised.",
            sentenceZh: "我比平常起得更早并锻炼了身体。"
        },
        {
            kr: "작년",
            en: "last year",
            zh: "去年",
            pos: "명사",
            category: "time_seasons",
            sentenceKr: "우리는 작년에 처음 만났어요.",
            sentenceMeaning: "We met for the first time last year.",
            sentenceZh: "我们去年第一次见面。"
        },
        {
            kr: "장마",
            en: "rainy season",
            zh: "梅雨",
            pos: "명사",
            category: "time_seasons",
            sentenceKr: "장마가 와요.",
            sentenceMeaning: "The rainy season is coming.",
            sentenceZh: "雨季即将来临。"
        },
        {
            kr: "저번",
            en: "last time",
            zh: "上次",
            pos: "명사",
            category: "time_seasons",
            sentenceKr: "저번 주에 만났던 친구예요.",
            sentenceMeaning: "It is a friend I met last week.",
            sentenceZh: "是上주见过的朋友。"
        },
        {
            kr: "젊다",
            en: "young",
            zh: "年轻",
            pos: "Adjective",
            category: "time_seasons",
            sentenceKr: "그는 나이가 젊다 생각이 아주 깨어 있어요.",
            sentenceMeaning: "He is young and very conscious.",
            sentenceZh: "他很年轻，很有意识。"
        },
        {
            kr: "잃다",
            en: "to lose",
            zh: "丢",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "길에서 소중한 물건을 잃어요.",
            sentenceMeaning: "I lose something precious on the road.",
            sentenceZh: "我在路上丢失了一些珍贵的东西。"
        },
        {
            kr: "잃어버리다",
            en: "to lose (misplace)",
            zh: "弄丢",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "지갑을 잃어버려서 기분이 안 좋아요.",
            sentenceMeaning: "I feel bad because I lost my wallet.",
            sentenceZh: "我感觉很糟糕，因为我丢了钱包。"
        },
        {
            kr: "입다",
            en: "to wear",
            zh: "穿",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "추운 날씨에는 따뜻한 옷을 입어야 합니다.",
            sentenceMeaning: "In cold weather, you must wear warm clothes.",
            sentenceZh: "冷天必须穿暖和的衣服。"
        },
        {
            kr: "잊다",
            en: "to forget",
            zh: "忘记",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "비밀번호를 자꾸 잊어서 고민입니다.",
            sentenceMeaning: "I'm worried because I keep forgetting my password.",
            sentenceZh: "因为总是忘记密码而烦恼。"
        },
        {
            kr: "잊어버리다",
            en: "to completely forget",
            zh: "忘掉",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "친구의 전화번호를 깜빡 잊어버렸어요.",
            sentenceMeaning: "I completely forgot my friend's phone number.",
            sentenceZh: "I completely forgot my friend's phone number."
        },
        {
            kr: "자라다",
            en: "to grow",
            zh: "生长",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "화분에서 예쁜 꽃이 무럭무럭 자라고 있어요.",
            sentenceMeaning: "A pretty flower is growing rapidly in the flowerpot.",
            sentenceZh: "花盆里美丽的花朵正在茁壮成长。"
        },
        {
            kr: "자르다",
            en: "to cut",
            zh: "剪，切",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "미용실에 가서 머리를 짧게 잘랐어요.",
            sentenceMeaning: "I went to the hair salon and cut my hair short.",
            sentenceZh: "去美发店把头发剪短了。"
        },
        {
            kr: "잘되다",
            en: "to go well",
            zh: "顺利",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "올해에는 모든 일이 다 잘되면 좋겠습니다.",
            sentenceMeaning: "I hope everything goes well this year.",
            sentenceZh: "希望今年一切事情都能顺利。"
        },
        {
            kr: "잘못되다",
            en: "to go wrong",
            zh: "出问题",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "일이 잘못되더라도 너무 낙담하지 마세요.",
            sentenceMeaning: "Even if things go wrong, don't be too discouraged.",
            sentenceZh: "即使事情搞砸了，也不要太气馁。"
        },
        {
            kr: "잘못하다",
            en: "to do wrong, make a mistake",
            zh: "做错",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "제가 잘못한 일이 있으면 용서해 주세요.",
            sentenceMeaning: "If there is anything I did wrong, please forgive me.",
            sentenceZh: "如果有我做错的事，请原谅我。"
        },
        {
            kr: "잘하다",
            en: "to do well",
            zh: "做得好",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "제 여동생은 영어를 아주 잘합니다.",
            sentenceMeaning: "My younger sister speaks English very well.",
            sentenceZh: "我妹妹英语说得非常好。"
        },
        {
            kr: "잡다",
            en: "to catch, grab",
            zh: "抓",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "서로의 손을 꼭 잡고 걸어갔어요.",
            sentenceMeaning: "We walked holding each other's hands tightly.",
            sentenceZh: "紧紧握着彼此的手走了过去。"
        },
        {
            kr: "전공",
            en: "major",
            zh: "专业",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "대학교에서 전공을 결정하다 정했어요.",
            sentenceMeaning: "I decided on a major in college.",
            sentenceZh: "我决定在大学选择一个专业。"
        },
        {
            kr: "전하다",
            en: "to deliver, to tell",
            zh: "传达",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "고향에 계신 부모님께 편지를 전해요.",
            sentenceMeaning: "I am sending a letter to my parents back home.",
            sentenceZh: "我正在给家乡的父母写一封信。"
        },
        {
            kr: "전화",
            en: "telephone, call",
            zh: "电话",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "친구에게 전화를 걸어요.",
            sentenceMeaning: "Call your friend.",
            sentenceZh: "打电话给你的朋友。"
        },
        {
            kr: "접다",
            en: "to fold",
            zh: "折叠",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "편지를 다 쓰고 종이를 저워요.",
            sentenceMeaning: "I finish writing the letter and weigh the paper.",
            sentenceZh: "我写完信并称量纸张。"
        },
        {
            kr: "정리",
            en: "organization, cleaning",
            zh: "整理",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "공부를 시작하기 전에 책상 정리를 해요.",
            sentenceMeaning: "Before I start studying, I organize my desk.",
            sentenceZh: "在开始学习之前，我会整理我的书桌。"
        },
        {
            kr: "일흔",
            en: "seventy",
            zh: "七十",
            pos: "Numeral",
            category: "descriptions_qualities",
            sentenceKr: "우리 할머니께서는 올해 일흔이 되셨어요.",
            sentenceMeaning: "My grandmother turned 70 this year.",
            sentenceZh: "我奶奶今年70岁了。"
        },
        {
            kr: "자꾸",
            en: "repeatedly, constantly",
            zh: "总是",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "왜 자꾸 똑같은 실수를 반복해요?",
            sentenceMeaning: "Why do you keep repeating the same mistake?",
            sentenceZh: "为什么总是重复同样的错误？"
        },
        {
            kr: "자세히",
            en: "in detail",
            zh: "仔细地",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "이 내용에 대해 자세히 설명해 주세요.",
            sentenceMeaning: "Please explain this content in detail.",
            sentenceZh: "请详细解释一下这个内容。"
        },
        {
            kr: "자주",
            en: "often",
            zh: "经常",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "저는 도서관에 자주 가요.",
            sentenceMeaning: "I often go to the library.",
            sentenceZh: "我经常去图书馆。"
        },
        {
            kr: "작다",
            en: "to be small",
            zh: "小",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "이 신발은 제 발에 너무 작습니다.",
            sentenceMeaning: "These shoes are too small for my feet.",
            sentenceZh: "这双鞋对我的脚来说太小了。"
        },
        {
            kr: "잘",
            en: "well",
            zh: "好",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "오늘 밤에는 잘 자요.",
            sentenceMeaning: "Sleep well tonight.",
            sentenceZh: "今晚好好睡。"
        },
        {
            kr: "잘생기다",
            en: "to be handsome",
            zh: "帅气",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "그 배우는 키도 크고 아주 잘생겼습니다.",
            sentenceMeaning: "That actor is tall and very handsome.",
            sentenceZh: "那个演员个子又高，长得又帅。"
        },
        {
            kr: "재미없다",
            en: "to be uninteresting",
            zh: "无趣",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "어제 본 영화는 스토리 구성이 재미없었어요.",
            sentenceMeaning: "The movie I watched yesterday had an uninteresting plot.",
            sentenceZh: "昨天看的电影剧情构思没意思。"
        },
        {
            kr: "재미있다",
            en: "to be fun, interesting",
            zh: "有趣",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "이 소설책은 내용이 정말 재미있습니다.",
            sentenceMeaning: "This novel book has really interesting content.",
            sentenceZh: "这本小说书的内容真的很有趣。"
        },
        {
            kr: "적당하다",
            en: "to be appropriate",
            zh: "合适",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "이 음식은 맵지 않고 아이들이 먹기에 적당합니다.",
            sentenceMeaning: "This food is not spicy and is suitable for children to eat.",
            sentenceZh: "这个食物不辣，适合孩子们吃。"
        },
        {
            kr: "전부",
            en: "all, everything",
            zh: "全部",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "친구들이 전부 모이다 한자리에 모였어요.",
            sentenceMeaning: "All my friends gathered in one place.",
            sentenceZh: "我所有的朋友都聚集在一处。"
        },
        {
            kr: "전체",
            en: "whole, entirety",
            zh: "全体",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "전체 국민들이 축제에 참여했어요.",
            sentenceMeaning: "The entire nation participated in the festival.",
            sentenceZh: "全国人民都参加了这个节日。"
        },
        {
            kr: "전혀",
            en: "not at all",
            zh: "完全不",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "그 소식에 대해서는 전혀 몰라요.",
            sentenceMeaning: "I don't know anything about that news.",
            sentenceZh: "我对这个消息一无所知。"
        },
        {
            kr: "점수",
            en: "score, grade",
            zh: "分数",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "열심히 공부해서 시험 점수가 높아요.",
            sentenceMeaning: "I study hard and get high test scores.",
            sentenceZh: "我学习努力，考试成绩很高。"
        },
        {
            kr: "점점",
            en: "gradually",
            zh: "渐渐",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "겨울이 다가오니 날씨가 점점 추워져요.",
            sentenceMeaning: "As winter approaches, the weather gets colder.",
            sentenceZh: "随着冬天的临近，天气越来越冷。"
        },
        {
            kr: "정말",
            en: "really",
            zh: "真的",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "이 영화는 정말 재미있어요.",
            sentenceMeaning: "This movie is really fun.",
            sentenceZh: "这部电影真的很有趣。"
        },
        {
            kr: "입",
            en: "mouth",
            zh: "嘴巴",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "입을 열어요.",
            sentenceMeaning: "Open your mouth.",
            sentenceZh: "张开嘴。"
        },
        {
            kr: "입구",
            en: "entrance",
            zh: "入口",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "지하철역 입구에서 만납시다.",
            sentenceMeaning: "Let's meet at the subway station entrance.",
            sentenceZh: "我们在地铁站入口见面吧。"
        },
        {
            kr: "입술",
            en: "lips",
            zh: "嘴唇",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "날씨가 건조해서 입술이 텄어요.",
            sentenceMeaning: "My lips are chapped because the weather is dry.",
            sentenceZh: "因为天气干燥，嘴唇裂了。"
        },
        {
            kr: "있다",
            en: "to be, to exist, to have",
            zh: "有，在",
            pos: "동사/형용사",
            category: "miscellaneous",
            sentenceKr: "지금 거실에 책상과 의자가 있습니다.",
            sentenceMeaning: "There are a desk and a chair in the living room now.",
            sentenceZh: "现在客厅里有书桌和椅子。"
        },
        {
            kr: "자기소개",
            en: "self-introduction",
            zh: "自我介绍",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "자기소개를 해요.",
            sentenceMeaning: "Let me introduce myself.",
            sentenceZh: "让我自我介绍一下。"
        },
        {
            kr: "자동판매기",
            en: "vending machine",
            zh: "自动售货机",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "자동판매기를 눌러요.",
            sentenceMeaning: "Press the vending machine.",
            sentenceZh: "按自动售货机。"
        },
        {
            kr: "자리",
            en: "seat",
            zh: "座位",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "자리에 앉아요.",
            sentenceMeaning: "Take a seat.",
            sentenceZh: "请坐。"
        },
        {
            kr: "자식",
            en: "children, offspring",
            zh: "子女",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "자식을 길러요.",
            sentenceMeaning: "Raise your children.",
            sentenceZh: "抚养你的孩子。"
        },
        {
            kr: "자신",
            en: "self, confidence",
            zh: "自信，自己",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "자기 자신을 믿고 용기를 내세요.",
            sentenceMeaning: "Believe in yourself and take courage.",
            sentenceZh: "相信自己，拿出勇气来。"
        },
        {
            kr: "자유",
            en: "freedom",
            zh: "自由",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "자유를 누려요.",
            sentenceMeaning: "Enjoy freedom.",
            sentenceZh: "享受自由。"
        },
        {
            kr: "자전거",
            en: "bicycle",
            zh: "自行车",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "자전거를 타요.",
            sentenceMeaning: "I ride a bike.",
            sentenceZh: "我骑自行车。"
        },
        {
            kr: "자판기",
            en: "vending machine",
            zh: "自动售货机",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "커피 자판기가 고장 났어요.",
            sentenceMeaning: "The coffee vending machine is broken.",
            sentenceZh: "咖啡自动售货机坏了。"
        },
        {
            kr: "잔치",
            en: "feast, party",
            zh: "宴会",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "어제 신나는 생일 잔치를 열었어요.",
            sentenceMeaning: "We held an exciting birthday party yesterday.",
            sentenceZh: "昨天举办了开心的生日宴会。"
        },
        {
            kr: "잘못",
            en: "mistake",
            zh: "错误",
            pos: "부사/명사",
            category: "miscellaneous",
            sentenceKr: "잘못이 많아요.",
            sentenceMeaning: "There are a lot of mistakes.",
            sentenceZh: "有很多错误。"
        },
        {
            kr: "잠깐",
            en: "for a moment",
            zh: "一会儿",
            pos: "부사/명사",
            category: "miscellaneous",
            sentenceKr: "잠깐만 기다려 주세요.",
            sentenceMeaning: "Please wait for a moment.",
            sentenceZh: "请稍等一下。"
        },
        {
            kr: "잠시",
            en: "briefly, for a while",
            zh: "片刻",
            pos: "부사/명사",
            category: "miscellaneous",
            sentenceKr: "잠시만 여기서 기다려 주십시오.",
            sentenceMeaning: "Please wait here for a moment.",
            sentenceZh: "请在这里稍等片刻。"
        },
        {
            kr: "잡지",
            en: "magazine",
            zh: "杂志",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "잡지를 봐요.",
            sentenceMeaning: "Look at the magazine.",
            sentenceZh: "看看杂志。"
        },
        {
            kr: "장",
            en: "piece, sheet (counter)",
            zh: "张 (量词)",
            pos: "의존명사",
            category: "miscellaneous",
            sentenceKr: "영화 표 두 장 예매해 주세요.",
            sentenceMeaning: "Please book two movie tickets.",
            sentenceZh: "请帮我买两张电影票。"
        },
        {
            kr: "장갑",
            en: "gloves",
            zh: "手套",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "장갑을 껴요.",
            sentenceMeaning: "Put on gloves.",
            sentenceZh: "戴上手套。"
        },
        {
            kr: "장난감",
            en: "toy",
            zh: "玩具",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "장난감을 가지고 놀아요.",
            sentenceMeaning: "Play with toys.",
            sentenceZh: "玩玩具。"
        },
        {
            kr: "장미",
            en: "rose",
            zh: "玫瑰",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "여자친구에게 빨간 장미 꽃을 선물했어요.",
            sentenceMeaning: "I gifted red roses to my girlfriend.",
            sentenceZh: "给女朋友送了红玫瑰花。"
        },
        {
            kr: "재료",
            en: "ingredient, material",
            zh: "材料",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "재료를 준비해요.",
            sentenceMeaning: "Prepare the ingredients.",
            sentenceZh: "准备好配料。"
        },
        {
            kr: "재미",
            en: "fun, interest",
            zh: "乐趣",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "재미가 있어요.",
            sentenceMeaning: "It's fun.",
            sentenceZh: "很有趣。"
        },
        {
            kr: "재채기",
            en: "sneeze",
            zh: "打喷嚏",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "재채기가 나와요.",
            sentenceMeaning: "I'm sneezing.",
            sentenceZh: "我打喷嚏了。"
        },
        {
            kr: "저",
            en: "I (humble)",
            zh: "我 (谦词)",
            pos: "대명사",
            category: "miscellaneous",
            sentenceKr: "저는 한국 대학교에 다니는 학생입니다.",
            sentenceMeaning: "I am a student attending Korea University.",
            sentenceZh: "我是韩国大学的学生。"
        },
        {
            kr: "저거",
            en: "that thing over there",
            zh: "那个",
            pos: "대명사",
            category: "miscellaneous",
            sentenceKr: "저거 한 개만 주세요.",
            sentenceMeaning: "Please give me just one of those.",
            sentenceZh: "请给我那个一个。"
        },
        {
            kr: "저것",
            en: "that thing",
            zh: "那个",
            pos: "대명사",
            category: "miscellaneous",
            sentenceKr: "저것은 무슨 물건이에요?",
            sentenceMeaning: "What is that object over there?",
            sentenceZh: "那个是什么东西？"
        },
        {
            kr: "저금",
            en: "savings",
            zh: "储蓄",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "저금을 해요.",
            sentenceMeaning: "I save money.",
            sentenceZh: "我省钱了。"
        },
        {
            kr: "저기",
            en: "over there",
            zh: "那里",
            pos: "대명사",
            category: "miscellaneous",
            sentenceKr: "저기 도서관 옆에 서 있는 사람이 제 친구예요.",
            sentenceMeaning: "The person standing next to the library over there is my friend.",
            sentenceZh: "在那边图书馆旁边站着的人是我朋友。"
        },
        {
            kr: "저런",
            en: "that kind of",
            zh: "那种",
            pos: "관형사",
            category: "miscellaneous",
            sentenceKr: "저런 나쁜 소리는 듣고 싶지 않아요.",
            sentenceMeaning: "I don't want to hear such bad news/words.",
            sentenceZh: "我不想听那种不好的话。"
        },
        {
            kr: "저쪽",
            en: "that way",
            zh: "那边",
            pos: "대명사",
            category: "miscellaneous",
            sentenceKr: "저쪽 방향으로 가시면 출구가 나옵니다.",
            sentenceMeaning: "If you go in that direction, you will find the exit.",
            sentenceZh: "往那个方向走就会有出口。"
        },
        {
            kr: "저희",
            en: "we, our (humble)",
            zh: "我们 (谦词)",
            pos: "대명사",
            category: "miscellaneous",
            sentenceKr: "저희 회사에 오신 것을 환영합니다.",
            sentenceMeaning: "Welcome to our company.",
            sentenceZh: "欢迎来到我们公司。"
        },
        {
            kr: "전",
            en: "before",
            zh: "之前",
            pos: "관형사",
            category: "miscellaneous",
            sentenceKr: "오래 전에 그 사람을 만난 적이 있어요.",
            sentenceMeaning: "I met that person a long time ago.",
            sentenceZh: "很久以前我见过那个人。"
        }
    ],
    beginner_cycle_14: [
        {
            kr: "주문",
            en: "order",
            zh: "订购, 点餐",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "식당에서 음식 주문을 받아요.",
            sentenceMeaning: "Take food orders at a restaurant.",
            sentenceZh: "在餐厅点餐。"
        },
        {
            kr: "주스",
            en: "juice",
            zh: "果汁",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "시원한 오렌지 주스를 마시다.",
            sentenceMeaning: "Drink some cool orange juice.",
            sentenceZh: "喝一些凉爽的橙汁。"
        },
        {
            kr: "중국집",
            en: "Chinese restaurant",
            zh: "中餐馆",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "오늘 점심은 중국집에 주문하다 해서 먹을까요?",
            sentenceMeaning: "Should I order lunch from a Chinese restaurant today?",
            sentenceZh: "我今天应该在中餐馆点午餐吗？"
        },
        {
            kr: "짬뽕",
            en: "Jjamppong (spicy seafood noodles)",
            zh: "炒码面",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "짬뽕 음식을 먹어요.",
            sentenceMeaning: "I eat jjamppong food.",
            sentenceZh: "我吃 jjamppong 食物。"
        },
        {
            kr: "찌개",
            en: "stew",
            zh: "汤, 锅",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "찌개를 끓여요.",
            sentenceMeaning: "Boil the stew.",
            sentenceZh: "将炖菜煮沸。"
        },
        {
            kr: "차",
            en: "tea",
            zh: "茶",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "차를 마시다.",
            sentenceMeaning: "drink tea",
            sentenceZh: "喝茶"
        },
        {
            kr: "졸업",
            en: "graduation",
            zh: "毕业",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "고등학교 졸업 후에 대학교에 입학했어요.",
            sentenceMeaning: "I entered university after graduating from high school.",
            sentenceZh: "高中毕业后我进入了大学。"
        },
        {
            kr: "종이",
            en: "paper",
            zh: "纸",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "종이에 쓰다 중요한 내용을 메모했어요.",
            sentenceMeaning: "I wrote down important information on paper.",
            sentenceZh: "我在纸上写下了重要的信息。"
        },
        {
            kr: "중학교",
            en: "middle school",
            zh: "初中",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "내년에 중학교에 입학해요.",
            sentenceMeaning: "I will enter middle school next year.",
            sentenceZh: "明年进入中学。"
        },
        {
            kr: "중학생",
            en: "middle school student",
            zh: "初中生",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "제 동생은 이제 중학생이 돼요.",
            sentenceMeaning: "My younger brother is now a middle school student.",
            sentenceZh: "我弟弟现在是一名中学生。"
        },
        {
            kr: "지우개",
            en: "eraser",
            zh: "橡皮",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "지우개로 지워요.",
            sentenceMeaning: "Erase it with an eraser.",
            sentenceZh: "用橡皮擦擦掉它。"
        },
        {
            kr: "정문",
            en: "main gate",
            zh: "正门",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "학교 정문으로 다니는 학생들이 많아요.",
            sentenceMeaning: "There are many students who go through the main gate of the school.",
            sentenceZh: "有很多学生从学校正门走过。"
        },
        {
            kr: "정원",
            en: "garden",
            zh: "庭院",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "주말에 집 앞 정원을 가꿔요.",
            sentenceMeaning: "I tend to the garden in front of my house on the weekend.",
            sentenceZh: "周末我会照料我家门前的花园。"
        },
        {
            kr: "제목",
            en: "title",
            zh: "题目",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "노래의 제목을 짓다 정했어요.",
            sentenceMeaning: "I decided on a title for the song.",
            sentenceZh: "我决定了这首歌的标题。"
        },
        {
            kr: "주머니",
            en: "pocket",
            zh: "口袋",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "코트 주머니에 손을 넣다 넣었어요.",
            sentenceMeaning: "I put my hand in my coat pocket.",
            sentenceZh: "我把手伸进外套口袋里。"
        },
        {
            kr: "주무시다",
            en: "to sleep (honorific)",
            zh: "睡觉 (敬语)",
            pos: "Verb",
            category: "home_living",
            sentenceKr: "부모님께서 일찍 잠을 주무시다.",
            sentenceMeaning: "My parents go to bed early.",
            sentenceZh: "我的父母很早就睡觉了。"
        },
        {
            kr: "주부",
            en: "housewife",
            zh: "家庭主妇",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "그녀는 전업 주부로 살다 일하고 있어요.",
            sentenceMeaning: "She lives and works as a full-time housewife.",
            sentenceZh: "她作为一名全职家庭主妇生活和工作。"
        },
        {
            kr: "주소",
            en: "address",
            zh: "地址",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "봉투에 받는 사람의 주소를 적어요.",
            sentenceMeaning: "Write the recipient's address on the envelope.",
            sentenceZh: "在信封上写下收件人的地址。"
        },
        {
            kr: "줄",
            en: "rope, string, line",
            zh: "绳, 线",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "낚시 줄을 감아요.",
            sentenceMeaning: "Wind up the fishing line.",
            sentenceZh: "把钓鱼线卷起来。"
        },
        {
            kr: "지갑",
            en: "wallet",
            zh: "钱包",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "가방에 지갑을 넣다 넣었어요.",
            sentenceMeaning: "I put my wallet in my bag.",
            sentenceZh: "我把钱包放进包里。"
        },
        {
            kr: "지내다",
            en: "to spend time, to live",
            zh: "度过, 过日子",
            pos: "Verb",
            category: "home_living",
            sentenceKr: "방학 동안 시골에서 잘 지내다 왔어요.",
            sentenceMeaning: "I had a great time in the countryside during my vacation.",
            sentenceZh: "假期里我在乡村度过了一段愉快的时光。"
        },
        {
            kr: "집",
            en: "house",
            zh: "家",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "집에 살아요.",
            sentenceMeaning: "I live at home.",
            sentenceZh: "我住在家里。"
        },
        {
            kr: "집들이",
            en: "housewarming party",
            zh: "搬家宴",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "집들이에 초대해요.",
            sentenceMeaning: "I invite you to a housewarming party.",
            sentenceZh: "我邀请你参加乔迁派对。"
        },
        {
            kr: "집안일",
            en: "housework",
            zh: "家务",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "집안일을 봐요.",
            sentenceMeaning: "Look at the housework.",
            sentenceZh: "看看家务活。"
        },
        {
            kr: "짝",
            en: "pair, mate",
            zh: "对",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "짝을 맞춰요.",
            sentenceMeaning: "Let's match up.",
            sentenceZh: "咱们来比一比吧。"
        },
        {
            kr: "정형외과",
            en: "orthopedics",
            zh: "骨科",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "다리가 아파서 정형외과 에서 치료해요.",
            sentenceMeaning: "My leg hurts, so I get treatment at an orthopedic clinic.",
            sentenceZh: "我的腿疼，所以我在骨科诊所接受治疗。"
        },
        {
            kr: "제주도",
            en: "Jeju Island",
            zh: "济州岛",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "제주도는 한국의 아름다운 섬이에요.",
            sentenceMeaning: "Jeju Island is a beautiful island in Korea.",
            sentenceZh: "济州岛是韩国一个美丽的岛屿。"
        },
        {
            kr: "주변",
            en: "surroundings",
            zh: "周围",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "우리 학교 주변 환경이 아주 좋아요.",
            sentenceMeaning: "The environment around our school is very nice.",
            sentenceZh: "我们学校周围的环境非常好。"
        },
        {
            kr: "주위",
            en: "around, surroundings",
            zh: "周围",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "눈 주위가 부어올랐어요.",
            sentenceMeaning: "The area around my eyes was swollen.",
            sentenceZh: "我眼睛周围的区域肿胀。"
        },
        {
            kr: "주차장",
            en: "parking lot",
            zh: "停车场",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "차를 주차장에 세우다 세웠어요.",
            sentenceMeaning: "I parked my car in the parking lot.",
            sentenceZh: "我把车停在停车场。"
        },
        {
            kr: "중국",
            en: "China",
            zh: "中国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "중국은 땅이 아주 넓은 나라 예요.",
            sentenceMeaning: "China is a very large country.",
            sentenceZh: "中国是一个非常大的国家。"
        },
        {
            kr: "중앙",
            en: "center, middle",
            zh: "中央",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "가수는 무대 중앙에 서서 노래를 불렀어요.",
            sentenceMeaning: "The singer stood in the center of the stage and sang.",
            sentenceZh: "歌手站在舞台中央唱歌。"
        },
        {
            kr: "지도",
            en: "map",
            zh: "地图",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "모르는 길은 지도를 봐요.",
            sentenceMeaning: "If you don't know the route, look at the map.",
            sentenceZh: "如果你不知道路线，请查看地图。"
        },
        {
            kr: "지방",
            en: "region, local area",
            zh: "地区",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "남쪽 지방은 따뜻해요.",
            sentenceMeaning: "It's warm in the south.",
            sentenceZh: "南方天气很暖和。"
        },
        {
            kr: "지하",
            en: "underground",
            zh: "地下",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "지하로 내려가요.",
            sentenceMeaning: "Go down to the basement.",
            sentenceZh: "下到地下室。"
        },
        {
            kr: "지하도",
            en: "underpass",
            zh: "地下道",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "지하도를 건너요.",
            sentenceMeaning: "Cross the underpass.",
            sentenceZh: "穿过地下通道。"
        },
        {
            kr: "지하철",
            en: "subway",
            zh: "地铁",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "지하철을 타요.",
            sentenceMeaning: "Take the subway.",
            sentenceZh: "乘坐地铁。"
        },
        {
            kr: "지하철역",
            en: "subway station",
            zh: "地铁站",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "지하철역에 도착해요.",
            sentenceMeaning: "Arrive at the subway station.",
            sentenceZh: "到达地铁站。"
        },
        {
            kr: "직장",
            en: "workplace",
            zh: "职场",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "직장에 다니다.",
            sentenceMeaning: "go to work",
            sentenceZh: "上班"
        },
        {
            kr: "짐",
            en: "luggage, load",
            zh: "行李",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "짐을 싸요.",
            sentenceMeaning: "Pack your bags.",
            sentenceZh: "收拾好你的行李。"
        },
        {
            kr: "제",
            en: "my (polite)",
            zh: "我的 (谦称)",
            pos: "Pronoun",
            category: "people_jobs_family",
            sentenceKr: "제(polite my) 이름은 김철수입니다.",
            sentenceMeaning: "My (polite) name is Cheolsu Kim.",
            sentenceZh: "我的（礼貌的）名字是金哲秀。"
        },
        {
            kr: "조카",
            en: "nephew, niece",
            zh: "侄子/外甥",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 조카는 아주 귀여워요.",
            sentenceMeaning: "My nephew is very cute.",
            sentenceZh: "我的侄子很可爱。"
        },
        {
            kr: "종업원",
            en: "employee, waiter",
            zh: "服务员",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "식당 종업원이 아주 친절해요.",
            sentenceMeaning: "The restaurant staff are very friendly.",
            sentenceZh: "餐厅的工作人员非常友好。"
        },
        {
            kr: "주인",
            en: "owner",
            zh: "主人",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "가게 주인이 아주 친절하시네요.",
            sentenceMeaning: "The store owner is very kind.",
            sentenceZh: "店主非常友善。"
        },
        {
            kr: "직업",
            en: "job, occupation",
            zh: "职业",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "직업을 구해요.",
            sentenceMeaning: "I'm looking for a job.",
            sentenceZh: "我正在找工作。"
        },
        {
            kr: "직원",
            en: "employee, staff",
            zh: "职员",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "새 직원을 모집해요.",
            sentenceMeaning: "We are recruiting new employees.",
            sentenceZh: "我们正在招聘新员工。"
        },
        {
            kr: "직접",
            en: "directly, in person",
            zh: "直接",
            pos: "Adverb",
            category: "people_jobs_family",
            sentenceKr: "직접 만나요.",
            sentenceMeaning: "See you in person.",
            sentenceZh: "亲自见你。"
        },
        {
            kr: "조심",
            en: "caution, care",
            zh: "小心",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "빗길에는 항상 운전 조심을 해야 해요.",
            sentenceMeaning: "You should always be careful driving in the rain.",
            sentenceZh: "在雨中驾驶时应始终小心。"
        },
        {
            kr: "좋아하다",
            en: "to like",
            zh: "喜欢",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "저는 꽃을 정말 좋아해요.",
            sentenceMeaning: "I really like flowers.",
            sentenceZh: "我真的很喜欢花。"
        },
        {
            kr: "중심",
            en: "center",
            zh: "中心",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "여기가 서울의 중심 지예요.",
            sentenceMeaning: "This is the center of Seoul.",
            sentenceZh: "这里是首尔的中心。"
        },
        {
            kr: "즐거워하다",
            en: "to be happy, to enjoy",
            zh: "感到愉快",
            pos: "Verb",
            category: "feelings_emotions",
            sentenceKr: "아이들이 선물을 받고 매우 즐거워해요.",
            sentenceMeaning: "The children are very happy to receive the gifts.",
            sentenceZh: "孩子们收到礼物非常高兴。"
        },
        {
            kr: "즐겁다",
            en: "to be joyful, pleasant",
            zh: "快乐",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "친구들과 함께 있으면 마음이 즐거워요.",
            sentenceMeaning: "I feel happy when I am with my friends.",
            sentenceZh: "当我和朋友们在一起时，我感到很快乐。"
        },
        {
            kr: "지루하다",
            en: "boring",
            zh: "无聊",
            pos: "Adjective",
            category: "feelings_emotions",
            sentenceKr: "수업이 너무 지루해요.",
            sentenceMeaning: "Class is so boring.",
            sentenceZh: "上课真无聊。"
        },
        {
            kr: "짜증",
            en: "annoyance, irritation",
            zh: "烦躁",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "짜증을 내요.",
            sentenceMeaning: "I get irritated.",
            sentenceZh: "我很生气。"
        },
        {
            kr: "차다",
            en: "cold (weather)",
            zh: "冷",
            pos: "Adjective",
            category: "nature_animals_plants",
            sentenceKr: "바람이 차요.",
            sentenceMeaning: "The wind is cold.",
            sentenceZh: "风很冷。"
        },
        {
            kr: "주",
            en: "week",
            zh: "周",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "이번 주 에는 시험이 있어서 바빠요.",
            sentenceMeaning: "I'm busy this week because I have an exam.",
            sentenceZh: "这周我很忙，因为我要考试。"
        },
        {
            kr: "주말",
            en: "weekend",
            zh: "周末",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "즐거운 주말을 보내다 보내세요.",
            sentenceMeaning: "Have a nice weekend.",
            sentenceZh: "祝你周末愉快。"
        },
        {
            kr: "주일",
            en: "week, Sunday",
            zh: "周, 礼拜",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "이번 주일에 교회에 가요.",
            sentenceMeaning: "I'm going to church this Sunday.",
            sentenceZh: "这周日我要去教堂。"
        },
        {
            kr: "지금",
            en: "now",
            zh: "现在",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "지금 지금부터 회의를 시작하겠습니다.",
            sentenceMeaning: "Let's start the meeting now.",
            sentenceZh: "我们现在开始会议吧。"
        },
        {
            kr: "지나다",
            en: "to pass, to elapse",
            zh: "过去",
            pos: "Verb",
            category: "time_seasons",
            sentenceKr: "시간이 지나다 지날수록 더 보고 싶어요.",
            sentenceMeaning: "As time passes, I miss you more.",
            sentenceZh: "随着时间的流逝，我更加想念你。"
        },
        {
            kr: "지난달",
            en: "last month",
            zh: "上个月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "지난달에 가족들과 여행을 다녀왔어요.",
            sentenceMeaning: "I went on a trip with my family last month.",
            sentenceZh: "上个月我和家人去旅行了。"
        },
        {
            kr: "지난번",
            en: "last time",
            zh: "上次",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "지난번에 만났던 친구를 또 만났어요.",
            sentenceMeaning: "I met again a friend I met last time.",
            sentenceZh: "我又见到了上次见过的朋友。"
        },
        {
            kr: "지난주",
            en: "last week",
            zh: "上周",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "지난주 에는 비가 많이 왔어요.",
            sentenceMeaning: "It rained a lot last week.",
            sentenceZh: "上周下了很多雨。"
        },
        {
            kr: "지난해",
            en: "last year",
            zh: "去年",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "지난해 에는 정말 많은 일이 있었어요.",
            sentenceMeaning: "A lot happened last year.",
            sentenceZh: "去年发生了很多事情。"
        },
        {
            kr: "정하다",
            en: "to decide, to fix",
            zh: "决定",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "친구와 만날 약속을 정해요.",
            sentenceMeaning: "Make an appointment to meet your friend.",
            sentenceZh: "预约与您的朋友见面。"
        },
        {
            kr: "젖다",
            en: "to get wet",
            zh: "湿",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "비에 옷이 흠뻑 젖어요.",
            sentenceMeaning: "My clothes are soaked in the rain.",
            sentenceZh: "我的衣服被雨淋湿了。"
        },
        {
            kr: "졸다",
            en: "to doze off",
            zh: "打瞌睡",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "피곤해서 수업 시간에 깜빡 졸아요.",
            sentenceMeaning: "I'm so tired that I doze off in class.",
            sentenceZh: "我太累了，上课就打瞌睡。"
        },
        {
            kr: "주다",
            en: "to give",
            zh: "给",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "친구의 생일에 선물을 줘요.",
            sentenceMeaning: "Give a gift to your friend on his or her birthday.",
            sentenceZh: "在您的朋友生日时给他或她送一份礼物。"
        },
        {
            kr: "주사",
            en: "injection, shot",
            zh: "注射",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "병원에서 예방 주사를 맞아요.",
            sentenceMeaning: "Get a vaccination at the hospital.",
            sentenceZh: "去医院接种疫苗。"
        },
        {
            kr: "주차",
            en: "parking",
            zh: "停车",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "주차 위반 딱지를 뗐어요.",
            sentenceMeaning: "I got a parking ticket.",
            sentenceZh: "我收到一张停车罚单。"
        },
        {
            kr: "죽다",
            en: "to die",
            zh: "死",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "화초가 물을 안 줘서 죽어요.",
            sentenceMeaning: "Flowers die because they are not watered.",
            sentenceZh: "花因为不浇水而枯死。"
        },
        {
            kr: "준비",
            en: "preparation",
            zh: "准备",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "내일 출근 준비를 미리 해둬요.",
            sentenceMeaning: "Get ready for work tomorrow.",
            sentenceZh: "准备明天上班。"
        },
        {
            kr: "줄다",
            en: "to decrease, to shrink",
            zh: "减少",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "빨래를 했더니 옷의 크기가 줄어요.",
            sentenceMeaning: "After washing, the clothes shrink in size.",
            sentenceZh: "洗完后，衣服尺寸会缩水。"
        },
        {
            kr: "줄이다",
            en: "to reduce, to decrease",
            zh: "缩减",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "텔레비전 소리를 줄여요.",
            sentenceMeaning: "Turn down the television sound.",
            sentenceZh: "把电视声音调小。"
        },
        {
            kr: "줍다",
            en: "to pick up",
            zh: "捡",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "길에 떨어진 쓰레기를 주워요.",
            sentenceMeaning: "Pick up the trash that falls on the road.",
            sentenceZh: "捡起落在路上的垃圾。"
        },
        {
            kr: "즐기다",
            en: "to enjoy",
            zh: "享受",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "여름 휴가를 즐기다 즐겁게 보냈어요.",
            sentenceMeaning: "I had a great time enjoying my summer vacation.",
            sentenceZh: "我度过了愉快的暑假。"
        },
        {
            kr: "지각",
            en: "lateness, tardiness",
            zh: "迟到",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "학교에 지각을 하다 해서 선생님께 혼났어요.",
            sentenceMeaning: "I got scolded by my teacher for being late to school.",
            sentenceZh: "我因为上学迟到而被老师批评了。"
        },
        {
            kr: "지나가다",
            en: "to pass by",
            zh: "经过",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "버스가 정류장을 그냥 지나가요.",
            sentenceMeaning: "The bus just passes the stop.",
            sentenceZh: "公共汽车刚刚经过车站。"
        },
        {
            kr: "지다",
            en: "to lose",
            zh: "输",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "우리 팀이 이번 경기에서 져요.",
            sentenceMeaning: "Our team loses this game.",
            sentenceZh: "这场比赛我们队输了。"
        },
        {
            kr: "지르다",
            en: "to shout, to yell",
            zh: "喊",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "큰 소리를 질러요.",
            sentenceMeaning: "Shout out loud.",
            sentenceZh: "大声喊出来。"
        },
        {
            kr: "지우다",
            en: "to erase",
            zh: "擦",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "지우개로 글씨를 지워요.",
            sentenceMeaning: "Erase the writing with an eraser.",
            sentenceZh: "用橡皮擦掉字迹。"
        },
        {
            kr: "지키다",
            en: "to protect, to keep",
            zh: "遵守, 守护",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "나라를 지켜요.",
            sentenceMeaning: "Protect the country.",
            sentenceZh: "保护国家。"
        },
        {
            kr: "질문",
            en: "question",
            zh: "提问",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "질문에 답해요.",
            sentenceMeaning: "Answer the questions.",
            sentenceZh: "回答问题。"
        },
        {
            kr: "짓다",
            en: "to build, to make",
            zh: "建, 盖",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "집을 지어요.",
            sentenceMeaning: "Build a house.",
            sentenceZh: "建造一座房子。"
        },
        {
            kr: "찌다",
            en: "to steam",
            zh: "蒸",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "감자를 쪄요.",
            sentenceMeaning: "Steam the potatoes.",
            sentenceZh: "将土豆蒸熟。"
        },
        {
            kr: "찍다",
            en: "to stamp, to take (photo)",
            zh: "盖(章), 拍",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "도장을 찍어요.",
            sentenceMeaning: "Take a stamp.",
            sentenceZh: "盖个邮票。"
        },
        {
            kr: "정신없이",
            en: "hectically",
            zh: "没精神地, 忙得不可开交",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "오늘 하루 종일 정신없이 일해요.",
            sentenceMeaning: "I'm working hard all day today.",
            sentenceZh: "我今天一整天都在努力工作。"
        },
        {
            kr: "정확",
            en: "accuracy, correctness",
            zh: "准确",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "그는 한국어 발음이 아주 정확 해요.",
            sentenceMeaning: "He has very accurate Korean pronunciation.",
            sentenceZh: "他的韩语发音非常准确。"
        },
        {
            kr: "제일",
            en: "the most, first",
            zh: "第一, 最",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "세상에서 엄마를 제일 좋아해요.",
            sentenceMeaning: "I like my mom the most in the world.",
            sentenceZh: "我是世界上最喜欢我的妈妈。"
        },
        {
            kr: "조금",
            en: "a little",
            zh: "一点",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "배가 불러서 조금 먹어요.",
            sentenceMeaning: "I’m full so I eat a little.",
            sentenceZh: "我吃饱了所以就吃一点。"
        },
        {
            kr: "조금씩",
            en: "little by little",
            zh: "稍微地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "실력이 조금씩 나아져요.",
            sentenceMeaning: "My skills are improving little by little.",
            sentenceZh: "我的技术正在一点一点地提高。"
        },
        {
            kr: "조용하다",
            en: "quiet",
            zh: "安静",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "도서관 안이 아주 조용해요.",
            sentenceMeaning: "It's very quiet inside the library.",
            sentenceZh: "图书馆内非常安静。"
        },
        {
            kr: "조용히",
            en: "quietly",
            zh: "安静地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "아기가 자고 있으니 조용히 말해요.",
            sentenceMeaning: "Speak quietly as the baby is sleeping.",
            sentenceZh: "宝宝睡觉时小声说话。"
        },
        {
            kr: "좀",
            en: "a little",
            zh: "点",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "이 옷은 저에게 좀 비싸요.",
            sentenceMeaning: "These clothes are a bit expensive for me.",
            sentenceZh: "这些衣服对我来说有点贵。"
        },
        {
            kr: "좁다",
            en: "narrow",
            zh: "窄",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "방이 너무 좁다 이사하고 싶어요.",
            sentenceMeaning: "The room is too small. I want to move.",
            sentenceZh: "房间太小了。我想搬家。"
        },
        {
            kr: "종류",
            en: "type, kind",
            zh: "种类",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "이 가게에는 빵의 종류 가 다양해요.",
            sentenceMeaning: "There are many different types of bread at this store.",
            sentenceZh: "这家店有很多不同类型的面包。"
        },
        {
            kr: "좋다",
            en: "good",
            zh: "好",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "오늘은 소풍 가기에 날씨가 아주 좋아요.",
            sentenceMeaning: "The weather is perfect for a picnic today.",
            sentenceZh: "今天的天气非常适合野餐。"
        },
        {
            kr: "죄송하다",
            en: "sorry",
            zh: "对不起",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "약속에 늦어서 마음이 죄송해요.",
            sentenceMeaning: "I'm sorry I'm late for my appointment.",
            sentenceZh: "很抱歉我的约会迟到了。"
        },
        {
            kr: "주로",
            en: "mainly, usually",
            zh: "主要",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "주말에는 주로 집에서 쉬는 편이에요.",
            sentenceMeaning: "On the weekends, I usually rest at home.",
            sentenceZh: "周末我一般喜欢在家里休息。"
        },
        {
            kr: "주황색",
            en: "orange color",
            zh: "橙色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "그녀는 주황색 색깔을 좋아해요.",
            sentenceMeaning: "She likes the color orange.",
            sentenceZh: "她喜欢橙色。"
        },
        {
            kr: "중",
            en: "middle, during",
            zh: "中",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "지금은 회의 중 이라 전화를 못 받아요.",
            sentenceMeaning: "I'm in a meeting right now so I can't answer the phone.",
            sentenceZh: "我现在正在开会，所以无法接听电话。"
        },
        {
            kr: "중간",
            en: "middle, center",
            zh: "中间",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "우리 집은 집과 학교의 중간 지점에 있어요.",
            sentenceMeaning: "My house is halfway between my home and school.",
            sentenceZh: "我的房子位于我家和学校之间。"
        },
        {
            kr: "중요",
            en: "importance",
            zh: "重要",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "회의를 위해 중요 자료를 챙겼어요.",
            sentenceMeaning: "I packed important materials for the meeting.",
            sentenceZh: "我收拾好了会议的重要材料。"
        },
        {
            kr: "진짜",
            en: "really, truly",
            zh: "真的",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "진짜 괜찮아요.",
            sentenceMeaning: "It's really okay.",
            sentenceZh: "真的没关系。"
        },
        {
            kr: "진하다",
            en: "thick, dark",
            zh: "浓",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "안개가 진해요.",
            sentenceMeaning: "The fog is thick.",
            sentenceZh: "雾很浓。"
        },
        {
            kr: "짜다",
            en: "salty",
            zh: "咸",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "국 맛이 짜요.",
            sentenceMeaning: "The soup tastes salty.",
            sentenceZh: "汤的味道是咸的。"
        },
        {
            kr: "짧다",
            en: "short",
            zh: "短",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "다리가 짧아요.",
            sentenceMeaning: "My legs are short.",
            sentenceZh: "我的腿很短。"
        },
        {
            kr: "쪽",
            en: "side, direction",
            zh: "侧, 方向",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "왼쪽 방향으로 가세요.",
            sentenceMeaning: "Go left.",
            sentenceZh: "向左走。"
        },
        {
            kr: "차갑다",
            en: "cold",
            zh: "冰, 凉",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "물이 차가워요.",
            sentenceMeaning: "The water is cold.",
            sentenceZh: "水很冷。"
        }
    ],
    beginner_cycle_15: [
        {
            kr: "찬물",
            en: "cold water",
            zh: "凉水",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "찬물을 마시다.",
            sentenceMeaning: "drink cold water",
            sentenceZh: "喝冷水"
        },
        {
            kr: "참외",
            en: "oriental melon",
            zh: "香瓜",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "참외 과일을 먹어요.",
            sentenceMeaning: "Eat melon fruit.",
            sentenceZh: "吃瓜果。"
        },
        {
            kr: "채소",
            en: "vegetable",
            zh: "蔬菜",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "채소를 먹어요.",
            sentenceMeaning: "Eat vegetables.",
            sentenceZh: "吃蔬菜。"
        },
        {
            kr: "초콜릿",
            en: "chocolate",
            zh: "巧克力",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "초콜릿을 먹어요.",
            sentenceMeaning: "Eat chocolate.",
            sentenceZh: "吃巧克力。"
        },
        {
            kr: "치킨",
            en: "chicken",
            zh: "炸鸡",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "저녁으로 맛있는 치킨 음식을 먹어요.",
            sentenceMeaning: "I eat delicious chicken food for dinner.",
            sentenceZh: "晚餐我吃美味的鸡肉。"
        },
        {
            kr: "카레",
            en: "curry",
            zh: "咖喱",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "오늘 점심은 카레 음식 이에요.",
            sentenceMeaning: "Today’s lunch is curry food.",
            sentenceZh: "今天的午餐是咖喱食品。"
        },
        {
            kr: "카페",
            en: "cafe",
            zh: "咖啡店",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "분위기 좋은 카페 에서 만나요.",
            sentenceMeaning: "Let’s meet at a cafe with a nice atmosphere.",
            sentenceZh: "我们在一家气氛不错的咖啡馆见面吧。"
        },
        {
            kr: "칼",
            en: "knife",
            zh: "刀",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "칼로 잘라요.",
            sentenceMeaning: "Cut it with a knife.",
            sentenceZh: "用刀把它切开。"
        },
        {
            kr: "칼국수",
            en: "Kalguksu (noodle soup)",
            zh: "刀切面",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "따뜻한 칼국수 음식을 먹고 싶어요.",
            sentenceMeaning: "I want to eat warm noodle soup.",
            sentenceZh: "我想吃热汤面。"
        },
        {
            kr: "커피",
            en: "coffee",
            zh: "咖啡",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "모닝 커피를 마시다.",
            sentenceMeaning: "drink morning coffee",
            sentenceZh: "喝早晨咖啡"
        },
        {
            kr: "커피숍",
            en: "coffee shop",
            zh: "咖啡店",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "커피숍 에서 만나요.",
            sentenceMeaning: "See you at the coffee shop.",
            sentenceZh: "咖啡店见。"
        },
        {
            kr: "컵",
            en: "cup",
            zh: "杯子",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "물 컵을 닦아요.",
            sentenceMeaning: "Clean the water cup.",
            sentenceZh: "清洁水杯。"
        },
        {
            kr: "케이크",
            en: "cake",
            zh: "蛋糕",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "생일 케이크를 먹어요.",
            sentenceMeaning: "Eat birthday cake.",
            sentenceZh: "吃生日蛋糕。"
        },
        {
            kr: "콜라",
            en: "cola",
            zh: "可乐",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "피자와 콜라를 마시다.",
            sentenceMeaning: "Eat pizza and drink cola.",
            sentenceZh: "吃披萨，喝可乐。"
        },
        {
            kr: "콩",
            en: "bean, soybean",
            zh: "豆子",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "콩 식물을 심어요.",
            sentenceMeaning: "Plant soybean plants.",
            sentenceZh: "种植大豆植物。"
        },
        {
            kr: "타다",
            en: "to mix, to make (coffee/drink)",
            zh: "冲, 调",
            pos: "Verb",
            category: "food_dining",
            sentenceKr: "커피를 타요.",
            sentenceMeaning: "I drink coffee.",
            sentenceZh: "我喝咖啡。"
        },
        {
            kr: "책",
            en: "book",
            zh: "书",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "책을 읽어요.",
            sentenceMeaning: "I read a book.",
            sentenceZh: "我读了一本书。"
        },
        {
            kr: "책상",
            en: "desk",
            zh: "书桌",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "책상 가구를 사요.",
            sentenceMeaning: "Buy desk furniture.",
            sentenceZh: "购买办公桌家具。"
        },
        {
            kr: "책장",
            en: "bookcase",
            zh: "书柜",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "책장 가구에 책을 꽂아요.",
            sentenceMeaning: "Place books on bookshelf furniture.",
            sentenceZh: "将书籍放在书架家具上。"
        },
        {
            kr: "초등학교",
            en: "elementary school",
            zh: "小学",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "초등학교에 입학해요.",
            sentenceMeaning: "I enter elementary school.",
            sentenceZh: "我进入小学。"
        },
        {
            kr: "초등학생",
            en: "elementary student",
            zh: "小学生",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "초등학생이 돼요.",
            sentenceMeaning: "I become an elementary school student.",
            sentenceZh: "我成为一名小学生。"
        },
        {
            kr: "창문",
            en: "window",
            zh: "窗户",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "창문을 열어요.",
            sentenceMeaning: "Open the window.",
            sentenceZh: "打开窗户。"
        },
        {
            kr: "청소",
            en: "cleaning",
            zh: "打扫",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "화장실 청소를 해요.",
            sentenceMeaning: "I'm cleaning the bathroom.",
            sentenceZh: "我正在打扫浴室。"
        },
        {
            kr: "초대장",
            en: "invitation card",
            zh: "邀请函",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "초대장을 보내요.",
            sentenceMeaning: "Send an invitation.",
            sentenceZh: "发送邀请。"
        },
        {
            kr: "축구공",
            en: "soccer ball",
            zh: "足球",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "축구공을 차요.",
            sentenceMeaning: "kick the soccer ball",
            sentenceZh: "踢足球"
        },
        {
            kr: "층",
            en: "floor, layer",
            zh: "层",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "우리 사무실은 건물의 10층에 있어요.",
            sentenceMeaning: "Our office is on the 10th floor of the building.",
            sentenceZh: "我们的办公室在大楼的 10 楼。"
        },
        {
            kr: "치마",
            en: "skirt",
            zh: "裙子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "오늘 예쁜 치마를 이워요.",
            sentenceMeaning: "I’m tying a pretty skirt today.",
            sentenceZh: "今天我要系一条漂亮的裙子。"
        },
        {
            kr: "치약",
            en: "toothpaste",
            zh: "牙膏",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "칫솔에 치약을 짜요.",
            sentenceMeaning: "Squeeze toothpaste onto your toothbrush.",
            sentenceZh: "将牙膏挤到牙刷上。"
        },
        {
            kr: "칠판",
            en: "blackboard",
            zh: "黑板",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "선생님이 칠판에 써요.",
            sentenceMeaning: "The teacher writes on the blackboard.",
            sentenceZh: "老师在黑板上写字。"
        },
        {
            kr: "침대",
            en: "bed",
            zh: "床",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "폭신한 침대 가구를 샀어요.",
            sentenceMeaning: "I bought some soft bed furniture.",
            sentenceZh: "我买了一些软床家具。"
        },
        {
            kr: "침실",
            en: "bedroom",
            zh: "卧室",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "침실 에서 자요.",
            sentenceMeaning: "Sleep in the bedroom.",
            sentenceZh: "睡在卧室里。"
        },
        {
            kr: "칫솔",
            en: "toothbrush",
            zh: "牙刷",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "칫솔로 이를 닦아요.",
            sentenceMeaning: "Brush your teeth with a toothbrush.",
            sentenceZh: "用牙刷刷牙。"
        },
        {
            kr: "카드",
            en: "card",
            zh: "卡片",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "생일 카드를 써요.",
            sentenceMeaning: "Write a birthday card.",
            sentenceZh: "写一张生日贺卡。"
        },
        {
            kr: "카메라",
            en: "camera",
            zh: "照相机",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "새 카메라로 사진을 찍어요.",
            sentenceMeaning: "Take pictures with your new camera.",
            sentenceZh: "用你的新相机拍照。"
        },
        {
            kr: "컴퓨터",
            en: "computer",
            zh: "电脑",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "컴퓨터로 게임을 해요.",
            sentenceMeaning: "I play games on the computer.",
            sentenceZh: "我在电脑上玩游戏。"
        },
        {
            kr: "코",
            en: "nose",
            zh: "鼻子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "코가 높아요.",
            sentenceMeaning: "My nose is high.",
            sentenceZh: "我的鼻子很高。"
        },
        {
            kr: "찾아가다",
            en: "to visit, to go find",
            zh: "去找, 访问",
            pos: "Verb",
            category: "city_travel_places",
            sentenceKr: "교실로 찾아가요.",
            sentenceMeaning: "Let's go to the classroom.",
            sentenceZh: "我们去教室吧。"
        },
        {
            kr: "찾아오다",
            en: "to visit, to come to find",
            zh: "前来",
            pos: "Verb",
            category: "city_travel_places",
            sentenceKr: "손님이 찾아와요.",
            sentenceMeaning: "A guest is coming.",
            sentenceZh: "有客人来了。"
        },
        {
            kr: "체육관",
            en: "gymnasium",
            zh: "体育馆",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "실내 체육관 에서 운동해요.",
            sentenceMeaning: "I exercise at the indoor gym.",
            sentenceZh: "我在室内健身房锻炼。"
        },
        {
            kr: "출구",
            en: "exit",
            zh: "出口",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "출구로 나가요.",
            sentenceMeaning: "Go to the exit.",
            sentenceZh: "走到出口。"
        },
        {
            kr: "출입국",
            en: "immigration (entry and exit of a country)",
            zh: "出入境",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "출입국 사무소에 가요.",
            sentenceMeaning: "Go to the immigration office.",
            sentenceZh: "去出入境管理办公室。"
        },
        {
            kr: "출장",
            en: "business trip",
            zh: "出差",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "출장을 가요.",
            sentenceMeaning: "I'm going on a business trip.",
            sentenceZh: "我要去出差。"
        },
        {
            kr: "치과",
            en: "dentist, dental clinic",
            zh: "牙科",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "이빨이 아파서 치과 병원에 갔어요.",
            sentenceMeaning: "I went to the dentist because my tooth hurt.",
            sentenceZh: "我去看牙医，因为我的牙疼。"
        },
        {
            kr: "캐나다",
            en: "Canada",
            zh: "加拿大",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "캐나다 나라에 여행을 가고 싶어요.",
            sentenceMeaning: "I want to travel to Canada.",
            sentenceZh: "我想去加拿大旅行。"
        },
        {
            kr: "청년",
            en: "youth, young man",
            zh: "青年",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "젊은 청년이 일해요.",
            sentenceMeaning: "A young man works.",
            sentenceZh: "一个年轻人工作。"
        },
        {
            kr: "출근",
            en: "going to work",
            zh: "上班",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "출근과 퇴근 시간.",
            sentenceMeaning: "Commencement and departure time.",
            sentenceZh: "开始和出发时间。"
        },
        {
            kr: "취직",
            en: "getting a job",
            zh: "就业",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "취직이 돼요.",
            sentenceMeaning: "I can get a job.",
            sentenceZh: "我可以找到工作。"
        },
        {
            kr: "친구",
            en: "friend",
            zh: "朋友",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "오랜만에 친구를 만나요.",
            sentenceMeaning: "Meeting a friend after a long time.",
            sentenceZh: "时隔多年再次见到朋友。"
        },
        {
            kr: "친척",
            en: "relative",
            zh: "亲戚",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "추석 명절에 온 친척들이 한자리에 모였습니다.",
            sentenceMeaning: "All relatives gathered together for the Chuseok holiday.",
            sentenceZh: "中秋佳节，所有亲戚都聚集在了一起。"
        },
        {
            kr: "취미",
            en: "hobby",
            zh: "爱好",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "취미 생활을 즐겨요.",
            sentenceMeaning: "I enjoy my hobbies.",
            sentenceZh: "我很享受我的爱好。"
        },
        {
            kr: "차다",
            en: "cold (weather)",
            zh: "冷",
            pos: "Adjective",
            category: "nature_animals_plants",
            sentenceKr: "바람이 차요.",
            sentenceMeaning: "The wind is cold.",
            sentenceZh: "风很冷。"
        },
        {
            kr: "청바지",
            en: "blue jeans",
            zh: "牛仔裤",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "청바지를 이워요.",
            sentenceMeaning: "I tie my jeans.",
            sentenceZh: "我系好牛仔裤。"
        },
        {
            kr: "코끼리",
            en: "elephant",
            zh: "大象",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "동물원 에서 코끼리를 봤어요.",
            sentenceMeaning: "I saw an elephant at the zoo.",
            sentenceZh: "我在动物园看到了一头大象。"
        },
        {
            kr: "첫날",
            en: "first day",
            zh: "第一天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "새해 첫날에 만나요.",
            sentenceMeaning: "See you on New Year's Day.",
            sentenceZh: "元旦见。"
        },
        {
            kr: "청소년",
            en: "youth, teenager",
            zh: "青少年",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "청소년 시절을 보내요.",
            sentenceMeaning: "Spend your teenage years.",
            sentenceZh: "度过你的青少年时期。"
        },
        {
            kr: "초",
            en: "second (time)",
            zh: "秒",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "10초 시간을 재요.",
            sentenceMeaning: "Time it for 10 seconds.",
            sentenceZh: "计时10秒。"
        },
        {
            kr: "칠월",
            en: "July",
            zh: "七月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "칠월 달 에는 날씨가 아주 더워요.",
            sentenceMeaning: "The weather is very hot in the month of July.",
            sentenceZh: "七月份的天气非常炎热。"
        },
        {
            kr: "참다",
            en: "to endure, to hold back",
            zh: "忍",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "기침을 참아요.",
            sentenceMeaning: "Hold back your cough.",
            sentenceZh: "忍住咳嗽。"
        },
        {
            kr: "찾다",
            en: "to find, to search",
            zh: "找",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "지갑을 찾아요.",
            sentenceMeaning: "I'm looking for my wallet.",
            sentenceZh: "我正在寻找我的钱包。"
        },
        {
            kr: "찾아보다",
            en: "to look for, to search",
            zh: "寻找",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "수첩을 찾아봐요.",
            sentenceMeaning: "Look for your notebook.",
            sentenceZh: "寻找你的笔记本。"
        },
        {
            kr: "쳐다보다",
            en: "to stare, to look at",
            zh: "盯着看",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "하늘을 쳐다봐요.",
            sentenceMeaning: "Look up at the sky.",
            sentenceZh: "抬头看看天空。"
        },
        {
            kr: "초대",
            en: "invitation",
            zh: "邀请",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "초대를 해요.",
            sentenceMeaning: "I'm inviting you.",
            sentenceZh: "我邀请你。"
        },
        {
            kr: "추다",
            en: "to dance",
            zh: "跳(舞)",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "춤을 춰요.",
            sentenceMeaning: "Let's dance.",
            sentenceZh: "我们来跳舞吧。"
        },
        {
            kr: "축구",
            en: "soccer",
            zh: "足球",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "축구 운동을 좋아해요.",
            sentenceMeaning: "I like soccer sports.",
            sentenceZh: "我喜欢足球运动。"
        },
        {
            kr: "축하",
            en: "congratulation",
            zh: "祝贺",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "축하 파티를 해요.",
            sentenceMeaning: "Let's have a celebration party.",
            sentenceZh: "我们开个庆祝会吧。"
        },
        {
            kr: "출발",
            en: "departure",
            zh: "出发",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "기차가 서울역을 향해 정시에 출발했습니다.",
            sentenceMeaning: "The train departed for Seoul Station on time.",
            sentenceZh: "火车准时向首尔站出发了。"
        },
        {
            kr: "출석",
            en: "attendance",
            zh: "出席",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "출석을 불러요.",
            sentenceMeaning: "Take attendance.",
            sentenceZh: "参加。"
        },
        {
            kr: "출입",
            en: "entry and exit",
            zh: "出入",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "출입을 통제해요.",
            sentenceMeaning: "Control access.",
            sentenceZh: "控制访问。"
        },
        {
            kr: "출퇴근",
            en: "commuting",
            zh: "上下班",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "출퇴근을 해요.",
            sentenceMeaning: "I commute to work.",
            sentenceZh: "我上下班。"
        },
        {
            kr: "춤",
            en: "dance",
            zh: "舞",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "춤을 춰요.",
            sentenceMeaning: "Let's dance.",
            sentenceZh: "我们来跳舞吧。"
        },
        {
            kr: "춤추다",
            en: "to dance",
            zh: "跳舞",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "가수들이 춤춰요.",
            sentenceMeaning: "Singers dance.",
            sentenceZh: "歌手跳舞。"
        },
        {
            kr: "취소",
            en: "cancellation",
            zh: "取消",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "예약 취소를 해요.",
            sentenceMeaning: "I'm canceling my reservation.",
            sentenceZh: "我要取消我的预订。"
        },
        {
            kr: "치다",
            en: "to hit, to play (instrument)",
            zh: "打, 弹",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "화가 나서 책상을 쳐요.",
            sentenceMeaning: "I get angry and hit the desk.",
            sentenceZh: "我生气了，摔到桌子上。"
        },
        {
            kr: "치료",
            en: "treatment, cure",
            zh: "治疗",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "병원에서 치료를 받아요.",
            sentenceMeaning: "Get treatment at the hospital.",
            sentenceZh: "去医院接受治疗。"
        },
        {
            kr: "칭찬",
            en: "praise, compliment",
            zh: "称赞",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "잘했다고 칭찬을 들어요.",
            sentenceMeaning: "I get praised for doing a good job.",
            sentenceZh: "我因工作出色而受到表扬。"
        },
        {
            kr: "켜다",
            en: "to play (string instrument)",
            zh: "拉(琴)",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "바이올린을 켜요.",
            sentenceMeaning: "I play the violin.",
            sentenceZh: "我拉小提琴。"
        },
        {
            kr: "콘서트",
            en: "concert",
            zh: "演唱会",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "가수의 콘서트를 봐요.",
            sentenceMeaning: "Watch a singer's concert.",
            sentenceZh: "观看歌手的演唱会。"
        },
        {
            kr: "큰소리",
            en: "loud voice, shout",
            zh: "大声",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "밖에서 큰소리가 들려요.",
            sentenceMeaning: "I hear a loud noise outside.",
            sentenceZh: "我听到外面有很大的噪音。"
        },
        {
            kr: "키우다",
            en: "to raise, to grow",
            zh: "养",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "강아지를 키워요.",
            sentenceMeaning: "I raise a puppy.",
            sentenceZh: "我养了一只小狗。"
        },
        {
            kr: "차례",
            en: "order, turn",
            zh: "顺序",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "차례를 지켜요.",
            sentenceMeaning: "Take your turn.",
            sentenceZh: "轮到你了。"
        },
        {
            kr: "착하다",
            en: "kind, nice",
            zh: "善良",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "마음이 착해요.",
            sentenceMeaning: "I have a good heart.",
            sentenceZh: "我有一颗善良的心。"
        },
        {
            kr: "참",
            en: "very, truly",
            zh: "真, 很",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "참 좋아요.",
            sentenceMeaning: "I really like it.",
            sentenceZh: "我真的很喜欢它。"
        },
        {
            kr: "처음",
            en: "first, beginning",
            zh: "第一次, 最初",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "처음 시작해요.",
            sentenceMeaning: "Let's start first.",
            sentenceZh: "我们先开始吧。"
        },
        {
            kr: "천",
            en: "thousand",
            zh: "千",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "천 숫자를 세요.",
            sentenceMeaning: "Count to thousand.",
            sentenceZh: "数到千。"
        },
        {
            kr: "천만",
            en: "ten million",
            zh: "千万",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "천만 숫자를 써요.",
            sentenceMeaning: "Use the number 10 million.",
            sentenceZh: "使用1000万这个数字。"
        },
        {
            kr: "천천히",
            en: "slowly",
            zh: "慢慢地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "천천히 가요.",
            sentenceMeaning: "Go slowly.",
            sentenceZh: "慢慢来。"
        },
        {
            kr: "첫",
            en: "first",
            zh: "初, 第一",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "첫 만남을 기억해요.",
            sentenceMeaning: "I remember our first meeting.",
            sentenceZh: "我记得我们第一次见面。"
        },
        {
            kr: "첫째",
            en: "first",
            zh: "第一",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "첫째 시간에 공부해요.",
            sentenceMeaning: "I study in the first class.",
            sentenceZh: "我在第一班学习。"
        },
        {
            kr: "체크무늬",
            en: "checkered pattern",
            zh: "格子图案",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "체크무늬 남방을 이워요.",
            sentenceMeaning: "I'm wearing a checkered pattern.",
            sentenceZh: "我穿着格子图案的衣服。"
        },
        {
            kr: "초록색",
            en: "green color",
            zh: "绿色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "초록색 색깔을 좋아해요.",
            sentenceMeaning: "I like the color green.",
            sentenceZh: "我喜欢绿色。"
        },
        {
            kr: "최고",
            en: "the best, top",
            zh: "最高",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "최고 점수를 받아요.",
            sentenceMeaning: "Get the highest score.",
            sentenceZh: "获得最高分。"
        },
        {
            kr: "최근",
            en: "recently, latest",
            zh: "最近",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "최근에 들어요.",
            sentenceMeaning: "I listened to it recently.",
            sentenceZh: "我最近听过。"
        },
        {
            kr: "추석",
            en: "Chuseok (Korean Thanksgiving)",
            zh: "秋夕",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "추석 명절을 보내요.",
            sentenceMeaning: "Have a happy Chuseok holiday.",
            sentenceZh: "祝您中秋节假期愉快。"
        },
        {
            kr: "춥다",
            en: "cold",
            zh: "冷",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "날씨가 추워요.",
            sentenceMeaning: "The weather is cold.",
            sentenceZh: "天气很冷。"
        },
        {
            kr: "충분하다",
            en: "to be enough",
            zh: "充足",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "시간이 충분해요.",
            sentenceMeaning: "There's plenty of time.",
            sentenceZh: "有的是时间。"
        },
        {
            kr: "친절",
            en: "kindness",
            zh: "亲切",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "그는 항상 친절로 대해요.",
            sentenceMeaning: "He always treats me with kindness.",
            sentenceZh: "他总是对我很友善。"
        },
        {
            kr: "친하다",
            en: "close, intimate",
            zh: "亲近",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "우리는 아주 친하다 친구와 사이예요.",
            sentenceMeaning: "We are very close. We are like friends.",
            sentenceZh: "我们非常接近。我们就像朋友一样。"
        },
        {
            kr: "칠",
            en: "seven",
            zh: "七",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "칠 숫자를 써 보세요.",
            sentenceMeaning: "Write down the number to hit.",
            sentenceZh: "写下要击中的数字。"
        },
        {
            kr: "칠십",
            en: "seventy",
            zh: "七十",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "할머니께서 올해 칠십 세가 되셨어요.",
            sentenceMeaning: "My grandmother turned seventy this year.",
            sentenceZh: "我奶奶今年七十岁了。"
        },
        {
            kr: "켤레",
            en: "pair (of shoes/socks)",
            zh: "双",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "운동화 한 켤레를 샀어요.",
            sentenceMeaning: "I bought a pair of sneakers.",
            sentenceZh: "我买了一双运动鞋。"
        },
        {
            kr: "콧물",
            en: "runny nose",
            zh: "鼻涕",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "감기에 걸려서 콧물이 나와요.",
            sentenceMeaning: "I have a cold and my nose is running.",
            sentenceZh: "我感冒了，流鼻涕。"
        },
        {
            kr: "크기",
            en: "size",
            zh: "大小",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "가방의 크기가 커요.",
            sentenceMeaning: "The size of the bag is large.",
            sentenceZh: "袋子的尺寸很大。"
        },
        {
            kr: "크다",
            en: "big, large",
            zh: "大",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "집이 아주 커요.",
            sentenceMeaning: "The house is very big.",
            sentenceZh: "房子很大。"
        },
        {
            kr: "크리스마스",
            en: "Christmas",
            zh: "圣诞节",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "크리스마스 트리를 만들어요.",
            sentenceMeaning: "Make a Christmas tree.",
            sentenceZh: "制作一棵圣诞树。"
        },
        {
            kr: "키",
            en: "height",
            zh: "身高",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "키가 큰 사람.",
            sentenceMeaning: "A tall person.",
            sentenceZh: "一个高大的人。"
        },
        {
            kr: "킬로그램",
            en: "kilogram",
            zh: "公斤",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "몸무게 단위 인 킬로그램.",
            sentenceMeaning: "Kilogram, a unit of body weight.",
            sentenceZh: "公斤，体重单位。"
        },
        {
            kr: "킬로미터",
            en: "kilometer",
            zh: "公里",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "거리를 나타내는 킬로미터.",
            sentenceMeaning: "Kilometers representing distance.",
            sentenceZh: "公里代表距离。"
        }
    ],
    beginner_cycle_16: [
        {
            kr: "탕수육",
            en: "sweet and sour pork",
            zh: "糖醋肉",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "중국집에서 탕수육 음식을 시켰어요.",
            sentenceMeaning: "I ordered sweet and sour pork at a Chinese restaurant.",
            sentenceZh: "我在一家中餐馆点了糖醋肉。"
        },
        {
            kr: "토마토",
            en: "tomato",
            zh: "西红柿",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "샐러드를 만들기 위해 싱싱한 토마토를 샀어요.",
            sentenceMeaning: "I bought fresh tomatoes to make a salad.",
            sentenceZh: "为了做沙拉，买了新鲜的西红柿。"
        },
        {
            kr: "튀김",
            en: "fried food",
            zh: "油炸食品",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "바삭한 튀김을 먹어요.",
            sentenceMeaning: "Eat crispy fries.",
            sentenceZh: "吃脆薯条。"
        },
        {
            kr: "포도",
            en: "grape",
            zh: "葡萄",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "달콤한 보라색 포도 과일을 좋아해요.",
            sentenceMeaning: "I love sweet purple grape fruits.",
            sentenceZh: "我喜欢甜甜的紫色葡萄果实。"
        },
        {
            kr: "피자",
            en: "pizza",
            zh: "披萨",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "점심으로 피자를 주문해요.",
            sentenceMeaning: "I order pizza for lunch.",
            sentenceZh: "我午餐点披萨。"
        },
        {
            kr: "한식",
            en: "Korean food/cuisine",
            zh: "韩餐",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "오늘 점심은 한식 음식 이에요.",
            sentenceMeaning: "Today’s lunch is Korean food.",
            sentenceZh: "今天的午餐是韩国菜。"
        },
        {
            kr: "한식집",
            en: "Korean restaurant",
            zh: "韩餐店",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "유명한 한식집 음식점에 가요.",
            sentenceMeaning: "Let's go to a famous Korean restaurant.",
            sentenceZh: "我们去一家有名的韩国餐厅吧。"
        },
        {
            kr: "한잔",
            en: "a cup of, a drink",
            zh: "一杯 / 一口",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "커피 한잔 마시다.",
            sentenceMeaning: "drink a cup of coffee",
            sentenceZh: "喝一杯咖啡"
        },
        {
            kr: "한턱",
            en: "treating (someone to a meal/drink)",
            zh: "请客",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "내가 오늘 기분 좋게 한턱 낼게요.",
            sentenceMeaning: "I'll give you a nice treat today.",
            sentenceZh: "今天我要好好招待你。"
        },
        {
            kr: "햄버거",
            en: "hamburger",
            zh: "汉堡包",
            pos: "Noun",
            category: "food_dining",
            sentenceKr: "점심으로 햄버거를 먹어요.",
            sentenceMeaning: "I eat a hamburger for lunch.",
            sentenceZh: "我午餐吃一个汉堡。"
        },
        {
            kr: "필통",
            en: "pencil case",
            zh: "笔袋 / 笔盒",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "필통에 연필을 넣어요.",
            sentenceMeaning: "Put the pencil in the pencil case.",
            sentenceZh: "将铅笔放入铅笔盒中。"
        },
        {
            kr: "학교",
            en: "school",
            zh: "学校",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "아침 일찍 학교에 다니다.",
            sentenceMeaning: "I go to school early in the morning.",
            sentenceZh: "我一大早去学校。"
        },
        {
            kr: "학년",
            en: "school year, grade",
            zh: "学年 / 年级",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "나는 올해 초등학교 3학년 이에요.",
            sentenceMeaning: "I am in the third grade of elementary school this year.",
            sentenceZh: "我今年上小学三年级。"
        },
        {
            kr: "학생",
            en: "student",
            zh: "学生",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "선생님이 학생을 가르쳐요.",
            sentenceMeaning: "The teacher teaches the student.",
            sentenceZh: "老师教学生。"
        },
        {
            kr: "학생증",
            en: "student ID card",
            zh: "学生证",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "도서관에서 학생증을 보여줘요.",
            sentenceMeaning: "Show your student ID at the library.",
            sentenceZh: "在图书馆出示您的学生证。"
        },
        {
            kr: "학원",
            en: "private academy, hagwon",
            zh: "补习班 / 学院",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "방과 후에 영어 학원에 가요.",
            sentenceMeaning: "I go to an English academy after school.",
            sentenceZh: "放学后我去英语学院。"
        },
        {
            kr: "태극기",
            en: "Taegeukgi (Korean flag)",
            zh: "太极旗",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "국경일에 태극기를 달아요.",
            sentenceMeaning: "We hang the Taegeukgi on national holidays.",
            sentenceZh: "国定假日我们会悬挂太极旗。"
        },
        {
            kr: "테이블",
            en: "table",
            zh: "桌子",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "음식을 테이블에 놓아요.",
            sentenceMeaning: "Put the food on the table.",
            sentenceZh: "把食物放在桌子上。"
        },
        {
            kr: "텔레비전",
            en: "television",
            zh: "电视",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "가족과 텔레비전을 봐요.",
            sentenceMeaning: "I watch television with my family.",
            sentenceZh: "我和家人一起看电视。"
        },
        {
            kr: "통장",
            en: "bankbook",
            zh: "存折",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "은행에서 통장을 만들어요.",
            sentenceMeaning: "Create a bank account at the bank.",
            sentenceZh: "在银行创建一个银行账户。"
        },
        {
            kr: "트럭",
            en: "truck",
            zh: "卡车",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "큰 트럭을 타요.",
            sentenceMeaning: "I ride a big truck.",
            sentenceZh: "我骑大卡车。"
        },
        {
            kr: "티셔츠",
            en: "T-shirt",
            zh: "体恤",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "편한 티셔츠를 이워요.",
            sentenceMeaning: "Wear a comfortable t-shirt.",
            sentenceZh: "穿一件舒适的 T 恤。"
        },
        {
            kr: "편지",
            en: "letter",
            zh: "信",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "친구에게 편지를 써요.",
            sentenceMeaning: "Write a letter to your friend.",
            sentenceZh: "给你的朋友写一封信。"
        },
        {
            kr: "프라이팬",
            en: "frying pan",
            zh: "平底锅",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "프라이팬에 요리를 볶아요.",
            sentenceMeaning: "Fry the food in a frying pan.",
            sentenceZh: "将食物放入煎锅中煎炸。"
        },
        {
            kr: "프로그램",
            en: "program",
            zh: "程序 / 项目 / 节目",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "학교 교육 프로그램에 참여해요.",
            sentenceMeaning: "Participate in school education programs.",
            sentenceZh: "参加学校教育计划。"
        },
        {
            kr: "피",
            en: "blood",
            zh: "血",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "다쳐서 피를 흘려요.",
            sentenceMeaning: "I'm injured and bleeding.",
            sentenceZh: "我受伤了，还在流血。"
        },
        {
            kr: "피아노",
            en: "piano",
            zh: "钢琴",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "어릴 때 피아노를 배워요.",
            sentenceMeaning: "I learned to play the piano when I was young.",
            sentenceZh: "我年轻时就学过弹钢琴。"
        },
        {
            kr: "하숙집",
            en: "boarding house",
            zh: "寄宿房",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "학교 근처 하숙집에 묵어요.",
            sentenceMeaning: "I stay at a boarding house near the school.",
            sentenceZh: "我住在学校附近的寄宿处。"
        },
        {
            kr: "한글",
            en: "Hangeul (Korean alphabet)",
            zh: "韩文",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "공책에 한글을 써요.",
            sentenceMeaning: "I write Korean in my notebook.",
            sentenceZh: "我在笔记本上写韩语。"
        },
        {
            kr: "한복",
            en: "Hanbok (traditional dress)",
            zh: "韩服",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "명절에 예쁜 한복을 이워요.",
            sentenceMeaning: "Wear a pretty hanbok for the holidays.",
            sentenceZh: "假期里穿漂亮的韩服。"
        },
        {
            kr: "한옥",
            en: "Hanok (traditional house)",
            zh: "韩屋",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "전통 한옥에 살아요.",
            sentenceMeaning: "I live in a traditional hanok.",
            sentenceZh: "我住在传统的韩屋里。"
        },
        {
            kr: "태국",
            en: "Thailand",
            zh: "泰国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "태국 나라로 여행을 가요.",
            sentenceMeaning: "Let's travel to Thailand.",
            sentenceZh: "我们去泰国旅行吧。"
        },
        {
            kr: "터미널",
            en: "terminal",
            zh: "航站楼 / 客运站",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "버스 터미널 에서 내려요.",
            sentenceMeaning: "Get off at the bus terminal.",
            sentenceZh: "在巴士总站下车。"
        },
        {
            kr: "테니스장",
            en: "tennis court",
            zh: "网球场",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "테니스장 에서 연습해요.",
            sentenceMeaning: "I practice at the tennis court.",
            sentenceZh: "我在网球场练习。"
        },
        {
            kr: "퇴원",
            en: "leaving hospital",
            zh: "出院",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "다 나아서 퇴원 수속을 밟아요.",
            sentenceMeaning: "I'm all better now and I'm going through the discharge process.",
            sentenceZh: "我现在已经好多了，正在办理出院手续。"
        },
        {
            kr: "편의점",
            en: "convenience store",
            zh: "便利店",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "편의점 에서 간식을 사요.",
            sentenceMeaning: "I buy snacks at the convenience store.",
            sentenceZh: "我在便利店买零食。"
        },
        {
            kr: "표",
            en: "ticket",
            zh: "票",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "기차 표를 끊어요.",
            sentenceMeaning: "Buy a train ticket.",
            sentenceZh: "买一张火车票。"
        },
        {
            kr: "프랑스",
            en: "France",
            zh: "法国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "프랑스 나라에 가보고 싶어요.",
            sentenceMeaning: "I want to go to France.",
            sentenceZh: "我想去法国。"
        },
        {
            kr: "한국",
            en: "Korea",
            zh: "韩国",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "한국 나라 문화가 좋아요.",
            sentenceMeaning: "I like Korean culture.",
            sentenceZh: "我喜欢韩国文化。"
        },
        {
            kr: "항공",
            en: "aviation, flight",
            zh: "航空",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "항공 운항이 취소돼요.",
            sentenceMeaning: "Flights are canceled.",
            sentenceZh: "航班被取消。"
        },
        {
            kr: "항공권",
            en: "airline ticket",
            zh: "机票",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "비행기 항공권을 예약해요.",
            sentenceMeaning: "Book a plane ticket.",
            sentenceZh: "预订机票。"
        },
        {
            kr: "해외여행",
            en: "overseas trip",
            zh: "海外旅行",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "방학 때 해외여행을 가요.",
            sentenceMeaning: "I go on a trip abroad during vacation.",
            sentenceZh: "我假期期间去国外旅行。"
        },
        {
            kr: "퇴근",
            en: "leaving work",
            zh: "下班",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "일찍 퇴근 해서 기뻐요.",
            sentenceMeaning: "I'm glad I left work early.",
            sentenceZh: "我很高兴我提前下班了。"
        },
        {
            kr: "팀",
            en: "team",
            zh: "团队",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 팀이 이겼어요.",
            sentenceMeaning: "Our team won.",
            sentenceZh: "我们队赢了。"
        },
        {
            kr: "할머니",
            en: "grandmother",
            zh: "奶奶 / 外婆",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "할머니 댁에 가요.",
            sentenceMeaning: "I'm going to my grandmother's house.",
            sentenceZh: "我要去我奶奶家。"
        },
        {
            kr: "할아버지",
            en: "grandfather",
            zh: "爷爷 / 外公",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "할아버지와 산책해요.",
            sentenceMeaning: "I'm taking a walk with my grandfather.",
            sentenceZh: "我要和爷爷一起散步。"
        },
        {
            kr: "편안",
            en: "peace, comfort",
            zh: "平安 / 舒服",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "마음의 편안을 바라요.",
            sentenceMeaning: "I hope you find peace of mind.",
            sentenceZh: "我希望你能找到内心的平静。"
        },
        {
            kr: "피곤",
            en: "tiredness, fatigue",
            zh: "疲劳",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "일이 많아서 피곤에 지쳐요.",
            sentenceMeaning: "I'm tired because I have a lot of work to do.",
            sentenceZh: "我很累，因为我有很多工作要做。"
        },
        {
            kr: "필요",
            en: "need, necessity",
            zh: "需要",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "도움이 필요 해요.",
            sentenceMeaning: "I need help.",
            sentenceZh: "我需要帮助。"
        },
        {
            kr: "태풍",
            en: "typhoon",
            zh: "台风",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "강한 태풍이 불어요.",
            sentenceMeaning: "A strong typhoon is blowing.",
            sentenceZh: "一场强台风正在吹袭。"
        },
        {
            kr: "토끼",
            en: "rabbit",
            zh: "兔子",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "귀여운 토끼 동물이 뛰어요.",
            sentenceMeaning: "Cute rabbit animal jumping.",
            sentenceZh: "可爱的兔子动物跳跃。"
        },
        {
            kr: "풍경",
            en: "scenery, landscape",
            zh: "风景",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "창밖의 아름다운 풍경을 봐요.",
            sentenceMeaning: "Look at the beautiful scenery outside the window.",
            sentenceZh: "看看窗外美丽的风景。"
        },
        {
            kr: "피다",
            en: "to bloom",
            zh: "开(花)",
            pos: "Verb",
            category: "nature_animals_plants",
            sentenceKr: "꽃이 피어요.",
            sentenceMeaning: "Flowers are blooming.",
            sentenceZh: "鲜花盛开。"
        },
        {
            kr: "하늘",
            en: "sky",
            zh: "天空",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "파란 하늘이 높아요.",
            sentenceMeaning: "The blue sky is high.",
            sentenceZh: "蓝天很高。"
        },
        {
            kr: "하늘색",
            en: "sky blue color",
            zh: "天蓝色",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "내가 좋아하는 하늘색 옷이에요.",
            sentenceMeaning: "It's my favorite light blue outfit.",
            sentenceZh: "这是我最喜欢的浅蓝色衣服。"
        },
        {
            kr: "한강",
            en: "Han River",
            zh: "汉江",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "한강 지명 유람선을 타요.",
            sentenceMeaning: "Take a cruise on the Han River.",
            sentenceZh: "乘坐游船游览汉江。"
        },
        {
            kr: "해",
            en: "sun / year",
            zh: "太阳 / 年",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "해가 떠요.",
            sentenceMeaning: "The sun rises.",
            sentenceZh: "太阳升起。"
        },
        {
            kr: "해외",
            en: "overseas",
            zh: "海外",
            pos: "Noun",
            category: "nature_animals_plants",
            sentenceKr: "해외에 상품을 수출해요.",
            sentenceMeaning: "We export products overseas.",
            sentenceZh: "我们将产品出口到海外。"
        },
        {
            kr: "팔월",
            en: "August",
            zh: "八月",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "팔월 달 에는 휴가를 가요.",
            sentenceMeaning: "I'm going on vacation in August.",
            sentenceZh: "我八月份要去度假。"
        },
        {
            kr: "평소",
            en: "usually, ordinary times",
            zh: "平时",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "평소와 다름없는 날이에요.",
            sentenceMeaning: "It's a day like any other.",
            sentenceZh: "这一天和其他日子没什么两样。"
        },
        {
            kr: "하루",
            en: "one day",
            zh: "一天",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "즐거운 하루를 보내요.",
            sentenceMeaning: "Have a nice day.",
            sentenceZh: "祝你今天过得愉快。"
        },
        {
            kr: "한번",
            en: "once, one time",
            zh: "一次 / 一下",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "이 요리를 한번 해 보세요.",
            sentenceMeaning: "Try this dish.",
            sentenceZh: "尝尝这道菜。"
        },
        {
            kr: "해마다",
            en: "every year",
            zh: "每年",
            pos: "Adverb",
            category: "time_seasons",
            sentenceKr: "해마다 만나다 약속을 지켜요.",
            sentenceMeaning: "We meet every year and keep our promise.",
            sentenceZh: "我们每年都会见面并信守诺言。"
        },
        {
            kr: "탁구",
            en: "ping-pong, table tennis",
            zh: "乒乓球",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "친구와 탁구를 쳐요.",
            sentenceMeaning: "I play table tennis with my friends.",
            sentenceZh: "我和朋友们打乒乓球。"
        },
        {
            kr: "태권도",
            en: "Taekwondo",
            zh: "跆拳道",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "도장에서 태권도를 배워요.",
            sentenceMeaning: "Learn Taekwondo at the gym.",
            sentenceZh: "在健身房学习跆拳道。"
        },
        {
            kr: "태어나다",
            en: "to be born",
            zh: "出生",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "새로운 아이가 태어나요.",
            sentenceMeaning: "A new child is born.",
            sentenceZh: "一个新孩子出生了。"
        },
        {
            kr: "택배",
            en: "delivery service",
            zh: "快递",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "물건을 택배로 보내요.",
            sentenceMeaning: "Send the item by courier.",
            sentenceZh: "通过快递发送物品。"
        },
        {
            kr: "택시",
            en: "taxi",
            zh: "出租车",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "늦어서 택시를 타요.",
            sentenceMeaning: "It's late so I'm taking a taxi.",
            sentenceZh: "时间很晚了，所以我要坐出租车。"
        },
        {
            kr: "테니스",
            en: "tennis",
            zh: "网球",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "주말에 테니스를 쳐요.",
            sentenceMeaning: "I play tennis on the weekend.",
            sentenceZh: "我周末打网球。"
        },
        {
            kr: "통화",
            en: "phone conversation",
            zh: "通话",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "친구와 전화 통화를 해요.",
            sentenceMeaning: "I'm talking on the phone with a friend.",
            sentenceZh: "我正在和一个朋友通电话。"
        },
        {
            kr: "튀기다",
            en: "to fry",
            zh: "炸",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "감자를 기름에 튀겨요.",
            sentenceMeaning: "Fry the potatoes in oil.",
            sentenceZh: "用油煎土豆。"
        },
        {
            kr: "틀다",
            en: "to turn on, to switch on",
            zh: "开(电器)",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "더워서 에어컨을 틀어요.",
            sentenceMeaning: "It’s hot so I turn on the air conditioner.",
            sentenceZh: "天气很热，所以我打开空调。"
        },
        {
            kr: "틀리다",
            en: "to be wrong, to be incorrect",
            zh: "错 / 不同",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "답이 틀려요.",
            sentenceMeaning: "The answer is wrong.",
            sentenceZh: "答案是错误的。"
        },
        {
            kr: "파티",
            en: "party",
            zh: "派对",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "생일 파티를 열어요.",
            sentenceMeaning: "Throw a birthday party.",
            sentenceZh: "举办生日聚会。"
        },
        {
            kr: "팔다",
            en: "to sell",
            zh: "卖",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "가게에서 책을 팔아요.",
            sentenceMeaning: "Sell ​​books at the store.",
            sentenceZh: "在商店里卖书。"
        },
        {
            kr: "팔리다",
            en: "to be sold",
            zh: "被卖出",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "물건이 잘 팔려요.",
            sentenceMeaning: "The goods are selling well.",
            sentenceZh: "货品卖得很好。"
        },
        {
            kr: "펴다",
            en: "to open, to spread",
            zh: "展开 / 打开",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "공부하려고 책을 펴요.",
            sentenceMeaning: "I open the book to study.",
            sentenceZh: "我打开书学习。"
        },
        {
            kr: "포장",
            en: "wrapping",
            zh: "包装",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "선물 포장을 해요.",
            sentenceMeaning: "I'm wrapping gifts.",
            sentenceZh: "我正在包装礼物。"
        },
        {
            kr: "풀다",
            en: "to untie, to solve, to loosen",
            zh: "解开 / 解决",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "드라이버로 나사를 풀어요.",
            sentenceMeaning: "Unscrew the screw with a screwdriver.",
            sentenceZh: "用螺丝刀拧下螺丝。"
        },
        {
            kr: "피우다",
            en: "to smoke / to light (fire)",
            zh: "抽(烟) / 点(火)",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "담배를 피워요.",
            sentenceMeaning: "I smoke.",
            sentenceZh: "我抽烟。"
        },
        {
            kr: "하다",
            en: "to do",
            zh: "做",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "공부를 해요.",
            sentenceMeaning: "I study.",
            sentenceZh: "我学习。"
        },
        {
            kr: "-하다",
            en: "suffix to form verbs/adjectives",
            zh: "后缀 (构成动词/形容词)",
            pos: "Suffix",
            category: "descriptions_qualities",
            sentenceKr: "항상 건강하다 생활을 하세요.",
            sentenceMeaning: "Always live a healthy life.",
            sentenceZh: "永远过健康的生活。"
        },
        {
            kr: "태도",
            en: "attitude, manner",
            zh: "态度",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "공부하는 태도가 좋아요.",
            sentenceMeaning: "I like your attitude toward studying.",
            sentenceZh: "我喜欢你的学习态度。"
        },
        {
            kr: "토요일",
            en: "Saturday",
            zh: "周六",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "토요일 요일 에는 쉬어요.",
            sentenceMeaning: "I rest on Saturday.",
            sentenceZh: "星期六我休息。"
        },
        {
            kr: "특별하다",
            en: "to be special",
            zh: "特别",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "오늘은 나에게 특별하다 날이에요.",
            sentenceMeaning: "Today is a special day for me.",
            sentenceZh: "今天对我来说是一个特别的日子。"
        },
        {
            kr: "특별히",
            en: "specially",
            zh: "特别地",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "엄마를 특별히 좋아해요.",
            sentenceMeaning: "I especially like my mom.",
            sentenceZh: "我特别喜欢我的妈妈。"
        },
        {
            kr: "특히",
            en: "especially",
            zh: "尤其",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "한국 음식 중 특히 불고기를 좋아해요.",
            sentenceMeaning: "Among Korean foods, I especially like bulgogi.",
            sentenceZh: "在韩国食物中，我特别喜欢烤肉。"
        },
        {
            kr: "튼튼하다",
            en: "to be strong, to be sturdy",
            zh: "结实",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "몸이 튼튼해요.",
            sentenceMeaning: "My body is strong.",
            sentenceZh: "我的身体很强壮。"
        },
        {
            kr: "파란색",
            en: "blue color",
            zh: "蓝色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "내가 좋아하는 파란색 이에요.",
            sentenceMeaning: "It's my favorite blue.",
            sentenceZh: "这是我最喜欢的蓝色。"
        },
        {
            kr: "파랗다",
            en: "to be blue",
            zh: "蓝",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "하늘이 아주 파래요.",
            sentenceMeaning: "The sky is very blue.",
            sentenceZh: "天空很蓝。"
        },
        {
            kr: "팔",
            en: "eight",
            zh: "八",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "팔 숫자를 쓰세요.",
            sentenceMeaning: "Write the number of eight.",
            sentenceZh: "写出八的数目。"
        },
        {
            kr: "팔십",
            en: "eighty",
            zh: "八十",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "팔십 숫자를 배워요.",
            sentenceMeaning: "Learn the numbers eighty.",
            sentenceZh: "学习数字八十。"
        },
        {
            kr: "편리",
            en: "convenience",
            zh: "便利",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "지하철은 아주 편리 해요.",
            sentenceMeaning: "The subway is very convenient.",
            sentenceZh: "地铁很方便。"
        },
        {
            kr: "편찮다",
            en: "to be sick (honorific)",
            zh: "不舒服 (敬语)",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "할아버지께서 몸이 편찮아요.",
            sentenceMeaning: "My grandfather is unwell.",
            sentenceZh: "我的祖父身体不好。"
        },
        {
            kr: "편하다",
            en: "to be comfortable",
            zh: "舒服",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "운동화가 아주 편해요.",
            sentenceMeaning: "The sneakers are very comfortable.",
            sentenceZh: "运动鞋非常舒服。"
        },
        {
            kr: "평일",
            en: "weekday",
            zh: "平时 / 周一至周五",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "평일 에는 회사에 가요.",
            sentenceMeaning: "I go to work on weekdays.",
            sentenceZh: "我工作日去上班。"
        },
        {
            kr: "푸르다",
            en: "blue, green, fresh",
            zh: "绿, 青, 苍翠",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "산의 나무가 아주 푸르러요.",
            sentenceMeaning: "The trees on the mountain are very green.",
            sentenceZh: "山上的树很绿。"
        },
        {
            kr: "푹",
            en: "deeply, well, enough",
            zh: "深, 透, 彻底",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "어제는 집에서 푹 잤어요.",
            sentenceMeaning: "I slept well at home yesterday.",
            sentenceZh: "昨天我在家睡得很好。"
        },
        {
            kr: "하나",
            en: "one",
            zh: "一",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "사과 하나를 먹어요.",
            sentenceMeaning: "Eat one apple.",
            sentenceZh: "吃一个苹果。"
        },
        {
            kr: "하숙비",
            en: "boarding fee",
            zh: "寄宿费",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "매달 하숙비를 내요.",
            sentenceMeaning: "I pay boarding fees every month.",
            sentenceZh: "我每月支付寄宿费。"
        },
        {
            kr: "하얀색",
            en: "white color",
            zh: "白色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "깨끗한 하얀색 종이.",
            sentenceMeaning: "Clean white paper.",
            sentenceZh: "干净的白纸。"
        },
        {
            kr: "하얗다",
            en: "to be white",
            zh: "白",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "함박눈이 내려서 세상이 하얘요.",
            sentenceMeaning: "It's snowing heavily and the world is white.",
            sentenceZh: "雪下得很大，世界一片洁白。"
        },
        {
            kr: "하지만",
            en: "but, however",
            zh: "但是",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "공부는 힘들다 하지만 재미있어요.",
            sentenceMeaning: "Studying is hard, but it's fun.",
            sentenceZh: "学习很辛苦，但也很有趣。"
        },
        {
            kr: "학기",
            en: "semester, academic term",
            zh: "学期",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "새 학기가 시작돼요.",
            sentenceMeaning: "A new semester begins.",
            sentenceZh: "新的学期开始了。"
        },
        {
            kr: "한",
            en: "one, single",
            zh: "一个",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "선생님이 한 학생을 칭찬하고 계십니다.",
            sentenceMeaning: "The teacher is praising a student.",
            sentenceZh: "老师正在表扬一名学生。"
        },
        {
            kr: "한가하다",
            en: "to be free, to be leisurely",
            zh: "闲暇",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "오랜만에 마음이 한가해요.",
            sentenceMeaning: "It's been a while since I felt free.",
            sentenceZh: "我已经有一段时间没有感到自由了。"
        },
        {
            kr: "한두",
            en: "one or two",
            zh: "一两个",
            pos: "Determiner",
            category: "descriptions_qualities",
            sentenceKr: "사과 한두 개만 주세요.",
            sentenceMeaning: "Just give me an apple or two.",
            sentenceZh: "给我一两个苹果就行了。"
        },
        {
            kr: "할인",
            en: "discount",
            zh: "折扣",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "백화점에서 시즌 종료 세일로 큰 할인을 해 줍니다.",
            sentenceMeaning: "The department store gives a big discount for the end-of-season sale.",
            sentenceZh: "百货商店因为季末促销给予很大的折扣。"
        },
        {
            kr: "함께",
            en: "together",
            zh: "一起",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "친구와 함께 놀아요.",
            sentenceMeaning: "Play with friends.",
            sentenceZh: "和朋友一起玩。"
        },
        {
            kr: "항상",
            en: "always",
            zh: "总是 / 经常",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "항상 같다 마음으로 노력해요.",
            sentenceMeaning: "I always try my best with the same mindset.",
            sentenceZh: "我总是以同样的心态尽力而为。"
        },
        {
            kr: "햇빛",
            en: "sunlight",
            zh: "阳光",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "햇빛이 비쳐요.",
            sentenceMeaning: "The sun is shining.",
            sentenceZh: "阳光明媚。"
        }
    ],
    beginner_cycle_17: [
        {
            kr: "홍차",
            en: "black tea",
            zh: "红茶",
            pos: "명사",
            category: "food_dining",
            sentenceKr: "홍차를 마시다",
            sentenceMeaning: "I drink black tea.",
            sentenceZh: "我喝红茶。"
        },
        {
            kr: "힘들다",
            en: "to be difficult, to be hard",
            zh: "辛苦 / 困难",
            pos: "Adjective",
            category: "food_dining",
            sentenceKr: "일이 힘들어요.",
            sentenceMeaning: "Work is hard.",
            sentenceZh: "工作很辛苦。"
        },
        {
            kr: "후배",
            en: "junior (at school/work)",
            zh: "后辈",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "친한 학교 후배.",
            sentenceMeaning: "A close friend from school.",
            sentenceZh: "学校里的好朋友。"
        },
        {
            kr: "휴지",
            en: "tissue, paper",
            zh: "纸巾 / 废纸",
            pos: "Noun",
            category: "school_education",
            sentenceKr: "휴지를 주워요.",
            sentenceMeaning: "Pick up the tissues.",
            sentenceZh: "拿起纸巾。"
        },
        {
            kr: "현금",
            en: "cash",
            zh: "现金",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "현금으로 내요.",
            sentenceMeaning: "Pay in cash.",
            sentenceZh: "以现金支付。"
        },
        {
            kr: "호",
            en: "number (room/unit)",
            zh: "号",
            pos: "Bound Noun",
            category: "home_living",
            sentenceKr: "제가 사는 아파트는 102동 501호입니다.",
            sentenceMeaning: "The apartment I live in is building 102, room 501.",
            sentenceZh: "我住的公寓是102栋501号。"
        },
        {
            kr: "화가",
            en: "painter, artist",
            zh: "画家",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "유명한 화가의 그림.",
            sentenceMeaning: "A painting by a famous artist.",
            sentenceZh: "一位著名艺术家的画作。"
        },
        {
            kr: "화장실",
            en: "restroom, bathroom",
            zh: "洗手间 / 厕所",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "화장실에 가요.",
            sentenceMeaning: "Let's go to the bathroom.",
            sentenceZh: "我们去洗手间吧。"
        },
        {
            kr: "화장품",
            en: "cosmetics",
            zh: "化妆品",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "화장품을 발라요.",
            sentenceMeaning: "Apply cosmetics.",
            sentenceZh: "涂抹化妆品。"
        },
        {
            kr: "휴대폰",
            en: "mobile phone",
            zh: "手机",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "휴대폰으로 전화해요.",
            sentenceMeaning: "Call me on my cell phone.",
            sentenceZh: "用我的手机给我打电话。"
        },
        {
            kr: "휴지통",
            en: "trash can",
            zh: "垃圾桶",
            pos: "Noun",
            category: "home_living",
            sentenceKr: "휴지통에 버려요.",
            sentenceMeaning: "Throw it in the trash can.",
            sentenceZh: "将其扔进垃圾桶。"
        },
        {
            kr: "헬스클럽",
            en: "fitness club, gym",
            zh: "健身房",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "헬스클럽 에서 운동해요.",
            sentenceMeaning: "I work out at the health club.",
            sentenceZh: "我在健身俱乐部锻炼身体。"
        },
        {
            kr: "호텔",
            en: "hotel",
            zh: "酒店",
            pos: "명사",
            category: "city_travel_places",
            sentenceKr: "호텔에 묵어요.",
            sentenceMeaning: "I stay at a hotel.",
            sentenceZh: "我住在一家酒店。"
        },
        {
            kr: "회사",
            en: "company",
            zh: "公司",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "회사에 다니다.",
            sentenceMeaning: "I go to work.",
            sentenceZh: "我去上班。"
        },
        {
            kr: "회사원",
            en: "office worker",
            zh: "公司职员",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "직업은 회사원 이에요.",
            sentenceMeaning: "My occupation is an office worker.",
            sentenceZh: "我的职业是办公室职员。"
        },
        {
            kr: "휴게실",
            en: "lounge, rest area",
            zh: "休息室",
            pos: "Noun",
            category: "city_travel_places",
            sentenceKr: "휴게실 에서 쉬어요.",
            sentenceMeaning: "Rest in the lounge.",
            sentenceZh: "在休息室休息。"
        },
        {
            kr: "형",
            en: "older brother (for male)",
            zh: "哥哥",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 형은 대학에서 컴퓨터 공학을 전공합니다.",
            sentenceMeaning: "My older brother majors in computer engineering at university.",
            sentenceZh: "我哥哥在大学主修计算机工程。"
        },
        {
            kr: "형제",
            en: "brothers, siblings",
            zh: "兄弟",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "우리 부모님은 일남일녀 형제를 두셨습니다.",
            sentenceMeaning: "Our parents have a brother and a sister.",
            sentenceZh: "我们的父母育有一子一女两个孩子。"
        },
        {
            kr: "회원",
            en: "member",
            zh: "会员",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "회원을 모집해요.",
            sentenceMeaning: "We are recruiting members.",
            sentenceZh: "我们正在招募会员。"
        },
        {
            kr: "횡단보도",
            en: "crosswalk",
            zh: "人行横道",
            pos: "Noun",
            category: "people_jobs_family",
            sentenceKr: "횡단보도를 건너요.",
            sentenceMeaning: "Cross the crosswalk.",
            sentenceZh: "穿过人行横道。"
        },
        {
            kr: "행복",
            en: "happiness",
            zh: "幸福",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "행복을 느껴요.",
            sentenceMeaning: "I feel happy.",
            sentenceZh: "我感到很高兴。"
        },
        {
            kr: "화",
            en: "anger",
            zh: "火 / 愤怒",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "화가 나서 소리를 질러요.",
            sentenceMeaning: "I get angry and scream.",
            sentenceZh: "我生气并尖叫。"
        },
        {
            kr: "화나다",
            en: "to get angry",
            zh: "生气",
            pos: "동사",
            category: "feelings_emotions",
            sentenceKr: "동생이 약속을 어겨서 너무 화가 났어요.",
            sentenceMeaning: "I was so angry because my younger sibling broke the promise.",
            sentenceZh: "妹妹违背了约定，我真的很生气。"
        },
        {
            kr: "희망",
            en: "hope, wish",
            zh: "希望",
            pos: "Noun",
            category: "feelings_emotions",
            sentenceKr: "희망 사항을 말해요.",
            sentenceMeaning: "Tell me your wishes.",
            sentenceZh: "告诉我你的愿望。"
        },
        {
            kr: "호랑이",
            en: "tiger",
            zh: "老虎",
            pos: "명사",
            category: "nature_animals_plants",
            sentenceKr: "동물원에 있는 호랑이가 정말 무서워요.",
            sentenceMeaning: "The tiger at the zoo is really scary.",
            sentenceZh: "动物园里的老虎真可怕。"
        },
        {
            kr: "현재",
            en: "present, now",
            zh: "现在",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "현재 상황에서는 이 방법이 최선입니다.",
            sentenceMeaning: "In the current situation, this method is the best.",
            sentenceZh: "在目前情况下，这个方法是最好的。"
        },
        {
            kr: "화요일",
            en: "Tuesday",
            zh: "星期二",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "화요일에 만나요.",
            sentenceMeaning: "See you on Tuesday.",
            sentenceZh: "周二见。"
        },
        {
            kr: "회",
            en: "time, round",
            zh: "回 / 次",
            pos: "Bound Noun",
            category: "time_seasons",
            sentenceKr: "이 드라마는 총 16회로 구성되어 있습니다.",
            sentenceMeaning: "This drama consists of a total of 16 episodes.",
            sentenceZh: "这部电视剧总共由16集组成。"
        },
        {
            kr: "휴일",
            en: "holiday, day off",
            zh: "休息日 / 假日",
            pos: "Noun",
            category: "time_seasons",
            sentenceKr: "휴일에 쉬어요.",
            sentenceMeaning: "I rest on holidays.",
            sentenceZh: "假期我休息。"
        },
        {
            kr: "행동",
            en: "action, behavior",
            zh: "行动 / 行为",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "말보다 행동에 옮겨요.",
            sentenceMeaning: "Take action rather than words.",
            sentenceZh: "采取行动而不是言语。"
        },
        {
            kr: "행사",
            en: "event",
            zh: "活动",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "중요한 행사.",
            sentenceMeaning: "important event.",
            sentenceZh: "重要事件。"
        },
        {
            kr: "헤어지다",
            en: "to part, to break up",
            zh: "分手 / 离别",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "친구와 아쉽게 헤어져요.",
            sentenceMeaning: "I regretfully parted ways with my friend.",
            sentenceZh: "我很遗憾地和我的朋友分道扬镳。"
        },
        {
            kr: "화내다",
            en: "to express anger",
            zh: "发火",
            pos: "동사",
            category: "actions_routines",
            sentenceKr: "그는 사소한 일에 자꾸 화를 냅니다.",
            sentenceMeaning: "He keeps getting angry over trivial matters.",
            sentenceZh: "他总是为了一点小事发火。"
        },
        {
            kr: "환전",
            en: "returning change",
            zh: "退换 / 找零",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "해외여행을 가기 전에 은행에서 환전을 했습니다.",
            sentenceMeaning: "I exchanged money at the bank before going on a trip abroad.",
            sentenceZh: "出国旅游前在银行兑换了外币。"
        },
        {
            kr: "회의",
            en: "meeting, conference",
            zh: "会议",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "회의가 열려요.",
            sentenceMeaning: "A meeting is held.",
            sentenceZh: "召开会议。"
        },
        {
            kr: "휴가",
            en: "vacation, leave",
            zh: "休假",
            pos: "Noun",
            category: "actions_routines",
            sentenceKr: "휴가를 가요.",
            sentenceMeaning: "Let's go on vacation.",
            sentenceZh: "我们去度假吧。"
        },
        {
            kr: "흐르다",
            en: "to flow",
            zh: "流",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "물이 흘러요.",
            sentenceMeaning: "Water flows.",
            sentenceZh: "水流动。"
        },
        {
            kr: "흔들다",
            en: "to shake, to wave",
            zh: "摇晃 / 挥动",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "손을 흔들어요.",
            sentenceMeaning: "Wave your hand.",
            sentenceZh: "挥挥手。"
        },
        {
            kr: "흘리다",
            en: "to shed, to spill",
            zh: "流(泪) / 洒",
            pos: "Verb",
            category: "actions_routines",
            sentenceKr: "눈물을 흘려요.",
            sentenceMeaning: "I shed tears.",
            sentenceZh: "我流下了眼泪。"
        },
        {
            kr: "허리",
            en: "waist, back",
            zh: "腰",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "허리가 아퍼요.",
            sentenceMeaning: "My back hurts.",
            sentenceZh: "我背疼。"
        },
        {
            kr: "혀",
            en: "tongue",
            zh: "舌头",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "혀를 대요.",
            sentenceMeaning: "Stick your tongue.",
            sentenceZh: "伸出你的舌头。"
        },
        {
            kr: "호수",
            en: "number / count",
            zh: "个数 / 户数",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "호수를 세요.",
            sentenceMeaning: "Look at the lake.",
            sentenceZh: "看看湖。"
        },
        {
            kr: "혹시",
            en: "perhaps, maybe",
            zh: "或许",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "혹시 그 사람이 어디에 사는지 아습니까?",
            sentenceMeaning: "Do you by any chance know where that person lives?",
            sentenceZh: "您或许知道那个人住在哪儿吗？"
        },
        {
            kr: "혼자",
            en: "alone",
            zh: "独自",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "혼자 있어요.",
            sentenceMeaning: "I'm alone.",
            sentenceZh: "我还是孤单一人。"
        },
        {
            kr: "화려하다",
            en: "to be fancy, colorful",
            zh: "华丽",
            pos: "형용사",
            category: "descriptions_qualities",
            sentenceKr: "그 무대의 의상이 아주 화려하고 멋졌습니다.",
            sentenceMeaning: "The costumes on that stage were very glamorous and cool.",
            sentenceZh: "那个舞台的服装非常华丽帅气。"
        },
        {
            kr: "활발히",
            en: "actively",
            zh: "活跃地",
            pos: "부사",
            category: "descriptions_qualities",
            sentenceKr: "우리 동아리 회원들은 활발히 활동하고 있어요.",
            sentenceMeaning: "Our club members are active.",
            sentenceZh: "我们社团的会员们活动很活跃。"
        },
        {
            kr: "회색",
            en: "gray color",
            zh: "灰色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "회색 색깔 옷을 이워요.",
            sentenceMeaning: "Wear gray colored clothes.",
            sentenceZh: "穿灰色衣服。"
        },
        {
            kr: "후",
            en: "after, later",
            zh: "后 / 以后",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "오 분 후에 시작해요.",
            sentenceMeaning: "It starts in five minutes.",
            sentenceZh: "五分钟后开始。"
        },
        {
            kr: "훌륭하다",
            en: "to be excellent, to be superb",
            zh: "出色 / 伟大",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "작품이 아주 훌륭해요.",
            sentenceMeaning: "The work is very good.",
            sentenceZh: "做工非常好。"
        },
        {
            kr: "훨씬",
            en: "much more, far more",
            zh: "更 / 更加",
            pos: "Adverb",
            category: "descriptions_qualities",
            sentenceKr: "어제보다 훨씬 매워요.",
            sentenceMeaning: "It's much spicier than yesterday.",
            sentenceZh: "比昨天辣多了。"
        },
        {
            kr: "흐리다",
            en: "to be cloudy, to be dim",
            zh: "阴 / 模糊",
            pos: "Adjective",
            category: "descriptions_qualities",
            sentenceKr: "날씨가 흐려요.",
            sentenceMeaning: "The weather is cloudy.",
            sentenceZh: "天气多云。"
        },
        {
            kr: "흰색",
            en: "white color",
            zh: "白色",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "저는 깨끗한 흰색 옷을 좋아해요.",
            sentenceMeaning: "I like clean white clothes.",
            sentenceZh: "我喜欢干净的白色衣服。"
        },
        {
            kr: "힘",
            en: "strength, power",
            zh: "力量 / 力气",
            pos: "Noun",
            category: "descriptions_qualities",
            sentenceKr: "힘이 세요.",
            sentenceMeaning: "You are strong.",
            sentenceZh: "你很坚强。"
        },
        {
            kr: "환영",
            en: "welcome",
            zh: "欢迎",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "환영을 받아요.",
            sentenceMeaning: "You are welcome.",
            sentenceZh: "不客气。"
        },
        {
            kr: "환자",
            en: "patient",
            zh: "患者",
            pos: "명사",
            category: "miscellaneous",
            sentenceKr: "환자을 돌봐요.",
            sentenceMeaning: "Take care of the patient.",
            sentenceZh: "照顾病人。"
        }
    ]
};

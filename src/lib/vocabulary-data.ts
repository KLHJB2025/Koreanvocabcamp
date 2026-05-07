export interface Word {
    kr: string;
    en: string;
    zh: string;
    pos: string;
    sentenceKr: string;
    sentenceMeaning: string;
    animationData?: any;
    animationUrl?: string;
}

export const MOCK_VOCABULARY: Record<string, Word[]> = {
    "beginner_cycle_1": [
        {
            kr: "사람",
            en: "Person",
            zh: "人",
            pos: "Noun",
            sentenceKr: "세상에는 좋은 사람이 많아요.",
            sentenceMeaning: "There are many good people in the world."
        },
        {
            kr: "물",
            en: "Water",
            zh: "水",
            pos: "Noun",
            sentenceKr: "시원한 물 한 잔만 주세요.",
            sentenceMeaning: "Please give me a glass of cold water."
        },
        {
            kr: "산",
            en: "Mountain",
            zh: "山",
            pos: "Noun",
            sentenceKr: "주말에 친구들과 산에 갔어요.",
            sentenceMeaning: "I went to the mountain with friends on the weekend."
        },
        {
            kr: "책",
            en: "Book",
            zh: "书",
            pos: "Noun",
            sentenceKr: "요즘 이 책이 아주 인기가 많아요.",
            sentenceMeaning: "This book is very popular these days."
        },
        {
            kr: "학교",
            en: "School",
            zh: "学校",
            pos: "Noun",
            sentenceKr: "학교 앞에서 기다릴게요.",
            sentenceMeaning: "I will wait in front of the school."
        },
        {
            kr: "친구",
            en: "Friend",
            zh: "朋友",
            pos: "Noun",
            sentenceKr: "가장 친한 친구를 만났어요.",
            sentenceMeaning: "I met my best friend."
        },
        {
            kr: "음식",
            en: "Food",
            zh: "食物",
            pos: "Noun",
            sentenceKr: "한국 음식은 조금 매워요.",
            sentenceMeaning: "Korean food is a bit spicy."
        },
        {
            kr: "집",
            en: "House",
            zh: "房子",
            pos: "Noun",
            sentenceKr: "집에 가서 푹 쉬고 싶어요.",
            sentenceMeaning: "I want to go home and take a good rest."
        }
    ]
};

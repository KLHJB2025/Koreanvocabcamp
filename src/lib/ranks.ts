export const RANKS = [
    { id: '1', en: 'Hangeul Survivor', kr: '한글 생존자', zh: '韩语幸存者', xp: 0 },
    { id: '2', en: 'Beginner Conqueror', kr: '초급 정복자', zh: '初级征服者', xp: 500 },
    { id: '3', en: 'TOPIK Challenger', kr: 'TOPIK Challenger', zh: 'TOPIK 挑战者', xp: 1200 },
    { id: '4', en: 'Grammar Hunter', kr: '문법 헌터', zh: '语法猎人', xp: 2200 },
    { id: '5', en: 'Vocab Master', kr: '어휘 마스터', zh: '词汇大师', xp: 3500 },
    { id: '6', en: 'TOPIK Warrior', kr: 'TOPIK Warrior', zh: 'TOPIK 战士', xp: 5000 },
    { id: '7', en: 'Korean Conqueror', kr: '한국어 정복자', zh: '韩语征服者', xp: 7000 },
    { id: '8', en: 'TOPIK LEGEND', kr: 'TOPIK LEGEND', zh: 'TOPIK 传奇', xp: 10000 },
];

export function getRankInfo(xp: number, language: 'en' | 'zh') {
    let current = RANKS[0];
    let next = RANKS[1];

    for (let i = 0; i < RANKS.length; i++) {
        if (xp >= RANKS[i].xp) {
            current = RANKS[i];
            next = RANKS[i + 1] || RANKS[i];
        }
    }

    return {
        current: language === 'en' ? current.en : current.zh,
        currentKr: current.kr,
        next: language === 'en' ? next.en : next.zh,
        nextThreshold: next.xp,
        progress: next.xp === current.xp ? 100 : ((xp - current.xp) / (next.xp - current.xp)) * 100,
        isMax: current.id === '8'
    };
}

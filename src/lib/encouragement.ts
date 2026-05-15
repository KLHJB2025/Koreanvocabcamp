const ENCOURAGEMENTS = {
    ko: [
        "오늘도 화이팅!",
        "할 수 있어요!",
        "정말 잘하고 있어요!",
        "힘내세요, 목표가 가까워요!",
        "최고예요!",
        "계속 전진하세요!",
        "당신은 천재예요!",
        "꿈을 향해 한 걸음 더!",
        "오늘도 빛나는 하루 되세요!",
        "포기하지 마세요!",
        "아주 훌륭해요!",
        "멋진 노력이네요!",
        "자신을 믿으세요!",
        "오늘 정말 열심히 하시네요!",
        "당신의 실력이 늘고 있어요!",
        "한국어 마스터가 되어봐요!",
        "작은 노력이 큰 결실을 맺을 거예요!",
        "오늘도 함께 공부해서 기뻐요!",
        "당신의 열정을 응원합니다!"
    ],
    zh: [
        "今天也要加油哦！",
        "你可以做到的！",
        "做得非常好！",
        "加油，目标就在眼前！",
        "你是最棒的！",
        "继续前进吧！",
        "你真是个天才！",
        "离梦想又近了一步！",
        "祝你今天有个灿烂的一天！",
        "不要放弃！",
        "太出色了！",
        "了不起的努力！",
        "相信你自己！",
        "你今天真的很努力！",
        "你的实力正在提升！",
        "向着韩语大师迈进吧！",
        "点滴努力终将汇聚成硕果！",
        "很高兴今天也能一起学习！",
        "为你展现的热情喝彩！"
    ],
    en: [
        "Fighting today as well!",
        "You can do it!",
        "You're doing great!",
        "Keep it up, the goal is near!",
        "You're the best!",
        "Keep moving forward!",
        "You're a genius!",
        "One step closer to your dream!",
        "Have a brilliant day today!",
        "Don't give up!",
        "Absolutely wonderful!",
        "Great effort!",
        "Believe in yourself!",
        "You're working really hard today!",
        "Your skills are improving!",
        "Let's become a Korean master!",
        "Small efforts lead to big results!",
        "Happy to study with you today!",
        "Cheering for your passion!"
    ]
};

export function getDailyEncouragement(name: string, day: number, lang: string = 'en') {
    const list = ENCOURAGEMENTS[lang as keyof typeof ENCOURAGEMENTS] || ENCOURAGEMENTS.en;
    const phrase = list[day % list.length];
    return `${name}, ${phrase}`;
}

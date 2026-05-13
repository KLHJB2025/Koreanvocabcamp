export const ENCOURAGEMENTS = [
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
];

export function getDailyEncouragement(name: string, day: number) {
    const phrase = ENCOURAGEMENTS[day % ENCOURAGEMENTS.length];
    return `${name}, ${phrase}`;
}

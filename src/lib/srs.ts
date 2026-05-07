/**
 * SRS Logic based on a modified SM-2 algorithm
 */

export interface SRSState {
    repetitions: number;
    interval: number;
    easeFactor: number;
}

export type Grade = 1 | 2 | 3 | 4 | 5;

/**
 * Calculates the next review date and updated SRS state
 * @param grade Score from 1-5 (1: Forgot, 5: Perfect)
 * @param state Current SRS state
 */
export function calculateSRS(grade: Grade, state: SRSState) {
    let { repetitions, interval, easeFactor } = state;

    if (grade >= 3) {
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 4; // Accelerated for the bootcamp (usually 6)
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions++;
    } else {
        repetitions = 0;
        interval = 1;
    }

    // Update ease factor: EF' = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
    easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + interval);

    return {
        repetitions,
        interval,
        easeFactor,
        nextReviewAt
    };
}

/**
 * Formats a date for the UI
 */
export function formatNextReview(date: Date, language: 'en' | 'zh'): string {
    const now = new Date();
    const diffInDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) return language === 'en' ? 'Ready now' : '现已就绪';
    if (diffInDays === 1) return language === 'en' ? 'Tomorrow' : '明天';

    return language === 'en' ? `In ${diffInDays} days` : `${diffInDays} 天后`;
}

const fs = require('fs');
const path = require('path');

const suspicious = require('./suspicious_sentences.json');

function conjugateToPolite(verb) {
    // manual overrides for irregulars or special cases
    const overrides = {
        '걷다': '걸어요',
        '듣다': '들어요',
        '묻다': '물어요',
        '돕다': '도와요',
        '곱다': '고와요',
        '낫다': '나아요',
        '잇다': '이어요',
        '짓다': '지어요',
        '세다': '세요',
        '켜다': '켜요',
        '끄다': '꺼요',
        '쓰다': '써요',
        '크다': '커요',
        '뜨다': '떠요',
        '담그다': '담가요',
        '치르다': '치러요',
        '되되다': '되어요', // duplicate or typo
        '되다': '돼요',
        '뵈다': '봬요',
        '쇠다': '쇄요',
        '하얗다': '하얘요',
        '까맣다': '까매요',
        '빨갛다': '빨개요',
        '노랗다': '노래요',
        '파랗다': '파래요',
        '이렇다': '이래요',
        '그렇다': '그래요',
        '저렇다': '저래요',
        '어떻다': '어때요',
        '부르다': '불러요',
        '고르다': '골라요',
        '자르다': '잘라요',
        '자라다': '자라요',
        '바르다': '발라요',
        '빠르다': '빨라요',
        '서투르다': '서툴러요',
        '어우르다': '어울러요',
        '이르다': '일러요',
        '기르다': '길러요',
        '들르다': '들러요',
        '흐르다': '흘러요',
        '마르다': '말라요',
        '누르다': '눌러요',
        '모르다': '몰라요',
        '서두르다': '서둘러요',
        '푸르다': '푸르러요',
        '아름답다': '아름다워요',
        '알맞다': '알맞아요',
        '걸리다': '걸려요',
        '그리다': '그려요',
        '구부리다': '구부려요',
        '미끄러지다': '미끄러져요',
        '어지럽다': '어지러워요',
        '즐겁다': '즐거워요',
        '가깝다': '가까워요',
        '귀엽다': '귀여워요',
        '더럽다': '더러워요',
        '뜨겁다': '뜨거워요',
        '무겁다': '무거워요',
        '어둡다': '어두워요',
        '어렵다': '어려워요',
        '쉽다': '쉬워요',
        '맵다': '매워요',
        '싱겁다': '싱거워요',
        '차가우다': '차가워요',
        '차가웁다': '차가워요',
        '차갑다': '차가워요',
        '가볍다': '가벼워요',
        '새롭다': '새로워요',
        '외롭다': '외로워요',
        '부드럽다': '부드러워요',
        '부럽다': '부러워요',
        '시끄럽다': '시끄러워요',
        '아쉽다': '아쉬워요',
        '지루하다': '지루해요',
        '쉰다': '쉬어요',
        '간다': '가요',
        '한다': '해요',
        '치다': '쳐요',
        '비치다': '비쳐요',
        '피다': '피어요',
        '나누다': '나눠요',
        '바꾸다': '바꿔요',
        '키우다': '키워요',
        '지우다': '지워요',
        '세우다': '세워요',
        '배우다': '배워요',
        '싸우다': '싸워요',
        '주다': '줘요',
        '비우다': '비워요',
        '짜다': '짜요',
        '켜다': '켜요',
        '펴다': '펴요',
        '내다': '내요',
        '보내다': '보내요',
        '끝내다': '끝내요',
        '지내다': '지내요',
        '인사하다': '인사해요',
        '대답하다': '대답해요',
        '시작하다': '시작해요'
    };

    if (overrides[verb]) return overrides[verb];

    if (!verb.endsWith('다')) return verb; // not a standard dictionary verb

    const stem = verb.slice(0, -1);
    if (stem.length === 0) return verb;

    const lastChar = stem.slice(-1);
    const lastCode = lastChar.charCodeAt(0) - 0xAC00;
    
    // Check if it has a batchim (consonant ending)
    const hasBatchim = lastCode % 28 !== 0;

    // Verb ending in -하다
    if (stem.endsWith('하')) {
        return stem.slice(0, -1) + '해요';
    }

    // Check if stem ends in ㅂ batchim (and is not one of the overrides or regular exceptions)
    if (hasBatchim && (lastCode % 28 === 17)) { // 17 is ㅂ batchim
        const stemWithoutBatchim = String.fromCharCode(lastChar.charCodeAt(0) - 17);
        // e.g. 춥다 -> 추 + 워요 -> 추워요
        return stem.slice(0, -1) + stemWithoutBatchim + '워요';
    }

    const vowelIndex = Math.floor((lastCode % 588) / 28);
    const isBrightVowel = [0, 8, 2, 12, 9].includes(vowelIndex);

    if (hasBatchim) {
        return stem + (isBrightVowel ? '아요' : '어요');
    } else {
        if (vowelIndex === 0) { // ㅏ -> merges to -아요 (e.g. 가다 -> 가요)
            return stem + '요';
        }
        if (vowelIndex === 4) { // ㅓ -> merges to -어요 (e.g. 서다 -> 서요)
            return stem + '요';
        }
        if (vowelIndex === 8) { // ㅗ -> + 아요 -> 와요 (e.g. 오다 -> 나와요/와요)
            const newLastChar = String.fromCharCode(lastChar.charCodeAt(0) + (9 - 8) * 28);
            return stem.slice(0, -1) + newLastChar + '요';
        }
        if (vowelIndex === 13) { // ㅜ -> + 어요 -> 워요
            const newLastChar = String.fromCharCode(lastChar.charCodeAt(0) + (14 - 13) * 28);
            return stem.slice(0, -1) + newLastChar + '요';
        }
        if (vowelIndex === 20) { // ㅣ -> + 어요 -> ㅕ요
            const newLastChar = String.fromCharCode(lastChar.charCodeAt(0) + (6 - 20) * 28);
            return stem.slice(0, -1) + newLastChar + '요';
        }
        if (vowelIndex === 18) { // ㅡ -> drops
            const newLastChar = String.fromCharCode(lastChar.charCodeAt(0) + (4 - 18) * 28);
            return stem.slice(0, -1) + newLastChar + '요';
        }
        if (vowelIndex === 16) { // ㅟ -> + 어요
            return stem + '어요';
        }
        if (vowelIndex === 1) { // ㅐ -> + 어요 -> ㅐ요
            return stem + '요';
        }
        if (vowelIndex === 5) { // ㅔ -> + 어요 -> ㅔ요
            return stem + '요';
        }
        return stem + '요';
    }
}

// Dry run and print translations
suspicious.slice(0, 30).forEach(x => {
    const cleanSent = x.sentenceKr.trim().replace(/[.!?]$/, '');
    const tokens = cleanSent.split(/\s+/);
    const lastWord = tokens[tokens.length - 1];
    
    const conjugatedLastWord = conjugateToPolite(lastWord);
    tokens[tokens.length - 1] = conjugatedLastWord;
    const newSentence = tokens.join(' ') + '.';
    
    console.log(`Original: "${x.sentenceKr}" -> Conjugated: "${newSentence}"`);
});

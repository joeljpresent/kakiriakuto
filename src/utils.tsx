export function getShuffledArray<T>(array: T[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function getTriplyShuffledArray<T>(array: T[]) {
    return [
        ...getShuffledArray(array),
        ...getShuffledArray(array),
        ...getShuffledArray(array),
    ];
}

export type VocabFile = {
    words: VocabLine[];
};

export type VocabLine = {
    jap: string;
    romaji: string;
    fr: string;
};

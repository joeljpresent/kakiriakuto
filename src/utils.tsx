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

/** Data about a given vocabulary course */
export type VocabFile = {
    /** Title of the vocabulary course */
    title: string,
    /** The YouTube ID of the video for the vocabulary course (e.g., `dQw4w9WgXcQ`) */
    video_id: string,
    /** The words taught in the vocabulary course */
    words: VocabLine[];
};

/** A vocabulary word with its translation and other information */
export type VocabLine = {
    /** The Japanese word */
    jap: string;
    /** The romanized transcription of the Japanese word */
    romaji: string;
    /** The French translation of the word */
    fr: string;
};

function sanitizeRomaji(txt: string) {
    return txt.replace(/[\s-]/g, "");
}

export function romaji(input: string, expected: string) {
    return sanitizeRomaji(input) === sanitizeRomaji(expected);
}

const SANITIZING_FR = new Map([
    ["à", "a"], ["â", "a"], ["ä", "a"], ["æ", "ae"],
    ["é", "e"], ["è", "e"], ["ê", "e"], ["ë", "e"],
    ["î", "i"], ["ï", "i"],
    ["ô", "o"], ["ö", "o"], ["œ", "oe"],
    ["ù", "u"], ["û", "u"], ["ü", "u"],
    ["ÿ", "y"],
    ["ç", "c"], ["ñ", "n"], ["ß", "ss"],
    ["-", " "], ["'", " "]
]);

function sanitizeFr(txt: string) {
    return txt
            .trim()
            .toLowerCase()
            .replace(/\s*\(.*\)/, "")
            .replace(/^(le |la |l'|les )/, "")
            .replace(/./g, (char: string) =>
                SANITIZING_FR.get(char) ?? char
            )
}

export function fr(input: string, expected: string) {
    return sanitizeFr(input) === sanitizeFr(expected);
}

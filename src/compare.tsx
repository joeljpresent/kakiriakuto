function sanitizeJap(txt: string) {
    return txt.replace(/[\s〜]/g, "");
}

export function jap(input: string, expected: string) {
    return sanitizeJap(input) === sanitizeJap(expected);
}

function sanitizeRomaji(txt: string) {
    return txt.replace(/[\s*-]/g, "");
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
    ["-", " "], ["'", " "], ['"', ""]
]);

function sanitizeFrField(txt: string) {
    return txt
        .replace(/\s*\([^()]*\)/g, "")
        .toLowerCase()

        .split(",")
        .map(
            val => val
                .trim()
                .replace(/^(le |la |l'|les )/, "")
                .replace(/./g, (char) =>
                    SANITIZING_FR.get(char) ?? char
                )
        );
}

function sanitizeFrInput(txt: string) {
    return txt
        .replace(/\s*\([^()]*\)/g, "")
        .toLowerCase()
        .trim()
        .replace(/^(le |la |l'|les )/, "")
        .replace(/./g, (char) =>
            SANITIZING_FR.get(char) ?? char
        )
        ;
}

export function fr(input: string, expected: string) {
    return sanitizeFrField(expected).includes(sanitizeFrInput(input));
}

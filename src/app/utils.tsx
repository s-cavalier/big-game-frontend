export function isalnum(word: string) {
    return /^[a-z0-9]+$/i.test(word);
}

export function cleanWord(word: string) {
    let out = ''
    for (let i = 0; i < word.length; i++) {
        if (!isalnum(word[i])) continue;
        out += word[i];
    }
}
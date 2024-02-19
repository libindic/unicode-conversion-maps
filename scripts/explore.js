const fs = require('fs');
const { readMap } = require('./read-map');
const a = process.argv[2];
const b = process.argv[3];
if (!a) {
    console.error("Please specify at least one file to explore");
    process.exit(1);
}

const left = readMap(a);
const right = b ? readMap(b) : {};

const ASCII_START = 33;
const ASCII_END = 256;

const data = [];

const unicodeWrap = (chars) => {
    try {
        return chars + " (" + chars.split('').map(c => {
            return c.codePointAt(0).toString(16).padStart(4, "0").toUpperCase()
        }).join(' + ') + " )"
    } catch {
        console.log(typeof chars)
        console.log(`failed at ${chars.charCodeAt(0)}`)
    }
}

for (let i = ASCII_START; i < ASCII_END; i++) {
    const char = String.fromCharCode(i);
    const leftChar = left[char];
    const rightChar = right[char];
    const same = leftChar === rightChar;
    const entry = { char }
    if (leftChar !== undefined) entry[a] = unicodeWrap(leftChar);
    if (rightChar !== undefined) entry[b] = unicodeWrap(rightChar);
    if (!same) entry["same"] = "NOOOO";
    data.push(entry);
}

console.table(data, ["char", a, b, "same"])
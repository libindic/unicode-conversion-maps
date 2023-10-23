const fs = require('fs');
const filename = process.argv[2];
if (!filename) {
    console.error("Please specify filename");
    process.exit(1);
}
const text = fs.readFileSync(filename, 'utf-8');
const known = {}
const output = text
    .split('\n')
    .map(l => {
        if (l.startsWith('#')) return l;
        const [lhs, rhs] = l.split('=').map(w => w.trim());
        if (lhs) {
            const previous = known[lhs];
            if (rhs === previous) return "";
            if (previous !== undefined) {
                console.warn(`Caution: More than one mapping detected. Dropping earlier one`)
                console.warn(`${lhs}=${previous}`)
                console.warn(`${lhs}=${rhs}`)
            }
            known[lhs] = rhs;
            return `${lhs}=${rhs ?? ""}`
        } else {
            return l;
        }
    })
    .filter(l => l !== "")
    .join('\n')

if (process.argv[3] === "--overwrite") {
    fs.writeFileSync(filename, output);
} else {
    console.log(output);
}


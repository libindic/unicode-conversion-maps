const fs = require('fs');
const filename = process.argv[2];
if (!filename) {
    console.error("Please specify filename");
    process.exit(1);
}
const text = fs.readFileSync(filename, 'utf-8');
const known = {}
let longest = ""
let longestLength = 0
text
    .split('\n')
    .forEach(l => {
        if (l.startsWith('#')) return;
        if (l.length > longestLength) {
            longest = l;
            longestLength = l.length
        }
    })

console.log(longest)
console.log(longestLength)
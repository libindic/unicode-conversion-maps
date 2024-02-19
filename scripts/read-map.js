const fs = require('fs');

const isRule = (line) => {
    return line.length < 10 && line.indexOf('=') > -1
}
const isComment = (line) => !isRule(line)

const readMap = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8')
    const fontMap = {};
    data.split('\n').forEach(l => {
        l = l.trim();
        if (isComment(l)) return;
        const [lhs, rhs] = l.split('=').map(w => w.trim());
        if (lhs) fontMap[lhs] = rhs;
    })
    return fontMap
}

module.exports = {
    readMap
}

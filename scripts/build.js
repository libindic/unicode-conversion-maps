const fs = require('fs');
const path = require('path');

const scriptDir = __dirname;
const mapsFolder = path.join(scriptDir, '..', "maps");
const buildFolder = path.join(scriptDir, '..', "build");
const atlas = {}
const files = fs.readdirSync(mapsFolder)
files.forEach((file) => {
    const filePath = path.join(mapsFolder, file);

    const data = fs.readFileSync(filePath, 'utf8')
    const fontName = path.parse(file).name;
    const fontMap = {};
    data.split('\n').forEach(l => {
        if (l.startsWith('#')) return;
        const [lhs, rhs] = l.split('=').map(w => w.trim());
        if (lhs) fontMap[lhs] = rhs;
    })
    atlas[fontName] = fontMap;
});
const jsBuildPath = path.join(buildFolder, 'unicode-conversion-maps.mjs');
fs.mkdirSync(buildFolder, { recursive: true })
fs.writeFileSync(jsBuildPath, `export default ${JSON.stringify(atlas, null, 0)};`)
const fs = require('fs');
const path = require('path');

const version = process.argv[2];

const mkdir = (f) => fs.mkdirSync(f, { recursive: true })

const scriptDir = __dirname;
const mapsFolder = path.join(scriptDir, '..', "maps");
const buildFolder = path.join(scriptDir, '..', "build");
const buildRawFolder = path.join(buildFolder, "raw");
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
const jsBuildPath = path.join(buildRawFolder, 'unicode-conversion-maps.mjs');
mkdir(buildRawFolder);
fs.writeFileSync(jsBuildPath, `export default ${JSON.stringify(atlas, null, 0)};`)

const npmFolder = path.join(buildFolder, "npm");
mkdir(npmFolder);

const npmReadme = path.join(npmFolder, 'README.md')
fs.writeFileSync(npmReadme, `# Unicode Conversion Maps

Install with \`npm install @indicjs/unicode-conversion-maps\`

Then use it like this:
\`\`\`javascript
import maps from '@indicjs/unicode-conversion-maps'
console.log(maps["revathi"]["A"]) // prints അ
\`\`\`
`)

const npmPackageJson = path.join(npmFolder, 'package.json');
fs.writeFileSync(npmPackageJson, `{
    "name": "@indicjs/unicode-conversion-maps",
    "version": "1.0.${version}",
    "homepage": "https://github.com/libindic/unicode-conversion-maps",
    "main": "unicode-conversion-maps.mjs",
    "type": "module"
}
`)

fs.copyFileSync(jsBuildPath, path.join(npmFolder, "unicode-conversion-maps.mjs"))
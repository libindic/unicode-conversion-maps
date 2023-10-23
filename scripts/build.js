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

const pythonFolder = path.join(buildFolder, "pypi");
const pythonFilePath = path.join(pythonFolder, "libindic", "unicode_conversion_maps", "__init__.py")
mkdir(path.dirname(pythonFilePath));

fs.writeFileSync(pythonFilePath, `# This Python file uses the following encoding: utf-8
maps = ${JSON.stringify(atlas, null, 0)}`);

fs.writeFileSync(path.join(pythonFolder, 'pyproject.toml'), `[build-system]
requires = ["setuptools"]
build-backend = "setuptools.build_meta"

[project]
name = "libindic-unicode-conversion-maps"
version = "1.0.${version}"
description = "Maps for converting ASCII to Unicode"
readme = "README.md"

[project.urls]
Homepage = "https://github.com/libindic/unicode-conversion-maps"
`)

fs.writeFileSync(path.join(pythonFolder, 'README.md'), `# libindic-unicode-conversion-maps

To use, first install \`pip install libindic-unicode-conversion-maps\`

Then import and use:

\`\`\`python
from libindic.unicode_conversion_maps import maps
print(maps["revathi"]["A"]) # prints അ
\`\`\`
`)
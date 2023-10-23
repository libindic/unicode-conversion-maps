# Unicode Conversion Maps

This is a global repository to hold community curated maps to convert from ASCII to Unicode.

## How to use this

The maps inside [maps directory](https://github.com/libindic/unicode-conversion-maps/tree/main/maps) are used in various utilities like [Payyans](https://libindic.org/Payyans), [Freaknz](https://gitlab.com/kannanvm/freaknz-qt/), [Chekkans](http://asdofindia.github.io/chekkans-web/), etc. These maps are all community maintained. In the near future, this repository will be used to supply maps to all of these projects and more.

### Editor

If you like to edit maps, you can use the [editor](https://libindic.github.io/unicode-conversion-maps/editor/). In editor, you have to choose the font file and map file. Once loaded, these are opened in the tables at the bottom.

![](https://i.imgur.com/FUo37cL.png)

Each glyph and its mapping are loaded in the following format:

```
--------------
| A  B       |
| C      D   |
|        E   |
-------------
```

Explanation of these:

* A - the unicode decimal point.
* B - extended ASCII character that forms the left hand side of the maps
* C - the glyph in the font at that code point (if it exists)
* D - The input box where the currently mapped character is loaded (should be same as C). If B and C are the same, this can be omitted.
* E - The Unicode codepoint of D.

After changing the mapping (by editing D) for all glyphs, you can copy the mapping from the textarea in the top right of the page.

### Using map

You can contribute the map to the community by either editing an existing map or by [creating a new map ](https://github.com/libindic/unicode-conversion-maps/new/main/maps).

If you want to directly use these maps, you can paste them in [chekkans-web](http://asdofindia.github.io/chekkans-web/) at the bottom and use it directly.

### Using map library

You can find and download library artifacts in [releases](https://github.com/libindic/unicode-conversion-maps/releases)

#### Javascript

`npm install @indicjs/unicode-conversion-maps`

```javascript
import maps from '@indicjs/unicode-conversion-maps';
console.log(maps["revathi"]["A"]); // prints അ
```


If you're in an HTML page you can do

```html
<script type="module">
    import maps from "https://unpkg.com/@indicjs/unicode-conversion-maps";
    console.log(maps["revathi"]["A"]);
</script>
```

#### Python

`pip install libindic-unicode-conversion-maps`

```python
from libindic.unicode_conversion_maps import maps
print(maps['revathi']['A']) # prints അ
```

## History

* [Payyans](https://github.com/libindic/payyans) is the origin of a lot of map files.
* [Freaknz](https://gitlab.com/kannanvm/freaknz-qt/) brought renewed interest in ASCII -> Unicode conversion
* [ttf.js](https://github.com/ynakajima/ttf.js) is where the idea of showing glyphs in the browser came from.
* [opentype.js](https://github.com/opentypejs/opentype.js) allowed for bug-free opening of glyphs.
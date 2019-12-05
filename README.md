# async-assets-loader
[![NPM Version](https://img.shields.io/npm/v/async-assets-loader.svg?style=flat-square)](https://www.npmjs.com/package/async-assets-loader)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dt/async-assets-loader.svg?style=flat-square)](https://www.npmjs.com/package/async-assets-loader)

`async-assets-loader` 
loads assets asynchronously (js files, css styles, images) and triggers a callback after all is loaded.
Package is compatible with the most of browsers and NPM (UMD). 

## Examples

### Browser
```html
<script src="https://unpkg.com/async-assets-loader"></script>
<script>
var jsfile = "https://code.jquery.com/jquery-3.4.1.min.js";
var cssfile = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css";
var imgfile = "https://logos.keycdn.com/keycdn-logo-black.png";
var assetsLoader = new asyncAssetsLoader();
assetsLoader.load([
      {url: jsfile, type: "script"},
      {url: cssfile, type: "style"},
      {url: imgfile, type: "img"}
    ], function () {
      console.log("Assets are loaded");
      console.log("Img width: " + assetsLoader.getLoadedTags()[imgfile].width);
    });
</script>
```

### NPM
```bash
# bash
npm i async-assets-loader
```

```js
// js
const assetsLoader = require("async-assets-loader");
```

### Source Code
[asyncAssetsLoader()](https://github.com/vbabak/async-assets-loader/blob/master/src/index.js)

## Contribution Notes
Clone project on [github](https://github.com/vbabak/async-assets-loader)
### Install libraries
```bash
npm i
```

### Build & Test
```bash
npm test
```

### Open Pull Request
Make changes and create a merge request.

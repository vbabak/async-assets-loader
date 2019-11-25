const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'async-assets-loader.js',
    library: "asyncAssetsLoader",
    libraryTarget: 'umd',
    globalObject: 'this'
  },
};

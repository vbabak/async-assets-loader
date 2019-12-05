describe('async-assets-loader', () => {
  let loader = new asyncAssetsLoader();

  // assets stubs
  let img = '/base/test/stubs/img.png?getparams';
  let jsfile = '/base/test/stubs/testf.js';
  let cssfile = '/base/test/stubs/style.css#hash';

  it('should trigger error on wrong input object', () => {
    expect(function () {
      loader.load([{link: img, type: "img"}]);
    }).toThrowError();
  });

  it('should trigger error on wrong type', () => {
    expect(function () {
      loader.load({url: jsfile, type: "js"});
    }).toThrowError();
  });

  it('should load single asset correctly', (done) => {
    loader.load({url: jsfile, type: "script"}, () => {
      expect(testf).toBeDefined();
      done();
    });
  });

  it('should load multiple assets correctly', (done) => {
    loader.load([
      {url: jsfile, type: "script"},
      {url: cssfile, type: "style"},
      {url: img, type: "img"}
    ], () => {
      expect(testf).toBeDefined();
      expect(getComputedStyle(document.body).color).toBe("rgb(95, 158, 160)");
      expect(loader.getLoadedTags()[img].width).toBe(16);
      done();
    });
  });

});

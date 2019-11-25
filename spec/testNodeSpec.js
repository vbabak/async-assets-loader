describe('async-assets-loader', () => {
  const assetsLoader = require("../dist/async-assets-loader");
  let loader = new assetsLoader();

  it('assetsLoader is function', () => {
    expect(typeof assetsLoader).toBe("function");
  });

  it('loader has load method', () => {
    expect(typeof loader.load).toBe("function");
  });

  it('trigger error on incomplete input object', () => {
    expect(function () {
      loader.load([{type: "img"}]);
    }).toThrowError();
  });

  it('trigger error on wrong type', () => {
    expect(function () {
      loader.load({uri: "", type: "js"});
    }).toThrowError();
  });
});
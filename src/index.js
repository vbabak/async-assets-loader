exports = (function () {

  var asyncAssetsLoader = function () {
    this.loaded_paths = {};
    this.container = document.head || document.body || document.documentElement;
    this.path_obj_props = ["uri", "type"];
    this.path_obj_types = ["style", "script", "img"];
    this.loaded_tags = {};
  };

  asyncAssetsLoader.prototype.validatePath = function (path) {
    for (var i = 0; i < this.path_obj_props.length; i++) {
      if (!path.hasOwnProperty(this.path_obj_props[i])) {
        throw new Error("\"" + this.path_obj_props[i] + "\" is not set in " + JSON.stringify(path));
      }
    }
    if (this.path_obj_types.indexOf(path.type) === -1) {
      throw new Error("\"type\" property is not one of " + JSON.stringify(this.path_obj_types) + " in " + JSON.stringify(path));
    }
  };

  asyncAssetsLoader.prototype.load = function (paths, callback, reload) {
    paths = Object.prototype.toString.call(paths) !== '[object Array]' ? [paths] : paths;
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      this.validatePath(path);
      var onload = (function () {
        this.loaded_paths[path] = true;
        if (typeof callback === "function" && _checkLoaded.call(this, paths)) {
          callback();
        }
      }).bind(this);
      _loadOne.call(this, path, onload, reload);
    }
  };

  asyncAssetsLoader.prototype.getLoadedTags = function () {
    return this.loaded_tags;
  };

  var _loadOne = function (path, onload, reload) {
    reload = !!reload;

    if (!reload && this.loaded_paths.hasOwnProperty(path)) {
      return false;
    }

    this.loaded_paths[path.uri] = false;

    var path_file_no_hash = path.uri.replace(/[?#]+(\w.+)$/g, '');
    if (path.type === 'script') {
      var script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.onload = onload;
      script.src = path.uri;
      this.container.appendChild(script);
      this.loaded_tags[path.uri] = script;
    } else if (path.type === 'style') {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.onload = onload;
      link.href = path.uri;
      this.container.appendChild(link);
      this.loaded_tags[path.uri] = link;
    } else if (path.type === 'img') {
      var img = document.createElement("img");
      img.onload = this.onload();
      if (typeof img.decoding !== "undefined") img.decoding = "async";
      img.src = path.uri;
      this.loaded_tags[path.uri] = img;
    }
  };

  var _checkLoaded = function (paths) {
    for (var i = 0; i < paths.length; i++) {
      if (!this.loaded_paths[paths[i].uri]) {
        return false;
      }
    }
    return true;
  };

  return asyncAssetsLoader;
})();

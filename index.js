const fs = require("fs");
const path = require("path");

const datacache = {};
const _cachedir = path.join(process.cwd(), ".cache");


function _initCache() {
    if(fs.existsSync(_cachedir) === false) {
        fs.mkdirSync(_cachedir)
    }
}

/**
 *
 * @param {String} key
 */

datacache.set = function(key, value, ext="") {
    _initCache();
    if(!value) throw new Error("param `value` is not present");

    let keypath = path.resolve(_cachedir, key.replace(/\./g, path.sep));
    if(typeof value === "object") {
        value = JSON.stringify(value, null, 4)
        ext = ".json";
    }
    fs.mkdirSync(path.parse(keypath).dir, {recursive: true});
    fs.writeFileSync(keypath+ext, value)
}

/**
 *
 * @param {String} key
 * @param {BufferEncoding} [encoding="utf-8"]
 */

datacache.get = function(key, encoding="utf8") {
    let keypath = path.resolve(_cachedir, key.replace(/\./g, path.sep));

    if(fs.existsSync(keypath)){
        return fs.readFileSync(keypath, {encoding})
    }

    return undefined;
}

module.exports = datacache
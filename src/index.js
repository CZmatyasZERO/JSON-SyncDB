const fs = require("node:fs")

class JSONDB {
    _dataObj = {}
    data = {}
    constructor(filePath = "./data.json") {
        if(!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "{}", {encoding: "utf-8"})
        } else {
            this._dataObj = JSON.parse(fs.readFileSync(filePath, {encoding: "utf-8"}))
        }
        fs.openSync(filePath, "w")
        const handler = {
            data: this._dataObj,
            get(target, key) {
              if (key == 'isProxy')
                return true;
              const prop = target[key];
              // return if property not found
              if (typeof prop == 'undefined')
                return;
              // set value as proxy if object
              if (!prop.isProxy && typeof prop === 'object')
                target[key] = new Proxy(prop, handler);
              return target[key];
            },
            set(target, key, value) {
              target[key] = value;
              fs.truncateSync(filePath, 0)
              fs.writeFile(filePath, JSON.stringify(this.data), {encoding:"utf-8"}, (err) => {
              })

              return true;
            }
        };
          
          this.data = new Proxy(this._dataObj, handler);
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
module.exports = JSONDB
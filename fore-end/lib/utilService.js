export function keyMirror(obj, val){
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = val ? (val + '_' + key) : key;
  }
  return ret;
}

class LocalStorage {
  setObject(key, value) {
    if (window.localStorage) {
      window.localStorage[key] = JSON.stringify(value);
    }
  }
  getObject(key) {
    let obj = window.localStorage[key];
    try {
      return obj ? JSON.parse(obj) : null;
    } catch (e) {
      return null;
    }
  }
  remove(key) {
    delete window.localStorage[key];
  }
}
const lStorage = new LocalStorage();

class SessionStorage {
  setObject(key, value) {
    if (window.sessionStorage) {
      window.sessionStorage[key] = JSON.stringify(value);
    }
  }
  getObject(key) {
    let obj = window.sessionStorage[key];
    try {
      return obj ? JSON.parse(obj) : null;
    } catch (e) {
      return null;
    }
  }
  remove(key) {
    delete window.sessionStorage[key];
  }
}
const sStorage = new SessionStorage();

export {
  lStorage as LocalStorage, sStorage as SessionStorage
};

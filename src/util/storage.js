// 本地存储扩展
const ls = {};

ls.setStorage = function(key, value) {
    if(arguments.length === 2) {
        let v = value;
        if(typeof v === 'string' || !isNaN(v)) {
            v = 'str-'+ v;
        } else {
            v = JSON.stringify(v);
            v = 'obj-'+ v;
        }
        window.localStorage.setItem(key, v);
    } else {
        throw new Error('参数错误...');
    }
};

ls.getStorage = function(key) {
    let v = window.localStorage.getItem(key);
    if(!v) {
        return
    }
    if(v.indexOf('obj-') === 0){
        v = v.slice(4);
        return JSON.parse(v);
    } else if (v.indexOf('str-') === 0){
        return v.slice(4);
    }
};

ls.removeStorage = function(key){
    if(key) {
        window.localStorage.removeItem(key);
    }
};

ls.clearStorage = function() {
    window.localStorage.clear();
};

export default {...ls}
import Vue from 'vue'

const filters = {};
const formatNumber = function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 时间过滤器
 */
filters.formatTime = (time, tpl = "YYYY/MM/DD hh:mm:ss") => {
    if(!time) {
        return ''
    }
    var date = new Date(time - 0);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return tpl.replace("YYYY", formatNumber(year)).replace("MM", formatNumber(month)).replace("DD", formatNumber(day)).replace("hh", formatNumber(hour)).replace("mm", formatNumber(minute)).replace("ss", formatNumber(second));
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
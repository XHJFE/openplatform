import * as types from './mutation-types'
import api from 'api'

const actions = {

    /**
     * 获取城市列表并按首字母分类
     * @param {*} param0 
     */
    queryCity({commit}) {
        api.helper.queryCity().then((data) => {
            let arr = [];
            let obj = {};
            data.forEach((v, i) => {
                var type = v.pinYin.slice(0, 1).toUpperCase();
                if (obj[type]) {
                    obj[type].push(v);

                } else {
                    obj[type] = [v];
                    arr.push({type: type, list: obj[type]});
                }
            });
            let list = arr.sort((a, b) => a.type.charCodeAt() - b.type.charCodeAt());
            commit(types.SET_CITY_LIST, list);
        })
    },

    /**
     * 获取用户信息
     */
    queryUserInfo() {
        
    },

    /**
     * 登出
     */
    logout({commit}) {
        commit(types.SET_CITY_LIST, []);
        commit(types.SET_USER_INFO, {});
    }
}

export default actions
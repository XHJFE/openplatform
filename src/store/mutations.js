import * as types from './mutation-types'

const mutations = {
  /**
   * 设置城市列表数据
   * @param {*} state 
   * @param {Array} tab 城市列表
   */
  [types.SET_CITY_LIST](state, tab) {
    state.cityList = tab;
  },
  
  /**
   * 设置用户信息
   * @param {*} state 
   * @param {Array} info 用户信息
   */
  [types.SET_USER_INFO](state, info) {
    state.userInfo = info;
  },

  /**
   * 设置企业认证完整度
   * @param {*} state 
   * @param {Number} status 状态值
   */
  [types.SET_FORM_STATUS](state, status) {
    state.wanzhengstatus = status;
  },

  /**
   * 设置企业认证审核状态
   * @param {*} state 
   * @param {Number} status 状态值
   */
  [types.SET_USER_STATUS](state, status) {
    state.status = status;
  },
};

export default mutations
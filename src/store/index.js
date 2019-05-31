import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createLogger from 'vuex/dist/logger'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

//持久保持仓储数据
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,

  //对这些值做持久保存
  reducer: (state) => ({ 
    cityList: state.cityList,
    userInfo: state.userInfo,
    wanzhengstatus: state.wanzhengstatus,
    status: state.status,
  }), 
})

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin]
})

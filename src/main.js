import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import Components from 'components'
import 'util/filters'
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(Components);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

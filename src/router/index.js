import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import store from '../store'

import Login from 'views/Login/Login.vue'
import Not from 'views/404/404.vue'
const Home = () => import('views/Home/Home.vue');
const Approve = () => import('views/Approve/Approve.vue');
const Manage = () => import('views/Manage/Manage.vue');
const Add = () => import('views/Add/Add.vue');
const Entry = () => import('views/Entry/Entry.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: process.env.NODE_ENV === 'production' ? '/opendeveloper/' : '/',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: '/home/'},
    { 
      path:'*', 
      component: Not
    },
    {
      // alias: '/',
      path: '/home/',
      name: 'home',
      component: Home
    },
    {
      path: '/approve/',
      name: 'approve',
      component: Approve
    },
    {
      path: '/manage/',
      name: 'manage',
      component: Manage
    },
    {
      path: '/manage/add/',
      name: 'add',
      component: Add
    },
    {
      path: '/entry/:id?',
      name: 'entry',
      component: Entry
    },
    {
      path: '/login/',
      name: 'login',
      component: Login
    },
  ]
})

router.beforeEach((to, from, next) => {
  let token = store.state.userInfo.token;
  // try {
  //   token = store.state.userInfo.token;
  // } catch {
  //   next('/login/');
  //   return
  // }
  
  iView.LoadingBar.start();
  if(to.name === 'login' && token) {
    next(from.path);
    iView.LoadingBar.finish();
    return
  } 
  
  if(token || !to.name || to.name === 'login') {
    next();
  } else {
    next('/login/');
    iView.LoadingBar.finish();
  }
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

export default router
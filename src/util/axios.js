import axios from 'axios';
import config from '@/xh.config'
import iView from 'iview'
import store from 'store'
import router from 'router'
import verify from 'util/verify'

const methodsReq = {};

/**
 * 取消请求
 * @param {*}
 */
const cancelAxios = (cof) => {
  let source = axios.CancelToken.source();
  cof.cancelToken = source.token;
  return source.cancel;
}

axios.defaults.timeout = 15000;
axios.defaults.baseURL = config.devHost;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/json;charset=UTF-8'
    }

    try {
      if(store.state.userInfo.token) {
        config.headers.Authorization = store.state.userInfo.token;
      }
    } catch {
      router.replace({path: '/login/'});
      return
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);



//http response 拦截器
axios.interceptors.response.use(
  response => {
    const code = response.data.code;
    if(!code) {
      return response;
    }

    if(code === 200) {
      return response;
    }
    
    if(code === 403) {
      iView.Notice.warning({
          title: '登录已过期，请重新登录',
      });
      store.dispatch('logout');
      router.replace({path: '/login/'});
      return response
    }
    
    //没权限的接口返回跟新后的状态
    if(code === 401) {
      store.commit('SET_FORM_STATUS', response.data.data.wanzhengstatus);
      store.commit('SET_USER_STATUS', response.data.data.status);
      verify.verifyUserStatus();
      return response;
    }

  },
  error => {
    if(error.message !== 'cancel') {
      iView.Notice.error({
        title: '网络请求错误，请重试。',
      })
    }
    return Promise.reject(error)
  }
)

/**
 * 请求工厂方法
 * @param {*} method 
 */
let factory = (method) => (url = '', params = {}, config = {}) => {
    let cof = { 
      params
    };
    let abort = cancelAxios(cof);
    let promise = new Promise((resolve, reject) => {
      let postData = {};
      let args = [];
      
      //参数处理axios
      if(method === 'get') {
        config.params = cof.params;
        config.cancelToken = cof.cancelToken;
        args = [url, config];
      } else {
        postData = cof.params;
        config = cof.cancelToken;
        args = [url, postData, config];
      }

      axios[method].apply(null, args).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err)
      })
    });

    /**
     * 取消请求
     */
    promise.abort = abort;
    return promise
  }


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

methodsReq.get = factory('get');


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

methodsReq.post = factory('post');

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

methodsReq.patch = factory('patch');

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

methodsReq.put = factory('put');

export default methodsReq
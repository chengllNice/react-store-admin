import Axios from 'axios'
import config from '@/config'

const axios = Axios.create();
const CancelToken = Axios.CancelToken;
const baseURL = config.mock ? '/mock' : '/api';
let cancel_list = [];

// axios默认配置
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 180000; //3min

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 删除get参数中为空的参数
  if(config.params){
    Object.keys(config.params).forEach(key=>{
      if(typeof config.params[key] == 'number' && !config.params[key].toString()){
        delete config.params[key]
      }else if(typeof config.params[key] == 'string' && !config.params[key]){
        delete config.params[key]
      }
    })
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.status === 200) {
    return Promise.resolve(response.data);
  } else {
    return Promise.reject(response.data);
  }
  // return response;
}, function (error) {

  // 对响应错误做点什么
  // console.log(error.response,'error')
  // console.log(error.response.data);
  // console.log(error.response.status);
  // console.log(error.response.headers);

  return Promise.reject(error && error.response && error.response.data);
});




// 该方法会取消所有正在进行的请求
export const ajax_abort_all = () => {
  cancel_list.forEach(item=>{
    item();
  });
  cancel_list = [];
};

export const ajax_all = (method, url, params, data) => {
  return axios({
    method,
    url,
    params,
    data,
    cancelToken: new CancelToken(function (cancel) {
      cancel_list.push(cancel);
    })
  }).then(response=>{
    return Promise.resolve(response)
  }).catch(error=>{
    return Promise.reject(error)
  });
};


export const ajax_get = (url, params) => {
  return ajax_all('get', url, params);
};

export const ajax_post = (url, data) => {
  return ajax_all('post', url, {}, data);
};

export const ajax_put = (url, data) => {
  return ajax_all('put', url, {}, data);
};

export const ajax_delete = (url, data) => {
  return ajax_all('delete', url, {}, data);
};


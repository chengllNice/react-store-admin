import Axios from 'axios'
import {ajax_get, ajax_post} from "./index";

// 登录
export const postLogin = (data) => ajax_post('/fe/user/login/', data);

// 获取商家用户角色列表
export const getUserBussinesRoleList = (data) => ajax_get('/fe/common/userBussinesRoleList/get/', data);
// 获取管理员角色列表
export const getUserAdminRoleList = (data) => ajax_get('/fe/common/userAdminRoleList/get/', data);
// 获取商店类型列表
export const getStoreCategoryList = (data) => ajax_get('/fe/common/storeCategoryList/get/', data);
// 获取商家用户列表id name
export const getUserBusniessList = (data) => ajax_get('/fe/common/userListBusniess/get/', data);




// 高德地图关键字搜索
export const getAMapKeywordsSearch = (data) => {
  let url = 'https://restapi.amap.com/v3/place/text';
  data.key = 'ba979a0bcd8b467f8a33479f832077c3';//高德地图web服务的key
  data.offset = data.offset || 20;
  data.page = data.page || 1;
  data.extensions = 'all';
  data.types = data.types || 190400;
  data.keywords = data.keywords || '';

  return Axios.get(url, {
    params: data,
  }).then(response => {
    return Promise.resolve(response && response.data)
  }).catch(error=>{
    return Promise.reject(error)
  })
};


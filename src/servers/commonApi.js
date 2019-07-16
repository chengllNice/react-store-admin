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


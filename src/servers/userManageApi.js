import {ajax_get, ajax_post} from "./index";

// 获取商家用户列表
export const getUserList = (data) => ajax_get('/fe/userManage/userList/get/', data);
// 删除商家用户
export const delUserList = (data) => ajax_post('/fe/userManage/userList/delete/', data);
// 新增商家用户
export const insertUserList = (data) => ajax_post('/fe/userManage/userList/insert/', data);
// 编辑商家用户
export const editUserList = (data) => ajax_post('/fe/userManage/userList/edit/', data);
// 获取商家用户详情
export const detailUserList = (data) => ajax_get('/fe/userManage/userList/detail/', data);
// 激活停用
export const editActiveUserList = (data) => ajax_post('/fe/userManage/userList/active/', data);


// 获取管理员用户列表
export const getUserAdminList = (data) => ajax_get('/fe/userManage/adminList/get/', data);
// 删除管理员用户
export const delUserAdminList = (data) => ajax_post('/fe/userManage/adminList/delete/', data);
// 新增管理员用户
export const insertUserAdminList = (data) => ajax_post('/fe/userManage/adminList/insert/', data);
// 编辑管理员用户
export const editUserAdminList = (data) => ajax_post('/fe/userManage/adminList/edit/', data);
// 获取管理员用户详情
export const detailUserAdminList = (data) => ajax_get('/fe/userManage/adminList/detail/', data);


import {ajax_get, ajax_post} from "./index";

// 获取已删除的商家用户列表
export const getDeleteUserList = (data) => ajax_get('/fe/historyRecord/deleteUserList/get/', data);
// 恢复已删除用户
export const postResetDeleteUser = (data) => ajax_post('/fe/historyRecord/deleteUserList/reset/', data);
// 永久删除用户
export const postPermanentDeleteUser = (data) => ajax_post('/fe/historyRecord/deleteUserList/delete/', data);

// 获取已删除的系统用户列表
export const getDeleteAdminUserList = (data) => ajax_get('/fe/historyRecord/deleteAdminUserList/get/', data);
// 恢复已删除系统用户
export const postResetDeleteAdminUser = (data) => ajax_post('/fe/historyRecord/deleteAdminUserList/reset/', data);
// 永久删除系统用户
export const postPermanentDeleteAdminUser = (data) => ajax_post('/fe/historyRecord/deleteAdminUserList/delete/', data);


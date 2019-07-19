import Mock from 'mockjs';
import { formatURL} from '../index'

// 商家用户
import {
  deleteUserManage,
  getUserManageList,
  insertUserManage,
  detailUserManage,
  editUserManage,
  editActiveUser,
  getUserManageDeleteList,
  resetDeleteUser,
  deletePermanentUser} from "./userList";

// 管理员用户
import {
  deleteUserManageAdmin,
  getUserManageAdminList,
  insertUserManageAdmin,
  detailUserManageAdmin,
  editUserManageAdmin,
  getUserManageDeleteAdminList,
  resetDeleteAdminUser,
  deletePermanentAdminUser} from "./adminList";

/*获取商家用户数据*/
Mock.mock(formatURL('/userManage/userList/get'), 'get', getUserManageList);
// 删除商家用户
Mock.mock(formatURL('/userManage/userList/delete'), 'post', deleteUserManage);
// 新建商家用户
Mock.mock(formatURL('/userManage/userList/insert'), 'post', insertUserManage);
// 编辑商家用户
Mock.mock(formatURL('/userManage/userList/edit'), 'post', editUserManage);
// 获取用户详情
Mock.mock(formatURL('/userManage/userList/detail'), 'get', detailUserManage);
// 激活停用
Mock.mock(formatURL('/userManage/userList/active'), 'post', editActiveUser);
/*获取已删除的商家用户数据*/
Mock.mock(formatURL('/historyRecord/deleteUserList/get'), 'get', getUserManageDeleteList);
// 恢复已删除用户
Mock.mock(formatURL('/historyRecord/deleteUserList/reset'), 'post', resetDeleteUser);
// 永久删除用户
Mock.mock(formatURL('/historyRecord/deleteUserList/delete'), 'post', deletePermanentUser);


/*获取管理员用户数据*/
Mock.mock(formatURL('/userManage/adminList/get'), 'get', getUserManageAdminList);
// 删除管理员用户
Mock.mock(formatURL('/userManage/adminList/delete'), 'post', deleteUserManageAdmin);
// 新建管理员用户
Mock.mock(formatURL('/userManage/adminList/insert'), 'post', insertUserManageAdmin);
// 编辑管理员用户
Mock.mock(formatURL('/userManage/adminList/edit'), 'post', editUserManageAdmin);
// 获取管理员用户详情
Mock.mock(formatURL('/userManage/adminList/detail'), 'get', detailUserManageAdmin);
/*获取已删除的系统用户数据*/
Mock.mock(formatURL('/historyRecord/deleteAdminUserList/get'), 'get', getUserManageDeleteAdminList);
// 恢复已删除系统用户
Mock.mock(formatURL('/historyRecord/deleteAdminUserList/reset'), 'post', resetDeleteAdminUser);
// 永久删除系统用户
Mock.mock(formatURL('/historyRecord/deleteAdminUserList/delete'), 'post', deletePermanentAdminUser);

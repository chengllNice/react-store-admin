import Mock from 'mockjs';
import { formatURL} from '../index'

// 商家用户
import {
  deleteUserManage,
  getUserManageList,
  insertUserManage,
  detailUserManage,
  editUserManage} from "./userList";

// 管理员用户
import {
  deleteUserManageAdmin,
  getUserManageAdminList,
  insertUserManageAdmin,
  detailUserManageAdmin,
  editUserManageAdmin} from "./adminList";

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


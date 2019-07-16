import Mock from 'mockjs';
import { formatURL} from '../index'

// 权限管理角色
import {
  deleteAuthManageRole,
  insertAuthManageRole,
  editStoreManage,} from "./roleList";

// 删除角色
Mock.mock(formatURL('/authManage/roleList/delete'), 'post', deleteAuthManageRole);
// 新建角色
Mock.mock(formatURL('/authManage/roleList/insert'), 'post', insertAuthManageRole);
// 编辑角色
Mock.mock(formatURL('/authManage/roleList/edit'), 'post', editStoreManage);


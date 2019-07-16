import { ajax_post} from "./index";

// 删除角色
export const delRoleList = (data) => ajax_post('/fe/authManage/roleList/delete/', data);
// 新增角色
export const insertRoleList = (data) => ajax_post('/fe/authManage/roleList/insert/', data);
// 编辑角色
export const editRoleList = (data) => ajax_post('/fe/authManage/roleList/edit/', data);

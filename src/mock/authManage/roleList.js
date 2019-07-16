
import { mockConfig} from '../index'
// import _ from 'lodash'
import commonSchema from '../commonSchema'
import { filterByObj, deleteDataByKeys} from "../commonUtils";
import { formatDate} from "@/utils";

/*系统角色列表*/
let adminRoleListData = commonSchema.adminRoleList.reverse();

/*获取角色列表在commmonApi中*/

/*删除角色*/
export const deleteAuthManageRole = (opts) => {
  // 获取参数
  let id = JSON.parse(opts.body).id;

  let delArray = deleteDataByKeys(adminRoleListData, 'id', id);

  let errmsg = '';
  if(delArray.length !== id.length){
    errmsg = '删除失败';
    mockConfig.baseMock.code = 10001;
  }

  return {...mockConfig.baseMock, errmsg}
};

/*添加角色*/
export const insertAuthManageRole = (opts) => {
  // 获取参数
  let roleInfo = JSON.parse(opts.body);
  let popRoleInfo = adminRoleListData[0];//第一项
  let id = Number(popRoleInfo.id) + 1;//取第一项的id+1为新项id
  roleInfo.id = id;
  roleInfo.createTime = formatDate();
  adminRoleListData.unshift(roleInfo);

  return {...mockConfig.baseMock, ...{data: {id}}}
};

/*编辑角色*/
export const editStoreManage = (opts) => {
  // 获取参数
  let editRoleInfo = JSON.parse(opts.body);
  let {id, ...editPropsRoleInfo} = editRoleInfo;//获取角色id及其他信息
  let roleInfo = filterByObj(adminRoleListData, {id: id}, 'or', 'eq')[0];
  let newRoleInfo = Object.assign({}, roleInfo, editPropsRoleInfo);

  let index = adminRoleListData.findIndex(item=>{
    return item.id.toString() === id.toString()
  });

  adminRoleListData.splice(index, 1, newRoleInfo);

  return {...mockConfig.baseMock}
};

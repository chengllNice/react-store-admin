
/*
* 商家列表api
* */

// import Mock from 'mockjs';
import { urlFormat, formatDate} from "@/utils";
import { mockConfig} from '../index'
import { userListBusniess, storeManageStoreList} from "../createMockData";
import { filterByObj, filterKeyByValueRange, deleteDataByKeys, deleteObjKeyNull} from "../commonUtils";
import * as commonData from "../commonData";

/*生成的用户总数据*/
let userList = userListBusniess.reverse();

/*获取用户列表*/
export const getUserManageList = (opts) => {
  let result = filterByObj(userList, {isDelete: false}, 'and');
  // 获取参数
  let page = Number(urlFormat(opts.url, 'page')) || 1;
  let pageSize = Number(urlFormat(opts.url, 'pageSize')) || 10;
  let search = urlFormat(opts.url, 'search');
  let role = urlFormat(opts.url, 'role');
  let startTime = urlFormat(opts.url, 'startTime');
  let endTime = urlFormat(opts.url, 'endTime');
  let filter = null;
  if(search){
    search = decodeURI(search);
    search = search === 'undefined' ? '' : search;
    filter = {'name': search, 'phone': search, 'email': search};
    filter = deleteObjKeyNull(filter);
    result = filterByObj(result, filter, 'or');
  }
  if(role){
    filter = {'userRole.id': role};
    result = filterByObj(result, filter, 'and');
  }
  if(startTime && endTime){
    result = filterKeyByValueRange(result, 'createTime', [startTime, endTime])
  }

  let startIndex = (page-1) * pageSize;
  let endIndex = (page) * pageSize;
  let reList = result.slice(startIndex, endIndex);

  let total = result.length;
  let data = {list: reList, pagination: {total: total, page: page, pageSize: pageSize}};
  return {...mockConfig.baseMock, data: data}
};

/*删除一个或者批量删除用户*/
export const deleteUserManage = (opts) => {
  // 获取参数
  let ids = JSON.parse(opts.body).ids;
  let idsStr = [];
  ids.forEach(item=>{
    idsStr.push(item.toString());
  });
  // let delArray = deleteDataByKeys(userList, 'id', ids);
  let filterArray = filterByObj(userList, {id: idsStr}, 'and', 'eq');
  filterArray.forEach(item=>{
    item.isDelete = true;
  });
  let errmsg = '';
  if(filterArray.length !== ids.length){
    errmsg = '删除失败';
    mockConfig.baseMock.code = 10001;
  }

  return {...mockConfig.baseMock, errmsg}
};

/*添加新建用户*/
export const insertUserManage = (opts) => {
  // 获取参数
  let userInfo = JSON.parse(opts.body);
  let popUserInfo = userList[0];//第一项
  let id = popUserInfo.id + 1;//取第一项的id+1为新项id
  userInfo.id = id;
  userInfo.createTime = formatDate();
  userInfo.sex = filterByObj(commonData.data.sex, {id: userInfo.sex.id}, 'or', 'eq')[0];
  userInfo.userRole = filterByObj(commonData.data.userRole, {id: userInfo.userRole.id}, 'or', 'eq')[0];

  let newUserInfo = Object.assign({}, popUserInfo, userInfo);//生成一份新的用户数据
  userList.unshift(newUserInfo);

  return {...mockConfig.baseMock, ...{data: {id}}}
};

/*编辑用户*/
export const editUserManage = (opts) => {
  // 获取参数
  let editUserInfo = JSON.parse(opts.body);
  let {id, ...editPropsUserInfo} = editUserInfo;//获取店铺id及其他信息
  let userInfo = filterByObj(userList, {id: id}, 'or', 'eq')[0];
  editPropsUserInfo.sex = filterByObj(commonData.data.sex, {id: editPropsUserInfo.sex.id}, 'or', 'eq')[0];
  editPropsUserInfo.userRole = filterByObj(commonData.data.userRole, {id: editPropsUserInfo.userRole.id}, 'or', 'eq')[0];
  let newUserInfo = Object.assign({}, userInfo, editPropsUserInfo);

  let index = userList.findIndex(item=>{
    return item.id.toString() === id
  });
  userList.splice(index, 1, newUserInfo);

  return {...mockConfig.baseMock}
};

/*获取用户详情*/
export const detailUserManage = (opts) => {
  // 获取参数
  let id = Number(urlFormat(opts.url, 'id'));
  // 用户详情信息
  let result = filterByObj(userList, {id: id}, 'and', 'eq');
  // 用户名下商店列表
  let storeList = filterByObj(storeManageStoreList, {'user.id': id}, 'and', 'eq');
  let data = {
    userInfo: result[0],
    storeList
  };

  return {...mockConfig.baseMock, data}
};

/*激活停用*/
export const editActiveUser = (opts) => {
  // 获取参数
  let userInfo = JSON.parse(opts.body);
  let {id, isActive} = userInfo;//获取用户id
  // 用户详情信息
  let result = filterByObj(userList, {id: id}, 'and', 'eq');

  if(result && result.length){
    result[0].isActive = isActive;
  }

  return {...mockConfig.baseMock}
};


/*获取已删除用户列表*/
export const getUserManageDeleteList = (opts) => {
  let result = filterByObj(userList, {isDelete: true}, 'and');
  // 获取参数
  let page = Number(urlFormat(opts.url, 'page')) || 1;
  let pageSize = Number(urlFormat(opts.url, 'pageSize')) || 10;
  let search = urlFormat(opts.url, 'search');
  let role = urlFormat(opts.url, 'role');
  let startTime = urlFormat(opts.url, 'startTime');
  let endTime = urlFormat(opts.url, 'endTime');
  let filter = null;
  if(search){
    search = decodeURI(search);
    search = search === 'undefined' ? '' : search;
    filter = {'name': search, 'phone': search, 'email': search};
    filter = deleteObjKeyNull(filter);
    result = filterByObj(result, filter, 'or');
  }
  if(role){
    filter = {'userRole.id': role};
    result = filterByObj(result, filter, 'and');
  }
  if(startTime && endTime){
    result = filterKeyByValueRange(result, 'createTime', [startTime, endTime])
  }

  let startIndex = (page-1) * pageSize;
  let endIndex = (page) * pageSize;
  let reList = result.slice(startIndex, endIndex);

  let total = result.length;
  let data = {list: reList, pagination: {total: total, page: page, pageSize: pageSize}};
  return {...mockConfig.baseMock, data: data}
};

/*恢复已删除用户*/
export const resetDeleteUser = (opts) => {
  // 获取参数
  let userInfo = JSON.parse(opts.body);
  let {id} = userInfo;//获取用户id
  // 用户详情信息
  let result = filterByObj(userList, {id: id}, 'and', 'eq');

  if(result && result.length){
    result[0].isDelete = false;
  }

  return {...mockConfig.baseMock}
};


/*永久删除用户*/
export const deletePermanentUser = (opts) => {
  // 获取参数
  let id = JSON.parse(opts.body).id;
  let delArray = deleteDataByKeys(userList, 'id', id);
  let errmsg = '';
  if(!delArray.length){
    errmsg = '删除失败';
    mockConfig.baseMock.code = 10001;
  }

  return {...mockConfig.baseMock, errmsg}
};

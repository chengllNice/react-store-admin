
import { urlFormat, formatDate} from "@/utils";
import { mockConfig} from '../index'
import _ from 'lodash'
import { storeManageStoreList, userListBusniess} from "../createMockData";
import * as commonData from '../commonData'
import { filterByObj, filterKeyByValueRange, deleteDataByKeys, deleteObjKeyNull} from "../commonUtils";

/*生成的用户总数据*/
let storeList = _.cloneDeep(storeManageStoreList).reverse();

/*获取所有店铺列表*/
export const getStoreAllList = (opts) => {
  let result = storeList;
  // 获取参数
  let search = urlFormat(opts.url, 'search');
  let category = urlFormat(opts.url, 'category');
  let startTime = urlFormat(opts.url, 'startTime');
  let endTime = urlFormat(opts.url, 'endTime');
  let filter = null;
  if(search){
    search = decodeURI(search);
    search = search === 'undefined' ? '' : search;
    filter = {'storeName': search, 'user.name': search};
    filter = deleteObjKeyNull(filter);
    result = filterByObj(result, filter, 'or');
  }
  if(category){
    filter = {'category.id': category};
    result = filterByObj(result, filter, 'and', 'eq');
  }
  if(startTime && endTime){
    result = filterKeyByValueRange(result, 'createTime', [startTime, endTime])
  }
  let data = {list: result};
  return {...mockConfig.baseMock, data: data}
};

/*获取店铺列表*/
export const getStoreManageList = (opts) => {
  let result = storeList;
  // 获取参数
  let page = Number(urlFormat(opts.url, 'page')) || 1;
  let pageSize = Number(urlFormat(opts.url, 'pageSize')) || 10;
  let search = urlFormat(opts.url, 'search');
  let category = urlFormat(opts.url, 'category');
  let startTime = urlFormat(opts.url, 'startTime');
  let endTime = urlFormat(opts.url, 'endTime');
  let filter = null;
  if(search){
    search = decodeURI(search);
    search = search === 'undefined' ? '' : search;
    filter = {'storeName': search, 'user.name': search};
    filter = deleteObjKeyNull(filter);
    result = filterByObj(result, filter, 'or');
  }
  if(category){
    filter = {'category.id': category};
    result = filterByObj(result, filter, 'and', 'eq');
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

/*删除一个或者批量删除店铺*/
export const deleteStoreManage = (opts) => {
  // 获取参数
  let ids = JSON.parse(opts.body).ids;

  let delArray = deleteDataByKeys(storeList, 'id', ids);

  let errmsg = '';
  if(delArray.length !== ids.length){
    errmsg = '删除失败';
    mockConfig.baseMock.code = 10001;
  }

  return {...mockConfig.baseMock, errmsg}
};

/*添加新建店铺*/
export const insertStoreManage = (opts) => {
  // 获取参数
  let storeInfo = JSON.parse(opts.body);
  let popStoreInfo = storeList[0];//第一项
  let id = popStoreInfo.id + 1;//取第一项的id+1为新项id
  storeInfo.id = id;
  storeInfo.createTime = formatDate();
  // 获取用户信息
  storeInfo.user = filterByObj(userListBusniess, {id: storeInfo.user.id}, 'or', 'eq')[0];
  // 获取店铺分类
  storeInfo.category = filterByObj(commonData.data.storeCategory, {id: storeInfo.category.id}, 'or', 'eq')[0];
  // 获取店铺信誉等级
  storeInfo.creditGrade = filterByObj(commonData.data.creditGrade, {id: '0'}, 'or', 'eq')[0];
  //获取店铺默认头像,如果上传了店铺头像设置为上传的，否则设置为默认的
  if(!storeInfo.avatarImg){
    storeInfo.avatarImg = filterByObj(commonData.data.images.avatar, {id: '1'}, 'or', 'eq')[0];
  }
  storeInfo.grade = 1;//初始化店铺等级
  storeInfo.focusNum = 0;//初始化店铺关注量
  storeInfo.storeAge = 0;//初始化店铺年限

  let newStoreInfo = Object.assign({}, popStoreInfo, storeInfo);//生成一份新的用户数据
  storeList.unshift(newStoreInfo);

  return {...mockConfig.baseMock, ...{data: {id}}}
};

/*编辑店铺*/
export const editStoreManage = (opts) => {
  // 获取参数
  let editStoreInfo = JSON.parse(opts.body);
  let {id, ...editPropsStoreInfo} = editStoreInfo;//获取店铺id及其他信息
  let storeInfo = filterByObj(storeList, {id: id}, 'or', 'eq')[0];
  // 获取用户信息
  editPropsStoreInfo.user = filterByObj(userListBusniess, {id: editPropsStoreInfo.user.id}, 'or', 'eq')[0];
  // 获取店铺分类
  editPropsStoreInfo.category = filterByObj(commonData.data.storeCategory, {id: editPropsStoreInfo.category.id}, 'or', 'eq')[0];

  //获取店铺默认头像,如果上传了店铺头像设置为上传的，否则设置为默认的
  if(!editPropsStoreInfo.avatarImg){
    editPropsStoreInfo.avatarImg = filterByObj(commonData.data.images.avatar, {id: '0'}, 'or', 'eq')[0];
  }

  let newStoreInfo = Object.assign({}, storeInfo, editPropsStoreInfo);

  let index = storeList.findIndex(item=>{
    return item.id === id
  });

  storeList.splice(index, 1, newStoreInfo);

  return {...mockConfig.baseMock}
};

/*获取店铺详情*/
export const detailStoreManage = (opts) => {
  // 获取参数
  let id = Number(urlFormat(opts.url, 'id'));
  let result = filterByObj(storeList, {id: id}, 'and', 'eq');
  let data = {
    userInfo: result[0]
  };

  return {...mockConfig.baseMock, data}
};

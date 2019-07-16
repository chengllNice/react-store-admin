
// import Mock from 'mockjs';
import { urlFormat, formatDate} from "@/utils";
import { mockConfig} from '../index'
import _ from 'lodash'
import { goodsManageList, storeManageStoreList} from "../createMockData";
import { filterByObj, filterKeyByValueRange, deleteDataByKeys, deleteObjKeyNull} from "../commonUtils";

/*生成的用户总数据*/
let goodsList = _.cloneDeep(goodsManageList).reverse();

/*获取商品列表*/
export const getGoodsManageList = (opts) => {
  let result = goodsList;
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
    filter = {'name': search, 'storeInfo.storeName': search};
    filter = deleteObjKeyNull(filter);
    result = filterByObj(result, filter, 'or');
  }
  if(category){
    filter = {'category.id': category};
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

/*删除一个或者批量删除商品*/
export const deleteGoodsManage = (opts) => {
  // 获取参数
  let ids = JSON.parse(opts.body).ids;

  let delArray = deleteDataByKeys(goodsList, 'id', ids);

  let errmsg = '';
  if(delArray.length !== ids.length){
    errmsg = '删除失败';
    mockConfig.baseMock.code = 10001;
  }

  return {...mockConfig.baseMock, errmsg}
};

/*添加新建商品*/
export const insertGoodsManage = (opts) => {
  // 获取参数
  let goodsInfo = JSON.parse(opts.body);
  let popGoodsInfo = goodsList[0];//第一项
  let id = popGoodsInfo.id + 1;//取第一项的id+1为新项id
  goodsInfo.id = id;
  goodsInfo.createTime = formatDate();
  goodsInfo.storeInfo = filterByObj(storeManageStoreList, {id: goodsInfo.storeInfo.id}, 'or', 'eq')[0];
  goodsInfo.avatarImg = goodsInfo.imgs[0];
  goodsInfo.tradingTotalNum = 0;
  goodsInfo.tradingMonthNum = 0;
  goodsInfo.tradingDayNum = 0;
  goodsInfo.commitGoodRate = 100;

  let newGoodsInfo = Object.assign({}, popGoodsInfo, goodsInfo);//生成一份新的商品数据
  goodsList.unshift(newGoodsInfo);

  return {...mockConfig.baseMock, ...{data: {id}}}
};

/*编辑商品*/
export const editGoodsManage = (opts) => {
  // 获取参数
  let editGoodsInfo = JSON.parse(opts.body);
  let {id, ...editPropsGoodsInfo} = editGoodsInfo;//获取商品id及其他信息
  let goodsInfo = filterByObj(goodsList, {id: id}, 'or', 'eq')[0];
  editPropsGoodsInfo.storeInfo = filterByObj(storeManageStoreList, {id: editPropsGoodsInfo.storeInfo.id}, 'or', 'eq')[0];
  editPropsGoodsInfo.avatarImg = editPropsGoodsInfo.imgs[0];
  let newGoodsInfo = Object.assign({}, goodsInfo, editPropsGoodsInfo);


  let index = goodsList.findIndex(item=>{
    return item.id.toString() === id.toString()
  });
  goodsList.splice(index, 1, newGoodsInfo);

  return {...mockConfig.baseMock}
};

/*获取商品详情*/
export const detailGoodsManage = (opts) => {
  // 获取参数
  let id = Number(urlFormat(opts.url, 'id'));
  let result = filterByObj(goodsList, {id: id}, 'and', 'eq');
  let data = {
    goodsInfo: result[0]
  };

  return {...mockConfig.baseMock, data}
};

import {ajax_get, ajax_post} from "./index";

// 获取商铺列表
export const getStoreList = (data) => ajax_get('/fe/storeManage/storeList/get/', data);
// 删除商铺
export const delStoreList = (data) => ajax_post('/fe/storeManage/storeList/delete/', data);
// 新增商铺
export const insertStoreList = (data) => ajax_post('/fe/storeManage/storeList/insert/', data);
// 编辑商铺
export const editStoreList = (data) => ajax_post('/fe/storeManage/storeList/edit/', data);
// 获取商铺详情
export const detailStoreList = (data) => ajax_get('/fe/storeManage/storeList/detail/', data);
// 根据店铺分类统计店铺数量
export const statisticsStoreByCategory = (data) => ajax_get('/fe/statistics/store/category/get', data);
// 统计新增店铺数量
export const statisticsNewStore = (data) => ajax_get('/fe/statistics/store/new/get', data);
// 店铺排行榜（信誉、售后、星级）
export const statisticsStoreRank = (data) => ajax_get('/fe/statistics/store/rank/get', data);


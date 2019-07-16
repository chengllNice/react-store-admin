import {ajax_get} from "./index";

// 获取所有商铺列表
export const getStoreAllList = (data) => ajax_get('/fe/storeManage/storeAllList/get/', data);

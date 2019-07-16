import {ajax_get, ajax_post} from "./index";

// 获取商品列表
export const getGoodsList = (data) => ajax_get('/fe/goodsManage/goodsList/get/', data);
// 删除商品
export const delGoodsList = (data) => ajax_post('/fe/goodsManage/goodsList/delete/', data);
// 新增商品
export const insertGoodsList = (data) => ajax_post('/fe/goodsManage/goodsList/insert/', data);
// 编辑商品
export const editGoodsList = (data) => ajax_post('/fe/goodsManage/goodsList/edit/', data);
// 获取商品详情
export const detailGoodsList = (data) => ajax_get('/fe/goodsManage/goodsList/detail/', data);

import Mock from 'mockjs';
import { formatURL} from '../index'

import {
  deleteGoodsManage,
  getGoodsManageList,
  insertGoodsManage,
  editGoodsManage,
  detailGoodsManage} from "./apiList";

/*获取商品数据*/
Mock.mock(formatURL('/goodsManage/goodsList/get'), 'get', getGoodsManageList);
Mock.mock(formatURL('/goodsManage/goodsList/delete'), 'post', deleteGoodsManage);
Mock.mock(formatURL('/goodsManage/goodsList/insert'), 'post', insertGoodsManage);
Mock.mock(formatURL('/goodsManage/goodsList/edit'), 'post', editGoodsManage);
// 获取商品详情
Mock.mock(formatURL('/goodsManage/goodsList/detail'), 'get', detailGoodsManage);


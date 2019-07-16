import Mock from 'mockjs';
import { formatURL} from '../index'

import {
  getStoreAllList,
  deleteStoreManage,
  getStoreManageList,
  insertStoreManage,
  editStoreManage,
  detailStoreManage} from "./apiList";

/*获取店铺列表数据*/
Mock.mock(formatURL('/storeManage/storeList/get'), 'get', getStoreManageList);
/*获取所有店铺列表数据*/
Mock.mock(formatURL('/storeManage/storeAllList/get'), 'get', getStoreAllList);
// 删除商铺
Mock.mock(formatURL('/storeManage/storeList/delete'), 'post', deleteStoreManage);
// 新建店铺
Mock.mock(formatURL('/storeManage/storeList/insert'), 'post', insertStoreManage);
// 编辑店铺
Mock.mock(formatURL('/storeManage/storeList/edit'), 'post', editStoreManage);
// 获取用户详情
Mock.mock(formatURL('/storeManage/storeList/detail'), 'get', detailStoreManage);


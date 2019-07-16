import Mock from 'mockjs';
import { formatURL} from '../index'

import {
  getStatisticsStoreByCategory,
  getStatisticsNewStore,
  getStatisticsStoreRank} from "./storeApiList";

/*店铺按分类统计数量*/
Mock.mock(formatURL('/statistics/store/category/get'), 'get', getStatisticsStoreByCategory);
/*新增店铺数量统计*/
Mock.mock(formatURL('/statistics/store/new/get'), 'get', getStatisticsNewStore);
/*店铺排行榜（信誉、售后、星级）*/
Mock.mock(formatURL('/statistics/store/rank/get'), 'get', getStatisticsStoreRank);



import { urlFormat, formatDate} from "@/utils";
import { mockConfig} from '../index'
// import _ from 'lodash'
import { storeManageStoreList} from "../createMockData";
// import * as commonData from '../commonData'

/*统计店铺根据店铺分类*/
export const getStatisticsStoreByCategory = (opts) => {
  let data = {
    list: []
  };
  let obj = {};
  storeManageStoreList.forEach(item=>{
    if(!obj[item.category.id]){
      obj[item.category.id] = {
        name: item.category.name,
        num: 1,
      }
    }else{
      obj[item.category.id]['num']++
    }
  });
  Object.keys(obj).forEach(key=>{
    data.list.push({
      id: key,
      name: obj[key].name,
      num: obj[key].num
    })
  });
  return {...mockConfig.baseMock, data: data}
};

/*新增店铺数量统计*/
export const getStatisticsNewStore = (opts) => {
  let startTime = urlFormat(opts.url, 'startTime');
  let endTime = urlFormat(opts.url, 'endTime');
  let data = {
    list: []
  };
  let obj = {};
  storeManageStoreList.forEach(item=>{
    let createTime = formatDate(item.createTime, 'YYYY-MM-DD');
    if(startTime && endTime){
      if(createTime >= startTime && createTime <= endTime){
        if(!obj[createTime]){
          obj[createTime] = 1;
        }else{
          obj[createTime]++
        }
      }
    }else{
      if(!obj[createTime]){
        obj[createTime] = 1;
      }else{
        obj[createTime]++
      }
    }
  });
  let arr = [];
  Object.keys(obj).forEach(key=>{
    arr.push({
      dateTime: key,
      num: obj[key]
    })
  });
  data.list = arr.sort(function (a, b) {
    return new Date(a.dateTime) - new Date(b.dateTime)
  });
  return {...mockConfig.baseMock, data: data}
};

/*店铺排行榜（信誉、售后、星级）*/
export const getStatisticsStoreRank = (opts) => {
  let data = {};
  // 信誉排行(由小到大)
  storeManageStoreList.sort((a, b)=>{
    return a.creditGrade.id - b.creditGrade.id
  });
  // 返回信誉前十的店铺
  let creditGradeTop10 = storeManageStoreList.slice(0,10);
  // 售后排行(由大到小)
  storeManageStoreList.sort((a, b)=>{
    return b.serviceScore - a.serviceScore
  });
  // 返回售后前十的店铺
  let serviceScoreTop10 = storeManageStoreList.slice(0,10);
  // 星级排行(由大到小)
  storeManageStoreList.sort((a, b)=>{
    return b.rate - a.rate
  });
  // 返回星级前十的店铺
  let rateTop10 = storeManageStoreList.slice(0,10);

  data = {
    creditGradeTop10,
    serviceScoreTop10,
    rateTop10
  };
  return {...mockConfig.baseMock, data: data}
};

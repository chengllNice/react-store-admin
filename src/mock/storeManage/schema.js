import Mock from 'mockjs'
import * as commonData from '../commonData'
import userList from '../userManage/schema'
import {randomDate} from "@/utils";
import {randomLongLat} from "../commonUtils";

// const Random = Mock.Random;

/*店铺列表数据*/
const storeList = {
  'list|30-150': [
    {
      'id|+1': 1,//店铺id
      'user|1': userList.userListBusniess,//商家id
      'storeName': '@ctitle',//店铺名称
      'description': '@cparagraph',//店铺描述
      'address': '@COUNTY(true)',//店铺地址
      'category|1': commonData.data.storeCategory,//店铺所属分类
      'organizationCode': /[A-Z0-9]{8}-[A-Z0-9]$|[A-Z0-9]{8}-[A-Z0-9]-[0-9]{2}$/,//组织机构代码
      'businessLicenseImg|1': commonData.data.images.businessLicenseImg,//营业执照
      'storeAge|0-500': 0,//店铺年限(按天计)
      'focusNum|100-10000000': 0,//被关注数量（粉丝）
      'avatarImg|1': commonData.data.images.avatar,//店铺头像
      'grade': 1,//店铺等级
      'creditGrade|1': commonData.data.creditGrade,//店铺信誉等级
      'serviceScore|0-9.0-1': 0,//店铺售后评分
      'rate|0-9.0-1': 0,//店铺星级
      'latlong': function () {
        return randomLongLat([87.9345703125,118.5644531250], [21.8614987344,42.0329743324]);
      },//经纬度
      'createTime': function () {
        return randomDate('2017-01-01', new Date())
      },//创建时间
      // 'createTime': '@datetime',//创建时间
    }
  ]
};


export default {
  storeList: Mock.mock(storeList).list
}




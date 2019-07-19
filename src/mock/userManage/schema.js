import Mock from 'mockjs'
import * as commonData from '../commonData'
import commonSchema from '../commonSchema'
import {randomLongLat} from "../commonUtils";

// const Random = Mock.Random;

/*商家用户列表数据*/
const busniessList = {
  'list|30-100':[
    {
      'id|+1': 1,
      'name': '@CNAME',//真实用户姓名
      'password': '123456',//登录密码
      'sex|1': commonData.data.sex,//性别
      'IDCard': /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/,//身份证号
      'IDCardPicture|1': commonData.data.images.IDCardPicture,//身份证照片正反面
      'userRole|1': commonData.data.userRole,//用户角色
      'phone': /^1[3456789]\d{9}$/,//手机号
      'avatar|1': commonData.data.images.avatar,//头像
      'email': '@EMAIL',//邮箱
      'address': '@COUNTY(true)',//住址
      'latlong': function () {
        return randomLongLat([87.9345703125,118.5644531250], [21.8614987344,42.0329743324]);
      },//经纬度
      'storeNum|0-10': 0,//店铺数量
      'isDelete': '@boolean',//是否是删除的用户
      'isActive': '@boolean',//激活停用
      'deleteReason': '已到期',//删除原因
      'createTime': '@datetime',//创建时间
      'deleteTime': '@datetime',//删除时间
    }
  ]
};

/*管理员用户列表数据*/
const adminList = {
  'list|30-100':[
    {
      'id|+1': 1,
      'name': '@CNAME',//真实用户姓名
      'password': '123456',//登录密码
      'sex|1': commonData.data.sex,//性别
      'userRole|1': commonSchema.adminRoleList,//用户角色
      'phone': /^1[3456789]\d{9}$/,//手机号
      'avatar|1': commonData.data.images.avatar,//头像
      'email': '@EMAIL',//邮箱
      'isDelete': '@boolean',//是否是删除的用户
      'isActive': '@boolean',//激活停用
      'deleteReason': '已离职',//删除原因
      'createTime': '@datetime',//创建时间
      'deleteTime': '@datetime',//删除时间
    }
  ]
};

let userListBusniessAll = Mock.mock(busniessList);
let userListAdminAll = Mock.mock(adminList);
// let userListBusniess = userListBusniessAll.list.filter(item=>{
//   return !item.isDelete
// });
// let userListAdmin = userListAdminAll.list.filter(item=>{
//   return !item.isDelete
// });
// let userListBusniessDelete = userListBusniessAll.list.filter(item=>{
//   return item.isDelete
// });
// let userListAdminDelete = userListAdminAll.list.filter(item=>{
//   return item.isDelete
// });

export default {
  userListBusniess: userListBusniessAll.list.concat([commonData.data.userList[1]]),
  userListAdmin: userListAdminAll.list.concat([commonData.data.userList[0]]),
  // userListBusniessDelete: userListBusniessDelete,
  // userListAdminDelete: userListAdminDelete,
}




import Mock from 'mockjs'
import * as commonData from './commonData'

let length = commonData.data.adminRoleList.length;

/*角色列表数据*/
const adminRoleList = {
  [`list|${length}`]:[
    {
      'id|+1': 1,
      'uid': function () {
        return commonData.data.adminRoleList[this.id-1]['uid']
      },//真实用户姓名
      'name': function () {
        return commonData.data.adminRoleList[this.id-1]['name']
      },//登录密码
      'createTime': '@datetime',//创建时间
    }
  ]
};

export default {
  adminRoleList: Mock.mock(adminRoleList).list,
}




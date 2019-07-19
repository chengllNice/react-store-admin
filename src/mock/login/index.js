import Mock from 'mockjs'
import { formatURL} from '../index'
import { mockConfig} from '../index'
import { filterByObj} from "../commonUtils";
import { userListBusniess, userListAdmin} from '../createMockData'
let userList = [...userListBusniess, ...userListAdmin];

Mock.mock(formatURL('/user/login'), 'post', (opts) => {
  // 获取参数
  let name = JSON.parse(opts.body).name;
  let password = JSON.parse(opts.body).password;
  let result = filterByObj(userList, {name,password}, 'and', 'eq');
  if(!result || !result.length){
    // 支持手机号登录
    result = filterByObj(userList, {phone: name,password}, 'and', 'eq');
    console.log(result,'====---result==--')
  }
  console.log(result,'result==--')
  let errmsg = '';
  let code = 10000;
  let status = 400;
  let data = {};
  if(!result || !result.length){
    errmsg = '登录失败';
    code = 10001;
  }else if(result[0].isDelete){
    errmsg = '该用户已被删除，请联系管理员';
    code = 10002;
  }else if(!result[0].isActive){
    errmsg = '该用户已被停用，请联系管理员';
    code = 10002;
  }else{
    data = result[0];
    status = 200;
  }
  return {...mockConfig.baseMock, ...{errmsg, code, data, status}}
});

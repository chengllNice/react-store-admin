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
  let errmsg = '';
  let code = 10000;
  let data = {};
  if(!result || !result.length){
    errmsg = '登录失败';
    code = 10001;
  }else{
    data = result[0];
  }
  return {...mockConfig.baseMock, ...{errmsg, code, data}}
});

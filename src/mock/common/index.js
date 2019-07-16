
import Mock from 'mockjs';
import { formatURL, mockConfig} from '../index'
import * as commonData from '../commonData'
import commonSchema from '../commonSchema'
import { userListBusniess} from "../createMockData";
import { urlFormat} from "@/utils";
import { filterByObj} from '../commonUtils'

/*获取用户管理员角色数据*/
Mock.mock(formatURL('/common/userAdminRoleList/get'), 'get', {...mockConfig.baseMock, data: {list: commonSchema.adminRoleList}});

/*获取用户商家角色数据*/
Mock.mock(formatURL('/common/userBussinesRoleList/get'), 'get', {...mockConfig.baseMock, data: {list: commonData.data.userRole}});

/*获取商店类型数据*/
Mock.mock(formatURL('/common/storeCategoryList/get'), 'get', {...mockConfig.baseMock, data: {list: commonData.data.storeCategory}});

/*获取商家用户列表id name数据*/
Mock.mock(formatURL('/common/userListBusniess/get'), 'get', function (opts) {
  let search = decodeURI(urlFormat(opts.url, 'search'));
  let id = urlFormat(opts.url, 'id');
  let data = [];
  let result = userListBusniess;
  if(search && search !== 'undefined'){
    result = filterByObj(result, {'name':search}, 'or');
  }
  if(id){
    result = filterByObj(result, {'id':id}, 'or', 'eq');
  }
  result.forEach(item=>{
    data.push({
      id: item.id,
      name: item.name
    })
  });
  return {...mockConfig.baseMock, data: {list: data}}
});


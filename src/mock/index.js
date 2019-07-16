import Mock from 'mockjs';

export const mockConfig = {
  baseURL: 'mock/fe',
  baseMock: {
    status: 200,
    code: '',
    errmsg: '',
    data: {},
  }
};

export const formatURL = (url) => {
  return new RegExp(`${mockConfig.baseURL}${url}`);
};

// import './userManage/index'
require('./common/index');
require('./login/index');
require('./userManage/index');
require('./storeManage/index');
require('./authManage/index');
require('./goodsManage/index');
require('./statistics/index');


Mock.setup({
  timeout: '200-600'
});


import * as Common from './action-type'
import config from '@/config'

let defaultState = {
  currentTheme: 'default',//当前主题
  collapsed: config.collapsedDefaultOpen || true,//左侧导航状态
  breadcrumbData: [],//面包屑导航数据
  reload: false,
  userInfo: null,//登录用户信息
  windowInfo: {
    screenHeight: window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight,//浏览器高度
    screenWidth: window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,//浏览器宽度
    mainContentHeight: '',//主内容区域高度
    mainContentWidth: '',//主内容区域宽度
  }
};

let CommonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Common.COLLAPSEDTOGGLE:
      return {...state, ...{collapsed: action.value}};
    case Common.SETBREADCRUMB:
      return {...state, ...{breadcrumbData: action.value}};
    case Common.RELOAD:
      return {...state, ...{reload: action.value}};
    case Common.WINDOWINFO:
      return {...state, ...{windowInfo: action.value}};
    case Common.USERINFO:
      return {...state, ...{userInfo: action.value}};
    case Common.CURRENTTHEME:
      return {...state, ...{currentTheme: action.value}};
    default:
      return state;
  }
};

export default CommonReducer;

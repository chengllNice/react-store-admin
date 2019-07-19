
import * as Common from './action-type'

// 修改left-nav状态
export const collapsedToggle = (value)=>{
  return {
    type: Common.COLLAPSEDTOGGLE,
    value
  }
};

// 修改left-nav状态
export const setBreadcrumb = (value)=>{
  return {
    type: Common.SETBREADCRUMB,
    value
  }
};

// 修改reload状态
export const setReload = (value)=>{
  return {
    type: Common.RELOAD,
    value
  }
};

// 修改windowInfo
export const setWindowInfo = (value)=>{
  return {
    type: Common.WINDOWINFO,
    value
  }
};

// 修改登录用户信息
export const setUserInfo = (value)=>{
  return {
    type: Common.USERINFO,
    value
  }
};

// 切换主题
export const setCurrentTheme = (value)=>{
  return {
    type: Common.CURRENTTHEME,
    value
  }
};

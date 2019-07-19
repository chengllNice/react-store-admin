
module.exports = {
  name: 'X-Admin',//项目名称
  leftNavdefaultOpenAll: false,//是否默认展开所有侧导航自导航  true展开  false不展开(会展开当前路由所在的一级菜单)
  CollapseModel: true,//侧导航切换的模式 true为手风琴模式  默认false
  collapsedDefaultOpen: false,//默认是否展开侧导航 true展开  false收起

  mock: true,//是否使用mock数据, 如果是生产环境此项配置不生效(暂无真实接口支持，只能用mock数据接口)
};

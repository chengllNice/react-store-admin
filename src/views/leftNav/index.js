import React, {Component} from 'react';
import {Icon, Popover} from 'antd'
import {NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators, compose} from 'redux'
import { setBreadcrumb} from "@/redux/common/action";
import './index.scss'
import {leftNavData} from "./data";
import config from '@/config'
import { urlFormat} from "@/utils";
import CScroll from '@/components/CScroll'

class LeftNav extends Component {

  constructor(props) {
    super(props);
    this.listenRouterChange = this.listenRouterChange.bind(this);
  }


  state = {
    leftNavData: leftNavData,
    currentOpenIds: [],//当前展开项的id列表
    currentActiveId: '',//当前选中项的id
    leftNavdefaultOpenAll: config.leftNavdefaultOpenAll,//是否默认展开所有侧导航
    CollapseModel: config.CollapseModel,
  };

  /*展开收起事件*/
  changeToggle(data) {
    if (!data || !data.id) return;
    let currentOpenIds = [];
    // 手风琴模式
    if (this.state.CollapseModel) {
      // 如果当前点击项在数组中存在表明是关闭操作
      if (this.state.currentOpenIds.includes(data.id)) {
        currentOpenIds = [];
      } else {
        currentOpenIds = [data.id];
      }
      // currentOpenIds = this.state.currentOpenIds.length ? [] : [data.id];
    } else {
      // 如果当前点击项在数组中存在表明是关闭操作
      if (this.state.currentOpenIds.includes(data.id)) {
        let index = this.state.currentOpenIds.indexOf(data.id);
        this.state.currentOpenIds.splice(index, 1);
        currentOpenIds = this.state.currentOpenIds;
      } else {
        currentOpenIds = [...this.state.currentOpenIds, data.id];
      }
    }
    this.setState({
      currentOpenIds: currentOpenIds,
    });
  }

  /*初始化展开项的id列表  针对于配置默认全部展开和默认打开某个路由时需要展开项*/
  initOpenAll() {
    if (this.state.leftNavdefaultOpenAll) {
      let currentOpenIds = [];
      this.state.leftNavData.forEach(item => {
        if (item.children && item.children.length) currentOpenIds.push(item.id);
      });
      this.setState({
        currentOpenIds: currentOpenIds,
      })
    }
  }

  /*初始化当前选中项  判断当前路由下的选中项  this.props获取不到路由信息使用window.location代替*/
  initCurrentActive() {
    let routeInfo = urlFormat(window.location.href);
    let hash = routeInfo.hash;

    // 过滤出选中的一级导航或者展开的一级导航
    let openOrSelectData = this.state.leftNavData.filter(item => {
      return hash.includes(item.path)
    });
    if(!openOrSelectData.length){
      return
    }

    // 当前选中项一定是打开的，所以先删除当前选中项在currentOpenIds中的值
    let index = this.state.currentOpenIds.indexOf(openOrSelectData[0].id);
    let currentOpenIds = this.state.currentOpenIds;
    if(index > -1){
      this.state.currentOpenIds.splice(index, 1);
      currentOpenIds = this.state.currentOpenIds;
    }
    this.setState({
      currentOpenIds: currentOpenIds
    });
    // 展开二级路由所在的一级菜单
    this.changeToggle(openOrSelectData[0]);

    // 找到选中的一个菜单或者二级菜单
    let is_children = openOrSelectData[0].children && openOrSelectData[0].children.length;
    let currentActiveId = '';
    if (is_children) {
      let selectedChildrenData = openOrSelectData[0].children.filter(item => {
        return hash.includes(item.path)
      });
      currentActiveId = selectedChildrenData[0].id;
    } else {
      currentActiveId = openOrSelectData[0].id;
    }
    this.setState({
      currentActiveId: currentActiveId
    });
  }


  // 设置breadcrumb面包屑导航数据
  getRouterAndSetBreadcrumb(data){
    let routeInfo = urlFormat(window.location.href);
    let hash = routeInfo.hash;
    if(data){
      hash = data.path;
      this.setState({
        currentActiveId: data.id
      })
    }
    let hashArr = [];
    if(hash) hashArr = hash.substring(1).split('/');
    let breadcrumb = [];

    if(hashArr.length){
      let firstRoute = leftNavData.filter(item=>{
        return item.path.substring(1) === hashArr[0]
      });
      if(firstRoute && firstRoute.length){
        let childrenRoute = [];
        if(firstRoute[0].children && firstRoute[0].children.length){
          childrenRoute = firstRoute[0].children.filter(item=>{
            return item.path === hash
          });
        }
        breadcrumb.push(...[{
          name: firstRoute[0].name || ''
        },{
          name: childrenRoute && childrenRoute.length ? childrenRoute[0].name : ''
        }]);
      }
    }
    this.props.setBreadcrumb(breadcrumb);
  }

  // 监听路由变换
  listenRouterChange(){
    this.props.history.listen(()=>{
      this.initCurrentActive();
      this.getRouterAndSetBreadcrumb();
    })
  }

  popoverContentRender(item) {
    if(item.children && item.children.length){
      return (
        <div className='popover-container'>
          {
            item.children.map((children_item, children_index) => {
              return <div className='popover-container-item' key={children_item.id}>
                <NavLink exact onClick={()=>this.getRouterAndSetBreadcrumb(children_item)} className={`flex item-link ${this.state.currentActiveId === children_item.id ? 'selected' : ''}`} to={children_item.path}>
                  {children_item.name}
                </NavLink>
              </div>
            })
          }
        </div>
      )
    }
  }

  childrenRender(item){
    return (
      <div className='ellipsis left-nav-item'>
        {
          item.children && item.children.length ?
            <div className={`flex item-link ${this.state.currentOpenIds.includes(item.id) ? 'open' : ''}`} onClick={() => this.changeToggle(item)}>
                          <span className='left'>
                            {item.iconType === 'fa' ? <i className={`prefix-icon fa ${item.icon}`}></i> : <Icon className='prefix-icon' type={item.icon}/>}
                          </span>
            </div> : <NavLink exact onClick={()=>this.getRouterAndSetBreadcrumb(item)} className={`flex item-link ${this.state.currentActiveId === item.id ? 'selected' : ''}`} to={item.path}>
                          <span className='left'>
                            {item.iconType === 'fa' ? <i className={`prefix-icon fa ${item.icon}`}></i> : <Icon className='prefix-icon' type={item.icon}/>}
                          </span>
            </NavLink>
        }
      </div>
    )
  }

  componentWillMount() {
    this.initOpenAll();
    this.initCurrentActive();
    this.getRouterAndSetBreadcrumb();
  }

  componentDidMount() {
    this.listenRouterChange();
  }

  componentDidUpdate() {

  }


  render() {


    return (
      <div ref='leftNav' className={`left-nav ${this.props.collapsed ? 'left-nav-open' : 'left-nav-close'}`}>
        <CScroll>
          {
            this.state.leftNavData.map((item, index) => {
              return <div key={item.id}>
                {
                  this.props.collapsed ? <div className='ellipsis left-nav-item'>
                    {
                      item.children && item.children.length ?
                        <div className={`flex item-link ${this.state.currentOpenIds.includes(item.id) ? 'open' : ''}`} onClick={() => this.changeToggle(item)}>
                        <span className='left'>
                          {item.iconType === 'fa' ? <i className={`prefix-icon fa ${item.icon}`}></i> :
                            <Icon className='prefix-icon' type={item.icon}/>}
                        </span>
                          {
                            this.props.collapsed && <span className='flex right'>
                            {item.name}
                              {item.children && item.children.length && <i className='suffix-icon fa fa-angle-down'></i>}
                          </span>
                          }
                        </div> : <NavLink exact onClick={()=>this.getRouterAndSetBreadcrumb(item)} className={`flex item-link ${this.state.currentActiveId === item.id ? 'selected' : ''}`} to={item.path}>
                        <span className='left'>
                          {item.iconType === 'fa' ? <i className={`prefix-icon fa ${item.icon}`}></i> :
                            <Icon className='prefix-icon' type={item.icon}/>}
                        </span>
                          {
                            this.props.collapsed && <span className='flex right'>
                    {item.name}
                              {item.children && item.children.length &&
                              <i className='suffix-icon fa fa-angle-down'></i>}</span>
                          }
                        </NavLink>
                    }
                    {
                      item.children && item.children.length && this.props.collapsed && <div
                        style={{height: this.state.currentOpenIds.includes(item.id) ? `calc(${item.children.length} * 40px)` : '0px'}}
                        className={`left-nav-item-children`}>
                        {
                          item.children.map((children_item, children_index) => {
                            return <div className='left-nav-item-children-item' key={children_item.id}>
                              <NavLink exact onClick={()=>this.getRouterAndSetBreadcrumb(children_item)} className={`flex item-link ${this.state.currentActiveId === children_item.id ? 'selected' : ''}`}
                                       to={children_item.path}>
                                {/*<i className='prefix-icon fa fa-circle'></i>*/}
                                {children_item.name}
                              </NavLink>
                            </div>
                          })
                        }
                      </div>
                    }
                  </div> : <div>
                    {item.children && item.children.length ? <Popover content={this.popoverContentRender(item)} placement='right' overlayClassName='popover-content-render' getPopupContainer={()=>this.refs.leftNav}>
                      {this.childrenRender(item)}
                    </Popover> : this.childrenRender(item)}
                  </div>
                }
              </div>
            })
          }
        </CScroll>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    collapsed: state.Common.collapsed
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: bindActionCreators(setBreadcrumb, dispatch)
  }
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(LeftNav);

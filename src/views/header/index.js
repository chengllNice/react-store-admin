import React, {Component} from 'react';
import CButton from '@/components/CButton'
import { connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import { withRouter} from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd';
import {menuList} from './data'
import { setStorage} from "@/utils";
import './index.scss'
import { collapsedToggle, setWindowInfo, setUserInfo} from "../../redux/common/action";
import config from '@/config'

class Header extends Component{

  constructor(props) {
    super(props);
    this.collapsedChange = this.collapsedChange.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }

  state = {
    menuList: [],
    time: null
  };

  collapsedChange(){
    let collapse  = !this.props.collapsed;
    this.props.collapsedToggle(collapse);

    let self = this;
    clearTimeout(this.state.time);
    let time = setTimeout(function () {
      let mainContentHeight = document.getElementById('mainContent').offsetHeight;
      let mainContentWidth = document.getElementById('mainContent').offsetWidth;
      let value = {
        ...self.props.windowInfo,
        mainContentHeight,
        mainContentWidth};
      self.props.setWindowInfo && self.props.setWindowInfo(value);
    },300);
    this.setState({
      time: time
    });
  }

  menuClick(data){
    console.log(data,'===da')
    if(data.id === 'loginOut'){
      // 退出
      setStorage('userInfo', null);
      this.props.setUserInfo(null);
      this.props.history.push({
        pathname: '/login'
      })
    }
  }

  componentWillMount(){
    this.setState({
      menuList: menuList
    })
  }

  componentWillUnmount(){
    clearTimeout(this.state.time);
  }


  render(){
    const { name} = this.props.userInfo || {};

    const menu = (
      <Menu>
        {
          this.state.menuList.map((item, index)=>
            <Menu.Item key={index}>
              <CButton type='text' onClick={() => this.menuClick(item)}>{item.name}</CButton>
            </Menu.Item>
          )
        }
      </Menu>);

    return (
      <header className='flex text-color-white header'>
        <div className='logo'>{config.name}</div>
        <div className='flex info'>
          <div className='flex collapsed' onClick={this.collapsedChange}>
            <Icon type="menu-fold" />
          </div>

          <div className='user-info'>
            <Dropdown overlay={menu}>
              <span><span className='user-name'>{name}</span><Icon type="down" /></span>
            </Dropdown>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    collapsed: state.Common.collapsed,  // 侧边栏是否展开
    windowInfo: state.Common.windowInfo,
    userInfo: state.Common.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    collapsedToggle: bindActionCreators(collapsedToggle, dispatch),
    setWindowInfo: bindActionCreators(setWindowInfo, dispatch),
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
  };
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Header);

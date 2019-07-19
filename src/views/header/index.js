import React, {Component} from 'react';
import CButton from '@/components/CButton'
import { connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import { withRouter} from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd';
import {menuList} from './data'
import { setStorage} from "@/utils";
import './index.scss'
import { collapsedToggle, setWindowInfo, setUserInfo, setCurrentTheme} from "../../redux/common/action";
import config from '@/config'

class Header extends Component{

  constructor(props) {
    super(props);
    this.collapsedChange = this.collapsedChange.bind(this);
    this.menuClick = this.menuClick.bind(this);
    this.themeChange = this.themeChange.bind(this);
  }

  state = {
    menuList: [],
    time: null,
    themeMenuList: [
      [
        {
          id: 'default',
          color: '#e6f3fd',
        },
        {
          id: 'deongaree',
          color: '#344058',
        }
      ],
      [
        {
          id: 'green',
          color: '#009688',
        },
        {
          id: 'red',
          color: '#cc0000',
        }
      ]
    ]
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
    if(data.id === 'loginOut'){
      // 退出
      setStorage('userInfo', null);
      this.props.setUserInfo(null);
      this.props.history.push({
        pathname: '/login'
      })
    }else if(data.id === 'personal'){
      this.props.history.push({
        pathname: '/personal'
      })
    }
  }

  themeChange(data){
    setStorage('theme', data.id);
    this.props.setCurrentTheme(data.id);
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
    const { name, avatar} = this.props.userInfo || {};
    const url = avatar ? avatar.url : '';

    const menu = (
      <Menu>
        {
          this.state.menuList.map((item, index)=>
            <Menu.Item key={index}>
              <CButton type='text' block onClick={() => this.menuClick(item)}>{item.name}</CButton>
            </Menu.Item>
          )
        }
      </Menu>);

    const themeMenu = (
      <Menu>
        {
          this.state.themeMenuList.map((item, index)=>
            <Menu.Item key={index}>
              <div className='flex themeItem'>
                {
                  item.map(i=><div className='themeItemColor' key={i.id} style={{'backgroundColor': i.color}} onClick={() => this.themeChange(i)} />)
                }
              </div>
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


          <div className='flex info-right'>

            <div className='theme-config' ref='themeConfig'>
              <Dropdown overlay={themeMenu} getPopupContainer={() => this.refs.themeConfig}>
                <span>
                  <span className='theme-config-name'>主题皮肤</span>
                  <Icon type="down" />
                </span>
              </Dropdown>
            </div>

            <div className='user-info' ref='userInfo'>
              <Dropdown overlay={menu} getPopupContainer={() => this.refs.userInfo}>
                <span>
                  <img className='user-avatar' src={url} alt=""/>
                  <span className='user-name'>
                    {name}</span>
                  <Icon type="down" />
                </span>
              </Dropdown>
            </div>
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
    setCurrentTheme: bindActionCreators(setCurrentTheme, dispatch),
  };
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Header);

import React, {Component} from 'react';
import { withRouter} from 'react-router-dom'
// import { ajax_abort_all} from "@/servers";
import { setUserInfo} from "../redux/common/action";
import { connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { compose} from 'redux'
import './App.scss'
import Header from './header'
import LeftNav from './leftNav'
import { getStorage, setStorage} from "@/utils";
import { LocaleProvider, ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');




class App extends Component{

  state = {
    theme: null,//主题
  };

  // 在全局监听数据变化
  watchRouterChange(){
    this.props.history.listen((location)=>{
      this.userIsLogin(location);
      console.log('watchRouterChange');
      // ajax_abort_all();//路由变化时取消axios请求
    })
  }

  userIsLogin(location){
    // 判断用户是否登录，如果没有登录直接跳到login页面
    let userInfo = getStorage('userInfo');
    if(!userInfo && location.pathname !== '/login'){
      this.props.history.push({
        pathname: '/login'
      });
    }
    this.props.setUserInfo(userInfo);
  }

  // // 切换主题文件
  setThemeFile(currentTheme){
    if(!getStorage('theme')){
      setStorage('theme', currentTheme);
    }
    this.setState({
      theme: getStorage('theme')
    });
  }

  componentWillReceiveProps(nextProps){
    this.setThemeFile(nextProps.currentTheme);
  }

  componentDidMount(){
    console.log('====33')
    this.watchRouterChange();
    this.userIsLogin(this.props.history.location);
    this.setThemeFile(this.props.currentTheme);
  }

  render(){
    return (
      <ConfigProvider locale={zhCN}>
        <div className='app' data-theme={this.state.theme}>
          <Header></Header>

          <div className='flex app-content'>
            <LeftNav></LeftNav>

            <div className='app-mainContent'>
              {this.props.children}
            </div>
          </div>
        </div>
      </ConfigProvider>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo: state.Common.userInfo,
    currentTheme: state.Common.currentTheme
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
  }
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);

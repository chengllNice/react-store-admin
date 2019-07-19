import React, {Component} from 'react'
import { message } from 'antd';
import CInput from '@/components/CForm/CInput'
import CButton from '@/components/CButton'
import CBaseComponent from '@/components/CBaseComponent'
import config from '@/config'
import { postLogin} from "@/servers/commonApi";
import { setStorage} from "@/utils";
import { withRouter} from 'react-router-dom'
import { setUserInfo} from "../../redux/common/action";
import { connect} from 'react-redux'
import { bindActionCreators, compose} from 'redux'
import './index.scss'

@CBaseComponent
class Login extends Component{
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.changHandler = this.changHandler.bind(this);
  }


  state = {
    name: '',
    password: '',
  };

  changHandler(value, type){
    this.setState({
      [type]: value
    })
  }

  login(){
    if(!this.state.name || !this.state.password){
      message.error('请完善登录信息');
      return
    }
    let postData = {
      ...this.state
    };
    postLogin(postData).then(res=>{
      if(res.status === 200){
        let userInfo = res.data;
        setStorage('userInfo', userInfo);
        this.props.setUserInfo(userInfo);
        this.props.history.push({
          pathname: '/home',
        });
      }else{
        message.error(res.errmsg);
      }
    })
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className='login'>
        <div className='flex login-header'>
          <div className='login-header-logo'>{config.name}</div>
          <div className='login-header-href'>
            <a target='_blank' href="https://github.com/chengllNice" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        <div className='flex login-content'>
          <div className='login-form'>

            <div className='flex login-form-title'>
              <span>登录</span><i className='fa fa-edit'></i>
            </div>
            <div className='login-form-content'>
              <CInput value={this.state.name} placeholder='请输入用户名' onChange={(value) => this.changHandler(value, 'name')} onEnter={this.login} />
              <CInput type='password' value={this.state.password} placeholder='请输入密码' onChange={(value) => this.changHandler(value, 'password')} onEnter={this.login} />

              <CButton className='login-button' size='larger' block type='primary' onClick={this.login}>登 录</CButton>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userInfo: state.Common.userInfo,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
  }
};

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Login);

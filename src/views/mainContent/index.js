import React, { Component} from 'react'
import { connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { Card} from 'antd'
import CBreadcrumb from '@/components/CBreadcrumb'
import CButton from '@/components/CButton'
import CScroll from '@/components/CScroll'
import { setReload, setWindowInfo} from "@/redux/common/action";
import './index.scss'

class MainContent extends Component{

  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
    this.listenWindowInfo = this.listenWindowInfo.bind(this);
  }


  // static getDerivedStateFromProps(){
  //
  // }

  reload(){
    this.props.setReload(true);
  }

  // 监听window高宽变化
  listenWindowInfo(){
    let self = this;
    window.addEventListener('resize', function (e) {
      let height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
      let width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
      let mainContentHeight = document.getElementById('mainContent').offsetHeight;
      let mainContentWidth = document.getElementById('mainContent').offsetWidth;
      let value = {
        ...self.props.windowInfo,
        screenHeight: height,
        screenWidth: width,
        mainContentHeight,
        mainContentWidth};
      self.props.setWindowInfo && self.props.setWindowInfo(value);
    })
  }

  componentWillMount(){

  }

  componentDidMount(){
    this.listenWindowInfo();
  }

  componentDidUpdate(){

  }

  render(){
    return (
      <div className='main-content' id='mainContent'>
        <CScroll>
          <div className='main-content-scroll'>
            <div className='flex main-breadcrumb'>
              <CBreadcrumb data={this.props.breadcrumbData}>
                <CButton icon='reload' disabled={this.props.reload} type='primary' onClick={this.reload}></CButton>
              </CBreadcrumb>
            </div>
            <div className='main-content-body'>
              <Card className='main-content-body-card'>
                {this.props.children}
              </Card>
            </div>
          </div>
        </CScroll>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    breadcrumbData: state.Common.breadcrumbData,
    windowInfo: state.Common.windowInfo,
    reload: state.Common.reload,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setReload: bindActionCreators(setReload, dispatch),
    setWindowInfo: bindActionCreators(setWindowInfo, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);

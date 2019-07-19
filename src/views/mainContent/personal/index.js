
/*
* 个人中心
* */

import React, {Component} from 'react';
import CBaseComponent from '@/components/CBaseComponent'
import {connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { setBreadcrumb} from "@/redux/common/action";
// import PercentageEcharts from './percentageEcharts'
import './index.scss'

@CBaseComponent
class Personal extends Component{

  componentWillMount(){

  }

  componentDidMount(){
    this.props.setBreadcrumb([{name: '个人中心'}]);
  }

  render(){
    return (
      <div className='personal'>个人中心
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: bindActionCreators(setBreadcrumb, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Personal);

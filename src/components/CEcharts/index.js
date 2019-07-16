
import React, {Component} from 'react'
import { connect} from 'react-redux'
import Echarts from 'echarts'
import './index.scss'

class CEcharts extends Component{

  constructor(props) {
    super(props);
    this.initEcharts = this.initEcharts.bind(this);
    this.initOptions = this.initOptions.bind(this);
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  state = {
    echarts: null,
    options: null
  }

  initEcharts(){
    let echarts = Echarts.init(this.refs.CEcharts);
    this.setState({
      echarts: echarts
    }, () => this.initOptions(this.props.options));
  }

  initOptions(options){
    if(this.state.echarts && options){
      this.state.echarts.setOption(options)
    }
  }

  resizeHandler(){
    this.state.echarts && this.state.echarts.resize();
  }

  componentWillReceiveProps(nextProps) {
    this.initOptions(nextProps.options);
    this.resizeHandler();
  }


  componentWillMount(){

  }

  componentDidMount(){
    this.initEcharts();
  }

  render(){
    const { height} = this.props;
    let style = {};
    if(height) style = {height: height};
    return (
      <div style={style}  className='c-echarts' ref='CEcharts' />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    windowInfo: state.Common.windowInfo,
  }
};

export default connect(mapStateToProps)(CEcharts);

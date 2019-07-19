import React, {Component} from 'react';
import CEcharts from '@/components/CEcharts'
import InfoTitle from '@/components/CDetailInfo/detailInfoTitle'
import CBaseComponent from '@/components/CBaseComponent'
// import Echarts from 'echarts'
// import _ from 'lodash'

@CBaseComponent
class PercentageEcharts extends Component{
  constructor(props) {
    super(props);
    this.initOptions = this.initOptions.bind(this);
  }

  state = {
    options: {
      backgroundColor: '#1b2735',
      title: {
        text: 'CPU使用率',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 25,
          color: 'rgb(97, 142, 205)'
        }
      },
      series: [{
        type: 'liquidFill',
        radius: '80%',
        data: [0.3, 0.3, 0.3, 0.3, 0.3],
        backgroundStyle: {
          borderWidth: 5,
          borderColor: 'rgb(255,0,255,0.9)',
          color: 'rgb(255,0,255,0.01)'
        },
        label: {
          normal: {
            formatter: (0.3 * 100).toFixed(2) + '%',
            textStyle: {
              fontSize: 50
            }
          }
        }
      }]
    }
  }

  initOptions(data){
    // if(data) {
    //   let options = _.cloneDeep(this.state.options);
    //   options.series[0].data = data;
    //   this.setState({
    //     options: options
    //   })
    // }
  }

  componentWillReceiveProps(nextProps){
    // this.initOptions(nextProps.data)
  }

  componentDidMount(){
    // this.initOptions(this.props.data);
  }

  render(){
    return (
      <div className=''>
        <InfoTitle title='新增店铺数量统计'>
          {this.props.children}
        </InfoTitle>
        <CEcharts options={this.state.options} height='300px'/>
      </div>
    )
  }
}

export default PercentageEcharts

import React, {Component} from 'react';
import CEcharts from '@/components/CEcharts'
import InfoTitle from '@/components/CDetailInfo/detailInfoTitle'
import Echarts from 'echarts'
import _ from 'lodash'

export default class NewStoreEcharts extends Component{
  constructor(props) {
    super(props);
    this.initOptions = this.initOptions.bind(this);
  }


  state = {
    options: {
      title: '',
      grid: {
        left: '5%',
        top: '10%',
        bottom: '2%',
        right: '2%',
        containLabel: true,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      xAxis: {
        type: 'time',
        axisLabel: {
          textStyle: {
            color: '#666'
          }
        },
        axisTick: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        name: '数量(个)',
        max: 'dataMax',
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#666'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      },
      series: [
        {
          name: '新增店铺数量统计',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              color: new Echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#188df0'}
                ]
              )
            }
          },
          data: []
        }
      ]
    }
  }

  initOptions(data){
    if(data) {
      let options = _.cloneDeep(this.state.options);
      options.series[0].data = data;
      this.setState({
        options: options
      })
    }
  }

  componentWillReceiveProps(nextProps){
    this.initOptions(nextProps.data)
  }

  componentDidMount(){
    this.initOptions(this.props.data);
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

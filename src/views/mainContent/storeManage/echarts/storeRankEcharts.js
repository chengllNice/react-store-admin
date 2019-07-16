
/*
* 店铺排行榜
* */

import React, {Component} from 'react';
import CEcharts from '@/components/CEcharts'
import InfoTitle from '@/components/CDetailInfo/detailInfoTitle'
import _ from 'lodash'

export default class StoreRankEcharts extends Component{
  constructor(props) {
    super(props);
    this.initOptions = this.initOptions.bind(this);
  }


  state = {
    options: {
      color: [
        '#f50',
        '#13c2c2',
        '#1e9fff',
        '#67c23a',],
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
        axisPointer: {
          type: 'shadow'
        },
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: '#666'
          },
          rotate: 20,
        },
        axisTick: {
          show: false
        },
        data: []
      },
      yAxis: [
        {
          type: 'category',
          data: ['极差', '差', '一般', '良好', '优秀'],
          name: '信誉等级',
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
        {
          type: 'value',
          name: '评分',
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
        }
      ],
      series: [
        {
          name: '信誉等级',
          type: 'line',
          data: []
        },
        {
          name: '售后等级',
          type: 'bar',
          yAxisIndex: 1,
          data: []
        },
        {
          name: '星级等级',
          type: 'bar',
          yAxisIndex: 1,
          data: []
        }
      ]
    }
  }

  initOptions(data){
    if(data) {
      let options = _.cloneDeep(this.state.options);
      options.series[0].data = data.values[0];
      options.series[1].data = data.values[1];
      options.series[2].data = data.values[2];
      options.xAxis.data = data.storeNames;
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
        <InfoTitle title='店铺排行榜Top10'>
          {this.props.children}
        </InfoTitle>
        <CEcharts options={this.state.options} height='300px'/>
      </div>
    )
  }
}

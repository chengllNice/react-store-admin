import React, {Component} from 'react';
import CEcharts from '@/components/CEcharts'
import InfoTitle from '@/components/CDetailInfo/detailInfoTitle'
import Echarts from 'echarts'
import _ from 'lodash'

export default class StoreManageByCategoryEcharts extends Component{
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
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params, ticket, callback) {
          let data = params[1];
          if(data){
            return data.name + ':' + data.value;
          }
          return data.value
        }
      },
      xAxis: {
        data: [],
        axisLabel: {
          textStyle: {
            color: '#666'
          }
        },
        axisTick: {
          show: false
        },
        z: 10
      },
      yAxis: {
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
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap:'-100%',
          barCategoryGap:'40%',
          data: [],
          animation: false
        },
        {
          type: 'bar',
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
            },
            emphasis: {
              color: new Echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#2378f7'},
                  {offset: 0.7, color: '#2378f7'},
                  {offset: 1, color: '#83bff6'}
                ]
              )
            }
          },
          data: []
        }
      ]
    },
  }

  initOptions(data){
    if(data) {
      let dataShadow = [];
      let max = Math.max.apply( Math, data.yData );
      for (let i = 0; i < data.yData.length; i++) {
        dataShadow.push(max);
      }
      let options = _.cloneDeep(this.state.options);
      options.xAxis.data = data.xData;
      options.series[0].data = dataShadow;
      options.series[1].data = data.yData;


      // let xAxis = Object.assign({}, this.state.options.xAxis, {data: data.xData});
      // let series = Object.assign({}, this.state.options.series, {series: data.yData});
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
        <InfoTitle title='店铺按类型统计' />
        <CEcharts options={this.state.options} height='300px'/>
      </div>
    )
  }
}

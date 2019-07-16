import React, {Component} from 'react';
import CButton from '@/components/CButton'
import CBaseComponent from '@/components/CBaseComponent'
import {statisticsStoreByCategory, statisticsNewStore, statisticsStoreRank} from "@/servers/storeManageApi";
import StoreByCategory from './storeByCategory'
import NewStoreEcharts from './newStoreEcharts'
import StoreRankEcharts from './storeRankEcharts'
import { formatDate, getDateSeparated} from "@/utils";

@CBaseComponent
class StoreManageEcharts extends Component {
  constructor(props) {
    super(props);
    this.getStoreByCategoryData = this.getStoreByCategoryData.bind(this);
    this.statisticsNewStoreData = this.statisticsNewStoreData.bind(this);
    this.newStoreFilter = this.newStoreFilter.bind(this);
    this.storeRankFilter = this.storeRankFilter.bind(this);
  }


  state = {
    storeByCategoryData: null,
    newStoreEchartsData: null,
    storeRankEchartsAllData: null,
    storeRankEchartsData: null,
    filterDateActive: 'all',
    filterRankActive: 'creditGrade',//信誉（creditGrade） 售后（serviceScore） 星级（rate）
  }

  // 按类型统计店铺数量
  getStoreByCategoryData() {
    statisticsStoreByCategory().then(res => {
      let list = res.data.list;
      let data = {
        xData: [],
        yData: []
      };
      list.forEach(item => {
        data.xData.push(item.name);
        data.yData.push(item.num);
      });
      this.setState({
        storeByCategoryData: data
      })
    })
  }

  // 统计新增店铺数量
  statisticsNewStoreData(dateArr) {
    let getData = {};
    if(dateArr){
      getData = {
        startTime: dateArr[0],
        endTime: dateArr[1]
      };
    }
    statisticsNewStore(getData).then(res => {
      let list = res.data.list;
      let data = [];
      list.forEach(item => {
        data.push([item.dateTime, item.num]);
      });
      this.setState({
        newStoreEchartsData: data
      })
    })
  }

  // 过滤新增店铺数量统计
  newStoreFilter(type){
    let nowDate = formatDate();
    this.setState({
      filterDateActive: type
    });
    if(type === 'today'){
      this.statisticsNewStoreData([getDateSeparated(nowDate, -7),nowDate]);
    }else if(type === 'oneMonth'){
      this.statisticsNewStoreData([getDateSeparated(nowDate, -30),nowDate]);
    }else if(type === 'threeMonth'){
      this.statisticsNewStoreData([getDateSeparated(nowDate, -90),nowDate]);
    }else{
      this.statisticsNewStoreData();
    }
  }

  // 店铺排行榜（信誉、售后、星级）
  statisticsStoreRankData() {
    statisticsStoreRank().then(res => {
      this.setState({
        storeRankEchartsAllData: res.data
      }, () => this.storeRankFilter());
    })
  }

  storeRankFilter(type){
    type = type ? type : 'creditGrade';
    let topData = this.state.storeRankEchartsAllData[`${type}Top10`];
    let data = {
      storeNames: [],
      values: []
    };
    let creditGrade = [];
    let serviceScore = [];
    let rate = [];
    topData.forEach((item, index)=>{
      data.storeNames.push(item.storeName);
      creditGrade.push([item.storeName, item.creditGrade.name]);
      serviceScore.push(item.serviceScore);
      rate.push(item.rate);
    });
    data.values.push(creditGrade, serviceScore, rate);
    this.setState({
      filterRankActive: type,
      storeRankEchartsData: data
    })
    // if(type === 'creditGrade'){
    //
    // }else if(type === 'serviceScore'){
    //
    // }else if(type === 'rate'){
    //
    // }
  }

  componentDidMount() {
    this.getStoreByCategoryData();
    this.statisticsNewStoreData();
    this.statisticsStoreRankData();
  }

  render() {
    return (
      <div className='store-manage-echarts'>
        <StoreByCategory data={this.state.storeByCategoryData}/>
        <NewStoreEcharts data={this.state.newStoreEchartsData}>
          <div className='filter-date'>
            <CButton size='small' type={this.state.filterDateActive === 'all' ? 'primary' : 'default'} onClick={() => this.newStoreFilter('all')}>全部</CButton>
            <CButton size='small' type={this.state.filterDateActive === 'today' ? 'primary' : 'default'} onClick={() => this.newStoreFilter('today')}>今天</CButton>
            <CButton size='small' type={this.state.filterDateActive === 'oneMonth' ? 'primary' : 'default'} onClick={() => this.newStoreFilter('oneMonth')}>近一个月</CButton>
            <CButton size='small' type={this.state.filterDateActive === 'threeMonth' ? 'primary' : 'default'} onClick={() => this.newStoreFilter('threeMonth')}>近三个月</CButton>
          </div>
        </NewStoreEcharts>
        <StoreRankEcharts data={this.state.storeRankEchartsData}>
          <div className='filter-rank'>
            <CButton size='small' type={this.state.filterRankActive === 'creditGrade' ? 'primary' : 'default'} onClick={() => this.storeRankFilter('creditGrade')}>信誉排行</CButton>
            <CButton size='small' type={this.state.filterRankActive === 'serviceScore' ? 'primary' : 'default'} onClick={() => this.storeRankFilter('serviceScore')}>售后排行</CButton>
            <CButton size='small' type={this.state.filterRankActive === 'rate' ? 'primary' : 'default'} onClick={() => this.storeRankFilter('rate')}>星级排行</CButton>
          </div>
        </StoreRankEcharts>
      </div>
    )
  }
}

export default StoreManageEcharts

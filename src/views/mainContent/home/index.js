import React, {Component} from 'react';
import { connect} from 'react-redux'
import CInput from '@/components/CForm/CInput'
import CBaseComponent from '@/components/CBaseComponent'
import InfoTitle from '@/components/CDetailInfo/detailInfoTitle'
import BaseMap from './baseMap'
import './index.scss'

import { getStoreAllList} from "@/servers/homeApi";

@CBaseComponent
class Home extends Component{
  constructor(props) {
    super(props);
    this.getStoreListAllData = this.getStoreListAllData.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }


  state = {
    data: null,
    searchData: {
      value: '',//搜索框筛选
      placeholder: '请输入店铺名称'
    },
    loading: false,
    mapHeight: '300px',//地图高度
  };

  // 获取用户列表数据
  getStoreListAllData(){
    let getData = {
      search: this.state.searchData.value,
    };
    this.setState({
      loading: true
    });
    getStoreAllList(getData).then(res=>{
      let data = res.data.list;
      this.setState({
        data: data,
        loading: false
      });
    })
  }

  // 名称筛选
  searchHandler(value){
    this.setState({
      searchData: {...this.state.searchData, value: value}
    }, () => this.getStoreListAllData())
  }

  // 计算地图高度
  computedMapHeight(){
    let screenHeight = this.props.windowInfo && this.props.windowInfo.screenHeight;
    let mapHeight = screenHeight - 200;
    this.setState({
      mapHeight: mapHeight + 'px'
    })
  }



  componentWillReceiveProps(nextProps){
    this.computedMapHeight();
  }

  componentWillMount(){

  }


  componentDidMount(){
    this.getStoreListAllData();
    this.computedMapHeight();
  }

  render(){
    return (
      <div className='home'>
        <InfoTitle title='店铺位置信息'>
          <div className='flex home-filter'>
            <CInput value={this.state.searchData.value}
                    className='search-input'
                    type='search'
                    placeholder={this.state.searchData.placeholder} onEnter={this.searchHandler} />
          </div>
        </InfoTitle>
        <BaseMap className='home-base-map' height={this.state.mapHeight} data={this.state.data}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    windowInfo: state.Common.windowInfo,
  }
};

export default  connect(mapStateToProps)(Home);

import React, {Component} from 'react'
import CPageNew from '@/components/CPageNew'
import CBaseComponent from '@/components/CBaseComponent'
import { goodsManageListNewData} from './data'
import { insertGoodsList, detailGoodsList, editGoodsList} from "@/servers/goodsManageApi";
import { getStoreList} from "@/servers/storeManageApi";
import {setPageNewItem, setPageNewValue, urlFormat} from "@/utils";
import _ from 'lodash'
import './index.scss'

@CBaseComponent
class StoreManageListNew extends Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSearch = _.throttle(this.getStoreListData, 1000).bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getStoreListData = this.getStoreListData.bind(this);
  }


  state = {
    data: goodsManageListNewData
  }

  onChange(data){
    this.setState({
      data: setPageNewItem(this.state.data, data.data.id, 'value', data.value)
    })
  }

  onSearch(data){

  }


  onSubmit(data){
    if(data.data.imgs){
      let imgArr = [];
      data.data.imgs.forEach(item=>{
        imgArr.push({
          id: item.uid || item.id,
          url: item.url
        })
      });
      data.data.imgs = imgArr.length ? imgArr : '';
    }
    let method = null;
    if(urlFormat(this.props.history.location.search).query.type === 'edit'){
      data.data.id = urlFormat(this.props.history.location.search).query.id;
      method = editGoodsList;
    }else{
      method = insertGoodsList
    }
    method(data.data).then(res=>{
      this.props.history.goBack();
    }).catch(err=>{

    });
  }

  // 获取商品详情
  getGoodsDetailData(){
    let id = urlFormat(this.props.history.location.search).query.id;
    detailGoodsList({id}).then(res=>{
      this.getStoreListData(res.data.goodsInfo.storeInfo.storeName);
      this.setState({
        data: setPageNewValue(this.state.data, res.data.goodsInfo)
      })
    }).catch(err=>{

    })
  }

  // 获取店铺列表
  getStoreListData(data){
    let search = {};
    if(typeof data === 'string'){
      search = { search: data}
    }else{
      search = {search: data.value};
    }
    getStoreList({...search}).then(res=>{
      let data = res.data.list.slice(0,10);//只展示搜索到数据的前10条
      let list = [];
      data.forEach(item=>{
        list.push({
          value: item.id.toString(),
          name: item.storeName
        })
      });
      this.setState({
        data: setPageNewItem(this.state.data, 'storeInfo', 'options', list)
      })
    }).catch(err=>{

    })
  }


  componentWillMount(){
    if(urlFormat(this.props.history.location.search).query.type === 'edit'){
      this.getGoodsDetailData();//如果是编辑的话获取详情数据
    }
  }

  render(){
    return (
      <div className='store-manage-list-new'>
        <CPageNew data={this.state.data} onChange={this.onChange} onSearch={this.onSearch} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default StoreManageListNew

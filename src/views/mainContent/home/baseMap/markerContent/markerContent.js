import React, { Component} from 'react'
import _ from 'lodash'
import { getObjectValue} from "@/utils";
import CButton from '@/components/CButton'
import './markerContent.scss'

class MarkerContent extends Component{
  constructor(props) {
    super(props);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
    this.initContentData = this.initContentData.bind(this);
    this.goDetail = this.goDetail.bind(this);
  }


  state = {
    contentData: [
      {
        id: 'address',
        name: '店铺地址',
        value: '',
        jpath: 'address'
      },
      {
        id: 'category',
        name: '店铺分类',
        value: '',
        jpath: 'category.name'
      },
      {
        id: 'creditGrade',
        name: '信誉等级',
        value: '',
        jpath: 'creditGrade.name'
      },
      {
        id: 'rate',
        name: '好评率',
        value: '',
        jpath: 'rate'
      },
      {
        id: 'organizationCode',
        name: '组织机构代码',
        value: '',
        jpath: 'organizationCode'
      },
      {
        id: 'createTime',
        name: '创建时间',
        value: '',
        jpath: 'createTime'
      }
    ]
  };

  onRef(){
    this.props.onRef && this.props.onRef(this)
  }

  closeInfoWindow(){
    this.props.data.content && this.props.data.content.close();
  }

  initContentData(data){
    if(!data){
      return
    }
    let contentData = _.cloneDeep(this.state.contentData);
    contentData.forEach(item=>{
      item.value = getObjectValue(data, item.jpath)
    });
    this.setState({
      contentData: contentData
    })
  }

  goDetail(){
    this.props.el && this.props.el.props.history.push({
      pathname: '/storeManage/list/detail',
      search: `?id=${this.props.data.id}`
    })
  }

  componentWillReceiveProps(nextProps){
    this.initContentData(nextProps.data);
  }

  componentWillMount(){

  }

  componentDidMount(){
    this.onRef();
    this.initContentData(this.props.data);
  }

  render(){
    return (
      <div className='marker-content' ref='markerContent'>
        <div className='flex marker-content-title'>
          <span className='ellipsis'>{this.props.data.storeName}</span>
          <i className='fa fa-close' onClick={this.closeInfoWindow}></i>
        </div>
        <div className='marker-content-body'>
          {this.state.contentData.map(item=>{
            return <div className='flex content-item' key={item.id}>
              <div className='label'>{item.name}:</div>
              <div className='value'>{item.value}</div>
            </div>
          })}
        </div>
        <div className='marker-content-footer'>
          <CButton type='text' onClick={this.goDetail}>查看详情</CButton>
        </div>
      </div>
    )
  }
}

export default MarkerContent

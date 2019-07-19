import React, {Component} from 'react'
import CPageNew from '@/components/CPageNew'
import CBaseComponent from '@/components/CBaseComponent'
import { userManageListNewData} from './data'
import _ from 'lodash'
import { getUserBussinesRoleList, getAMapKeywordsSearch} from "@/servers/commonApi";
import { insertUserList, detailUserList, editUserList} from "@/servers/userManageApi";
import {setPageNewItem, urlFormat, setPageNewValue} from "@/utils";
import './index.scss'

@CBaseComponent
class UserManageListNew extends Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.getUserBussinesRoleListData = this.getUserBussinesRoleListData.bind(this);
    this.getUserDetailData = this.getUserDetailData.bind(this);
    this.getAMapKeywordsSearchData = _.debounce(this.getAMapKeywordsSearchData, 100).bind(this);
  }


  state = {
    data: userManageListNewData,
    editFlag: false,//是否是编辑状态
    addressInfo: null,
  };

  onChange(data){
    let currentOption = null;
    if(data.data.id === 'address'){
      currentOption = data.data.options.filter(item=>{
        return item.value === data.value;
      });
    }
    this.setState({
      data: setPageNewItem(this.state.data, data.data.id, 'value', data.value),
      addressInfo: currentOption && currentOption.length ? currentOption[0] : null
    })
  }

  onSearch(data, value){
    if(data.data.id === 'address'){
      this.getAMapKeywordsSearchData(data.value);
    }
  }

  onSubmit(data){
    let method = null;
    if(urlFormat(this.props.history.location.search).query.type === 'edit'){
      data.data.id = urlFormat(this.props.history.location.search).query.id;
      method = editUserList;
    }else{
      method = insertUserList
    }

    data.data.address = this.state.addressInfo ? this.state.addressInfo.name : '';
    data.data.latlong = this.state.addressInfo ? this.state.addressInfo.location : [0,0];

    method(data.data).then(res=>{
      this.props.history.goBack();
    }).catch(err=>{

    });
  }

  // 获取商店类型列表数据
  // getStoreListData(){
  //   getStoreList().then(res=>{
  //     let data = res.data.list;
  //     let list = [];
  //     data.forEach(item=>{
  //       list.push({
  //         value: item.id,
  //         name: item.name,
  //       })
  //     });
  //     this.setState({
  //       data: setPageNewItem(this.state.data, 'storeCategory', 'options', list)
  //     })
  //   }).catch(err=>{
  //
  //   })
  // }

  // 获取用户详情
  getUserDetailData(){
    let id = urlFormat(this.props.history.location.search).query.id;
    detailUserList({id}).then(res=>{
      this.setState({
        data: setPageNewValue(this.state.data, res.data.userInfo)
      })
    }).catch(err=>{

    })
  }

  // 获取用户类型列表数据
  getUserBussinesRoleListData(){
    getUserBussinesRoleList().then(res=>{
      let data = res.data.list;
      let list = [];
      data.forEach(item=>{
        list.push({
          value: item.id.toString(),
          name: item.name,
        })
      });
      let newData = setPageNewItem(this.state.data, 'userRole', 'options', list);
      if(!this.state.editFlag){
        // 如果不是编辑状态的话赋值
        newData = setPageNewItem(newData, 'userRole', 'value', '7');
      }
      this.setState({
        data: newData
      })
    }).catch(err=>{

    })
  }

  // 获取高德地图地址
  getAMapKeywordsSearchData(value){
    let data = {
      keywords: value || ''
    };
    getAMapKeywordsSearch(data).then(res=>{
      let data = res.pois;
      let options = [];
      data.forEach(item=>{
        let location = item.location.split(',').reverse();
        options.push({
          value: item.id.toString(),
          name: item.name,
          location: location
        })
      });
      this.setState({
        data: setPageNewItem(this.state.data, 'address', 'options', options)
      })
    })
  }

  componentWillMount(){
    this.getUserBussinesRoleListData();
    if(urlFormat(this.props.history.location.search).query.type === 'edit'){
      this.setState({
        editFlag: true
      });
      this.getUserDetailData();//如果是编辑的话获取详情数据
    }
    // this.getStoreListData();
  }

  render(){
    return (
      <div className='user-manage-list-new'>
        <CPageNew data={this.state.data} onChange={this.onChange} onSearch={this.onSearch} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default UserManageListNew

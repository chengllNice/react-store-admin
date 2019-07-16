import React, {Component} from 'react'
import CPageNew from '@/components/CPageNew'
import CBaseComponent from '@/components/CBaseComponent'
import { userManageListNewData} from './data'
import { getUserBussinesRoleList} from "@/servers/commonApi";
import { insertUserList, detailUserList, editUserList} from "@/servers/userManageApi";
import {setPageNewItem, urlFormat, setPageNewValue} from "@/utils";
import './index.scss'

@CBaseComponent
class UserManageListNew extends Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.getStoreListData = this.getStoreListData.bind(this);
    this.getUserBussinesRoleListData = this.getUserBussinesRoleListData.bind(this);
    this.getUserDetailData = this.getUserDetailData.bind(this);
  }


  state = {
    data: userManageListNewData,
    editFlag: false,//是否是编辑状态
  }

  onChange(data){
    this.setState({
      data: setPageNewItem(this.state.data, data.data.id, 'value', data.value)
    })
  }

  onSubmit(data){
    let method = null;
    if(urlFormat(this.props.history.location.search).query.type === 'edit'){
      data.data.id = urlFormat(this.props.history.location.search).query.id;
      method = editUserList;
    }else{
      method = insertUserList
    }
    console.log(data.data,'===')
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
      console.log(res.data,'==---==')
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
          value: item.id,
          name: item.name,
        })
      });
      let newData = setPageNewItem(this.state.data, 'userRole', 'options', list);
      if(!this.state.editFlag){
        // 如果不是编辑状态的话赋值
        newData = setPageNewItem(newData, 'userRole', 'value', '9');
      }
      this.setState({
        data: newData
      })
    }).catch(err=>{

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
        <CPageNew data={this.state.data} onChange={this.onChange} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default UserManageListNew

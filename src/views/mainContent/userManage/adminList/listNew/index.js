import React, {Component} from 'react'
import CPageNew from '@/components/CPageNew'
import CBaseComponent from '@/components/CBaseComponent'
import { userManageListNewData} from './data'
import { getUserAdminRoleList} from "@/servers/commonApi";
import { insertUserAdminList, detailUserAdminList, editUserAdminList} from "@/servers/userManageApi";
import {setPageNewItem, urlFormat, setPageNewValue} from "@/utils";
import './index.scss'

@CBaseComponent
class UserManageAdminListNew extends Component{
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getUserAdminRoleListData = this.getUserAdminRoleListData.bind(this);
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
    if(this.state.editFlag){
      data.data.id = urlFormat(this.props.history.location.search).query.id;
      method = editUserAdminList;
    }else{
      method = insertUserAdminList
    }
    method(data.data).then(res=>{
      this.props.history.goBack();
    }).catch(err=>{

    });
  }

  // 获取用户详情
  getUserDetailData(){
    let id = urlFormat(this.props.history.location.search).query.id;
    detailUserAdminList({id}).then(res=>{
      console.log(res.data,'==---==')
      this.setState({
        data: setPageNewValue(this.state.data, res.data.userInfo)
      })
    }).catch(err=>{

    })
  }

  // 获取用户类型列表数据
  getUserAdminRoleListData(){
    getUserAdminRoleList().then(res=>{
      let data = res.data.list;
      let list = [];
      data.forEach(item=>{
        list.push({
          value: item.id,
          name: item.name,
        })
      });
      let newData = setPageNewItem(this.state.data, 'userRole', 'options', list);
      this.setState({
        data: newData
      })
    }).catch(err=>{

    })
  }

  componentWillMount(){
    this.getUserAdminRoleListData();
    if(urlFormat(this.props.history.location.search).query.type === 'edit'){
      this.setState({
        editFlag: true
      });
      this.getUserDetailData();//如果是编辑的话获取详情数据
    }
  }

  render(){
    return (
      <div className='user-manage-list-new'>
        <CPageNew data={this.state.data} onChange={this.onChange} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default UserManageAdminListNew

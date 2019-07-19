
/*
* 商家用户管理
* */

import React, {Component} from 'react';
import { connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import CTable from '@/components/CTable'
import CInput from '@/components/CForm/CInput'
import CButton from '@/components/CButton'
import CBaseComponent from '@/components/CBaseComponent'
import CSwitch from '@/components/CForm/CSwitch'
import { setReload} from "@/redux/common/action";
import { tableData} from './data'
import './index.scss'
import _ from 'lodash'

import { getUserList, delUserList, editActiveUserList} from "@/servers/userManageApi";
import { getUserBussinesRoleList} from "@/servers/commonApi";

@CBaseComponent
class UserManageList extends Component{
  constructor(props) {
    super(props);
    this.getUserListData = this.getUserListData.bind(this);
    this.getUserBussinesRoleList = this.getUserBussinesRoleList.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.detailHandler = this.detailHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.delHandler = this.delHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // reload时重新加载数据
    this.getUserListData();
    this.getUserBussinesRoleList();
  }


  state = {
    columns: tableData.tHead,
    dataSource: tableData.tBody,
    page: tableData.tPage,
    loading: true,
    searchData: {
      value: '',//搜索框筛选
      filterTime: '',//日期筛选
      role: '',//角色筛选
      placeholder: '请输入用户名/邮箱/手机号码'
    },
    selectionDataIds: [],//表格checked的项的id列表
  };

  // 获取用户列表数据
  getUserListData(){
    let getData = {
      page: this.state.page.page,
      pageSize: this.state.page.pageSize,
      search: this.state.searchData.value,
      role: this.state.searchData.role,
      startTime: this.state.searchData.filterTime[0] || '',
      endTime: this.state.searchData.filterTime[1] || ''
    };
    this.setState({
      loading: true
    });
    getUserList(getData).then(res=>{
      let data = res.data.list;
      console.log(data,'ddd')
      let total = res.data.pagination.total;
      this.setState({
        dataSource: data,
        page: {...this.state.page, total},
        loading: false
      });
      this.props.setReload(false);
    })
  }

  // 获取用户角色列表
  getUserBussinesRoleList(){
    getUserBussinesRoleList().then(res=>{
      let data = res.data.list;
      let list = [];
      data.forEach(item=>{
        list.push({
          value: item.id,
          text: item.name
        })
      });
      let columncsClone = _.cloneDeep(this.state.columns);
      columncsClone.forEach(item=>{
        if(item.key === 'userRole'){
          item.filters = list
        }
      });
      this.setState({
        columns: columncsClone
      });
    })
  }

  onTableChange(data){
    if(data.type === 'page' || data.type === 'pageSize'){
      this.setState({
        page: {...this.state.page, ...data.data}
      }, () => this.getUserListData())
    }else if(data.type === 'selection'){
      this.setState({
        selectionDataIds: data.data.ids
      })
    }else if(data.type === 'filter'){
      // 日期筛选
      if(data.data.type === 'date'){
        let value = data.data.data.dateString ? data.data.data.dateString : '';
        this.setState({
          searchData: {...this.state.searchData, filterTime: value}
        }, () => this.getUserListData())
      }else{
        let value = _.isArray(data.data.value) ? data.data.value.join(',') : data.data.value;
        this.setState({
          searchData: {...this.state.searchData, role: value}
        }, () => this.getUserListData())
      }
    }
  }

  /*搜索*/
  searchHandler(value){
    this.setState({
      searchData: {...this.state.searchData, value: value}
    }, () => this.getUserListData())
  }

  /*新增*/
  addHandler(){
    this.props.history.push({
      pathname: '/userManage/list/new',
      search: '?type=new'
    })
  }

  /*单独删除或者批量删除*/
  removeHandler(){
    let delData = {
      ids: this.state.selectionDataIds
    };
    delUserList(delData).then(res=>{
      this.getUserListData();
    })
  }

  // 重置筛选项
  resetHandler(){
    this.setState({
      searchData: {...this.state.searchData, value: '', filterTime: '', role: ''},
      page: tableData.tPage
    }, () => this.getUserListData());
    this.refs.userManageList.clearFilterData();
  }

  // 查看详情
  detailHandler(data){
    this.props.history.push({
      pathname: '/userManage/list/detail',
      search: `?id=${data.id}`
    });
  }

  // 编辑当前行
  editHandler(data){
    this.props.history.push({
      pathname: '/userManage/list/new',
      search: `?type=edit&id=${data.id}`
    })
  }

  // 删除当前行
  delHandler(data){
    this.setState({
      selectionDataIds: [data.id]
    }, () => this.removeHandler());
  }

  // 激活停用用户
  editActiveChange(value, record){
    let data = {
      id: record.id,
      isActive: value
    };
    editActiveUserList(data).then(res=>{
      this.getUserListData();
    })
  }

  componentWillMount(){

  }

  componentDidMount(){
    // console.log(this.refs.userManageList.clearFilterData(),'refffffffffff')
    this.getUserListData();
    this.getUserBussinesRoleList();
  }
  render(){
    return (
      <div className='user-manage-list'>
        <div className='flex filter-wrap'>
          <div className='flex filter-left'>
            <CButton type='primary' authId='userManageListNewAdd' onClick={this.addHandler}>新增</CButton>
            <CButton type='danger' authId='userManageListBatchDelete' onClick={this.removeHandler}>批量删除</CButton>
          </div>
          <div className='flex filter-right'>
            <CInput value={this.state.searchData.value}
                    className='search-input'
                    type='search'
                    placeholder={this.state.searchData.placeholder} onEnter={this.searchHandler} />
            <CButton type='primary' onClick={this.resetHandler}>重置</CButton>
          </div>
        </div>

        <CTable ref='userManageList' loading={this.state.loading} columns={this.state.columns} dataSource={this.state.dataSource} page={this.state.page} onTableChange={this.onTableChange}>
          <div
            slot='isActive'
            render={(text, record, index) => (
              <div className='isActive'>
                <CSwitch value={record.isActive} onChange={(value) => this.editActiveChange(value, record)} />
              </div>
            )} />
          <div
            slot='operate'
            render={(text, record, index) => (
              <div className='operate'>
                <CButton type='text' onClick={() => this.detailHandler(record)}>查看</CButton>
                <CButton type='text' authId='userManageListEdit' onClick={() => this.editHandler(record)}>编辑</CButton>
                <CButton type='text' authId='userManageListDelete' onClick={() => this.delHandler(record)}>删除</CButton>
              </div>
            )} />
        </CTable>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reload: state.Common.reload,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setReload: bindActionCreators(setReload, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageList);

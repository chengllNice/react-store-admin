/*
* 管理员管理
* */

import React, {Component} from 'react';
import { connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import CTable from '@/components/CTable'
import CInput from '@/components/CForm/CInput'
import CButton from '@/components/CButton'
import CBaseComponent from '@/components/CBaseComponent'
import { setReload} from "@/redux/common/action";
import { tableData} from './data'
import './index.scss'
import _ from 'lodash'

import { getUserAdminList, delUserAdminList} from "@/servers/userManageApi";
import { getUserAdminRoleList} from "@/servers/commonApi";

@CBaseComponent
class UserManageAdminList extends Component{
  constructor(props) {
    super(props);
    this.getUserAdminListData = this.getUserAdminListData.bind(this);
    this.getUserAdminRoleListData = this.getUserAdminRoleListData.bind(this);
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
    console.log('00999dd11')
    // reload时重新加载数据
    this.getUserAdminListData();
    this.getUserAdminRoleListData();
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
      placeholder: '请输入姓名/邮箱/手机号码'
    },
    selectionDataIds: [],//表格checked的项的id列表
  };

  // 获取用户列表数据
  getUserAdminListData(){
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
    getUserAdminList(getData).then(res=>{
      let data = res.data.list;
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
  getUserAdminRoleListData(){
    getUserAdminRoleList().then(res=>{
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
      }, () => this.getUserAdminListData())
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
        }, () => this.getUserAdminListData())
      }else{
        let value = _.isArray(data.data.value) ? data.data.value.join(',') : data.data.value;
        this.setState({
          searchData: {...this.state.searchData, role: value}
        }, () => this.getUserAdminListData())
      }
    }
  }

  /*搜索*/
  searchHandler(value){
    this.setState({
      searchData: {...this.state.searchData, value: value}
    }, () => this.getUserAdminListData())
  }

  /*新增*/
  addHandler(){
    this.props.history.push({
      pathname: '/userManage/admin/new',
      search: '?type=new'
    })
  }

  /*单独删除或者批量删除*/
  removeHandler(){
    let delData = {
      ids: this.state.selectionDataIds
    };
    delUserAdminList(delData).then(res=>{
      this.getUserAdminListData();
    })
  }

  // 重置筛选项
  resetHandler(){
    this.setState({
      searchData: {...this.state.searchData, value: '', filterTime: '', role: ''},
      page: tableData.tPage
    }, () => this.getUserAdminListData());
    this.refs.userManageList.clearFilterData();
  }

  // 查看详情
  detailHandler(data){
    this.props.history.push({
      pathname: '/userManage/admin/detail',
      search: `?id=${data.id}`
    });
  }

  // 编辑当前行
  editHandler(data){
    this.props.history.push({
      pathname: '/userManage/admin/new',
      search: `?type=edit&id=${data.id}`
    })
  }

  // 删除当前行
  delHandler(data){
    this.setState({
      selectionDataIds: [data.id]
    }, () => this.removeHandler());
  }

  componentWillMount(){
    console.log('00999dd')
  }

  componentDidMount(){
    console.log('00999dd33')
    this.getUserAdminListData();
    this.getUserAdminRoleListData();
  }
  render(){
    return (
      <div className='user-manage-list'>
        <div className='flex filter-wrap'>
          <div className='flex filter-left'>
            <CButton type='primary' authId='userManageAdminListNewAdd' onClick={this.addHandler}>新增</CButton>
            <CButton type='danger' authId='userManageAdminListBatchDelete' onClick={this.removeHandler}>批量删除</CButton>
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
            slot='operate'
            render={(text, record, index) => (
              <div className='operate'>
                <CButton type='text' onClick={() => this.detailHandler(record)}>查看</CButton>
                <CButton type='text' authId='userManageAdminListEdit' onClick={() => this.editHandler(record)}>编辑</CButton>
                <CButton type='text' authId='userManageAdminListDelete' onClick={() => this.delHandler(record)}>删除</CButton>
              </div>
            )}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManageAdminList);

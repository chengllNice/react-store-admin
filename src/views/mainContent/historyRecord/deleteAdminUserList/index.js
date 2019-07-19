
/*
* 已删除商家用户列表
* */

import React, {Component} from 'react';
import { connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import { Modal} from 'antd'
import CTable from '@/components/CTable'
import CInput from '@/components/CForm/CInput'
import CButton from '@/components/CButton'
import CBaseComponent from '@/components/CBaseComponent'
import { setReload} from "@/redux/common/action";
import { tableData} from './data'
import './index.scss'
import _ from 'lodash'

import { getDeleteAdminUserList, postResetDeleteAdminUser, postPermanentDeleteAdminUser} from "@/servers/historyRecordApi";
import { getUserAdminRoleList} from "@/servers/commonApi";

@CBaseComponent
class HistoryRecordDeleteAdminUserList extends Component{
  constructor(props) {
    super(props);
    this.getDeleteUserListData = this.getDeleteUserListData.bind(this);
    this.getUserAdminRoleListData = this.getUserAdminRoleListData.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.resetRecord = this.resetRecord.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // reload时重新加载数据
    this.getDeleteUserListData();
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
      placeholder: '请输入用户名/邮箱/手机号码'
    },
  };

  // 获取用户列表数据
  getDeleteUserListData(){
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
    getDeleteAdminUserList(getData).then(res=>{
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
      }, () => this.getDeleteUserListData())
    }else if(data.type === 'filter'){
      // 日期筛选
      if(data.data.type === 'date'){
        let value = data.data.data.dateString ? data.data.data.dateString : '';
        this.setState({
          searchData: {...this.state.searchData, filterTime: value}
        }, () => this.getDeleteUserListData())
      }else{
        let value = _.isArray(data.data.value) ? data.data.value.join(',') : data.data.value;
        this.setState({
          searchData: {...this.state.searchData, role: value}
        }, () => this.getDeleteUserListData())
      }
    }
  }

  /*搜索*/
  searchHandler(value){
    this.setState({
      searchData: {...this.state.searchData, value: value}
    }, () => this.getDeleteUserListData())
  }

  // 重置筛选项
  resetHandler(){
    this.setState({
      searchData: {...this.state.searchData, value: '', filterTime: '', role: ''},
      page: tableData.tPage
    }, () => this.getDeleteUserListData());
    this.refs.historyRecordDeleteAdminUserList.clearFilterData();
  }

  // 恢复已删除用户
  resetRecord(data){
    postResetDeleteAdminUser({id: data.id}).then(res=>{
      this.getDeleteUserListData();
    })
  }

  // 永久删除
  deletePermanent(data){
    let delData = {
      id: data.id
    };
    let self = this;
    Modal.confirm({
      title: `你确定要永久删除用户${data.name}么?`,
      content: '',
      onOk(){
        postPermanentDeleteAdminUser(delData).then(res=>{
          self.getDeleteUserListData();
        })
      },
      onCancel(){

      }
    });
  }


  componentWillMount(){

  }

  componentDidMount(){
    // console.log(this.refs.historyRecordDeleteAdminUserList.clearFilterData(),'refffffffffff')
    this.getDeleteUserListData();
    this.getUserAdminRoleListData();
  }
  render(){
    return (
      <div className='history-record-delete-user-list'>
        <div className='flex filter-wrap'>
          <div className='flex filter-left'>

          </div>
          <div className='flex filter-right'>
            <CInput value={this.state.searchData.value}
                    className='search-input'
                    type='search'
                    placeholder={this.state.searchData.placeholder} onEnter={this.searchHandler} />
            <CButton type='primary' onClick={this.resetHandler}>重置</CButton>
          </div>
        </div>

        <CTable ref='historyRecordDeleteAdminUserList' checked={false} loading={this.state.loading} columns={this.state.columns} dataSource={this.state.dataSource} page={this.state.page} onTableChange={this.onTableChange}>
          <div
            slot='operate'
            render={(text, record, index) => (
              <div className='operate'>
                <CButton type='text' onClick={() => this.resetRecord(record)}>恢复</CButton>
                <CButton type='text' onClick={() => this.deletePermanent(record)}>永久删除</CButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryRecordDeleteAdminUserList);

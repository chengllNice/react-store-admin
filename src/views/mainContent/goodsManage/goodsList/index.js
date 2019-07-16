
/*
* 商品管理
* */

import React, {Component} from 'react';
import { connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import CTable from '@/components/CTable'
import CInput from '@/components/CForm/CInput'
import CButton from '@/components/CButton'
import CSwitch from '@/components/CForm/CSwitch'
import CBaseComponent from '@/components/CBaseComponent'
import { setReload} from "@/redux/common/action";
import { Modal } from 'antd';
import _ from 'lodash'
import { tableData} from './data'
import './index.scss'

import { getGoodsList, delGoodsList, editGoodsList} from "@/servers/goodsManageApi";
import { getStoreCategoryList} from "@/servers/commonApi";

@CBaseComponent
class GoodsManageList extends Component{
  constructor(props) {
    super(props);
    this.getGoodsListData = this.getGoodsListData.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.detailHandler = this.detailHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.delHandler = this.delHandler.bind(this);
    this.editStatusChange = this.editStatusChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // reload时重新加载数据
    this.getGoodsListData();
  }


  state = {
    columns: tableData.tHead,
    dataSource: tableData.tBody,
    page: tableData.tPage,
    loading: true,
    searchData: {
      value: '',//搜索框筛选
      filterTime: '',//日期筛选
      category: '',
      placeholder: '请输入商品名称/店铺名称'
    },
    selectionDataIds: [],//表格checked的项的id列表
  };

  // 获取用户列表数据
  getGoodsListData(){
    let getData = {
      page: this.state.page.page,
      pageSize: this.state.page.pageSize,
      search: this.state.searchData.value,
      category: this.state.searchData.category,
      startTime: this.state.searchData.filterTime[0] || '',
      endTime: this.state.searchData.filterTime[1] || ''
    };
    this.setState({
      loading: true
    });
    getGoodsList(getData).then(res=>{
      let data = res.data.list;
      let total = res.data.pagination.total;
      this.setState({
        dataSource: data,
        page: {...this.state.page, total},
        loading: false
      });
      this.props.setReload(false);
    }).catch(err=>{
      console.log(err,'rttt')
    })
  }

  getStoreCategoryListData(){
    getStoreCategoryList().then(res=>{
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
        if(item.key === 'category'){
          item.filters = list
        }
      });
      this.setState({
        columns: columncsClone
      });
    }).catch(err=>{

    })
  }

  onTableChange(data){
    if(data.type === 'page' || data.type === 'pageSize'){
      this.setState({
        page: {...this.state.page, ...data.data}
      }, () => this.getGoodsListData())
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
        }, () => this.getGoodsListData())
      }else{
        let value = _.isArray(data.data.value) ? data.data.value.join(',') : data.data.value;
        this.setState({
          searchData: {...this.state.searchData, category: value}
        }, () => this.getGoodsListData())
      }
    }
  }

  /*搜索*/
  searchHandler(value){
    this.setState({
      searchData: {...this.state.searchData, value: value}
    }, () => this.getGoodsListData())
  }

  /*新增*/
  addHandler(){
    this.props.history.push({
      pathname: '/goodsManage/list/new',
      search: '?type=new'
    })
  }

  /*单独删除或者批量删除*/
  removeHandler(){
    let delData = {
      ids: this.state.selectionDataIds
    };
    let self = this;
    Modal.confirm({
      title: `你确定删除么?`,
      content: '',
      onOk(){
        delGoodsList(delData).then(res=>{
          self.getGoodsListData();
        })
      },
      onCancel(){

      }
    });
  }

  // 重置筛选项
  resetHandler(){
    this.setState({
      searchData: {...this.state.searchData, value: '', filterTime: '', category: ''},
      page: tableData.tPage
    }, () => this.getGoodsListData());
    this.refs.userManageList.clearFilterData();
  }

  // 查看详情
  detailHandler(data){
    this.props.history.push({
      pathname: '/goodsManage/list/detail',
      search: `?id=${data.id}`
    });
  }

  // 编辑当前行
  editHandler(data){
    this.props.history.push({
      pathname: '/goodsManage/list/new',
      search: `?type=edit&id=${data.id}`
    })
  }

  // 删除当前行
  delHandler(data){
    this.setState({
      selectionDataIds: [data.id]
    }, () => this.removeHandler());
  }

  // 编辑商品上架下架状态
  editStatusChange(value, record){
    let data = Object.assign({}, record, {status: value});
    editGoodsList(data).then(res=>{
      this.getGoodsListData();
    })
  }

  componentWillMount(){

  }

  componentDidMount(){
    this.getGoodsListData();
    // this.getStoreCategoryListData();
  }
  render(){
    return (
      <div className='user-manage-list'>
        <div className='flex filter-wrap'>
          <div className='flex filter-left'>
            <CButton type='primary' authId='goodsManageListNewAdd' onClick={this.addHandler}>新增</CButton>
            <CButton type='danger' authId='goodsManageListBatchDelete' onClick={this.removeHandler}>批量删除</CButton>
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
            slot='status'
            render={(text, record, index) => (
              <div className='status'>
                <CSwitch value={record.status} onChange={(value) => this.editStatusChange(value, record)} />
              </div>
            )} />
          <div
            slot='operate'
            render={(text, record, index) => (
              <div className='operate'>
                <CButton type='text' onClick={() => this.detailHandler(record)}>查看</CButton>
                <CButton type='text' authId='goodsManageListEdit' onClick={() => this.editHandler(record)}>编辑</CButton>
                <CButton type='text' authId='goodsManageListDelete' onClick={() => this.delHandler(record)}>删除</CButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(GoodsManageList);

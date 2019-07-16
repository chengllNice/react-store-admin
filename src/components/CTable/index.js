import React, {Component} from 'react'
import {Table, Spin} from 'antd'
import PropTypes from 'prop-types'
import { renderTableFilter} from './tableFilter'
import FilterHead from './filterHead'
import CPage from '../CPage'
import _ from 'lodash'

class CTable extends Component{

  constructor(props) {
    super(props);
    this.filterConfirm = this.filterConfirm.bind(this);
    this.tagClose = this.tagClose.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }


  state = {
    columns: [],
    dataSource: [],
    selectedRowKeys: [],//selected的项
    filterData: [],
    loading: false,
  };

  // 初始化tableHead数据
  columnsInit(columnsData, nextProps){
    let columns = null;
    if(columnsData){
      columns = _.cloneDeep(columnsData);
    }else{
      columns = _.cloneDeep(this.props.columns);
      if(nextProps){
        columns = _.cloneDeep(nextProps.columns);
      }
    }

    columns.forEach((item, index) => {
      if(item.hasOwnProperty('filterMultiple')){
        if(item.filters){
          item.filters.forEach(filterItem=>{
            if(!filterItem.hasOwnProperty('checked')){
              filterItem.checked = false;
            }
          })
        }
        // 如果是日期筛选
        if(item.hasOwnProperty('filterDate') && !item.hasOwnProperty('dateValue')){
          item.dateValue = null;//添加日期value，为了可控的日期组件
        }
        item.filterDropdown = (data) => {
          return renderTableFilter(data, item, this.filterConfirm)
        };
      }
    });
    this.setState({
      columns: columns
    });
  }

  // 初始化tableHead数据
  dataSourceInit(nextProps){
    let dataSource = _.cloneDeep(nextProps.dataSource);
    this.setState({
      dataSource: dataSource
    });
  }

  // 过滤项发生变化时向上传递事件
  filterChangeToParent(filterData){
    let data = {
      type: 'filter',
      data: filterData
    };
    this.props.onTableChange && this.props.onTableChange(data);
  }

  // 清空过滤项数据
  clearFilterData(){
    this.setState({
      filterData: []
    });
    this.columnsInit();
  }

  // filter过滤确认
  filterConfirm(data){
    let filterData = _.cloneDeep(this.state.filterData);
    let currentIndex = filterData.findIndex(item=>{
      return item.key === data.key
    });
    let currentFilter = {};
    if(currentIndex > -1){
      // 存在则修改
      currentFilter = filterData[currentIndex];
      currentFilter.data = data.data;
      // 判断如果在close的时候data.data可能是空，这时候需要删除当前项
      if(data.type === 'filter' && !currentFilter.data.length){
        filterData.splice(currentIndex, 1);
      }else if(data.type === 'date'){
        let isHave = _.isArray(currentFilter.data.dateString) ? !!currentFilter.data.dateString.length : !!currentFilter.data.dateString;
        if(!isHave){
          filterData.splice(currentIndex, 1);
        }
      }else{
        filterData.splice(currentIndex, 1, currentFilter);
      }
    }else{
      //不存在则新添加
      filterData.push(data);
    }

    this.setState({
      filterData: filterData
    });
    this.filterChangeToParent(data);
  }

  // tag关闭事件
  tagClose(data, tag){
    let newData = data;
    let tagIndex = _.isArray(newData.data) && newData.data.findIndex(item=>{
      return item.value === tag.value
    });
    // 日期筛选类型下tagIndex为false，此项为非日期判断
    if(tagIndex !== false && (tagIndex === 0 || tagIndex > -1)){
      newData.data.splice(tagIndex, 1);
      _.isArray(newData.value) ? newData.value.splice(tagIndex, 1) : (newData.value = '');
    }
    // 如果是date筛选类型
    if(newData.type === 'date'){
      newData.data.dateString = null;
    }
    this.filterConfirm(newData);
    let columns = null;
    if(newData.type === 'filter'){
      columns = this.formCheckedFilterToColumns(newData.key, tag.value, false);
    }
    columns ? this.columnsInit(columns) : this.columnsInit();
  }

  // 根据tagClose改变columns中filter的checked
  formCheckedFilterToColumns(key, value, checked){
    let columns = _.cloneDeep(this.state.columns);
    columns.forEach(item=>{
      if(item.key === key){
        item.filters.forEach(filterItem=>{
          if(filterItem.value === value){
            filterItem.checked = checked
          }
        })
      }
    });
    return columns
  }


  // 配置rowSelection
  rowSelection(){
    if(!this.props.checked){
      return null
    }
    const { selectedRowKeys } = this.state;
    return {
      type: 'checkbox',
      fixed: 'left',
      columnWidth: 40,
      selectedRowKeys: selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys
        });
        this.tableSelectionChange(selectedRowKeys, selectedRows);
      },
      // 选择框的默认属性配置
      getCheckboxProps: record => ({
        disabled: record.disabled, // Column configuration not to be checked
        selected: record.checked,
      }),
    }
  }

  // 初始化selected
  selectedRowKeysInit(){
    let selectedRowKeys = [];
    this.state.dataSource.forEach(item=>{
      if(item.checked){
        selectedRowKeys.push(item.key);
      }
    });
    this.setState({
      selectedRowKeys: selectedRowKeys
    })
  }

  // 选择项发生变化
  tableSelectionChange(selectedRowKeys, selectedRows){
    let data = {
      type: 'selection',
      data: {
        ids: selectedRowKeys,
        data: selectedRows
      }
    };
    this.props.onTableChange && this.props.onTableChange(data);
  }


  // 分页change
  onPageChange(data){
    this.props.onTableChange && this.props.onTableChange(data);
  }

  componentWillReceiveProps(nextProps) {
    this.columnsInit(false, nextProps);
    this.setState({
      loading: nextProps.loading
    });
    this.dataSourceInit(nextProps);
  }

  componentWillMount(){
    this.setState({
      loading: this.props.loading
    });
    this.columnsInit();
    this.selectedRowKeysInit();
  }

  // 渲染tableColumn
  renderColumn(item){
    if(!item.slot){
      return <Table.Column
        {...item}
        render={(text, record, index) => (
          <div className='c-table-column'>{text}</div>
        )}/>
    }else if(this.props.children){
      if(_.isArray(this.props.children)){
        let childrenItem = this.props.children.filter((childrenItem, childrenIndex) => {
          return childrenItem.props.slot === item.slot;
        });
        if(childrenItem.length){
          return <Table.Column
            {...item}
            render={(text, record, index) => (
              <div className='c-table-column'>{childrenItem[0].props.render(text, record, index)}</div>
            )}/>
        }
        return null;
      }
      else if(this.props.children.props.slot === item.slot){
        return <Table.Column
          {...item}
          render={(text, record, index) => (
            <div className='c-table-column'>{this.props.children.props.render(text, record, index)}</div>
          )}/>
      }
      else{
        return null;
      }
    }
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  render(){
    const { bordered, size, scroll, page} = this.props;
    const scrollConfig = scroll ? {x: 'max-content'} : {x: false};
    return (
      <div className='c-table'>
        <Spin spinning={this.state.loading}>
          <FilterHead data={this.state.filterData} onTagClose={this.tagClose}/>
          {/*<Table
            rowKey='id'
            bordered={bordered}
            size={size}
            scroll={{x: '100%'}}
            pagination={false}
            rowSelection={this.rowSelection()}
            columns={this.state.columns}
            dataSource={this.state.dataSource} />*/}
          <Table
            rowKey='id'
            bordered={bordered}
            size={size}
            scroll={scrollConfig}
            pagination={false}
            rowSelection={this.rowSelection()}
            dataSource={this.state.dataSource}>
            {
              this.state.columns.map(item=>{
                return this.renderColumn(item)
              })
            }
          </Table>
          {page && !!page.total && <CPage total={page.total}
                           page={page.page}
                           pageSize={page.pageSize} onPageChange={this.onPageChange} />}
        </Spin>
      </div>
    )
  }
}

CTable.defaultProps = {
  columns: [],
  dataSource: [],
  page: {
    page: 0,
    total: 0,
    pageSize: 0
  },
  checked: true,
  bordered: true,
  size: 'small',
  showFilter: true,//是否显示过滤项
  loading: false,
  scroll: true,//默认展示scroll
};

CTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  page: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  onTableChange: PropTypes.func,
  showFilter: PropTypes.bool,
  loading: PropTypes.bool,
  scroll: PropTypes.bool,
};

export default CTable

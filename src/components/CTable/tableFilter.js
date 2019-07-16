import React from 'react'
import {List} from 'antd'
import CCheckbox from '../CForm/CCheckbox'
import CButton from '../CButton'
import CDatePicker from '../CForm/CDatePicker'
import './index.scss'

// 自定义单选筛选项菜单
export const renderTableFilter = (data, headItem, filterConfirm) => {

  let filterMultiple = headItem.filterMultiple;//多选true单选false

  let filterData = headItem.filters || [];//筛选项数据

  let key = headItem.key;//对应列的key值
  let title = headItem.title;//对应的列的name值

  // filter类型判断，判断是否为日期筛选
  let filterType = headItem.hasOwnProperty('filterDate');
  let dateType = null;//默认日期筛选的类型
  // 如果为日期筛选渲染日期组件,如果传的日期类型不在指定类型之内，默认为range
  if(filterType){
    dateType = ['date', 'mouth', 'range', 'week'].includes(headItem['filterDate']) ? headItem['filterDate'] : 'range';
  }

  let datePickerChange = (dateString) => {
    headItem.dateValue = dateString;
    filterConfirm({key: key, title: title, type: 'date', data: {dateString}});
    data.confirm();
  };



  let filterItemClick = (type, itemData, data) => {
    // 筛选选中项
    let filterSelectData = null;
    // checkbox模式下选中项的value数组
    let checkboxSelectData = [];

    let value = '';

    checkboxSelectData = filterData.filter(item=>{
      return item.checked
    });

    filterSelectData = type === 'single' ? [itemData] : checkboxSelectData;
    value = type === 'single' ? itemData.value : [];
    if(type === 'checkbox'){
      filterSelectData.forEach(item=>{
        value.push(item.value);
      });
    }
    filterConfirm({key: key, title: title, value: value
, type: 'filter', data: filterSelectData});
    data.confirm();
  };

  let checkboxFilterChange = (value, itemData) => {
    itemData.checked = value;
  };

  let render_item = (itemData)=>{
    if(filterMultiple){
      return(
        <List.Item className='table-filter-item'>
          <CCheckbox value={itemData.checked} onChange={(value) => checkboxFilterChange(value, itemData)}>{itemData.text || '--'}</CCheckbox>
        </List.Item>
      )
    }else{
      return(
        <List.Item className='table-filter-item' onClick={() => filterItemClick('single', itemData, data)}>{itemData.text || '--'}</List.Item>
      )
    }
  };

  // 筛选的footer
  let filterFooter = () => {
    return (
      <div className='flex table-filter-dropdown-footer'>
        <CButton size='small'>取消</CButton>
        <CButton type='primary' size='small' onClick={() => filterItemClick('checkbox', headItem.filters, data)}>确定</CButton>
      </div>
    )
  };

  return(
    <>
      {dateType ? <CDatePicker type={dateType} value={headItem.dateValue} onChange={(dateString) => datePickerChange(dateString)} /> : <List
        className='table-filter-dropdown-list'
        bordered
        size="small"
        dataSource={filterData}
        footer={filterMultiple ? filterFooter() : null}
        renderItem={item => (render_item(item))}
      />}
    </>
  )
};

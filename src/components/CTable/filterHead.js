/*
* 过滤项展示组件
* */

import React, {Component} from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Tag } from 'antd';

class FilterHead extends Component{


  tagClose(data, tag){
    this.props.onTagClose && this.props.onTagClose(data, tag);
  }

  flag(data){
    if(_.isArray(data.data)){
      return !!data.data.length
    }else if(_.isObject(data.data)){
      return _.isArray(data.data.dateString) ? !!data.data.dateString.length : !!data.data.dateString
    }
    return false
  }

  componentWillReceiveProps(nextProps) {

  }

  render(){
    return (
      <div className='flex filter-head'>
        {
          !!this.props.data.length && (
            <>
              <div className='flex filter-label'>
                <i className='fa fa-filter'></i>
                <span>筛选项</span>
              </div>
              <div className='flex filter-content'>
                {
                  this.props.data.map((item, index)=>{
                    return <div key={item.key}>
                      {
                        this.flag(item) && <div className='flex filter-head-item'>
                          <span className='label'>{item.title}</span>
                          <div className='filter-tag'>
                            {
                              item.type === 'filter' && item.data.map((tag, tag_index)=>{
                                return <Tag closable color="cyan" onClose={(e) => this.tagClose(item, tag)} key={tag.value}>{tag.text}</Tag>
                              })
                            }
                            {
                              item.type === 'date' && _.isString(item.data.dateString) && <Tag closable color="cyan" onClose={(e) => this.tagClose(item, item.data.dateString)}>{item.data.dateString}</Tag>
                            }
                            {
                              item.type === 'date' && _.isArray(item.data.dateString) &&  <Tag closable color="cyan" onClose={(e) => this.tagClose(item, item.data.dateString)}>{item.data.dateString[0]}-{item.data.dateString[1]}</Tag>
                            }
                          </div>
                        </div>
                      }
                    </div>
                  })
                }
              </div>
            </>
          )
        }
      </div>
    )
  }
}

FilterHead.propTypes = {
  data: PropTypes.array,
  onTagClose: PropTypes.func,
};

export default FilterHead


import React, {Component} from 'react'
import { Pagination } from 'antd';
import PropTypes from 'prop-types'

import './index.scss'

class CPage extends Component{

  state = {
    page: 1,
    pageSize: 10,
    total: 0
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.page || 1,
      pageSize: nextProps.pageSize || 10,
      total: nextProps.total || 0
    });
  }

  onShowSizeChange(current, pageSize){
    this.setState({
      page: current,
      pageSize: pageSize
    });
    let data = {
      type: 'pageSize',
      data: {
        page: current,
        pageSize: pageSize
      }
    };
    this.props.onPageChange && this.props.onPageChange(data);
  }

  onChange(page, pageSize){
    this.setState({
      page: page,
      pageSize: pageSize
    });
    let data = {
      type: 'page',
      data: {
        page: page,
        pageSize: pageSize
      }
    };
    this.props.onPageChange && this.props.onPageChange(data);
  }

  componentWillMount(){
    this.setState({
      page: this.props.page || 1,
      pageSize: this.props.pageSize || 10,
      total: this.props.total || 0
    });
  }

  render(){
    const {page, ...props} = this.props;
    return (
      <Pagination {...props}
                  className='c-page'
                  current={this.state.page}
                  pageSize={this.state.pageSize}
                  total={this.state.total}
                  onChange={(page, pageSize) => this.onChange(page, pageSize)}
                  onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}/>
    )
  }
}

CPage.defaultProps = {
  total: 0,
  page: 1,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  size: 'small',
  showTotal: total => `共 ${total} 条`,
}

CPage.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
}


export default CPage

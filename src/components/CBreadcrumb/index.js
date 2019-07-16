import React, { Component} from 'react';
import PropTypes from 'prop-types'
import { Breadcrumb} from 'antd'
import './index.scss'

class CBreadcrumb extends Component {


  render(){
    return (
      <div className='flex c-breadcrumb'>
        <Breadcrumb>
          {
            this.props.data.map((item, index)=>{
              return <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>
            })
          }
        </Breadcrumb>
        {this.props.children}
      </div>

    )
  }
}

CBreadcrumb.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.element
};

export default CBreadcrumb

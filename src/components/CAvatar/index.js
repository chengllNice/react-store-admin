import React, { Component} from 'react';
import PropTypes from 'prop-types'
import { Rate} from 'antd'
import './index.scss'

class CAvatar extends Component {
  render(){
    return (
      <div className='c-avatar flex'>
        <img className='c-avatar-img' src={this.props.avatar} alt="头像"/>
        <div className='c-avatar-info'>
          <p className='c-avatar-title'>{this.props.title}</p>
          {this.props.type === 'rate' && <div><Rate className='c-avatar-rate' value={this.props.rate} disabled /></div>}
          <div className='c-avatar-description'>{this.props.description}</div>
        </div>
      </div>
    )
  }
}

CAvatar.defaultProps = {
  type: 'user'
};

CAvatar.propTypes = {
  type: PropTypes.string,
  rate: PropTypes.number,
};

export default CAvatar

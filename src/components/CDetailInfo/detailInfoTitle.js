import React, {Component} from 'react'
import './index.scss'

class CDetailInfoTitle extends Component{
  render(){
    return (
      <div className='flex c-detail-info-title'>
        <div className='flex c-detail-info-title-left'>
          <span className='title-before-icon'></span>
          {this.props.title}
        </div>
        <div className='c-detail-info-title-right'>{this.props.children}</div>
      </div>
    )
  }
}


export default CDetailInfoTitle

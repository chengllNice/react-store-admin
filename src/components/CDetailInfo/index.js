import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import CDetailInfoTitle from './detailInfoTitle'
import CDetailInfoItem from './detailInfoItem'
import './index.scss'

class CDetailInfo extends Component{

  componentWillMount(){

  }

  render(){
    console.log(this.props.children,'this.props.children')
    return (
      <div className='c-detail-info'>
        {
          this.props.data && !!this.props.data.length && this.props.data.map((baseItem, baseIndex) => {
            return <div className='c-detail-info-base-item' key={baseItem.id}>
              {
                baseItem.title && <CDetailInfoTitle title={baseItem.title} />
              }
              {
                !!baseItem.data.length && !baseItem.slot && <CDetailInfoItem data={baseItem.data} />
              }
              {/*如果children是数组则循环判断用到的是哪一个children*/}
              {
                !!baseItem.data.length && baseItem.slot && _.isArray(this.props.children) && this.props.children.map((slotItem, slotIndex) => {
                  return slotItem.props.slot === baseItem.slot && slotItem
                })
              }
              {/*如果children是对象并且children的props.slot为data中定义的slot则展示*/}
              {
                baseItem.slot && !_.isArray(this.props.children) && this.props.children.props.slot === baseItem.slot && this.props.children
              }
            </div>
          })
        }
      </div>
    )
  }
}

CDetailInfo.defaultProps = {
  data: []
};

CDetailInfo.propTypes = {
  data: PropTypes.array,
};

export default CDetailInfo

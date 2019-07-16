import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import CSwiper from '../CSwiper'
import { Modal } from 'antd';
import './index.scss'

class CDetailInfoItem extends Component{

  constructor(props) {
    super(props);
    this.imgModalLook = this.imgModalLook.bind(this);
    this.modalCancelHandler = this.modalCancelHandler.bind(this);
  }


  state = {
    data: [],
    swiperData: [],
    modalVisible: false,
  };

  imgModalLook(data){
    if(data.value){
      let value = data.value;
      if(!_.isArray(data.value)){
        value = [value]
      }
      this.setState({
        swiperData: value,
        modalVisible: true
      });
    }
  }

  modalCancelHandler(){
    this.setState({
      modalVisible: false
    });
  }


  componentWillMount(){

  }

  render(){
    const colOne = this.props.data.slice(0, Math.ceil(this.props.data.length/2));
    const colTwo = this.props.data.slice(Math.ceil(this.props.data.length/2));
    return (
      <div className='flex c-detail-info-item' ref='CDetailInfoItem'>
        <div className='info-col info-col-one'>
          {
            colOne.map((infoItem, infoIndex) => {
              return <div className='flex info-row' key={infoItem.id}>
                <div className='info-row-label ellipsis' title={infoItem.name}>{infoItem.name}</div>
                {
                  infoItem.type === 'img' ? <div className='info-row-content img-look ellipsis' onClick={() => this.imgModalLook(infoItem)}>查看</div> : <div className='info-row-content ellipsis' title={infoItem.value}>{infoItem.value || <span className='none-value'>暂无</span>}</div>
                }
              </div>
            })
          }
        </div>
        <div className='info-col-null'></div>
        <div className='info-col info-col-two'>
          {
            colTwo.map((infoItem, infoIndex) => {
              return <div className='flex info-row' key={infoItem.id}>
                <div className='info-row-label ellipsis' title={infoItem.name}>{infoItem.name}</div>
                {
                  infoItem.type === 'img' ? <div className='info-row-content img-look ellipsis' onClick={() => this.imgModalLook(infoItem)}>查看</div> : <div className='info-row-content ellipsis' title={infoItem.value}>{infoItem.value || <span className='none-value'>暂无</span>}</div>
                }
              </div>
            })
          }
        </div>

        <Modal
          width='700px'
          getContainer={() => this.refs.CDetailInfoItem}
          visible={this.state.modalVisible}
          onCancel={this.modalCancelHandler}
          destroyOnClose={true}
          footer={null}>
          <CSwiper data={this.state.swiperData} />
        </Modal>
      </div>
    )
  }
}

CDetailInfoItem.defaultProps = {
  data: []
};

CDetailInfoItem.propTypes = {
  data: PropTypes.array,
};

export default CDetailInfoItem

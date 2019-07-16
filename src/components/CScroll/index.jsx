import React, { Component} from 'react';
// import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

export default class CScroll extends Component{
  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  static propTypes = {

  };
  renderThumb({ style, ...props }) {//设置滚动条的样式
    // 暂时不设置滚动条样式
    const thumbStyle = {
      width: '4px',
      backgroundColor: '#000000',
      opacity: '0.2',
      borderRadius: '4px',
      right: '0px',
    };
    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props}/>
    );
  }
  handleScroll(e){
    this.props.onScroll && this.props.onScroll(e);
  }
  render(){
    return(
      <Scrollbars
        onScroll={this.handleScroll}
        renderThumbVertical={this.renderThumb}//传入函数，设置滚动条样式
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        // autoHeight
        thumbMinSize={30}
        universal={true}>
        {this.props.children}
      </Scrollbars>
    )
  }
}

import React, {Component} from 'react';

export default class HistoryRecord extends Component{
  render(){
    return (
      <div>{this.props.children}</div>
    )
  }
}

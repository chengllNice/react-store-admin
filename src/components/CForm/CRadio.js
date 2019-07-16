import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import { Radio} from 'antd'
import './index.scss'

class CRadio extends Component{

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }


  state = {
    value: ''
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  changeHandler(e){
    let value = e.target.value;
    this.setState({
      value: value
    });
    this.props.onChange && this.props.onChange(value);
  }

  componentWillMount(){
    let value = this.props.value || '';
    this.setState({
      value: value
    })
  }

  render(){
    return (
      <Radio.Group onChange={(e) => this.changeHandler(e)} value={this.state.value}>
        {
          this.props.options.map((item=>{
            return <Radio key={item.value} disabled={this.props.disabled} value={item.value}>{item.name}</Radio>
          }))
        }
      </Radio.Group>
    )
  }
}

export default CRadio

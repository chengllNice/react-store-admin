import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import { Switch} from 'antd'
import './index.scss'

class CSwitch extends Component{

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }


  state = {
    value: false
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  changeHandler(checked){
    let value = checked;
    this.setState({
      value: value
    });
    this.props.onChange && this.props.onChange(value);
  }

  componentWillMount(){
    let value = this.props.value || false;
    this.setState({
      value: value
    })
  }

  render(){
    const {onChange, value, ...props} = this.props;
    return (
      <Switch {...props} checked={this.state.value} onChange={(checked) => this.changeHandler(checked)} />
    )
  }
}

CSwitch.defaultProps = {
  size: 'small'
}

export default CSwitch

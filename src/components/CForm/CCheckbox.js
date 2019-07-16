import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import { Checkbox} from 'antd'
import './index.scss'

class CCheckbox extends Component{

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

  changeHandler(e){
    let value = e.target.checked;
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
    const {onChange, ...props} = this.props;
    return (
      <Checkbox {...props} checked={this.state.value} onChange={(e) => this.changeHandler(e)}>{this.props.children}</Checkbox>
    )
  }
}

export default CCheckbox

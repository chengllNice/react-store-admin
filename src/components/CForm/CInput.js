import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Input, InputNumber} from 'antd'
import './index.scss'

class CInput extends Component{

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  state = {
    inputTypeOver: {
      'password':'Password',
      'search':'Search',
      'textarea':'TextArea',
    },
    value: ''
  }

  changeHandler(e){
    let value = this.props.type === 'number' ? e : e.target.value;
    this.setState({
      value: value
    });
    this.props.onChange && this.props.onChange(value);
  }

  enterHandler(e){
    let value = e.target.value;
    this.props.onEnter && this.props.onEnter(value);
  }

  searchHandler(value){
    this.props.onEnter && this.props.onEnter(value);
  }

  componentWillMount(){
    let defaultValue = this.props.type === 'number' ? undefined : '';
    this.setState({
      value: this.props.value || defaultValue
    })
  }

  render(){
    const {type, showNumberStep, className, onChange, onEnter, value, ...props} = this.props;

    const InputDom = this.state.inputTypeOver[type] ? Input[this.state.inputTypeOver[type]] : (type === 'input' && Input);
    const onSearch = (value) => this.searchHandler(value);
    let propsObj = {};
    if(type === 'search'){
      propsObj = {
        onSearch
      }
    }
    return (
      <>
        {!!InputDom && <InputDom {...props}
                              {...propsObj}
                              value={this.state.value}
                              className={`c-input ${className}`}
                              onChange={(e) => this.changeHandler(e)}
                              onPressEnter={(e) => this.enterHandler(e)}/>}
        {type === 'number'
        && <InputNumber {...props}
                        value={this.state.value}
                        onChange={(value) => this.changeHandler(value)}
                        className={`c-input-number ${className} ${!showNumberStep ? 'no-show-number-step' : ''}`}/>}
      </>
    )
  }
}

CInput.defaultProps = {
  type: 'input',
  showNumberStep: false,//是否显示number类型的step
  value: ''
};

CInput.propTypes = {
  type: PropTypes.string,
  showNumberStep: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default CInput

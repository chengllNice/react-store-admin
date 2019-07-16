import React, {Component} from 'react';
import CInput from './CInput'
import CSelect from './CSelect'
import CCheckbox from './CCheckbox'
import CSwitch from './CSwitch'
import CRadio from './CRadio'
import CDatePicker from './CDatePicker'
import CUpload from './CUpload'
import { Form} from 'antd'
import validateAll from "./validate";
import _ from 'lodash'

class CForm extends Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  state = {
    validateStatus: '',
    validate: true,
    info: '',
    value: ''
  }

  validateHandler(value){
    if(!this.props.checkType){
      return true
    }
    let checkTypeArr = this.props.checkType.split('|');
    let validateStatus = null;

    for (let i = 0; i< checkTypeArr.length; i++){
      let checkData = checkTypeArr[i];
      let checkArg = '';
      if(checkData.includes(':')){
        checkArg = checkData.split(':');
        checkData = checkArg[0];
        checkArg = checkArg[1];
      }
      validateStatus = validateAll[checkData](value, checkArg);
      if(!validateStatus.validate){
        break
      }
    }
    this.setState({
      validateStatus: validateStatus.validateStatus,
      validate: validateStatus.validate,
      info: validateStatus.info
    });
    return validateStatus.validate;
  }


  onChange(value){
    this.setState({
      value: value
    });
    this.validateHandler(value);
    this.props.onChange && this.props.onChange(value);
  }

  onSearch(value){
    this.props.onSearch && this.props.onSearch(value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  componentWillMount(){
    this.setState({
      value: this.props.value
    })
  }

  render(){
    const isInput = ['input', 'number', 'search', 'password', 'textarea'].includes(this.props.type);
    const isSelect = ['select', 'treeSelect'].includes(this.props.type);
    const isCheckbox = ['checkbox'].includes(this.props.type);
    const isCSwitch = ['switch'].includes(this.props.type);
    const isRadio = ['radio'].includes(this.props.type);
    const isDatePicker = ['date', 'mouth', 'range', 'week'].includes(this.props.type);
    const isUpload = ['img'].includes(this.props.type);
    let newExpand = {};
    if(this.props.expand || _.isObject(this.props.expand)){
      newExpand = _.cloneDeep(this.props.expand);
    }
    return (

    <div className='c-form'>

      <div className='flex c-form-content'>
        {
          this.props.label && <div className='c-form-label ellipsis' title={this.props.label}>
            {this.props.checkType.includes('required') && <span className='required-icon'>*</span>}
            {this.props.label}
          </div>
        }
        <div className='c-form-content-form'>
          <Form>
            <Form.Item className='c-form-item' validateStatus={this.state.validateStatus}>
              {
                isInput &&  <CInput {...newExpand} type={this.props.type} value={this.state.value} placeholder={this.props.placeholder} disabled={this.props.disabled} onChange={this.onChange} />
              }
              {
                isSelect &&  <CSelect {...newExpand} type={this.props.type} value={this.state.value} options={this.props.options} placeholder={this.props.placeholder} disabled={this.props.disabled} onChange={this.onChange} onSearch={this.onSearch} />
              }
              {
                isCheckbox &&  <CCheckbox value={this.state.value} disabled={this.props.disabled} onChange={this.onChange}>{this.props.checkName}</CCheckbox>
              }
              {
                isCSwitch &&  <CSwitch {...newExpand} value={this.state.value} disabled={this.props.disabled} onChange={this.onChange} />
              }
              {
                isRadio &&  <CRadio {...newExpand} disabled={this.props.disabled} value={this.state.value} options={this.props.options} onChange={this.onChange} />
              }
              {
                isDatePicker &&  <CDatePicker {...newExpand} type={this.props.type} disabled={this.props.disabled} value={this.state.value} onChange={this.onChange} />
              }
              {
                isUpload &&  <CUpload {...newExpand} type={this.props.type} fileList={this.state.value} onChange={this.onChange} disabled={this.props.disabled} />
              }
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className={`c-form-error-info ${!this.props.label ? 'c-form-none-label' : ''}`}>
        {this.state.info}
      </div>
    </div>
    )
  }
}

export default CForm

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { DatePicker} from 'antd'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import './index.scss'

class CDatePicker extends Component{

  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.valueFormat = this.valueFormat.bind(this);
  }


  state = {
    value: null,
    dateType: {
      'mouth': 'MonthPicker',
      'range': 'RangePicker',
      'week': 'WeekPicker '
    },
    dateFormat: 'YYYY-MM-DD HH:mm:ss'
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.hasOwnProperty('value')){
      this.valueFormat(nextProps.value);
    }
  }

  valueFormat(value){
    if(_.isString(value)){
      value = value ? moment(value, this.state.dateFormat) : null;
    }
    if(_.isArray(value)){
      value = value.length ? [moment(value[0], this.state.dateFormat),moment(value[1], this.state.dateFormat)] : null;
    }
    this.setState({
      value: value
    })
  }

  changeHandler(date, dateString){
    this.valueFormat(dateString);
    this.props.onChange && this.props.onChange(dateString);
  }

  componentWillMount(){
    this.valueFormat(this.props.value);
  }

  render(){
    const {type, value, onChange, className, ...props} = this.props;
    const DatePickerDom = this.state.dateType[type] ? DatePicker[this.state.dateType[type]] : DatePicker;
    return (
      <DatePickerDom {...props} locale={locale} value={this.state.value} className={`${className} c-date-picker`} onChange={(date, dateString) => this.changeHandler(date, dateString)}/>
    )
  }
}

CDatePicker.propTypes = {
  onChange: PropTypes.func,
};

export default CDatePicker

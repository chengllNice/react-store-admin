import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Select, TreeSelect} from 'antd'
import './index.scss'
const { Option} = Select

class CSelect extends Component{

  state = {
    value: undefined
  };

  changeHandler(value){
    this.setState({
      value: value
    });
    this.props.onChange && this.props.onChange(value);
  }

  searchHandler(value){
    this.props.onSearch && this.props.onSearch(value);
  }

  componentWillReceiveProps(nextProps) {
    let defaultValue = !nextProps.value ? undefined : nextProps.value;
    this.setState({
      value: defaultValue
    })
  }

  componentWillMount(){
    let defaultValue = !this.props.value ? undefined : this.props.value;
    this.setState({
      value: this.props.value || defaultValue
    })
  }

  render(){
    const {type, options, style, onSearch, onChange, ...props} = this.props;
    const SelectDom = type === 'treeSelect' ? TreeSelect : Select;
    return (
      <SelectDom {...props}
              value={this.state.value}
              className='c-select'
              style={{...style}}
              onSearch={(value) => this.searchHandler(value)}
              onChange={(value) => this.changeHandler(value)}>
        {
          type === 'select' && options.map((item, index)=>{
            return <Option key={index} value={item.value} disabled={item.disabled}>{item.name}</Option>
          })
        }
      </SelectDom>
    )
  }
}

CSelect.defaultProps = {
  type: 'select',
  options: [],
  style: {},
};

CSelect.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  style: PropTypes.object,
};

export default CSelect

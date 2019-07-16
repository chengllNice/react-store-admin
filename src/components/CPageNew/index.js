import React, {Component} from 'react';
import { withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import CForm from '../CForm/CForm'
import CButton from '../CButton'
import { setObjectValue, urlFormat} from "@/utils";
import './index.scss'

class CPageNew extends Component{

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.validateFormAll = this.validateFormAll.bind(this);
    this.getValueAll = this.getValueAll.bind(this);
    this.initFormatData = this.initFormatData.bind(this);
    this.setDataByKeyForValue = this.setDataByKeyForValue.bind(this);
  }

  state = {
    data: [],
  };


  onChange(data, value){
    this.setDataByKeyForValue(data, value);
    this.props.onChange && this.props.onChange({data, value});
  }

  onSearch(data, value){
    this.props.onSearch && this.props.onSearch({data, value});
  }

  /*设置data某一项的value*/
  setDataByKeyForValue(itemData, value){
    let newData = _.cloneDeep(this.state.data);
    newData.forEach(item=>{
      item.data && item.data.forEach(formItem=>{
        if(_.isArray(formItem)){
          formItem.forEach(form=>{
            if(itemData.id === form.id){
              form.value = value;
            }
          })
        }else{
          if(itemData.id === formItem.id){
            formItem.value = value;
          }
        }
      })
    });
    this.setState({
      data: newData
    })
  }

  /*获取所有项的value*/
  getValueAll(data){
    let values = {};
    data.forEach(item=>{
      item.data && item.data.forEach(formItem=>{
        if(_.isArray(formItem)){
          formItem.forEach(form=>{
            if(form.show){
              values[form.id] = form.value
            }
          })
        }else{
          if(formItem.show){
            values[formItem.id] = formItem.value;
          }
        }
      })
    });
    return values;
  }

  validateFormAll(values){
    let validateAllArr = [];
    Object.keys(this.refs).forEach(item=>{
      let data = this.refs[item];
      if(data.props.show){
        let value = values[data.props.id];
        validateAllArr.push(data.validateHandler(value));
      }
    });
    return validateAllArr.includes(false) ? false : true;
  }

  /*处理需要返回的data数据*/
  dealDataFormat(){
    let obj = {};
    this.state.data.forEach(item=>{
      item.data && item.data.forEach(formItem=>{
        if(_.isArray(formItem)){
          formItem.forEach(form=>{
            if(formItem.show){
              setObjectValue(obj, form.jpath, form.value);
            }
          })
        }else{
          if(formItem.show){
            setObjectValue(obj, formItem.jpath, formItem.value);
          }
        }
      })
    });
    return obj;
  }

  /*提交*/
  submitHandler(){
    let values = this.getValueAll(this.state.data);
    let validateStatus = this.validateFormAll(values);
    let data = {status: validateStatus, data: {}};
    if(validateStatus){
      data.data = this.dealDataFormat();
      this.props.onSubmit && this.props.onSubmit(data);
      return data;
    }
    return null;
  }

  /*取消*/
  cancelHandler(){
    this.props.history.goBack();
    this.props.onCancel && this.props.onCancel();
  }

  componentWillReceiveProps(nextProps){
    this.initFormatData(nextProps.data);
    // let values = this.getValueAll(this.props.data);
    // this.validateFormAll(values);
  }

  // 初始时格式化data数据
  initFormatData(data){
    let newData = _.cloneDeep(data);
    let url = urlFormat(this.props.history.location.search);
    let disabledKey = 'newDisabled';
    let showKey = 'newShow';
    if(url.query && url.query.type === 'edit'){
      disabledKey = 'editDisabled';
      showKey = 'editShow';
    }
    _.isArray(newData) && newData.forEach(item=>{
      item.data && item.data.forEach(formItem=>{
        if(_.isArray(formItem)){
          formItem.forEach(form=>{
            form.disabled = form[disabledKey] || false;
            form.show = form[showKey] || false;
          })
        }else{
          formItem.disabled = formItem[disabledKey] || false;
          formItem.show = formItem[showKey] || false;
        }
      })
    });
    this.setState({
      data: newData
    })

  }

  componentWillMount(){
    this.initFormatData(this.props.data);
    let values = this.getValueAll(this.props.data);
    this.validateFormAll(values);
  }

  componentDidMount(){
    // 针对无状态组件返回组件this
    this.props.onRef && this.props.onRef(this);
  }

  render(){
    return (
      <div className='c-page-new'>
        {
          !!this.state.data.length && this.state.data.map((pageItem, pageIndex)=>{
            return <div className='c-page-new-item' key={pageItem.id}>
              {pageItem.title && <div className='flex c-page-new-item-title'><span className='title-before-icon'></span>{pageItem.title}</div>}
              {!!pageItem.data.length && pageItem.data.map((formItem, formIndex)=>{
                return <div className='flex c-page-form' key={formItem.id}>
                  {_.isArray(formItem) && formItem.map((item, index) => {
                    return <React.Fragment key={item.id}>
                      {
                        item.show && <div className='c-page-form-item'>
                          <CForm {...item}
                                 ref={item.id}
                                 label={item.name}
                                 onChange={(value) => this.onChange(item, value)}
                                 onSearch={(value) => this.onSearch(item, value)}/>
                        </div>
                      }
                    </React.Fragment>
                  })}
                  {
                    _.isObject(formItem) && formItem.show && <div className='c-page-form-item'>
                      <CForm {...formItem}
                             ref={formItem.id}
                             label={formItem.name}
                             onChange={(value) => this.onChange(formItem, value)}
                             onSearch={(value) => this.onSearch(formItem, value)}/>
                    </div>
                  }
                </div>
              })}
            </div>
          })
        }
        {
          this.props.footerShow && <div className='c-page-footer-button'>
            <CButton size='larger' type='primary' onClick={this.submitHandler}>确定</CButton>
            <CButton size='larger' onClick={this.cancelHandler}>取消</CButton>
          </div>
        }
      </div>
    )
  }
}

CPageNew.defaultProps = {
  footerShow: true
};


CPageNew.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  footerShow: PropTypes.bool,
};



export default withRouter(CPageNew)

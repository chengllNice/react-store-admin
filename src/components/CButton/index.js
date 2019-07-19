import React, { Component} from 'react';
import PropTypes from 'prop-types'
import { Button, Icon} from 'antd'
import './index.scss'

class CButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e){
    e.preventDefault();
    this.props.onClick && this.props.onClick();
  }

  render(){
    const {icon, type, size, disabled, className, authId, ...props} = this.props;
    const iconRender = icon.includes('fa') ? <i className={`fa ${icon}`}></i> : <Icon type={icon}/>;
    return (
      <div className={`c-button ${props.block ? 'c-button-block' : ''} ${className?className:''}`}>
        <Button
          className={`c-button-base c-button-${type} c-button-size-${size} ${disabled ? 'c-button-disabled' : ''} ${icon ? 'c-button-icon' : ''}` }
          {...props}
          onClick={(e) => this.clickHandler(e)}>
          {icon !== '' ? iconRender : ''}
          {
            this.props.children
          }
        </Button>
      </div>
    )
  }
}

CButton.defaultProps = {
  type: 'default',
  size: 'default',
  icon: '',
  disabled: false,
  loading: false,
};

CButton.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  shape: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  authId: PropTypes.string,//权限id
};

export default CButton

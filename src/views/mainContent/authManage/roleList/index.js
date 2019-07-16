/*
* 管理员角色管理
* */

import React, {Component} from 'react';
import { connect} from 'react-redux'
import { bindActionCreators} from 'redux'
import CTable from '@/components/CTable'
import CButton from '@/components/CButton'
import CPageNew from '@/components/CPageNew'
import CBaseComponent from '@/components/CBaseComponent'
import { Modal} from 'antd'
import { setReload} from "@/redux/common/action";
import { tableData, authManageRoleListNewData} from './data'
import './index.scss'

import { delRoleList, insertRoleList, editRoleList} from "@/servers/authManageApi";
import { getUserAdminRoleList} from "@/servers/commonApi";
import {setPageNewValue} from "@/utils";

@CBaseComponent
class AuthManageRole extends Component{
  constructor(props) {
    super(props);
    this.getUserAdminRoleListData = this.getUserAdminRoleListData.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.delHandler = this.delHandler.bind(this);
    this.modalPageNewRef = this.modalPageNewRef.bind(this);
    this.modalOk = this.modalOk.bind(this);
    this.modalCancel = this.modalCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // reload时重新加载数据
    this.getUserAdminRoleListData();
  }


  state = {
    columns: tableData.tHead,
    dataSource: tableData.tBody,
    loading: true,
    modal: {
      title: '添加角色',
      visible: false,
      type: 'new',//新建还是编辑
    },
    currentRowData: null,//点击的当前行数据
    formData: authManageRoleListNewData,
    modalPageNewRef: null,//modal中pageNew的this
  };


  // 获取用户角色列表
  getUserAdminRoleListData(){
    this.setState({
      loading: true,
    });
    getUserAdminRoleList().then(res=>{
      let data = res.data.list;
      this.setState({
        dataSource: data,
        loading: false
      });
      this.props.setReload(false);
    }).catch(err=>{
      this.props.setReload(false);
    })
  }

  modalOk(){
    // 调用子组件pageNew的提交方法
    let data = this.state.modalPageNewRef.submitHandler();
    if(data){
      let editFlag = this.state.modal.type === 'edit';
      let method = editFlag ? editRoleList : insertRoleList;
      if(editFlag){
        data.data.id = this.state.currentRowData.id;
      }
      method(data.data).then(res=>{
        this.setState({
          modal: {...this.state.modal, visible: false}
        });
        this.getUserAdminRoleListData();
      }).catch(err=>{
        this.setState({
          modal: {...this.state.modal, visible: false}
        });
      })
    }
  }

  modalCancel(){
    this.setState({
      modal: {...this.state.modal, visible: false}
    })
  }

  /*新增打开modal*/
  addHandler(){
    this.setState({
      modal: {...this.state.modal, visible: true, type: 'new'}
    })
  }

  // 编辑
  editHandler(data){
    let formData = setPageNewValue(this.state.formData, data);
    this.setState({
      modal: {...this.state.modal, title: '编辑角色', visible: true, type: 'edit'},
      formData: formData,
      currentRowData: data
    });
  }

  // 删除当前行
  delHandler(data){
    let delData = {
      id: data.id
    };
    let self = this;
    Modal.confirm({
      title: `你确定删除么?`,
      content: '',
      onOk(){
        delRoleList(delData).then(res=>{
          self.getUserAdminRoleListData()
        })
      },
      onCancel(){

      }
    });
  }

  // 获取并设置pageNew组件
  modalPageNewRef(ref){
    this.setState({
      modalPageNewRef: ref
    })
  }

  componentWillMount(){

  }

  componentDidMount(){
    this.getUserAdminRoleListData();
  }
  render(){
    return (
      <div className='auth-manage-list'>
        <div className='flex filter-wrap'>
          <div className='flex filter-left'>
            <CButton type='primary' authId='authManageRoleListNewAdd' onClick={this.addHandler}>新增</CButton>
          </div>
        </div>

        <CTable ref='authManageRoleList' loading={this.state.loading} columns={this.state.columns} dataSource={this.state.dataSource} scroll={false} checked={false}>
          <div
            slot='operate'
            render={(text, record, index) => (
              <div className='operate'>
                <CButton type='text' authId='authManageRoleListEdit' onClick={() => this.editHandler(record)}>编辑</CButton>
                <CButton type='text' authId='authManageRoleListDelete' onClick={() => this.delHandler(record)}>删除</CButton>
              </div>
            )} />
        </CTable>


        <Modal
          title={this.state.modal.title}
          visible={this.state.modal.visible}
          onOk={this.modalOk}
          onCancel={this.modalCancel}
        >
          <CPageNew data={this.state.formData} footerShow={false} onRef={this.modalPageNewRef}/>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reload: state.Common.reload,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setReload: bindActionCreators(setReload, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthManageRole);

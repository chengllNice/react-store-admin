import React, {Component} from 'react'
import { Upload, Icon, Modal, message} from 'antd'
// import PropTypes from 'prop-types'
import _ from 'lodash'

class CUpload extends Component{

  constructor(props) {
    super(props);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.modalCancel = this.modalCancel.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  state = {
    uploads: {
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      accept: '.png,.jpg,.jpeg,.svg',
      disabled: false,
      name: 'file',
      listType: 'picture-card',
      showUploadList: true,
      defaultFileList: [],//{uid: '', name: '', url: ''}
      fileList: [],
      limit: Infinity,//限制上传数量 默认无限制
      size: 1024*1024*2,//默认限制大小为2M
    },
    previewVisible: false,
    previewImage: ''
  };

  // 初始化upload选项
  initUploadState(data){
    if(!data){
      return
    }
    const {fileList, ...props} = _.cloneDeep(data);
    if(!fileList || !_.isArray(fileList)){
      return
    }
    fileList.forEach(item=>{
      if(item.hasOwnProperty('id')){
        item.uid = item.id.toString();
        item.status = 'done';
        item.thumbUrl = item.url;
      }
    });
    this.setState({
      uploads: {...this.state.uploads, ...props, fileList},
    })
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // 点击modal打开
  async handlePreview(file){
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }

  // 上传之前的判断
  beforeUpload(file, fileList){
    let name = file.name;
    let size = file.size;
    let currentFileType = name.split('.').pop();
    let fileType = this.state.uploads.accept.split(',');

    if(this.state.uploads.size < size){
      message.info('文件大小超过最大限制');
      return false;
    }

    if(fileType.includes(`.${currentFileType}`)){
      return true;
    }else{
      message.info('请上传指定的文件类型');
    }
    return false
  }

  // 上传change
  handleChange({file, fileList, event}){
    if(file.status === 'done'){
      let data = [];
      fileList.forEach(item=>{
        if(item.response){
          item.response.uid = item.uid;
          data.push(item.response)
        }else{
          data.push(item)
        }
      });
      this.setState({
        uploads: {...this.state.uploads, ...{fileList: fileList}}
      });
      this.onChange(data);
    }else if(file.status === 'uploading'){
      this.setState({
        uploads: {...this.state.uploads, fileList}
      });
    }else{
      // 不符合上传条件的
      if (fileList.length > 0) {
        fileList.pop();
      }
    }
  }

  // 移出文件
  removeFile(file){
    let uid = file.uid;
    let list = _.cloneDeep(this.state.uploads.fileList);
    let currentFileIndex = list.findIndex(item=>{
      return item.uid === uid
    });
    list.splice(currentFileIndex, 1);
    this.setState({
      uploads: {...this.state.uploads, ...{fileList: list}}
    });
    this.onChange(list);
  }

  // 触发上层change事件
  onChange(data){
    this.props.onChange && this.props.onChange(data);
  }

  // modal取消
  modalCancel(){
    this.setState({
      previewVisible: false
    })
  }

  componentWillReceiveProps(nextProps) {
    this.initUploadState(nextProps);
  }

  componentWillMount(){
    this.initUploadState(this.props);
  }

  componentDidMount(){

  }

  render(){
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传文件</div>
      </div>
    );
    return (
      <div className={`c-upload ${this.props.className}`}>
        <Upload
          {...this.state.uploads}
          className="avatar-uploader"
          onPreview={(file) => this.handlePreview(file)}
          beforeUpload={(file, fileList) => this.beforeUpload(file, fileList)}
          onRemove={(file) => this.removeFile(file)}
          onChange={({file, fileList, event}) => this.handleChange({file, fileList, event})}>
          {this.state.uploads.limit <= this.state.uploads.fileList.length ? null : uploadButton}
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.modalCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    )
  }
}

CUpload.defaultProps = {

}

CUpload.propTypes = {

}

export default CUpload

import React, {Component} from 'react';
import CDetailInfo from '@/components/CDetailInfo'
import CAvatar from '@/components/CAvatar'
import CTable from '@/components/CTable'
import CBaseComponent from '@/components/CBaseComponent'
import { detailInfoData, detailTableData} from "./data";
import { detailUserList} from "@/servers/userManageApi";
import { urlFormat, setPageNewValue} from "@/utils";

@CBaseComponent
class UserManageListDetailInfo extends Component{
  constructor(props) {
    super(props);
    this.getUserDetailData = this.getUserDetailData.bind(this);
  }


  state = {
    data: detailInfoData,
    columns: detailTableData.tHead,
    dataSource: detailTableData.tBody,
    avatar: {
      img: '',
      title: '',
      description: ''
    }
  };

  getUserDetailData(){
    let id = urlFormat(this.props.history.location.search).query.id;
    detailUserList({id}).then(res=>{
      let userInfo = res.data.userInfo;
      userInfo.latlong = userInfo.latlong.join(',');//经纬度分割成字符串
      let storeList = res.data.storeList;
      let data = setPageNewValue(this.state.data, userInfo);
      this.setState({
        data: data,
        dataSource: storeList,
        avatar: {
          img: userInfo.avatar && userInfo.avatar.url,
          title: userInfo.name,
          description: ''
        }
      })
    }).catch(err=>{

    })
  }

  componentDidMount(){
    this.getUserDetailData();
  }

  render(){
    return (
      <>
        <CAvatar avatar={this.state.avatar.img} title={this.state.avatar.title} description={this.state.avatar.description} />
        <CDetailInfo data={this.state.data}>
          <div slot='storeInfo'>
            <CTable checked={false} scroll={false} columns={this.state.columns} dataSource={this.state.dataSource} />
          </div>
        </CDetailInfo>
      </>
    )
  }
}

export default UserManageListDetailInfo

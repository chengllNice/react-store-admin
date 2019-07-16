import React, {Component} from 'react';
import CDetailInfo from '@/components/CDetailInfo'
import CAvatar from '@/components/CAvatar'
import CBaseComponent from '@/components/CBaseComponent'
import { detailInfoData} from "./data";
import { detailUserAdminList} from "@/servers/userManageApi";
import { urlFormat, setPageNewValue} from "@/utils";

@CBaseComponent
class UserManageAdminListDetailInfo extends Component{

  constructor(props) {
    super(props);
    this.getUserDetailData = this.getUserDetailData.bind(this);
  }


  state = {
    data: detailInfoData,
    avatar: {
      img: '',
      title: '',
      description: ''
    }
  };

  getUserDetailData(){
    let id = urlFormat(this.props.history.location.search).query.id;
    detailUserAdminList({id}).then(res=>{
      let userInfo = res.data.userInfo;
      let data = setPageNewValue(detailInfoData, userInfo);
      this.setState({
        data: data,
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
        <CDetailInfo data={this.state.data} />
      </>

    )
  }
}

export default UserManageAdminListDetailInfo

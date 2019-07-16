import React, {Component} from 'react';
import CDetailInfo from '@/components/CDetailInfo'
import CBaseComponent from '@/components/CBaseComponent'
import CAvatar from '@/components/CAvatar'
import {detailInfoData} from "./data";
import {detailStoreList} from "@/servers/storeManageApi";
import {urlFormat, setPageNewValue} from "@/utils";

@CBaseComponent
class StoreManageListDetailInfo extends Component {
  constructor(props) {
    super(props);
    this.getStoreDetailData = this.getStoreDetailData.bind(this);
  }


  state = {
    data: detailInfoData,
    avatar: {
      img: '',
      title: '',
      description: '',
      rate: 0
    }
  };

  getStoreDetailData() {
    let id = urlFormat(this.props.history.location.search).query.id;
    detailStoreList({id}).then(res => {
      let userInfo = res.data.userInfo;
      let data = setPageNewValue(detailInfoData, userInfo);
      this.setState({
        data: data,
        avatar: {
          img: userInfo.avatarImg && userInfo.avatarImg.url,
          title: userInfo.storeName,
          description: userInfo.description,
          rate: userInfo.rate
        }
      })
    }).catch(err => {

    })
  }

  render() {
    return (
      <>
        <CAvatar avatar={this.state.avatar.img} title={this.state.avatar.title}
                 description={this.state.avatar.description} type='rate' rate={this.state.avatar.rate}/>
        <CDetailInfo data={this.state.data}/>
      </>
    )
  }

  componentDidMount() {
    this.getStoreDetailData();
  }
}

export default StoreManageListDetailInfo

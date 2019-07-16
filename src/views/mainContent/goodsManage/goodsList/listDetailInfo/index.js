import React, {Component} from 'react';
import CDetailInfo from '@/components/CDetailInfo'
import CBaseComponent from '@/components/CBaseComponent'
import CAvatar from '@/components/CAvatar'
import {detailInfoData} from "./data";
import {detailGoodsList} from "@/servers/goodsManageApi";
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
    }
  };

  getStoreDetailData() {
    let id = urlFormat(this.props.history.location.search).query.id;
    detailGoodsList({id}).then(res => {
      let goodsInfo = res.data.goodsInfo;
      let data = setPageNewValue(detailInfoData, goodsInfo);
      this.setState({
        data: data,
        avatar: {
          img: goodsInfo.avatarImg && goodsInfo.avatarImg.url,
          title: goodsInfo.name,
          description: goodsInfo.description,
        }
      })
    }).catch(err => {

    })
  }

  render() {
    return (
      <>
        <CAvatar avatar={this.state.avatar.img} title={this.state.avatar.title}
                 description={this.state.avatar.description}/>
        <CDetailInfo data={this.state.data}/>
      </>
    )
  }

  componentDidMount() {
    this.getStoreDetailData();
  }
}

export default StoreManageListDetailInfo

import React, { Component} from 'react'
import CBaseComponent from '@/components/CBaseComponent'
import AMap from 'AMap';
import _ from 'lodash'
import { markerContentInit} from "./markerContent";
import { withRouter} from 'react-router-dom'
import iconMarker from '@/assets/images/map-marker.png'
import './index.scss'

@CBaseComponent
class BaseMap extends Component{
  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.initMarker = this.initMarker.bind(this);
  }

  state = {
    map: null,
    data: null,
  };

  // 初始化地图
  initMap(){
    let map = new AMap.Map('baseMap', {

    });
    this.setState({
      map: map
    }, () => this.initMarker(this.props.data))
  }

  // 初始化marker
  initMarker(data){
    // 清除地图上的所有覆盖物
    this.state.map && this.state.map.clearMap();
    let deepData = _.cloneDeep(data);
    deepData && deepData.forEach(item=>{
      this.createMarker(item)
    });
    this.setState({
      data: deepData
    });
    //设置所有覆盖物在地图视野之内
    this.state.map && this.state.map.setFitView();
  }

  // 创建marker
  createMarker(data){
    if(!this.state.map){
      this.initMap();
      return
    }
    let self = this;
    // 创建 AMap.Icon 实例：
    let icon = new AMap.Icon({
      size: new AMap.Size(20, 30),    // 图标尺寸
      image: iconMarker,  // Icon的图像
      // imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
      imageSize: new AMap.Size(20, 30)   // 根据所设置的大小拉伸或压缩图片
    });
    let marker = new AMap.Marker({
      map: this.state.map,
      draggable: false, //是否可拖动
      icon: icon,
      position: [data.latlong[1], data.latlong[0]],
    });
    // new AMap.Marker({
    //   map: this.state.map,
    //   draggable: false, //是否可拖动
    //   position: [data.latlong[1], data.latlong[0]],
    // });
    data.marker = marker;
    data.marker.on('click', function (e) {
      markerContentInit( data, self.state.map, self).then(Content=>{
        data.content = new AMap.InfoWindow({
          isCustom: true, //使用自定义窗体
          closeWhenClickMap: true,
          content: Content,
          offset: new AMap.Pixel(10, -30)
        });
        data.content.open(self.state.map, data.marker.getPosition());
      })
    });

  }

  // 更新marker
  updateMarker(){

  }

  // 移出marker
  removeMarker(){

  }

  componentWillReceiveProps(nextProps){
    this.initMarker(nextProps.data)
  }

  componentDidMount(){
    this.initMap();
  }

  componentWillUnmount(){
    this.state.map && this.state.map.destroy();
  }

  render(){
    let { className, style, height} = this.props;
    style = { ...style, height: height};
    return (
      <div className={`base-map ${className}`} id='baseMap' style={style}></div>
    )
  }
}

export default withRouter(BaseMap)

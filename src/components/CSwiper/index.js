import React, {Component} from 'react';
import PropTypes from 'prop-types'
// import Swiper from 'swiper'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import './index.scss'

class CSwiper extends Component{

  constructor(props) {
    super(props);
    this.initSwiper = this.initSwiper.bind(this);
  }


  state = {
    swiper: null,
    options:  {
      autoplay: {
        disableOnInteraction: false,
      },
      loop: true,  //循环
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable :true,
      },
    }
  };

  initSwiper(){
    let swiper = new Swiper('.c-swiper-container',this.state.options);
    this.setState({
      swiper: swiper
    })
  }

  componentWillMount(){
    this.setState({
      options: {...this.state.options, ...this.props.options}
    })
  }

  componentDidMount(){
    this.initSwiper();
  }

  render(){
    return (
      <div className='c-swiper'>
        <div className='c-swiper-container swiper-container'>
          <div className="swiper-wrapper">
            {
              this.props.data.map((swiperItem, swiperIndex) => {
                return <div className="swiper-slide" key={swiperIndex}>
                  <img src={swiperItem.url} alt=""/>
                </div>
              })
            }
          </div>

          {/*前后切换按钮*/}
          <div className="swiper-button-prev"><i className='fa fa-angle-left'></i></div>
          <div className="swiper-button-next"><i className='fa fa-angle-right'></i></div>

          {/*分页器*/}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    )
  }
}

CSwiper.defaultProps = {
  data: []
};

CSwiper.propTypes = {
  data: PropTypes.array,
  options: PropTypes.object,
};

export default CSwiper

import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './index.scss'

@inject('appStore')
@observer
class HomeSwiper extends Component {
  render () {
    let data=this.props.data || []
    return (
      <Swiper
        className='swiperH'
        indicatorColor='#999'
        style='height: 56vw'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        {data.map(imgdata=>(
          <SwiperItem key={imgdata.mainImg} className='swiperItem'>
            <Image src={imgdata.mainImg} style='width: 100vw;height: 56vw' />
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}

export default HomeSwiper

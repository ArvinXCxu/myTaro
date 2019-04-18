import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView,Image,Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import indexStore from './indexStore'
import HomeSwiper from './homeSwiper'
import './index.scss'
import go from './moduleGuide'

@inject('appStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () {
    this.initHeadData()
    this.initModuleData()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  initHeadData =() => {
    indexStore.initHeadData()
  }
  initModuleData =() => {
    indexStore.initModuleData()
  }
  onScrolltoupper=() =>{

  }
  onScroll=() =>{

  }
  goTo=(item) =>{
    let url=go.moduleGuide(item);
    Taro.redirectTo({url:url})
  }
  render () {
    return (
      <ScrollView
        className='home'
        scrollY
        scrollWithAnimation
        scrollTop='0'
        lowerThreshold='20'
        upperThreshold='20'
        onScrolltoupper={this.onScrolltoupper}
        onScroll={this.onScroll}
      >
        <HomeSwiper data={indexStore.headlineDatas} />
        <MuneList items={indexStore.moduleDatas} goTo={this.goTo} />
      </ScrollView>
    )
  }
}
const MuneList = ( props ) => (
  <View className='menudiv'>
    <View className='tabList'>
      {props.items&&props.items.map((item, index) => (
        <View key={index} className='modules' onClick={()=>{props.goTo(item)}}>
          <Image className='moduleIcon' src={item.img} />
          <Text className='moduleName'>{item.moduleName}</Text>
        </View>
      ))}
    </View>
  </View>
);
export default Index

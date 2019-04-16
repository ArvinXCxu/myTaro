import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import indexStore from './indexStore'
import HomeSwiper from './homeSwiper'
import './index.scss'


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
        <MuneList items={this.store.moduleDatas} goTo={(type)=>this.store.goTo(type,this)} />
      </ScrollView>
    )
  }
}
const MuneList = (props) => (
  <div className="menudiv">
    <ul className="tabList clearfix">
      {props.items&&props.items.map((item, index) => (
        <li key={index} onClick={()=>{props.goTo(item)}}>
          <img src={item.img} alt="" /><span>{item.moduleName}</span>
        </li>
      ))}
    </ul>
  </div>
);
export default Index

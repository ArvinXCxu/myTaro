import { observable } from 'mobx'
// import Taro from '@tarojs/taro'
import '@tarojs/async-await'

const appStore = observable({
  token: '',
  user:''
})
export default appStore

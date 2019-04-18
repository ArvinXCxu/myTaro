import { observable } from 'mobx'
import api from '../../services/api'
import appStore from '../../store/appStore'
import Taro from '@tarojs/taro'
import '@tarojs/async-await'

const loginStore = observable({
  password: '',
  name:'',

  async login() {
    let data={
      loginName: this.name,
      password: this.password,
      openPlatformType: 'ent_wechat',
      unionId: null
    }
    const res = await api.get('shopguide_url',{url:'auth/logonH5',data:data})
    let token= res.dataObject && res.dataObject.accessToken
    if(token){
      appStore.token=token
      Taro.setStorageSync('token',token)
    }else{
      Taro.showToast({title: '登录失败', icon: 'none',});
    }
    const userInfo = await api.get('shopguide_url',{url:'game/getUser',data:{accessToken:appStore.token}},true)
    if(userInfo){
      Taro.setStorageSync('userData',JSON.stringify(userInfo))
      Taro.showToast({title: '登录成功，正在跳转', icon: 'success',});
      Taro.redirectTo({url:'/pages/index/index'})
    }
  }
})
export default loginStore

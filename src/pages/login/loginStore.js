import { observable } from 'mobx'
import api from '../../services/api'
import appStore from '../../store/appStore'
import '@tarojs/async-await'
import Taro from '@tarojs/taro'

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
      Taro.showToast({title: '登录成功，正在跳转', icon: 'success',});
      Taro.redirectTo({url:'/pages/index/index'})
    }else{
      Taro.showToast({title: '登录失败', icon: 'none',});
    }
  }
})
export default loginStore

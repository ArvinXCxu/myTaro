import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import loginStore from './loginStore'
import './index.scss'

@inject('appStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  componentWillMount () { }

  componentWillReact () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  login = () => {
    loginStore.login()
  }

  getName = event => {
    const value = event.target.value
    loginStore.name=value
    console.log(value)
  }

  getPassword = event => {
    const value = event.target.value
    loginStore.password=value
    console.log(value)
  }

  render () {
    return (
      <View className='login'>
        <View className='appName'>
            欢迎来到超级导购
        </View>
        <View className='from'>
            <Text>账号</Text>
            <Input type='text' value={loginStore.name} onInput={this.getName} />
            <Text>密码</Text>
            <Input type='text' value={loginStore.password} onInput={this.getPassword} />
        </View>
        <Button className='btn' onClick={this.login}>登录</Button>
      </View>
    )
  }
}

export default Index

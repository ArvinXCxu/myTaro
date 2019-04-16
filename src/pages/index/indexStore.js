import { observable } from 'mobx'
import api from '../../services/api'
import '@tarojs/async-await'

const indexStore = observable({
  headlineDatas:[],
  async initHeadData() {
    const userData = await api.get('H5_url',{url:'user/group',data:{}})
    let userGroup = []
    userData.forEach((item)=>userGroup.push(item.groupId))
    if(userData.length<=0){console.log('暂无轮播');return}
    const headjson = await api.get('H5_url',{url:'landingPage/headline',data:{'groupIds':userGroup.join(',')}})
    this.headlineDatas.clear()
    this.headlineDatas.push(...headjson)
  },
  async initModuleData() {
    const roleData = await api.get('H5_url',{url:'user/role',data:{}})
    let tempRole = []
    roleData.forEach((item) => (item && tempRole.push(item.id)))
  }
})
export default indexStore

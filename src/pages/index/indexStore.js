import { observable } from 'mobx'
import api from '../../services/api'
import '@tarojs/async-await'
import Taro from '@tarojs/taro'

const indexStore = observable({
  headlineDatas:[],
  moduleDatas:[],
  /*10000全部，4问答中心，3最新动态，20商学院，1签到，11互动，10金币兑换，100金币明细,22测试模块，104PK模块,99成长路径*/
  passModule:['10000','4','3','20','1','11','10','100','104','99','109'],
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
    let modeuleData = await api.get('H5_url',{url:'tenant/module',data:{'userId':JSON.parse(Taro.getStorageSync('userData')).sysUserId,roleIds:tempRole.join(','),'locationType':"landing"}})
    if(modeuleData){
      /*过滤*/
      modeuleData=modeuleData.filter((mod)=>this.passModule.includes(mod.type))
      if(modeuleData.length >= 8){
        modeuleData.length = 8;
        modeuleData[7].moduleName = "全部";
        modeuleData[7].img = 'http://supershoper.xxynet.com/vsvz1555485760275';
        modeuleData[7].type = "10000";
        this.moduleDatas.clear();
        this.moduleDatas=modeuleData;
      }else{
        this.moduleDatas.clear();
        this.moduleDatas=modeuleData;
      }
    }else{
      Taro.showToast({title: '获取首页保龄球失败', icon: 'success',});
    }


  }
})
export default indexStore

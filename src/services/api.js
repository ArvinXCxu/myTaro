import Taro from '@tarojs/taro'
import qs from 'qs'
import {HTTPCnst, HTTP_ERROR} from '../YdConfig';

/**
 * 检查http状态值
 * @param response
 * @returns {*}
 */
function checkHttpStatus(response) {
  Taro.stopPullDownRefresh();

  Taro.hideNavigationBarLoading();

  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response.data
  } else if (response.statusCode == 400) {

  }
  const message = HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`
  const error = new Error(message);
  error.data = response.data;
  error.text = message;
  error.code = response.statusCode;
  throw  error
}

/**
 * 检查返回值是否正常
 */
function checkSuccess(data) {
  if (data instanceof ArrayBuffer && typeof data === 'string') {
    return data
  }
  if(
    typeof data.code === 'number' &&
    data.code === 1001
  ){
    Taro.removeStorageSync('token')
    Taro.showToast({title: 'token失效,返回登录', icon: 'none',});
    Taro.redirectTo({url:'/pages/login/index'})
    return false
  }
  if (
    typeof data.code === 'number' &&
    data.code === 102
  ) {
    return data
  }
  if(
    data.constructor===Array
  ) {
    return data
  }

  const message = data.errMsg || '服务器异常';
  const error = new Error(message);
  error.data = data;
  error.text = data;
  error.code = data.code;
  throw error
}

/**
 * 请求错误处理
 */
function throwError(err) {
  if(err && err.message.indexOf('token')>-1){
    Taro.showToast({title: 'token失效，返回登录页', icon: 'none',});
    Taro.redirectTo({url:'/pages/login/index'})
  }
  Taro.hideNavigationBarLoading();
  Taro.hideNavigationBarLoading();
  const error = new Error(err.errMsg || '服务器正在维护中!');
  error.code = 500;
  throw error;
}

export default {
  request(server,options,method,ischeck=false) {
    const {url} = options;
    Taro.showNavigationBarLoading();
    if(server==='H5_url'){
      if(!Taro.getStorageSync('token')){Taro.redirectTo({url:'/pages/login/index'})}
      if(options.hasOwnProperty('header')){
        Object.assign(options.header,{"Authorization":Taro.getStorageSync('token')})
      }else{
        options.header={
          "Authorization":Taro.getStorageSync('token'),
        }
      }
    }
    return Taro.request({
      ...options,
      method: method || 'GET',
      url: `${HTTPCnst[server]}${url}`,
      header: {
        ...options.header
      },
    }).then(checkHttpStatus)
      .then((res) => {
        if(ischeck){return res}
        return checkSuccess(res)
      })
      .catch(error => {
        throwError(error)
      })

  },
  /*对于某些接口，根本没有返回code,我们可以强制跳过检测*/
  get(server,options,ischeck) {
    return this.request(server,{
      ...options
    },'GET',ischeck)
  },
  post(server,options,ischeck) {
    return this.request(server,{
      ...options,
      data: qs.stringify(options.data)
    }, 'POST',ischeck)
  }
}

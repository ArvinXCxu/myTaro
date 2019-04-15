export default {
    color: {
      primary: '#3b86fd',
      primaryDeep: '#506db6',
      primaryChange: '#6aa9ff',
      success: '#3be88e',
      danger: '#f44f4d',
      warning: '#ead1a6',
      page_bg: '#f5f5f5'
    },
    tabHeight: 7
  }
  
  const NODE_ENV = process.env.NODE_ENV;
  let _HTTPCnst={}
  switch (NODE_ENV){
      case 'test':_HTTPCnst={
          shopguide_url : "http://172.16.0.200:8000/shopguide/api/",		// 超导请求地址
  
          om_si_url : "http://172.16.0.200:8080/om-si/",		// PK接口
  
          growup_url : "http://172.16.0.200:18080/om-web/growup/",	// 成长路径请求地址
  
          H5_url : 'http://172.16.0.233:7080/thanos/api/',// 嵌入式请求地址
      };break
      case 'pre':_HTTPCnst={
          shopguide_url : "http://pre.xxynet.com/shopguide/api/",		// 超导请求地址
  
          growup_url : "http://172.16.0.200:18080/om-web/growup/",	// 成长路径请求地址
  
          om_si_url : "http://pre.xxynet.com/om-si/",		// PK接口
  
          H5_url : 'http://pre.xxynet.com/thanos/api/'// 嵌入式请求地址
      };break
      case 'prod':_HTTPCnst={
          shopguide_url : "http://bms.microc.cn/shopguide/api/",		// 超导请求地址
  
          growup_url : "http://139.129.204.152:801/om-web/growup/",	// 成长路径请求地址
  
          om_si_url : "http://bms.microc.cn/om-web/",		// PK接口
  
          H5_url : 'http://client.supshop.cn/thanos/api/'// 嵌入式请求地址
      };break
      case 'jd':_HTTPCnst={
          shopguide_url : "http://bms.microc.cn/shopguide/api/",		// 超导请求地址
  
          growup_url : "http://139.129.204.152:801/om-web/growup/",	// 成长路径请求地址
  
          om_si_url : "http://bms.microc.cn/om-si/",		// PK接口
  
          H5_url : 'http://client.supshop.cn/thanos/api/'// 嵌入式请求地址
      };break
      default:_HTTPCnst={
          shopguide_url : "http://172.16.0.200:8000/shopguide/api/",		// 超导请求地址
  
          growup_url : "http://172.16.0.200:18080/om-web/growup/",	// 成长路径请求地址
  
          om_si_url : "http://172.16.0.200:8080/om-si/",		// PK接口
  
          H5_url : 'http://172.16.0.233:7080/thanos/api/',// 嵌入式请求地址
      };
  }
  export const HTTPCnst=_HTTPCnst
  
  export const HTTP_ERROR = {
    '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    '401': '用户没有权限（令牌、用户名、密码错误）。',
    '403': '用户得到授权，但是访问是被禁止的。',
    '404': '请求不存在',
    '406': '请求的格式不可得。',
    '410': '请求的资源被永久删除，且不会再得到的。',
    '422': '当创建一个对象时，发生一个验证错误。',
    '500': '服务器发生错误，请检查服务器。',
    '502': '网关错误。',
    '503': '服务不可用，服务器暂时过载或维护。',
    '504': '网关超时。',
  }
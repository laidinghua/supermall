import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/wh',
   // baseURL: 'http://106.54.54.237:8000/api/wh',
    timeout: 5000
  });

  // 2.axios的拦截器
  // 2.1请求拦截的使用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  //return err;
  })

  //2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log('来到了response拦截success中');
    return res.data
  }, err => {
    console.log(err);
  })

  //3.发送真正的网络请求
  return instance(config)

}

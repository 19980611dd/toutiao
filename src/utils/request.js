// 配置axios实例
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
// 创建一个axios实例
const request = axios.create({
  baseURL: 'http://42.192.129.12:8000',
  transformRespomse: [
    function (data) {
      // data json 格式 里面可能包含大数字
      try {
        return JSONBig.parse(data)
      } catch (error) {
        return data
      }
    }
  ]
})
// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state?.user?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 设置响应拦截器
export default request

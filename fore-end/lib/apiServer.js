import axios from 'axios'
import { message } from 'antd'
import Config from '../config/config'
import qs from 'qs'

// axios设置---------------------------------------
// 设置请求超时时间（ms）
axios.defaults.timeout = 600000
// 设置axios的基地址
axios.defaults.baseURL = Config.baseURL
// 带上cookies
axios.defaults.withCredentials = true
// 跨域
axios.defaults.crossDomain = true

axios.interceptors.request.use(config => config, error => Promise.reject(error))

axios.interceptors.response.use((response) => {
  console.log(response)
  const data = response.data
  if(!data){
    return message.error('请求结果为空，请联系管理员')
  }
  if(data.errorMsg){
    return message.error(data.errorMsg)
  }
  if(data.successMsg){
    message.success(data.successMsg)
  }
    return response.data
}, (error) => {
  console.log(error)
  return message.error('网络故障或请求被阻止')
})

class ApiService {
  get(url, params, config) {
    return axios.get(url, {
      params:params,
      config:config,
      paramsSerializer: (params) => {
        return qs.stringify(params, {arrayFormat: 'repeat'})
      }
    })
  }

  post(uri, data, config) {
    let ContentType = 'application/json;charset:UTF-8',
      _config
    if (config && config.isFormData === true) {
      // 增加formdata方式提交
      let param = new FormData()
      for (let i in data) {
        const item = data[i]
        if (item) {
          if ((i === 'files' || i === 'file') && (item instanceof Array)) {
            for (let j of item) {
              param.append(i, j)
            }
          }
        }
        param.append(i, item)
      }
      data = param
      ContentType = 'multipart/form-data'
    }
    if (config && config.useParams) {
      _config = Object.assign({
        method: 'POST',
        headers: {
          'Content-Type': ContentType,
        },
        withCredentials: 'include',
        params: this.handleStringData(data)
      }, config)
    } else {
      _config = {
        method: 'post',
        headers: {
          'Content-Type': ContentType,
        },
        withCredentials: 'include',
        data: this.handleStringData(data),
          ...config }
    }
    return axios(uri, _config)
  }

  // 对象中为字符串的字段去首尾空格
  handleStringData(data) {
    if (data instanceof Object) {
      for (let i in data) {
        let value = data[i]
        if (typeof value === 'string') {
          data[i] = value.trim()
        }
      }
      return data
    }
    return data
  }
}

export default new ApiService()


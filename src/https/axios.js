import axios from 'axios'
// 设置域名
let BASEURL = 'http://10.150.33.126:8115/'

// 配置域名、超时时间（10s）
let $ = axios.create({
  baseURL: BASEURL,
  timeout: 10000
})

// 设置数据传输格式
$.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
// json转form data数据格式
$.defaults.transformRequest = [
  function(data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }
]

// 请求拦截器
$.interceptors.request.use(
  config => {
    console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
$.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return error
  }
)

export default {
  post: (url, data) =>$.post(url, data),
  get: (url, data) => $.get(url, data),
  BASEURL
}

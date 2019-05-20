import axios from 'axios'
import { Indicator, Toast } from 'mint-ui'
// 设置域名
let BASEURL = ''

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
    if (config.showLoading) {
      showFullScreenLoading()
    }
    return config
  },
  error => {
    if (config.showLoading) {
      showFullScreenLoading()
    }
    return Promise.reject(error)
  }
)

// 响应拦截器
$.interceptors.response.use(
  response => {
    if (response.config.showLoading) {
      tryHideFullScreenLoading()
    }
    return response
  },
  error => {
    if (error.config.showLoading) {
      tryHideFullScreenLoading()
    }
    return false
  }
)

let needLoadingRequestCount = 0
//showFullScreenLoading,tryHideFullScreenLoading()要干的事儿就是将同一时刻的请求合并。
//声明一个变量needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 300)()
  }
}
//开始loading方法
function startLoading() {
  // console.log(Date.parse(new Date()))
  loading = Indicator.open()
}
//关闭loading方法
const tryCloseLoading = () => {
  // console.log(Date.parse(new Date()))
  if (needLoadingRequestCount === 0) {
    loading = Indicator.close()
  }
}

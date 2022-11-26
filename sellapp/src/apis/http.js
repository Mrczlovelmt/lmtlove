// axios最底层封装
import axios from "axios"

// token??? 是身份令牌  cookie和session都是身份令牌

// 设置默认地址
axios.defaults.baseURL = "http://129.211.169.131:5000/"

// 超时时间
axios.defaults.timeout = 20000;

// 请求拦截器
axios.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use((res) => {
    return res
}, (err) => {
    return Promise.reject(err)
})

// 暴露改造后的axios
export default axios



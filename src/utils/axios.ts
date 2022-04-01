import axios from 'axios'


//
// // 这边由于后端没有区分测试和正式，姑且都写成一个接口。
// axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// // 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
// axios.defaults.withCredentials = true
// // 请求头，headers 信息
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localGet('token') || ''
// // 默认 post 请求，使用 application/json 形式
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;'
axios.interceptors.response.use(res => {
    // if (typeof res.data !== 'object' && typeof res.data !== '') {
    //     console.error("请求异常")
    //     return Promise.reject(res)
    // }
    return res.data
})

export default axios
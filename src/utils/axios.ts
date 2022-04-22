import axios from 'axios'



axios.interceptors.response.use(res => {
    // if (typeof res.data !== 'object' && typeof res.data !== '') {
    //     console.error("请求异常")
    //     return Promise.reject(res)
    // }
    return res.data
})

export default axios
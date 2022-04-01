import { createApp } from 'vue'
import App from './App.vue'


import router from './router'
// import store from './store'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'


const app =createApp(App)

//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
// app.use(store)
app.use(ElementPlus);

app.mount('#app')

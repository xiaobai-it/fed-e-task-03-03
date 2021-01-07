import axios from 'axios'
/* 
由于nuxtjs规定store中的state向外暴露的是一个函数，在其他js文件内无法获取到state的值
因为state函数没有返回值，所以通过import方式无法获取到state的值
import { state } from '../store/index'
1、所以官方建议使用插件的方式可以获取到store中的state的数据
2、实例初始化完毕以后 nuxt 会在 window 全局注入$nuxt ，
  通过$nuxt.$store 可以访问 store，
     $nuxt.$router 可以访问到router，
  但是需要注意的是，初始化完毕以前是无法访问$nuxt的，所以需要再初始化完毕之后才能使用该方法。
  $nuxt.$store.state.isLogin
  $nuxt.$store.commit('home/showLoginBox', { status: true }) */

export const myAxios = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

// 通过插件机制获取到上下文对象（app, $axios,route，redirect，query、params、req、res、app、store...）
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 添加请求拦截器
  myAxios.interceptors.request.use(
    function(config) {
      const { users } = store.state
      // console.log(users)
      // console.log(store)
      if (users && users.token) {
        // 添加用户身份，数据格式：Token空格Token数据
        config.headers.Authorization = `Token ${users.token}`
      }
      // 添加用户身份，数据格式：Token空格Token数据
      //  config.heafers.Authorization = `Token eyJ0eXAiOiJKV`
      // 在发送请求之前做些什么
      return config
    },
    function(error) {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  myAxios.interceptors.response.use(
    function(response) {
      // 对响应数据做点什么
      return response
    },
    function(error) {
      // 对响应错误做点什么
      return Promise.reject(error)
    }
  )
}

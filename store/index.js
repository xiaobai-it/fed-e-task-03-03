const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  users: {}, // 用户登录信息
  vuex_following: [],
  vuex_favorite: [],
})

export const mutations = {
  saveUsrsLoginInfo(state, usersLoginInfo) {
    console.log('saveUsrsLoginInfo刷新页面被触发了')
    state.users = usersLoginInfo
  },
  saveFollowing(state, followingData) {
    console.log('saveFollowing刷新页面被触发了')
    state.vuex_following = followingData
  },
  saveFavorite(state, favoriteData) {
    console.log('saveFavorite刷新页面被触发了')
    state.vuex_favorite = favoriteData
  },
}
export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用
  // 作用：初始化容器数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null
    let followingData = null
    let favoriteData = null

    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 JavaScript 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      console.log('parsed', parsed)
      // parsed {
      //   user: '{"id":133546,"email":"qwd@qq.com",
      //   "createdAt": "2021-01-05T08:06:31.495Z",
      //   "updatedAt": "2021-01-06T09:24:12.515Z",
      //   "username": "qwd", "bio": null,
      //   "image": "http://inews.gtimg.com/newsapp_bt/0/8115168370/0/0",
      //   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMzNTQ2LCJ1c2VybmFtZSI6InF3ZCIsImV4cCI6MTYxNTUxNzA3Mn0.b0YYwPStuHjLC_bS2ZlYOKj77LrGEKzQDdbfT-cWgNg"
      //  } '
      //}
      try {
        user = JSON.parse(parsed.user)
        followingData = JSON.parse(parsed.cookFollowing)
        favoriteData = JSON.parse(parsed.cookFavorite)
        // console.log(followingData)
        console.log(favoriteData)
      } catch (err) {
        // No valid cookie found
      }
    }

    // 提交 mutation 修改 state 中的 user 状态
    commit('saveUsrsLoginInfo', user)
    commit('saveFollowing', followingData)
    commit('saveFavorite', favoriteData)
  },
}

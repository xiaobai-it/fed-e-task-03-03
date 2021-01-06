const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  users: {}, // 用户登录信息
})

export const mutations = {
  saveUsrsLoginInfo(state, usersLoginInfo) {
    state.users = usersLoginInfo
  },
}
export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 这个 action 会在服务端渲染期间自动调用
  // 作用：初始化容器数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null

    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 JavaScript 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      // {                                                                                                                                             16:45:11
      //   'Webstorm-c7ae48fb': '5fa48ccb-69d5-4708-a865-41aed8432e1e'
      // }
      try {
        user = JSON.parse(parsed.user)
        // {                                                                                                                                             16:48:56
        //   'Webstorm-c7ae48fb': '5fa48ccb-69d5-4708-a865-41aed8432e1e',
        //   user: '{"id":133546,"email":"qwd@qq.com","createdAt":"2021-01-05T08:06:31.495Z","updatedAt":"2021-01-05T08:06:31.500Z","username":"qwd","bio":null,"image":null,"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMzNTQ2LCJ1c2VybmFtZSI6InF3ZCIsImV4cCI6MTYxNTEwNzE3MX0.KI5gqRcePNyvQggsJXCcMUT8iAFP8OLiTzPN_bXVqLE"}'
        // }
      } catch (err) {
        // No valid cookie found
      }
    }

    // 提交 mutation 修改 state 中的 user 状态
    commit('saveUsrsLoginInfo', user)
  },
}

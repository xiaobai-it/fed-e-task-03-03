// 验证是否登录的中间件==>没有登录
// 如果没有登录，让其跳转到登录页
// 解决用户直接手动修改路由的url造成的问题：用户没有登录，手动修改地址栏的url后，还可以跳转到用户设置页面的的问题

export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.users) {
    return redirect('/login')
  }
}

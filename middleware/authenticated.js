// 验证是否登录的中间件==>已经登录了
// 如果登录，让其跳转到首页
// 解决用户直接手动修改路由的url造成的问题：用户已经登录，手动修改地址栏的url后，还可以跳转到登录页的问题

export default function({ store, redirect }) {
  // If the user is not authenticated
  if (store.state.users) {
    return redirect('/')
  }
}

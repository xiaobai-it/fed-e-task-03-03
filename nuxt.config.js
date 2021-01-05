export default {
  router: {
    // 自定义nuxtjs的路由规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0) // 把nuxtjs中默认的路由规则全部删除不要了
      // 添加自己配置的路由规则给nuxtjs来使用，结构和vue原始的路由结构一样
      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/'), // nuxtjs中的页面组件
            children: [
              {
                path: '', // 默认子路由
                name: 'home', // 首页
                component: resolve(__dirname, 'pages/index.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              {
                path: '/login',
                name: 'login', // 登录页
                component: resolve(__dirname, 'pages/login.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              {
                path: '/registe',
                name: 'registe', // 注册页
                component: resolve(__dirname, 'pages/login.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              {
                path: '/profile/:username',
                name: 'profile', // 用户发表文章列表+收藏文章列表页面
                component: resolve(__dirname, 'pages/profile.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              {
                path: '/setting',
                name: 'setting', // 用户设置页面
                component: resolve(__dirname, 'pages/settings.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              {
                path: '/article/:slug',
                name: 'article', // 文章详情页面
                component: resolve(__dirname, 'pages/article.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              {
                path: '/editorArticle',
                name: 'editorArticle', // 发布文章页面
                component: resolve(__dirname, 'pages/editorArticle.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
            ],
          },
        ]
      )
    },
  },
}

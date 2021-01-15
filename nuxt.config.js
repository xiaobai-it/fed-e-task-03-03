export default {
  plugins: ['~/plugins/formatDate.js', '~/plugins/apiConfig.js'], // 在nuxt.js中添加插件的方法

  // 把项目部署到服务器的时候，进行的配置
  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  router: {
    linkExactActiveClass: 'active', // <nuxt-link>标签默认 active class（类名）严格模式

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
                name: 'profile', // 用户中心页面
                component: resolve(__dirname, 'pages/profile.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              // {
              //   path: '/profile/:username/favorites',
              //   name: 'profile', // 用户页面/喜欢的文章
              //   component: resolve(__dirname, 'pages/profile.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              // },
              {
                path: '/setting',
                name: 'setting', // 用户设置页面
                component: resolve(__dirname, 'pages/settings.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              {
                path: '/article/:slug',
                name: 'article', // 文章详情页面
                component: resolve(__dirname, 'pages/articleDetail.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },

              {
                path: '/editorArticle',
                name: 'editorArticle', // 发布文章页面
                component: resolve(__dirname, 'pages/editorArticle.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
              {
                path: '/editor/:slug',
                name: 'editor', // 重新编辑文章页面
                component: resolve(__dirname, 'pages/editorArticle.vue'), // nuxtjs中被页面组件，包裹的子组件（路由组件）
              },
            ],
          },
        ]
      )
    },
  },
}

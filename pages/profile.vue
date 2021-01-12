<!-- 组件说明 用户发表文章列表+收藏文章列表页面-->
<template>
  <div class="profile-page">
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="articleUser.image" class="user-img" />
            <h4>{{ articleUser.username }}</h4>
            <p>
              {{ articleUser.bio ? articleUser.bio : '' }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ articles[0].author.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <!-- 文章列表tab -->
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link active"
                  exact
                  :to="{
                    name: 'profile',
                    query: { author: 'author' },
                  }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :to="{
                    name: 'profile',
                    query: { author: 'favorites' },
                  }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <!-- 文章列表 -->
          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <a href=""><img :src="article.author.image" class="user-img"/></a>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{
                  article.createdAt | formatDate('MMMM DD,YYYY')
                }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>

            <!-- 用户的tag -->
            <div class="tag-list" style="margin-top:30px;">
              <div
                v-for="(tagItem, index) in article.tagList"
                :key="index"
                class="tag-pill tag-default"
              >
                {{ tagItem }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getuserCenterInfo, getFavoritedInfo } from '../api/users'

export default {
  props: [''],
  components: {}, // 注册组件
  name: 'Profile',
  data() {
    return {}
  },
  watchQuery: ['author'],

  async asyncData({ params, query }) {
    console.log(params, query)
    const page = Number.parseInt(query.page || 1) // 页码
    const limit = params.limit || 5 // 每页显示的文章数
    const offset = (page - 1) * limit // 点击的是第几页
    let getserverData =
      query.author === 'author' || query.author === undefined
        ? getuserCenterInfo
        : getFavoritedInfo
    const userCenter = await getserverData({
      author: params.username,
      favorited: params.username,
      limit,
      offset,
    })
    console.log(userCenter.data)
    return {
      articles: userCenter.data.articles,
      articlesCount: userCenter.data.articlesCount,
      limit: limit,
      offset: offset,
      author: params.username, // 作者的名字
      articleUser: params.articleUser, // 文章详情页传递过来的文章用户信息
    }
  },
  mounted() {}, // 生命周期 - 挂载之后

  computed: {},

  methods: {
    // 获取用户自身的文章
    getuserSelfAarticle() {
      this.getTabAarticle()
    },
    // 获取用户收藏的文章
    getFavoritedAarticle() {
      this.getTabAarticle()
    },

    async getTabAarticle() {
      // const resUserSelf = {}
      // let isFavorite = this.$refs.Favorited.textContent
      // console.log(isFavorite.trim().startsWith('Favorited'))
      // isFavorite.trim().startsWith('Favorited')
      //   ? (resUserSelf.favorited = this.author)
      //   : (resUserSelf.author = this.author)
      // resUserSelf.limit = this.limit
      // resUserSelf.offset = this.offset
      // console.log(resUserSelf)
      // const userSelfAarticle = await getuserCenterInfo(resUserSelf)
      // this.articles = userSelfAarticle.data.articles
      // this.articlesCount = userSelfAarticle.data.articlesCount
    },
  },

  watch: {},
}
</script>
<style lang="" scoped></style>

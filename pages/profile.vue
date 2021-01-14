<!-- 组件说明 用户发表文章列表+收藏文章列表页面-->
<template>
  <div class="profile-page">
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1" v-if="articleUser">
            <img
              :src="articleUser.image"
              class="user-img "
              style="pointer-events: none;"
            />
            <h4 style="pointer-events: none;" class="qwd">
              {{ articleUser.username }}
            </h4>
            <p>
              {{ articleUser.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="follow()"
              v-if="articleUser.username !== users.username"
            >
              <i class="ion-plus-round"></i>
              &nbsp;
              {{
                articleUser.following
                  ? `Unfollow ${articleUser.username}`
                  : `Follow ${articleUser.username}`
              }}
              <!-- {{ articleUser.username }} -->
            </button>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="gotoEditSettings()"
              v-else
            >
              <i class="ion-gear-a"></i>
              &nbsp; Edit Profile Settings
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
                  class="nav-link"
                  :class="{ active: author !== 'favorites' }"
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
                  :class="{ active: author === 'favorites' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: { tag: 'favoritesTag', author: 'favorites' },
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
            <!-- 文章用户信息+收藏按钮 -->
            <div class="article-meta">
              <a href=""><img :src="article.author.image" class="user-img"/></a>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{
                  article.createdAt | formatDate('MMMM DD,YYYY')
                }}</span>
              </div>
              <!-- 收藏文章按钮 -->
              <button
                class="btn btn-sm pull-xs-right"
                :class="
                  article.favorited ? 'btn-primary' : 'btn-outline-primary'
                "
                @click="favoriteOrUnFavorite(article.slug)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <!-- 跳转文章详情页面 -->
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

          <!-- 页数分页 -->
          <ul class="pagination" v-if="articlesCount > 1">
            <li
              class="page-item"
              v-for="pages in articlesCount"
              :key="pages"
              :class="{ active: pages === page }"
            >
              <nuxt-link
                class="page-link "
                :to="{
                  name: 'profile',
                  query: { page: pages, tag },
                }"
              >
                {{ pages }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getuserCenterInfo,
  getFavoritedInfo,
  getArticleSelfUser,
  getArticleSelfPageData,
} from '../api/users'
import {
  addFavorite,
  deleteFavorite,
  addFollowQuanbh,
  deleteFollowQuanbh,
} from '../api/article'
import { mapState } from 'vuex'

export default {
  props: [''],
  components: {}, // 注册组件
  name: 'Profile',
  data() {
    return {}
  },
  watchQuery: ['author', 'page'],

  async asyncData({ params, query }) {
    console.log(params, query)
    const page = Number.parseInt(query.page || 1) // 页码
    const limit = params.limit || 5 // 每页显示的文章数
    const offset = (page - 1) * limit // 点击的是第几页
    let tag = query.tag ? query.tag : 'authorTag'
    let getserverData =
      query.author !== 'favorites' ? getuserCenterInfo : getFavoritedInfo
    let userCenter = ''

    userCenter = await getserverData({
      author: params.username,
      favorited: params.username,
      limit,
      offset,
    })

    // 点击分页按钮
    if (query.page) {
      console.log('有page1参数')
      userCenter = await getArticleSelfPageData({
        author: params.username,
        favorited: tag === 'favoritesTag' ? params.username : '',
        limit,
        offset,
      })
    }

    const articleUserSelf = await getArticleSelfUser(params.username)
    // console.log(userCenter.data.articles)

    return {
      articles: userCenter.data.articles,
      articlesCount: Math.ceil(userCenter.data.articlesCount / limit), // 文章分页总数
      limit: limit,
      offset: offset,
      author: query.author, // tab选项卡的标记
      articleUser: articleUserSelf.data.profile, // 文章详情页传递过来的文章用户信息
      page, // 当前是第几页
      tag, // tab选项卡的标记+分页按钮的标记
    }
  },
  mounted() {}, // 生命周期 - 挂载之后

  computed: {
    ...mapState(['users']),
  },

  methods: {
    //点击favorite 按钮
    async favoriteOrUnFavorite(slug) {
      let favorite = null
      const oneArticle = this.articles.filter((item) => item.slug === slug)

      let res
      let params = {
        author: this.$route.params.username,
        favorited: this.$route.params.username,
        limit: this.limit,
        offset: this.offset,
      }
      if (!oneArticle[0].favorited) {
        // 收藏
        favorite = await addFavorite(oneArticle[0].slug)
        console.log('收藏成功', favorite)
        // 重新获取数据
        if (this.page === 1) {
          if (this.author == 'author' || this.author == undefined) {
            res = await getuserCenterInfo(params)
          } else if (this.author == 'favorites' && this.page === 1) {
            res = await getFavoritedInfo(params)
          }
        } else {
          res = await getArticleSelfPageData(params)
        }
        this.articles = res.data.articles
      } else {
        // 删除
        favorite = await deleteFavorite(oneArticle[0].slug)
        console.log('删除收藏', favorite)
        // 重新获取数据
        if (this.page === 1) {
          if (this.author === undefined || this.author === 'author') {
            res = await getuserCenterInfo(params)
          } else if (this.author == 'favorites' && this.page === 1) {
            res = await getFavoritedInfo(params)
          }
        } else {
          console.log('getArticleSelfUser')
          res = await getArticleSelfPageData(params)
        }
        this.articles = res.data.articles
      }
    },

    //点击follow 按钮
    async follow() {
      let follow = null
      const username = this.$route.params.username

      if (!this.articleUser.following) {
        const username = this.$route.params.username
        // 添加
        follow = await addFollowQuanbh(username)
        console.log('添加follow成功', follow)
        follow = await getArticleSelfUser(username)
        this.articleUser = follow.data.profile
      } else {
        // 删除
        follow = await deleteFollowQuanbh(username)
        console.log('删除follow成功', follow)
        await getArticleSelfUser(username)
        this.articleUser = follow.data.profile
      }
    },
    // 点击打开设置页面
    gotoEditSettings() {
      this.$router.push('/setting')
    },
  },

  watch: {},
}
</script>
<style lang="css" scoped>
.user-img,
.info {
  pointer-events: none;
}
</style>

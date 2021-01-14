<!-- 组件说明  文章详情页面-->

<template>
  <div class="article-page" v-if="detailData && detailData.author">
    <div class="banner">
      <div class="container">
        <h1>{{ detailData.title }}</h1>

        <div class="article-meta">
          <!-- 发表文章的用户头像+日期+用户名 -->
          <nuxt-link :to="`/profile/${detailData.author.username}`"
            ><img :src="detailData.author.image"
          /></nuxt-link>
          <div class="info">
            <nuxt-link
              :to="`/profile/${detailData.author.username}`"
              class="author"
              >{{ detailData.author.username }}</nuxt-link
            >
            <span class="date">{{
              detailData.createdAt | formatDate('MMMM DD, YYYY')
            }}</span>
          </div>

          <button
            class="btn btn-sm btn-outline-secondary"
            v-if="users.username !== detailData.author.username"
            @click="followQuanbh()"
            ref="unfollowOrFollow"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{
              following
                ? `Unfollow ${detailData.author.username}`
                : `Follow ${detailData.author.username}`
            }}
            <!-- <span class="counter">(0)</span> -->
          </button>

          <!-- 编辑文章 -->
          <button
            @click="gotoEditorPage"
            class="btn btn-sm btn-outline-secondary"
            v-else
          >
            <i class="ion-edit"></i>
            &nbsp; Editor Article
          </button>
          &nbsp;&nbsp;

          <!--收藏文章 -->
          <button
            class="btn btn-sm btn-outline-primary"
            v-if="users.username !== detailData.author.username"
            @click="favoriteOrUnFavorite()"
            ref="unFavoriteOrfavorite"
          >
            <i class="ion-heart"></i>
            &nbsp;
            {{ isFavorite ? `Unfavorite Article ` : `Favorite Article` }}
            <span class="counter">({{ detailData.favoritesCount }})</span>
            <!-- &nbsp; Unfavorite Article <span class="counter">(29)</span> -->
          </button>

          <!-- 删除文章 -->
          <button
            @click="gotoDeletePage"
            class="btn btn-sm btn-outline-danger"
            v-else
          >
            <i class="ion-trash-a"></i>
            &nbsp; Delete Article
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <!-- 文章详情内容 -->
      <div class="row article-content">
        <div class="col-md-12" v-html="detailData.body">
          <!-- {{ detailData.body }} -->
          <div class="tag-list" style="margin-top:30px;">
            <div
              v-for="(tagItem, index) in detailData.tagList"
              :key="index"
              class="tag-pill tag-default"
            >
              {{ tagItem }}
            </div>
          </div>
          <!-- <p>
            Web development technologies have evolved at an incredible clip over
            the past few years.
          </p>
          <h2 id="introducing-ionic">Introducing RealWorld.</h2>
          <p>It's a great solution for learning how other frameworks work.</p> -->
        </div>
      </div>

      <hr />

      <!-- 发表文章的用户头像+日期+用户名 -->
      <div class="article-actions">
        <div class="article-meta">
          <!-- <nuxt-link :to="`/profile/${detailData.author.username}`"> -->
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: detailData.author.username,
              },
            }"
          >
            <img :src="detailData.author.image" />
          </nuxt-link>
          <div class="info">
            <!-- <nuxt-link
              :to="`/profile/${detailData.author.username}`"
              class="author"> -->
            <nuxt-link
              :to="{
                name: 'profile',
                params: {
                  username: detailData.author.username,
                },
              }"
            >
              {{ detailData.author.username }}
            </nuxt-link>
            <span class="date">{{
              detailData.createdAt | formatDate('MMMM DD, YYYY')
            }}</span>
          </div>

          <button
            class="btn btn-sm btn-outline-secondary"
            v-if="users.username !== detailData.author.username"
            @click="followQuanbh()"
            ref="unfollowOrFollow"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            {{
              following
                ? `Unfollow ${detailData.author.username}`
                : `Follow ${detailData.author.username}`
            }}
            <!-- <span class="counter">(0)</span> -->
          </button>

          <!-- 编辑文章 -->
          <button
            @click="gotoEditorPage"
            class="btn btn-sm btn-outline-secondary"
            v-else
          >
            <i class="ion-edit"></i>
            &nbsp; Editor Article
          </button>

          &nbsp;
          <!-- 收藏文章 -->
          <button
            class="btn btn-sm btn-outline-primary"
            v-if="users.username !== detailData.author.username"
            @click="favoriteOrUnFavorite()"
            ref="unFavoriteOrfavorite"
          >
            <i class="ion-heart"></i>
            &nbsp;
            {{ isFavorite ? `Unfavorite Article ` : `Favorite Article` }}
            <span class="counter">({{ detailData.favoritesCount }})</span>
            <!-- &nbsp; Unfavorite Article <span class="counter">(29)</span> -->
          </button>

          <!-- 删除文章 -->
          <button
            @click="gotoDeletePage"
            class="btn btn-sm btn-outline-danger"
            v-else
          >
            <i class="ion-trash-a"></i>
            &nbsp; Delete Article
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- 编写评论区域 -->
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="articleComments"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="users.image" class="comment-author-img" />
              <button
                class="btn btn-sm btn-primary"
                @click.prevent="addComments"
              >
                Post Comment
              </button>
            </div>
          </form>

          <!-- 评论区域 -->
          <template v-if="allComments.length > 0">
            <div class="card" v-for="comment in allComments" :key="comment.id">
              <div class="card-block">
                <p class="card-text">
                  {{ comment.body }}
                </p>
              </div>
              <div class="card-footer">
                <nuxt-link to="" class="comment-author">
                  <img :src="comment.author.image" class="comment-author-img" />
                </nuxt-link>
                &nbsp;
                <nuxt-link to="" class="comment-author">{{
                  comment.author.username
                }}</nuxt-link>
                <span class="date-posted">{{
                  comment.author.createdAt | formatDate('MMMM DD,YYYY')
                }}</span>
                <span class="mod-options">
                  <!-- <i class="ion-edit"></i> -->
                  <i
                    class="ion-trash-a"
                    v-if="comment.author.username === users.username"
                    @click="deleteOneComment(comment.id)"
                  ></i>
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
import MarkdownIt from 'markdown-it'
import {
  getArticleDetail,
  addFollowQuanbh,
  deleteFollowQuanbh,
  addFavorite,
  deleteFavorite,
  deleteSelfOneArticle,
  addOneComments,
  deleteComment,
} from '../api/article'
import { mapState } from 'vuex'
export default {
  props: [''],
  components: {}, // 注册组件
  name: 'ArticleDeatil',
  data() {
    return {
      // detailData: {},
      articleComments: '', //添加文章评论信息
      allComments: [], // 获取文章所有的评论信息
    }
  },
  // 设置页面meta优化SEO
  head() {
    return {
      title: `${this.detailData.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.detailData.description,
        },
      ],
    }
  },
  // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

  // },

  async asyncData({ params, route }) {
    const slug = params.slug
    const md = new MarkdownIt()
    // 获取文章详情数据
    const detailData = await getArticleDetail(slug)
    if (detailData.status === 200) {
      const body = md.render(detailData.data.article.body)
      detailData.data.article.body = body
      return {
        detailData: detailData.data.article,
      }
    }
  },

  mounted() {
    // console.log(this.users)
    // console.log(this.detailData)
    // this.following()
    this.getArticleAllComments()
  },

  computed: {
    ...mapState(['users', 'vuex_following', 'vuex_favorite']),
    following() {
      // return false
      if (this.vuex_following && this.vuex_following.length) {
        const res = this.vuex_following.filter((item) => {
          return item.slug === this.$route.params.slug
        })
        console.log(res)
        return res.length > 0
      } else {
        console.log(false)
        return false
      }
    },
    isFavorite() {
      if (this.vuex_favorite && this.vuex_favorite.length) {
        const res = this.vuex_favorite.filter((item) => {
          return item.slug === this.$route.params.slug
        })
        // this.favoritesCount = res[0].favoritesCount
        return res.length > 0
      } else {
        console.log(false)
        // this.favoritesCount = 0
        return false
      }
    },
  },

  methods: {
    // 编辑文章
    gotoEditorPage() {
      // console.log(this.detailData)
      this.$router.push(`/editor/${this.detailData.slug}`)
    },

    // 删除自己的一篇文章
    async gotoDeletePage() {
      await deleteSelfOneArticle(this.$route.params.slug)
      this.$router.push('/') // 跳转到首页
    },

    //点击favorite 按钮
    async favoriteOrUnFavorite() {
      let isFavorite = this.$refs.unFavoriteOrfavorite.textContent
      let favorite = null
      let favoriteData = []
      if (isFavorite.trim().startsWith('Favorite')) {
        // 收藏
        favorite = await addFavorite(this.detailData.slug)
        console.log(favorite)
        if (favorite.status === 200) {
          favoriteData.push({
            slug: this.$route.params.slug,
            favorited: favorite.data.article.favorited,
            // favoritesCount: favorite.data.article.favoritesCount,
            author: favorite.data.article.author,
          })
        }
      } else {
        // 删除
        favorite = await deleteFavorite(this.$route.params.slug)
        favoriteData = this.vuex_favorite.filter((item) => {
          return item.slug !== this.$route.params.slug
        })
      }

      // 重新获取文章详情数据
      this.startGetArticleDetail(this.$route.params.slug)

      // 把数据保存在vuex中
      this.$store.commit('saveFavorite', favoriteData)
      console.log(favoriteData)
      // 把用favorite按钮的状态，保存在本地，确保页面刷新后，数据不会丢失，
      Cookie.set('cookFavorite', favoriteData)
    },

    //点击follow quanbh 按钮
    async followQuanbh() {
      let isFollow = this.$refs.unfollowOrFollow.textContent
      let follow = null
      let followingData = []

      if (isFollow.trim().startsWith('Follow')) {
        // if (!this.isFollow) {
        // 添加
        follow = await addFollowQuanbh(this.detailData.author.username)
        if (follow.status === 200) {
          followingData.push({
            slug: this.$route.params.slug,
            following: follow.data.profile.following,
          })
        }
      } else {
        // 删除
        follow = await deleteFollowQuanbh(this.detailData.author.username)
        followingData = this.vuex_following.filter((item) => {
          return item.slug !== this.$route.params.slug
        })
      }

      // 把数据保存在vuex中
      this.$store.commit('saveFollowing', followingData)
      console.log(followingData)
      // 把用follow按钮的状态，保存在本地，确保页面刷新后，数据不会丢失，
      Cookie.set('cookFollowing', followingData)
    },

    // 添加一条评论
    async addComments() {
      // console.log(this.articleComments)
      // console.log(this.$route.params.slug)
      const comments = {
        slug: this.$route.params.slug,
        comment: { body: this.articleComments },
      }
      const commentsRes = await addOneComments(comments)
      console.log(commentsRes)
      if (commentsRes.status === 200) {
        // 重新获取文章的所有评论
        // this.getArticleAllComments()
        this.allComments.unshift(commentsRes.data.comment)
        this.articleComments = ''
      }
    },
    // 获取文章的所有评论
    async getArticleAllComments() {
      const allCommentsRes = await addOneComments(this.$route.params.slug)
      if (allCommentsRes.status === 200) {
        this.allComments = allCommentsRes.data.comments
        console.log(allCommentsRes.data)
      }
    },
    // 删除指定的一条评论
    async deleteOneComment(commentId) {
      const deleteParams = {
        slug: this.$route.params.slug,
        commentId,
      }
      const deleteAafterData = await deleteComment(deleteParams)
      if (deleteAafterData.status === 200) {
        this.allComments = this.allComments.filter(
          (item) => item.id !== commentId
        )
      }
    },
  },

  watch: {},
}
</script>
<style lang="" scoped></style>

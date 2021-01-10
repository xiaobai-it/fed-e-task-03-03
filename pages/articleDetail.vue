<!-- 组件说明  文章详情页面-->
<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{detailData.title}}</h1>

        <div class="article-meta">
          <!-- 发表文章的用户头像+日期+用户名 -->
          <a href=""><img :src="detailData.author.image"/></a>
          <div class="info">
            <a href="" class="author">{{detailData.author.username}}</a>
            <span class="date">{{detailData.createdAt | formatDate('MMM DD, YYYY')}}</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary" v-if="users.username !== detailData.author.username">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Raffaele Di Stazio <span class="counter">(10)</span>
          </button>

          <!-- 编辑文章 -->
          <button @click="gotoEditorPage" class="btn btn-sm btn-outline-secondary" v-else>
            <i class="ion-edit"></i>
            &nbsp; Editor Article
          </button>
          &nbsp;&nbsp;

           <!--收藏文章 -->
          <button class="btn btn-sm btn-outline-primary" v-if="users.username !== detailData.author.username">
            <i class="ion-heart"></i>
            &nbsp; Favorite Article <span class="counter">(29)</span>
          </button>

          <!-- 删除文章 -->
          <button class="btn btn-sm btn-outline-danger" v-else>
            <i class="ion-trash-a"></i>
            &nbsp; Delete Article
          </button>
        </div>
      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12">
          {{detailData.body}}
          <!-- <p>
            Web development technologies have evolved at an incredible clip over
            the past few years.
          </p>
          <h2 id="introducing-ionic">Introducing RealWorld.</h2>
          <p>It's a great solution for learning how other frameworks work.</p> -->
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <div class="article-meta">
          <a href=""><img :src="detailData.author.image"/></a>
          <div class="info">
            <a href="" class="author">{{detailData.author.username}}</a>
            <span class="date">{{detailData.createdAt | formatDate('MMM DD, YYYY')}}</span>
          </div>

          <button class="btn btn-sm btn-outline-secondary" v-if="users.username !== detailData.author.username">
            <i class="ion-plus-round"></i>
            &nbsp; Follow Eric Simons <span class="counter">(10)</span>
          </button>
           <button class="btn btn-sm btn-outline-secondary" v-else>
            <i class="ion-edit"></i>
            &nbsp; Editor Article
          </button>
          &nbsp;
          <button class="btn btn-sm btn-outline-primary" v-if="users.username !== detailData.author.username">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
          <button class="btn btn-sm btn-outline-danger" v-else>
            <i class="ion-trash-a"></i>
            &nbsp; Delete Article
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                :src="users.image"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>

          <!-- <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div> -->

          <!-- <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div> -->
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import {getArticleDetail} from '../api/article'
import {mapState} from 'vuex'
export default {
  props: [''],
  components: {}, // 注册组件
  name: 'ArticleDeatil',
  data() {
    return {}
  },
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    const slug = params.slug
     const detailData = await getArticleDetail(slug)
    if(detailData.status === 200){
      return {
        detailData:detailData.data.article
      }
    }
  },

  mounted() {
    // console.log(this.users)
    // console.log(this.detailData)
  },

  computed: {
    ...mapState(['users'])
  },

  methods: {
    // 编辑文章
    gotoEditorPage(){
      // console.log(this.detailData)
      this.$router.push(`/editor/${this.detailData.slug}`)
    }
  },

  watch: {},
}
</script>
<style lang="" scoped></style>

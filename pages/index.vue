<!-- 组件说明 首页 -->
<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="users && users.username">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed',
                    },
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'global_feed' && tag==='undefined' }"
                  exact
                  :to="{
                    name: 'home',
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item"  >
                <nuxt-link class="nav-link" 
                  :class="{ active: tag?true:false}"
                  exact
                  :to="{
                    name: 'home',
                    query:{ tag}
                  }">
                  <i class="ion-pound" v-if="tag"></i>{{tag}}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <template v-if="totalPages > 0">
            <div
              class="article-preview"
              v-for="article in articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link :to="`/profile/${article.author.username}`"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link :to="`/profile/${article.author.username}`" class="author">{{ article.author.username }}</nuxt-link>
                  <span class="date">
                    {{ article.createdAt | formatDate('MMM DD, YYYY') }}
                  </span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link :to="`/article/${article.slug}`" class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <ul>
                  <li
                    class="index-article-tag-style"
                    v-for="(item, index) in article.tagList"
                    :key="index"
                  >
                    {{ item }}
                  </li>
                </ul>

                <span>Read more...</span>
              </nuxt-link>
            </div>
          </template>

          <template v-else>
            <div class="article-preview">No articles are here... yet.</div>
          </template>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list" >
              <nuxt-link 
                v-for="(tagItem,index) in allTags" :key="index"
                :to="{name:'home',query:{tag: tagItem}}" 
                class="tag-pill tag-default" 
                exact
              >
              {{tagItem}}
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- 页数分页 -->
        <ul class="pagination" v-if="totalPages > 0">
          <li
            class="page-item"
            v-for="pages in totalPages"
            :key="pages"
            :class="{ active: pages === page }"
          >
            <nuxt-link 
              class="page-link " 
              :to="{
                name:'home',
                query:{page: pages,
                       tag: $route.query.tag,}
              }"
            >
              {{ pages }} 
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getGlobalArticles, getYourFeedArticles,getRightTagsArticles } from '../api/article'
import {getTags} from '../api/tag'
import { mapState } from 'vuex'

export default {
  // layout: 'blogTopAndBottom', // 用nuxt中的页面组件包裹当前组件
  props: [''],
  components: {}, // 注册组件
  name: 'HomePages',
  data() {
    return {}
  },

  watchQuery: ['tab','tag','page'], // nuxtjs中监视地址栏的中变化，一但变化，asyncData方法就会调用

  //为了SEO，所以把请求数据的api放在的nuxtjs中的asyncData方法里
  async asyncData(context) {
    const page = Number.parseInt(context.query.page || 1) // 页码
    const tab = context.query.tab || 'global_feed' // 选项卡
    const tag = context.query.tag // 首页的标签
    const limit = 20 // 每页显示的文章数

    console.log(context.query.tab)
    console.log(context.query.tag)
    console.log(context.query.page)


    let loadArticles
    if(tag){
      loadArticles = getRightTagsArticles
    }else if (tab === 'your_feed'){
      loadArticles = getYourFeedArticles
    }else if ( tab === 'global_feed'){
      loadArticles = getGlobalArticles
    }
    console.log(loadArticles)
    const [serverData,allTags] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags(),
    ])

    const totalPages = Math.floor(serverData.data.articlesCount / limit) // 文章总数

    return {
      articles: serverData.data.articles, // 所有文章
      totalPages, // 文章总数
      page, // 页码
      tab, // 选项卡
      allTags:allTags.data.tags, // 所有的标签列表
      tag, // 首页右侧的标签
    }
  },

  mounted() {
    console.log(this)
  }, // 生命周期 - 挂载之后

  computed: {
    ...mapState(['users']),
  },

  methods: {},

  watch: {},
}
</script>

<style lang="css" scoped>
.index-article-tag-style {
  list-style: none;
  padding: 0 10px;
  border: 1px solid #ccc;
  float: left;
  border-radius: 10px;
  margin-right: 5px;
}
</style>

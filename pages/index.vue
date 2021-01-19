<!-- 组件说明 首页 -->
<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <!-- <p>A place to share your knowledge.</p> -->
        <p>老子第一次手动部署自动化，不成功弄死你！！！！</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <!-- 3个tab选项卡 -->
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="users && users.username">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab !== 'global_feed' && tag === undefined,
                  }"
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
                  :class="{
                    active: tab === 'global_feed' && tag === undefined,
                  }"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed',
                    },
                  }"
                >
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tag }"
                  exact
                  :to="{
                    name: 'home',
                    query: { tag },
                  }"
                >
                  <i class="ion-pound"></i>{{ tag }}
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
              <!-- 文章作者信息+收藏按钮 -->
              <div class="article-meta">
                <!-- 文章作者信息 -->
                <nuxt-link :to="`/profile/${article.author.username}`"
                  ><img :src="article.author.image"
                /></nuxt-link>
                <div class="info">
                  <nuxt-link
                    :to="`/profile/${article.author.username}`"
                    class="author"
                    >{{ article.author.username }}</nuxt-link
                  >
                  <span class="date">
                    {{ article.createdAt | formatDate('MMM DD, YYYY') }}
                  </span>
                </div>

                <!-- 收藏文章按钮 -->
                <button
                  class="btn btn-sm pull-xs-right btn-sm "
                  :class="
                    article.favorited ? 'btn-primary' : 'btn-outline-primary'
                  "
                  @click="
                    favoriteOrUnFavorite(article.slug, article.author.username)
                  "
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <!-- 进入文章详情页 -->
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

            <div class="tag-list">
              <nuxt-link
                v-for="(tagItem, index) in allTags"
                :key="index"
                :to="{ name: 'home', query: { tag: tagItem } }"
                class="tag-pill tag-default"
                exact
              >
                {{ tagItem }}
              </nuxt-link>
            </div>
          </div>
        </div>

        <!-- 页数分页 -->
        <ul class="pagination" v-if="totalPages > 20">
          <li
            class="page-item"
            v-for="pages in totalPages"
            :key="pages"
            :class="{ active: pages === page }"
          >
            <nuxt-link
              class="page-link "
              :to="{
                name: 'home',
                query: {
                  page: pages,
                  tag: $route.query.tag,
                  tab: $route.query.tab,
                },
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
import {
  getGlobalArticles,
  getYourFeedArticles,
  getRightTagsArticles,
  addFavorite,
  deleteFavorite,
} from '../api/article'
import { getTags } from '../api/tag'
import { mapState } from 'vuex'

export default {
  // layout: 'blogTopAndBottom', // 用nuxt中的页面组件包裹当前组件
  props: [''],
  components: {}, // 注册组件
  name: 'HomePages',
  data() {
    return {}
  },

  watchQuery: ['tab', 'tag', 'page'], // nuxtjs中监视地址栏的中变化，一但变化，asyncData方法就会调用

  //为了SEO，所以把请求数据的api放在的nuxtjs中的asyncData方法里
  async asyncData(context) {
    const page = Number.parseInt(context.query.page || 1) // 页码
    const tab = context.query.tab || 'global_feed' // 选项卡
    const tag = context.query.tag // 首页的标签
    const limit = 20 // 每页显示的文章数
    const offset = (page - 1) * limit // 点击的是第几页
    // console.log(tab)
    // console.log(tag)
    // console.log(page)

    let loadArticles = null
    if (tag) {
      loadArticles = getRightTagsArticles
    } else if (tab === 'your_feed') {
      loadArticles = getYourFeedArticles
    } else if (tab === 'global_feed') {
      loadArticles = getGlobalArticles
    }

    const [serverData, allTags] = await Promise.all([
      loadArticles({
        limit,
        offset,
        tag,
      }),
      getTags(),
    ])
    const totalPages = Math.floor(serverData.data.articlesCount / limit) // 文章总数
    // console.log(serverData)

    return {
      articles: serverData.data.articles, // 所有文章
      totalPages: totalPages ? totalPages : serverData.data.articles.length, // 文章分页总数
      page, // 页码
      tab, // 选项卡
      allTags: allTags.data.tags, // 所有的标签列表
      tag, // 首页右侧的标签
      limit,
      offset,
      author: tab,
    }
  },

  mounted() {}, // 生命周期 - 挂载之后

  computed: {
    ...mapState(['users']),
  },

  methods: {
    //点击收藏按钮
    async favoriteOrUnFavorite(slug, articleUser) {
      let favorite = null
      const oneArticle = this.articles.filter((item) => item.slug === slug)

      let res
      let params = {
        // author: articleUser,
        // favorited: articleUser,
        limit: this.limit,
        offset: this.offset,
      }

      if (!oneArticle[0].favorited) {
        // 收藏
        favorite = await addFavorite(oneArticle[0].slug)

        // 重新获取数据
        if (this.author == 'your_feed') {
          res = await getYourFeedArticles(params)
        } else if (this.author == 'global_feed') {
          res = await getGlobalArticles(params)
        }
        this.articles = res.data.articles
      } else {
        // 删除
        favorite = await deleteFavorite(oneArticle[0].slug)
        // 重新获取数据
        if (this.author === 'your_feed') {
          res = await getYourFeedArticles(params)
        } else if (this.author == 'global_feed') {
          res = await getGlobalArticles(params)
        }
        this.articles = res.data.articles
      }
    },
  },

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

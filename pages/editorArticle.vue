<!-- 组件说明 发布文章页面 -->
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="des"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publishArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publishNewArticle, getArticleDetail } from '../api/article'

export default {
  middleware: 'notauthenticated', // 用户没有登录，使用nuxtjs，跳转到登录页
  props: [''],
  components: {}, // 注册组件
  name: 'EditorArticle',
  data() {
    return {
      title: '',
      des: '',
      body: '',
      tag: '',
    }
  },

  mounted() {
    console.log(this.$route.params.slug)
    // 获取重新编辑的文章的数据
    this.aginGetArticleDetail()
  },

  computed: {},

  methods: {
    // 获取重新编辑的文章的数据
    async aginGetArticleDetail() {
      const aginGetData = await getArticleDetail(this.$route.params.slug)
      console.log(aginGetData)
      if (aginGetData.status === 200) {
        const { title, description, body, tagList } = aginGetData.data.article
        this.title = title
        this.des = description
        this.body = body
        this.tag = tagList.join(',')
      }
    },

    // 发布新的文章
    async publishArticle() {
      const { title, des, body } = this
      const tag = this.tag.split(',')
      // {
      //   "article": {
      //     "title": "How to train your dragon",
      //     "description": "Ever wonder how?",
      //     "body": "You have to believe",
      //     "tagList": ["reactjs", "angularjs", "dragons"]
      //   }
      // }
      let article = {}
      article.title = title
      article.description = des
      article.body = body
      article.tagList = tag

      console.log(article)
      const res = await publishNewArticle({ article })
      console.log(res)
      if (res.status === 200 && res.data.article) {
        this.$router.push(`/article/${res.data.article.slug}`)
      }
    },
  },

  watch: {},
}
</script>
<style lang="" scoped></style>

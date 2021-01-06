<!-- 组件说明 -->
<template>
  <div>
    <!-- 所有页面通用的头部 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/">Home</nuxt-link>
          </li>

          <template v-if="users && users.username">
            <li class="nav-item">
              <nuxt-link class="nav-link " to="/editorArticle">
                <i class="ion-compose"></i>&nbsp;New Article
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/setting">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="`/profile/${users.username}`">
                {{ users.username }}
                <img class="user-pic" :src="users.image" />
              </nuxt-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/registe">Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <!-- 显示的子组件页面 -->
    <nuxt />

    <!-- 所有页面通用的底部 -->
    <footer>
      <div class="container">
        <nuxt-link to="/" class="logo-font">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <nuxt-link to="https://thinkster.io">Thinkster</nuxt-link>. Code &amp;
          design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: [''],
  components: {}, // 注册组件
  name: 'layoutAll',
  data() {
    return {}
  },

  mounted() {},
  computed: {
    ...mapState(['users']),
  },

  methods: {},

  watch: {},
}
</script>
<style lang="" scoped></style>

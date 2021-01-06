<!-- 组件说明 登录+注册页面-->
<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ loginOrregiste ? 'Sign up' : 'Sign in' }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link to="/login" v-if="$route.path === '/registe'">
              Have an account?
            </nuxt-link>
            <nuxt-link to="/registe" v-else>Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(errName, errfield) in errors">
              <li v-for="(msg, index) in errName" :key="index">
                {{ errfield }} : {{ msg }}
              </li>
            </template>
          </ul>

          <form>
            <fieldset class="form-group" v-if="$route.path === '/registe'">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="submit"
            >
              {{ loginOrregiste ? 'Sign up' : 'Sign in' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, registe } from '../api/users'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  props: [''],
  components: {}, // 注册组件
  name: 'LoginOrRegiste',
  // asyncData(context) {
  //   console.log(context)
  // },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: {},
    }
  },

  mounted() {},

  computed: {
    loginOrregiste() {
      return this.$route.path === '/registe'
    },
  },

  methods: {
    async submit() {
      try {
        // 注册的api
        if (this.loginOrregiste) {
          const res = await registe({ user: this.user })
          if (res.data && res.data.user) this.$router.push('/login')
        } else {
          // 登录的api
          const res = await login({ user: this.user })
          if (res.data && res.data.user) {
            // 把数据保存在vuex中
            this.$store.commit('saveUsrsLoginInfo', res.data.user)
            // 把用户登录信息，保存在本地，确保页面刷新后，用户的登录数据不会丢失，
            Cookie.set('user', res.data.user)
            // 跳转到登录首页
            this.$router.push('/')
          }
        }
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
  },

  watch: {},
}
</script>
<style lang="" scoped></style>

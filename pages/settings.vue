<!-- 组件说明 用户设置页面 -->
<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form v-if="userInfo">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="URL of profile picture"
                v-model="userInfo.image"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="userInfo.username"
              />
            </fieldset>

            <fieldset class="form-group">
              <textarea
                class="form-control form-control-lg"
                rows="8"
                placeholder="Short bio about you"
                v-model="userInfo.bio"
              >
              </textarea>
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="userInfo.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="New Password"
                v-model="userInfo.newPassword"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              @click.prevent="submit"
            >
              {{ 'Update Settings' }}
            </button>
          </form>
          <hr style="margin-top:80px;" />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
import { getOneUserLoginInfo } from '../api/users'
import { mapState } from 'vuex'
export default {
  middleware: 'notauthenticated', // 用户没有登录，使用nuxtjs，跳转到登录页
  props: [''],
  components: {}, // 注册组件
  name: 'Setting',
  data() {
    return {
      userInfo: {},
    }
  },

  mounted() {
    this.getUserLoginInfo()
  }, // 生命周期 - 挂载之后
  computed: {
    ...mapState(['users']),
  },
  methods: {
    async getUserLoginInfo() {
      const loginUser = await getOneUserLoginInfo()
      console.log(loginUser.data.user)
      this.userInfo = loginUser.data.user
    },
    // 提交更新后的用户数据
    async submit() {
      const updateUserInfo = {
        bio: this.userInfo.bio,
        email: this.userInfo.email,
        image: this.userInfo.image,
        password: this.userInfo.password, // 新密码应该也是password
        username: this.userInfo.username,
      }
      console.log(updateUserInfo)
      const loginUser = await getOneUserLoginInfo(updateUserInfo)
      console.log(loginUser.data.user)
      // 跳转到用户中心页面
      this.$router.push(`/profile/${loginUser.data.user.username}`)
    },
    // 退出登录
    logout() {
      // 清除用户在本地保存+vuex中的保存数据
      this.$store.commit('clearUsrsLoginInfo')
      Cookie.remove('user')
      // 跳转到登录首页
      this.$router.push('/')
    },
  },

  watch: {},
}
</script>
<style lang="" scoped></style>

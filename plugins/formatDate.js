// 格式化项目中的所有日期的插件

import Vue from 'vue'
import dayjs from 'dayjs'

// 在创建 Vue 实例之前全局定义过滤器
Vue.filter('formatDate', function(value, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(value).format(format)
})

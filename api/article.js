import { myAxios } from '../plugins/apiConfig'

// 获取全部文章列表
export const getGlobalArticles = (paramsData) => {
  console.log(paramsData)
  return myAxios.get('/api/articles', { params: paramsData })
}

// 获取YourFeed的文章列表
export const getYourFeedArticles = (params) => {
  return myAxios({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // 把tonken信息添加到axios中的请求拦截器中，共所有的请求使用token
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMzNTQ2LCJ1c2VybmFtZSI6InF3ZCIsImV4cCI6MTYxNTE4NTg4MX0._eRenqaYbJj_zn6P-c4qModzLkgkaIEumHAIPIlChR4`,
    // },
  })
}

// 点击首页右侧标签获取的数据列表
export const getRightTagsArticles = (paramsData) => {
  console.log(paramsData)
  // return myAxios.get('/api/articles', paramsData)
  return myAxios({
    method: 'GET',
    url: '/api/articles',
    params: paramsData,
  })
}

// 发布新的文章
export const publishNewArticle = (paramsData) => {
  console.log(paramsData)
  return myAxios.post('/api/articles', paramsData)
}

// 获取文章详情页面 + 获取重新编辑的文章的数据
export const getArticleDetail = (slug) => {
  console.log(slug)
  return myAxios.get(`/api/articles/${slug}`)
}

//点击follow quanbh 按钮
export const addFollowQuanbh = (user) => {
  return myAxios.post(`/api/profiles/${user}/follow`)
}

//点击follow quanbh 按钮。取消follow
export const deleteFollowQuanbh = (user) => {
  return myAxios.delete(`/api/profiles/${user}/follow`)
}

// 点击文章详情页面的收藏按钮,收藏文章
export const addFavorite = (slug) => {
  return myAxios.post(`/api/articles/${slug}/favorite`)
}
// 点击文章详情页面的收藏按钮，删除文章
export const deleteFavorite = (slug) => {
  return myAxios.delete(`/api/articles/${slug}/favorite`)
}

import { myAxios } from '../plugins/apiConfig'

// 获取全部文章列表
export const getGlobalArticles = (paramsData) => {
  return myAxios.get('/api/articles', paramsData)
}

// 获取用自己的文章列表
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

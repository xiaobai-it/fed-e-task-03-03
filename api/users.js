import { myAxios } from '../plugins/apiConfig'

//登录
export const login = (loginData) => {
  return myAxios.post('/api/users/login', loginData)
}

// 注册
export const registe = (registeData) => {
  console.log(registeData)
  return myAxios.post('/api/users', registeData)
  // return myAxios({
  //   method: 'POST',
  //   url: '/api/users',
  //   registeData,
  // })
}
//
export const getuserCenterInfo = (userCenterInfo) => {
  const { author, limit, offset } = userCenterInfo
  // console.log('传递的参数', userCenterInfo)
  return myAxios.get(
    `/api/articles?author=${author}&limit=${limit}&offset=${offset}`
  )
}

export const getFavoritedInfo = (favoritedParams) => {
  const { favorited, limit, offset } = favoritedParams
  // console.log(userCenterInfo)
  return myAxios.get(
    `/api/articles?favorited=${favorited}&limit=${limit}&offset=${offset}`
  )
}

export const getArticleSelfUser = (articleSelfUser) => {
  console.log(('文章用户参数', articleSelfUser))
  return myAxios.get(`/api/profiles/${articleSelfUser}`)
}

export const getArticleSelfPageData = (articlePageParams) => {
  console.log('文章用户页数参数', articlePageParams)
  const { author, favorited, limit, offset } = articlePageParams
  if (favorited) {
    return myAxios.get(
      `/api/articles/?favorited=${favorited}&limit=${limit}&offset=${offset}`
    )
  } else {
    return myAxios.get(
      `/api/articles/?author=${author}&limit=${limit}&offset=${offset}`
    )
  }
}

// 设置页面，获取登录用户信息
export const getOneUserLoginInfo = (params) => {
  console.log(params)
  if (params) {
    return myAxios.put('api/user', params)
  } else {
    return myAxios.get('api/user')
  }
}

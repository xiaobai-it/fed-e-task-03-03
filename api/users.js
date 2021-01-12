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
  // console.log(userCenterInfo)
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

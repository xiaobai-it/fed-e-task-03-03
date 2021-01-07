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

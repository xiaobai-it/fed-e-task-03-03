import axios from 'axios'

export const myAxios = axios.create({
  // baseURL: 'http://realworld.api.fed.lagounews.com',
  baseURL: 'https://conduit.productionready.io',
})

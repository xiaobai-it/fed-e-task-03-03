import { myAxios } from '../plugins/apiConfig'


export const getTags = () => {
    return myAxios.get('/api/tags')
}
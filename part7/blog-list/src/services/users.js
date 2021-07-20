import axios from 'axios'
import blogsServices from './blogs'
const baseUrl = '/api/users'

let token = blogsServices.getToken()

const getUsers = async () => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { getUsers }
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log(request)
  try {
    return request.then(response => response.data)
  } catch (error) {
    console.log(error)


  }
}

const deleteBlog = (id) => {
  const config = {
    headers: { authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, update, setToken, deleteBlog }
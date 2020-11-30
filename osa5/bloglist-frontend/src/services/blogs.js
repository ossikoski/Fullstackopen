import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('Create called, token: ', token)
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleting = id => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const comment = (id, comment) => {
  console.log('blogService comment', id, comment)
  const requestComment = {
    comment: comment
  }
  const request = axios.post(`${baseUrl}/${id}/comments`, requestComment)
  return request.then(response => response.data)
}

export default { setToken, getAll, create, update, deleting, comment }
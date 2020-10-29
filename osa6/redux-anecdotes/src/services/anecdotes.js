import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const getResponse = await axios.get(`${baseUrl}/${id}`)
  const object = {...getResponse.data, votes: getResponse.data.votes + 1}
  const putResponse = await axios.put(`${baseUrl}/${id}`, object)
  return putResponse.data
}
  

export default { getAll, createNew , addVote}
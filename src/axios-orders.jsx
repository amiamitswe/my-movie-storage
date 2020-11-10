import axios from 'axios'

const instance = axios.create({
  baseURL: `http://www.omdbapi.com`
})

export default instance

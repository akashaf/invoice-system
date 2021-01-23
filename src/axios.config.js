import axios from 'axios'

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})
axiosApi.defaults.headers['Authorization'] = `Bearer ${process.env.REACT_APP_AUTHKEY}`

export default axiosApi;
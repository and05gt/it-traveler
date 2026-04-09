import axios from 'axios'

export const clientFetch = axios.create({
  baseURL: 'https://backend-for-it-traveler.onrender.com',
  withCredentials: true
})

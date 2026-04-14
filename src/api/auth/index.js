import { clientFetch } from '../clientFetch.js'

export const login = (body) => {
  return clientFetch.post('/auth/login', body)
}

export const register = (body) => {
  return clientFetch.post('/auth/register', body)
}

export const logout = () => {
  return clientFetch.post('/auth/logout')
}

export const refresh = () => {
  return clientFetch.post('/auth/refresh')
}

export const getUserInfo = () => {
  return clientFetch.get('/auth/me')
}

import { clientFetch } from '../clientFetch.js'
import { router } from '@/router/index.js'

export const TOKEN_KEY = 'token'

class AuthService {
  #token = localStorage.getItem(TOKEN_KEY) || null

  isLoggedIn() {
    return Boolean(this.#token)
  }

  getToken() {
    return this.#token
  }

  setToken(token) {
    if (!token) return
    localStorage.setItem(TOKEN_KEY, token)
    this.#token = token
  }

  clearToken() {
    this.#token = null
    localStorage.removeItem(TOKEN_KEY)
  }

  async login(body) {
    const { data } = await clientFetch.post('/auth/login', body)
    const { accessToken } = data.data

    this.setToken(accessToken)
  }

  async register(body) {
    const { data } = await clientFetch.post('/auth/register', body)
    const { accessToken } = data.data

    this.setToken(accessToken)
  }

  async logout() {
    await clientFetch.post('/auth/logout')

    this.clearToken()
  }

  async refresh() {
    const { data } = await clientFetch.post('/auth/refresh')
    const { accessToken } = data.data

    this.setToken(accessToken)
  }
}

export const authService = new AuthService()

clientFetch.interceptors.request.use((request) => {
  const token = authService.getToken()

  if (token) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${token}`
    }
  }

  return request
})

clientFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // 1. Check if the error is 401 and that we haven't already retried this specific request
    // 2. CRITICAL: Do not attempt to refresh if the failed request WAS the refresh call itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true
      try {
        await authService.refresh()
        return clientFetch(originalRequest)
      } catch (refreshError) {
        authService.logout()
        router.push('/auth/login')
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

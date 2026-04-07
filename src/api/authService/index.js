import { clientFetch } from '../clientFetch.js'
import { router } from '@/router/index.js'

export const TOKEN_KEY = 'token'

class AuthService {
  #token = null

  isLoggedIn() {
    return Boolean(this.#token)
  }

  getToken() {
    return this.#token
  }

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
    this.#token = token
  }

  clearToken() {
    this.#token = null
    localStorage.removeItem(TOKEN_KEY)
  }

  async login(body) {
    const { data } = await clientFetch.post('/auth/login', body)
    const { accessToken } = data

    this.setToken(accessToken)
  }

  async register(body) {
    const { data } = await clientFetch.post('/auth/register', body)
    const { accessToken } = data

    this.setToken(accessToken)
  }

  async logout() {
    await clientFetch.post('/auth/logout')

    this.clearToken()
  }

  async refresh() {
    const { data } = await clientFetch.post('/auth/refresh')
    const { accessToken } = data

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
    const errorCode = error.response.status

    if (errorCode === 401) {
      try {
        return await authService.refresh()
      } catch (e) {
        router.push('/auth/login')
        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  }
)

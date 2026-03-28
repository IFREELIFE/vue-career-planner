import axios from '../utils/axios'

interface LoginRequest {
  username: string
  password: string
}

interface LoginData {
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
  token?: string
  role: string
  userId: number
}

interface RegisterRequest {
  role: string
  email: string
  password: string
  creditCode?: string
  companyName?: string
  legalRepresentative?: string
}

interface RefreshRequest {
  refreshToken: string
}

// Refresh endpoint generally mirrors login response, but userId may be omitted
/**
 * Token payload returned by refresh endpoint.
 * It mirrors LoginData but userId is optional because some backends omit it on refresh.
 */
type RefreshData = Omit<LoginData, 'userId'> & { userId?: number }

interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

interface Result<T> {
  code: number
  message: string
  data: T
}

export const authApi = {
  login: (data: LoginRequest): Promise<Result<LoginData>> => {
    return axios.post('/auth/login', { username: data.username, password: data.password })
  },
  
  register: (data: RegisterRequest): Promise<Result<LoginData>> => {
    return axios.post('/auth/register', data)
  },
  
  logout: (refreshToken: string): Promise<Result<null>> => {
    return axios.post('/auth/logout', { refreshToken })
  },
  
  refreshToken: (data: RefreshRequest): Promise<Result<RefreshData>> => {
    return axios.post('/auth/refresh', data)
  },
  
  changePassword: (data: ChangePasswordRequest): Promise<Result<null>> => {
    return axios.post('/auth/change-password', data)
  }
}

export const login = authApi.login
export const register = authApi.register
export const logout = authApi.logout
export const refreshToken = authApi.refreshToken
export const changePassword = authApi.changePassword

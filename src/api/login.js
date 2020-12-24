import http from '../utils/request'

export const login = (data) => {
  return http.post('api/login', data)
}

export const getLoginUser = () => {
  return http.get('api/login-user')
}

export const logout = () => {}

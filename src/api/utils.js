import http from '../utils/request'

export const getVerificationCode = (config) => {
  return http.get(`captcha/api/${config}`)
}

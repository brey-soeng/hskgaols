import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const httpRequest = axios.create({
  timeout: 10000,
  baseURL: process.env.VUE_APP_BASE_API
})

httpRequest.interceptors.request.use(
  config => {
    const token = getToken()
    config.headers.common.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

httpRequest.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    let code = 0
    let message = ''
    try {
      code = error.response.status
      message = error.response.data.message
        ? error.response.data.message
        : error.response.statusText
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Message.error({
          message: 'Network request timed out',
          duration: 5000
        })
        return Promise.reject(error)
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Message.error({
          message: 'Network error, please check if the interface is available',
          duration: 5000
        })
        return Promise.reject(error)
      }
    }

    // Unauthorized
    if (code === 401) {
      // to re-login
      MessageBox.confirm(
        'You have been logged out, you can cancel to stay on this page, or log in again',
        'Confirm logout',
        {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    let dangerouslyUseHTMLString = false
    if (
      code === 422 &&
      // eslint-disable-next-line no-prototype-builtins
      error.response.data.hasOwnProperty('errors')
    ) {
      message += '<br>'
      for (const key in error.response.data.errors) {
        const items = error.response.data.errors[key]
        if (typeof items === 'string') {
          message += `${items} <br>`
        } else {
          error.response.data.errors[key].forEach(item => {
            message += `${item} <br>`
          })
        }
      }
      dangerouslyUseHTMLString = true
    }

    Message({
      dangerouslyUseHTMLString,
      message: message,
      type: 'error',
      duration: 5000
    })

    return Promise.reject(error)
  }
)

export default httpRequest

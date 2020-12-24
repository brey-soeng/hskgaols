import http from '../utils/request'

export const getUserList = params => {
  return http.get(`api/users/${params}`)
}

export const getUser = id => {
  return http.get(`api/users/${id}`)
}

export const addUser = data => {
  return http.post('api/users', data)
}

export const editUser = (id, data) => {
  return http.put(`api/users/${id}`, data)
}

export const deleteUser = id => {
  return http.delete(`api/users/${id}`)
}

export const getBlockTable = id => {
  return http.get(`api/users/${id}/block-tables`)
}

export const setBlockTable = (id, ids) => {
  return http.post(`api/users/${id}/block-tables`, ids)
}

import store from '../store'

export const hasPermission = name => {
  const roles = store.getters && store.getters.roles

  return roles.includes('admin-super') || store.getters.permissions.indexOf(name) !== -1
}

import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding

    const permissions = store.getters && store.getters.permissions
    const roles = store.getters && store.getters.roles

    if (roles.includes('admin-super')) return
    if (permissions && permissions instanceof Array) {
      const hasPermission = permissions.includes(value)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('user must need permissions! Like "[\'admin-super\',\'editor\']"')
    }
  }
}

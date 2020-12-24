import { setPermissions } from '../utils/auth'
// 暂时没用到
const subscribe = store => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case 'permission/SET_PERMISSIONS':
        setPermissions(state.permission.permissions)
        break
    }
  })
}

export default store => {
  subscribe(store)
}

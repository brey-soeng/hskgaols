import { loadPermissions } from '../../api/permission'
import { setPermissions } from '@/utils/auth'
import { asyncRoutes, constantRoutes } from '@/router'
import store from '../index'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(permissions, route) {
  if (route.meta && route.meta.permission) {
    // return permissions.some(role => route.meta.roles.includes(role))
    // return permissions.includes(route.meta.permission)
    return store.getters.roles.includes('admin-super') || permissions.indexOf(route.meta.permission) !== -1
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, permissions) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  permissions: [],
  routes: [],
  addRoutes: []
}

const getters = {
  permissions: state => state.permissions
}

const mutations = {
  SET_PERMISSIONS(state, permissions) {
    setPermissions(permissions)
    state.permissions = permissions
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  loadPermissions({ commit }) {
    return new Promise((resolve, reject) => {
      loadPermissions()
        .then(data => {
          let permissions = data.data

          if (permissions.length === 0) {
            permissions = ['PERMISSION_SYSTEM_DEFAULT']
          }
          commit('SET_PERMISSIONS', permissions)
          resolve(permissions)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  generateRoutes({ commit }, permissions) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

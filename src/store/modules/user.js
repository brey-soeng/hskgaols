import { login, getLoginUser } from '../../api/login'
import { removeToken, setToken, setUserInfo, getToken } from '../../utils/auth'

const state = {
  token: getToken(),
  userInfo: null,
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  roles: []
}

const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  avatar: state => state.avatar
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  loginHandle({ commit }, { username, password, captcha, key }) {
    return new Promise((resolve, reject) => {
      return login({ username, password, captcha, key })
        .then(data => {
          const userInfo = data.data
          const token = userInfo.access_token
          const avatar = avatar
          delete userInfo.access_token

          commit('SET_TOKEN', token)
          commit('SET_USERINFO', userInfo)
          commit('SET_AVATAR', avatar)
          setToken(token)
          setUserInfo(userInfo)
          resolve(userInfo)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  setUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      return getLoginUser()
        .then(response => {
          const userInfo = response.data
          commit('SET_USERINFO', userInfo)
          if (userInfo.roles.length === 0) {
            commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
          } else {
            const roles = userInfo.roles.map((role) => {
              return role.name
            })
            commit('SET_ROLES', roles)
          }
          setUserInfo(userInfo)
          resolve(userInfo)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // eslint-disable-next-line no-unused-vars
  resetToken({ commit }) {
    removeToken()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

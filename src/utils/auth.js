import localforage from 'localforage'
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const PERMISSION = 'permission'
const USERINFO = 'userinfo'
const MENU = 'menu'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export const setMenus = menus => {
  return localforage.setItem(MENU, menus)
}

export const getMenus = () => {
  return localforage.getItem(MENU)
}

export const setUserInfo = userInfo => {
  return localforage.setItem(USERINFO, userInfo)
}

export const getUserinfo = () => {
  return localforage.getItem(USERINFO)
}

export const setPermissions = permissions => {
  return localforage.setItem(PERMISSION, permissions)
}

export const getPermissions = () => {
  return localforage.getItem(PERMISSION)
}

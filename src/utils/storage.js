import Cookies from "js-cookie";
// 变量
const tokenKey = "tokenAdmin";
const userNameKey = "username";

// 获取token
export function getToken() {
  return Cookies.get(tokenKey);
}
// 写入token
export function setToken(value) {
  Cookies.set(tokenKey, value);
}
// 删除token
export function removeToken() {
  Cookies.remove(tokenKey);
}

// 获取userName
export function getUsername() {
  return Cookies.get(userNameKey);
}
// 写入userName
export function setUsername(value) {
  Cookies.set(userNameKey, value);
}
// 删除userName
export function removeUsername() {
  Cookies.remove(userNameKey);
}
// 写入userName
export function setCookies(key, value) {
  Cookies.set(key, value);
}
// 删除userName
export function removeCookies(key) {
  Cookies.remove(key);
}
// 获取某个key
export function getCookiesKey(key) {
  return Cookies.get(key);
}

/**
 * 获取 会话级 存储
 * @param { String } name * 键名
 * @returns { String }
 */
export function getSession(name) {
  return sessionStorage.getItem(name);
}
/**
 * 存储 会话级 存储
 * @param { String } name * 键名
 * @param { Any } name * 数据
 */
export function setSession(name, data) {
  sessionStorage.setItem(name, data);
}
/**
 * 删除 会话级 存储
 * @param { String } name * 键名
 */
export function removeSession(name) {
  sessionStorage.removeItem(name);
}

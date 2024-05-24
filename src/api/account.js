import instance from "@/utils/request"; // 引入拦截器

/**
 * 验证码登录
 * @param {*} data
 * @returns
 */
export function ApiLoginCode(data = {}) {
  return instance.request({
    url: "/api/verify",
    method: "post",
    data,
  });
}

/**
 * 退出
 * @param {*} data
 * @returns
 */
export function ApiLogout(data = {}) {
  return instance.request({
    url: "",
    method: "post",
    data,
  });
}

/**
 * 获取用户信息
 * @param {*} data
 * @returns
 */
export function ApiUserInfo(data = {}) {
  return instance.request({
    url: "/api/userInfo",
    method: "post",
    data,
  });
}

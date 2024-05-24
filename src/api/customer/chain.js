import instance from "@/utils/request"; // 引入拦截器
/**
 * 客户列表
 * @param {*} data
 * @returns
 */
export function ApiChainBrandsList(data = {}) {
  return instance.request({
    url: "/api/customer/queryPage",
    method: "post",
    data,
  });
}
/**
 * 客户删除
 * @param {*} data
 * @returns
 */
export function ApiDeleteCustomer(data = {}) {
  return instance.request({
    url: "/api/customer/delete",
    method: "post",
    data,
  });
}

import { removeToken, removeUsername } from "@/utils/storage";
/**
 * 退出
 */
export function exit() {
  removeToken();
  removeUsername();
  localStorage.clear();
  sessionStorage.clear();
  window.location.replace("/");
}

/**
 * @param { Function } fun 执行的函数
 * @param { Number } time 延时执行时间，默认500毫秒
 * @returns 防抖函数
 */
export function debounce(fun, time = 500) {
  let timer;
  return function () {
    const args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, time);
  };
}

/**
 * 检测数据类型
 */
export function checkDataType() {
  const type_fun = {};
  const types = ["Number", "String", "Boolean", "Array", "Function", "Null", "Undefained", "Set", "Map", "Object"];
  types.forEach((item) => {
    const fun = `is${item}`;
    type_fun[fun] = (value) => Object.prototype.toString.call(value) === `[object ${item}]`;
  });
  return type_fun;
}

/**
 * 保留指定小数，不四舍五入，不补0
 * @param { Number, String } value 金额数字
 * @param { Number } n 小数位数，默认2位
 * @returns
 */
export function truncateDecimal(value, n = 2) {
  value = value * 1;
  const p = Math.pow(10, n);
  return Math.floor(value * p) / p;
}

/**
 * 千分位
 */
export function thousandth(params = {}) {
  let fixed = params.fixed || 2;
  let value = params.value;
  let zero = params.zero;
  // 是否需要单位
  const isUnit = checkDataType().isBoolean(params.unit) ? params.unit : true;
  if (value === undefined || value === null) {
    return "--";
  }
  if (!value) {
    value = isUnit ? `¥ ${value}` : value;
    value = zero ? `${value}.00` : value;
    return value;
  }
  value = value.toString();
  // 是否是负数
  const isNegative = value && value.substring(0, 1) === "-";
  // ,号替换为空
  value = value.replace(/,/g, "");
  // 分割小数
  const decimal = value.split(".");
  // 去除非数字
  value = decimal[0].replace(/\D/g, "");
  // 千分位
  let newValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 小数处理
  let d = fillZero(decimal[1], fixed);
  // 是否有小数存在
  newValue = `${newValue}.${d}`;
  // 是否负数
  newValue = isNegative ? "-" + newValue : newValue;
  // 是否单位
  newValue = isUnit ? `¥ ${newValue}` : newValue;
  // 返回
  return newValue;
}

/**
 * 补0
 */
export function fillZero(value, fixed = 2) {
  if (value) {
    value = value.replace(/\D/g, "");
  }
  const len = fixed - (value ? value.length : 0);
  // 大于指定的小数，截取
  if (len < 0) {
    return value.slice(0, fixed);
  }
  // 补0
  let zero = value || "";
  for (let i = 0; i < len; i++) {
    zero += 0;
  }
  return zero;
}

/**
 * 银行卡，4位间隔
 */
export function bankCardSplit(value) {
  if (!value) {
    return "";
  }
  value = value.toString();
  // 清除空格
  value = value.replace(/\s/g, "");
  // 每四位数字加一个空格
  value = value.replace(/\D/g, "").replace(/(....)(?=.)/g, "$1 ");
  // 返回
  return value;
}

/**
 * 千分位转数字
 */
export function thousandthToNumber(value) {
  typeof value === "number" && (value = value.toString());
  // 清除空格
  value = value.replace(/[\s,]/g, "");
  // 返回
  return value;
}

/**
 * 当前日期
 */
export function currentDate() {
  let today = new Date();
  //日期
  let DD = String(today.getDate()).padStart(2, "0"); // 获取日
  let MM = String(today.getMonth() + 1).padStart(2, "0"); //获取月份，1 月为 0
  let yyyy = today.getFullYear(); // 获取年
  // 时间
  let hh = String(today.getHours()).padStart(2, "0"); //获取当前小时数(0-23)
  let mm = String(today.getMinutes()).padStart(2, "0"); //获取当前分钟数(0-59)
  let ss = String(today.getSeconds()).padStart(2, "0"); //获取当前秒数(0-59)
  today = yyyy + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  return today;
}

/**
 * 随机数
 */
export function getRandom() {
  const number = Math.floor(10000 + Math.random() * 90000);
  return number + "";
}

/**
 * 文件路径
 */
export function getSrc(src, path = "") {
  return src ? process.env.VUE_APP_FILE + path + src : null;
}

/**
 * 清除所有空格
 */
export function clearSpace(value) {
  return value.replace(/\s/g, "");
}

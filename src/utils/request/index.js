// 引入 axios
import axios from "axios";
// 用户错误提示
import { message } from "antd";
import { getToken } from "@/utils/storage";
import { exit } from "@/utils/common";
// 文件流下载
import { fileStream } from "./fileStream";
const instance = axios.create({
  baseURL: process.env.REACT_APP_MARK,
  timeout: 60000, // 超时
});

// 请求拦截器
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// 返回拦截器
instance.interceptors.response.use(
  (response) => {
    // 文件流下载
    if (response.headers?.["content-type"]) {
      const file_stream = fileStream(response);
      if (file_stream?.status) {
        return file_stream.data;
      }
    }
    // 对响应数据做点什么
    const data = response.data;
    const status = data.status;
    if (status === 200) {
      return Promise.resolve(data);
    } else {
      message.error(data.msg || "");
      if ([201, 207].includes(status)) {
        setTimeout(() => {
          exit();
        }, 1000);
      }
      return Promise.reject(data);
    }
  },
  (error) => {
    const response = error.request.response;
    // 对响应错误做点什么
    return Promise.reject(response);
  }
);

export default instance;

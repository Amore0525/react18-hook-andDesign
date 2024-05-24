import { useState, useRef, useEffect } from "react";
import useStore from "@/store";
import { useLocation } from "react-router-dom";
import Config from "@/config";
// 路由白名单
import white from "@/config/pageWhite";
export const usePage = (params = {}) => {
  const { TableStore } = useStore();
  const { pathname } = useLocation(); // 当前的路由
  const handler = useRef(false); // 手动请求
  const prevPath = TableStore.state.fromPath; // 上一个路由
  // 默认参数
  const searchForm = useRef({
    ...params,
    pageIndex: Config.pageIndex,
    pageSize: Config.pageSize,
  });
  // 备份默认参数
  const copy = JSON.parse(
    JSON.stringify({
      ...params,
      pageIndex: Config.pageIndex,
      pageSize: Config.pageSize,
    })
  );

  // 保存参数
  const saveReq = () => {
    localStorage.setItem("req", JSON.stringify(searchForm.current));
  };
  // 搜索参数
  const searchReq = () => {
    handler.current = true;
    searchForm.current.pageIndex = Config.pageIndex;
    saveReq();
  };
  // 重置参数
  const resetReq = () => {
    handler.current = true;
    searchForm.current = copy;
    saveReq();
  };
  // 更新页码
  const pageReq = () => {
    handler.current = true;
    searchForm.current.pageSize = TableStore.state.page.size;
    searchForm.current.pageIndex = TableStore.state.page.index;
    saveReq();
  };
  // 更新数据
  const updateReq = (value) => {
    const keys = Object.keys(value);
    // 不存在参数
    if (!keys.length) {
      return false;
    }
    for (let key in value) {
      searchForm.current[key] = value[key];
    }
    searchForm.current.pageIndex = Config.pageIndex;
    saveReq();
  };
  // 获取参数
  const getReq = () => {
    const action = TableStore.state.filterAction; // 筛选动作类型
    action === "reset" && resetReq();
    action === "search" && searchReq();
    action === "page" && pageReq();
    const isKey = white[pathname];
    const isValue = isKey && white[pathname].includes(prevPath);
    let result = searchForm.current;
    if (isKey && isValue && !handler.current) {
      result = JSON.parse(localStorage.getItem("req")) || searchForm.current;
      searchForm.current = result;
    }
    TableStore.SET_FILTER_ACTION(null);
    return result;
  };
  useEffect(() => {
    TableStore.SET_CURRENT_PATH(pathname); // 执行副作用，设置当前路由
  }, [pathname]); // 依赖于location变化来执行副作用
  return {
    searchForm,
    saveReq,
    getReq,
    resetReq,
    pageReq,
    updateReq,
  };
};

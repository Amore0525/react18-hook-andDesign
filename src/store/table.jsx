import { makeAutoObservable, runInAction } from "mobx";
import Config from "@/config";

class TableStore {
  state = {
    // 离开的路由
    fromPath: localStorage.getItem("fromPath") || "",
    currentPath: localStorage.getItem("currentPath") || "",
    // 页码
    page: {
      size: Config.pageSize,
      index: Config.pageIndex,
    },
    // 筛选动作
    filterAction: "",
  };
  constructor() {
    makeAutoObservable(this);
  }
  // 离开页面的路由
  SET_FROM_PATH(value) {
    this.state.fromPath = value;
    localStorage.setItem("fromPath", value);
  }
  // 当前页面的路由
  SET_CURRENT_PATH(value) {
    const prevPath = JSON.parse(JSON.stringify(this.state.currentPath));
    this.SET_FROM_PATH(prevPath);
    setTimeout(() => {
      this.state.currentPath = value;
      localStorage.setItem("currentPath", value);
    }, 500);
  }
  // 筛选动作
  SET_FILTER_ACTION(value) {
    this.state.filterAction = value;
  }
  // 页码
  SET_PAGE(value) {
    this.state.page.size = value.size;
    this.state.page.index = value.index;
  }
}
export default TableStore;

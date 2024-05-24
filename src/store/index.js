// 把所有模块进行一个统一的处理，导出一个统一的方法 useStore
import { createContext, useContext } from "react";
import LoginStore from "./login";
import UserStore from "./userInfo";
import TableStore from "./table";
class RootStore {
  constructor() {
    this.LoginStore = new LoginStore();
    this.UserStore = new UserStore();
    this.TableStore = new TableStore();
  }
}
// 实例化根 导出useStore context
const rootStore = new RootStore();
const context = createContext(rootStore);

const useStore = () => useContext(context);

export default useStore;

import { makeAutoObservable, runInAction } from "mobx";
// api
import { ApiUserInfo } from "@/api";

class UserStore {
  userInfo = {};
  state = {
    collapse: false,
  };
  constructor() {
    makeAutoObservable(this);
  }
  // 获取用户信息
  getUserInfo = async () => {
    ApiUserInfo()
      .then(() => {
        runInAction((data) => {
          this.userInfo = data;
        });
      })
      .catch(() => {});
  };
  setCollapse = () => {
    this.state.collapse = !this.state.collapse;
  };
}
export default UserStore;

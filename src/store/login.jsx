// login module
import { makeAutoObservable, remove } from "mobx";
import { getUsername, setUsername, getToken, setToken, removeToken } from "@/utils/storage";
// api
import { getRandom, loginPwd, ApiLoginCode } from "@/api/account";
class LoginStore {
  token = getToken() || "";
  state = {
    // 用户token
    token: "" || getToken(),
    // 用户name
    username: "" || getUsername(),
    // 手机号
    mobile: "" || localStorage.getItem("mobile"),
    // 角色
    role: "" || localStorage.getItem("role"),
    // 是否超管
    isAdmin: JSON.parse(sessionStorage.getItem("a")) || false,
    // 首次登录重置密码
    firstLogin: JSON.parse(localStorage.getItem("firstLogin")) || false,
    // 平台资料
    isEditPlatform: true,
    // 权限ID
    permissions: [],
  };
  constructor() {
    // 响应式
    makeAutoObservable(this);
  }
  SET_TOKEN(payload) {
    this.state.token = payload;
    setToken(payload);
  }
  SET_FIRST_LOGIN(payload) {
    this.state.firstLogin = payload;
    payload ? localStorage.setItem("firstLogin", payload) : localStorage.removeItem("firstLogin");
  }
  SET_EDIT_PLATFORM(payload) {
    this.state.isEditPlatform = payload;
  }
  SET_MOBILE(payload) {
    this.state.mobile = payload;
    localStorage.setItem("mobile", payload);
  }
  SET_USERNAME(payload) {
    this.state.username = payload;
    setUsername(payload);
  }
  SET_ROLE(payload) {
    const role = payload && payload.length ? payload.map((item) => item.roleName).join() : "";
    this.state.role = role;
    localStorage.setItem("role", role);
  }
  SET_PER(payload) {
    this.state.permissions = payload;
    localStorage.setItem("p", payload);
  }
  SET_ISADMIN(value) {
    this.state.isAdmin = value === "10000";
    sessionStorage.setItem("a", JSON.stringify(this.state.isAdmin));
  }
  updateData(data) {
    this.SET_TOKEN(data.token);
    this.SET_FIRST_LOGIN(data.resetPwd);
    this.SET_EDIT_PLATFORM(data.platformAccountExists);
    this.SET_MOBILE(data.mobile);
    this.SET_USERNAME(data.userName);
    this.SET_ROLE(data.roleList);
    this.SET_PER(data.permissions);
    this.SET_ISADMIN(data.userId);
    data.resetPwd && removeToken();
  }
  loginAction = ({ mobile, code }) => {
    // 登录
    return new Promise(async (resolve, reject) => {
      ApiLoginCode({ mobile: mobile, verification: code })
        .then((res) => {
          this.updateData(res?.data);
          resolve(res?.data);
        })
        .catch(() => {
          reject();
        });
    });
  };
  logOutAction = () => {
    return new Promise((resolve, reject) => {
      this.token = "";
      removeToken();
      resolve();
    });
  };
}

export default LoginStore;

import { Modal, Dropdown } from "antd";
import useStore from "@/store";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ExclamationCircleFilled } from "@ant-design/icons";
import "./index.scss";
const { confirm } = Modal;
const UserInfo = () => {
  const { LoginStore } = useStore();
  const navigation = useNavigate();
  const loginOut = () => {
    confirm({
      title: "退出登录",
      icon: <ExclamationCircleFilled />,
      content: <>确定退出登录</>,
      onOk() {
        LoginStore.logOutAction().then(() => {
          navigation("/login", { replace: true });
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const items = [
    {
      key: "1",
      label: (
        <div className="meta">
          <img src={require("@/assets/admin.png")} />
          <div>
            <h4 className="ellipse-1" title={LoginStore?.state?.username}>
              <strong>{LoginStore?.state?.username}</strong>
            </h4>
            <span className="ellipse-1" title={LoginStore?.state?.role}>
              {LoginStore?.state?.role}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <a>
          <i className="iconfont icon-user-2"></i>个人中心
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a>
          <i className="iconfont icon-dingdan"></i>平台资料
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a onClick={loginOut}>
          <i className="iconfont icon-tuichu"></i>退出登录
        </a>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} overlayClassName={"userinfo-popup"} placement="bottomRight" arrow>
      <div>
        <div className="user-info">
          <img src={require("@/assets/admin.png")} />
          <div>{LoginStore?.state?.username}</div>
        </div>
      </div>
    </Dropdown>
  );
};

export default observer(UserInfo);

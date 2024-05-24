import React from "react";
import { observer } from "mobx-react-lite";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import useStore from "@/store";
import UserInfo from "@/layout/components/header/components/user/index.jsx";
import "./index.scss";

const MyHeader = (props) => {
  const { UserStore } = useStore();
  // store: 侧边栏展开收起状态
  const collapsed = UserStore.state.collapse;
  return (
    <>
      <div className="layout-header">
        <div className="header-left">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => UserStore.setCollapse(),
          })}
        </div>
        <div className="header-menu">
          <UserInfo />
        </div>
      </div>
    </>
  );
};

export default observer(MyHeader);

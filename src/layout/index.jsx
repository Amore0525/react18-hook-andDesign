import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { observer } from "mobx-react-lite";
import useStore from "@/store";
import items from "@/components/menuItem.jsx";
import MyHeader from "@/layout/components/header/index.jsx";
import "./index.scss";
const { Sider, Content } = Layout;
const LayOut = () => {
  const { UserStore, TableStore } = useStore();
  const [defaultOpenKeys] = useState(["Workbench", "chainManage"]);
  const { pathname } = useLocation();
  // 仅在pathname变化时执行一次
  useEffect(() => {
    TableStore.SET_CURRENT_PATH(pathname); // 执行副作用，设置当前路由
  }, [pathname]); // 依赖于location变化来执行副作用
  const collapsed = UserStore.state.collapse; // store: 侧边栏展开收起状态
  return (
    <Layout>
      <Sider trigger={null} collapsible width="208" collapsedWidth="80" collapsed={collapsed} className="sider">
        {!collapsed ? <div className="logo" /> : <div className="logo1" />}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]} defaultOpenKeys={defaultOpenKeys} items={items} />
      </Sider>
      <Layout className="site-layout">
        <MyHeader />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default observer(LayOut);

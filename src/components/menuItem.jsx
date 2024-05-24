import { Link } from "react-router-dom";
import { UserOutlined, FundProjectionScreenOutlined } from "@ant-design/icons";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("工作台", "Workbench", <FundProjectionScreenOutlined />, [getItem(<Link to="/layout/Workbench">工作台</Link>, "/layout/Workbench"), getItem(<Link to="/layout/TodoList">待办事项</Link>, "/layout/TodoList")]),
  getItem("客户管理", "chainManage", <UserOutlined />, [getItem(<Link to="/layout/chainManage">客户管理</Link>, "/layout/chainManage")]),
];
export default items;

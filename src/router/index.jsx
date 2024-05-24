import { Navigate } from "react-router-dom"; // 路由重定向函数 Navigate
import Layout from "@/layout";
import Login from "@/pages/login";
import Workbench from "@/pages/workbench";
import TodoList from "@/pages/todoList";
import ChainManage from "@/pages/chainManage";
import NotFound from "@/pages/notFound";
import AuthComponent from "@/components/authComponent";

const routes = [
  {
    path: "/layout",
    // errorElement: <div>404</div>,
    element: (
      <AuthComponent>
        <Layout />
      </AuthComponent>
    ),
    children: [
      { path: "/layout/Workbench", element: <Workbench /> },
      { path: "/layout/chainManage", element: <ChainManage /> },
      { path: "/layout/TodoList", element: <TodoList /> },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "",
    element: <Navigate to="/layout/Workbench" />,
  },
  // {
  //   path: "*",
  //   element: <div>Not Found</div>,
  // },
];

export default routes;

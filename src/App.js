import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./router";
// 登录组件;
// import Login from "./pages/login";
// import HelloWorld from "./HelloWorld";
function App() {
  // 根据路由表生成路由规则
  const element = useRoutes(routes);
  return (
    <div className="App">
      {element} {/* 展示区 */}
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HelloWorld" element={<HelloWorld />} />
      </Routes> */}
    </div>
  );
}

export default App;

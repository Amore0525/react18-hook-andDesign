import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, message } from "antd";
import useStore from "@/store";
import logo from "@/assets/logo.png";
import "./index.scss";
const Item = Form.Item;
const Login = () => {
  const navigate = useNavigate();
  const { LoginStore } = useStore();
  // 登录事件
  const onFinish = async (values) => {
    const { mobile, code } = values;
    LoginStore.loginAction({ mobile, code })
      .then(() => {
        navigate("/layout/chainManage", { replace: true });
        message.success("登录成功");
      })
      .catch(() => {});
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img src={logo} alt="logo" className="login-logo" />
        <h4 className="login-title">欢迎使用管理后台</h4>
        {/* 登录表单 */}
        <Form validateTrigger={["onBlur", "onChange"]} initialValues={{ remember: true }} onFinish={onFinish}>
          <Item
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                pattern: /^1[3-9]\d{9}$/, // 设置正则匹配规则
                validateTrigger: "onBlur", // 设置触发时机失去焦点时触发
                message: "请输入正确的手机号格式",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Item>
          <Item
            name="code"
            rules={[
              { required: true, message: "请输入密码" },
              {
                len: 6, // 设置密码长度为6位数
                validateTrigger: "onBlur",
                message: "请输入6位密码",
              },
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Item>
          <Item name="remember" valuePropName="checked">
            <span className="login-form-forgot">忘记密码?</span>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

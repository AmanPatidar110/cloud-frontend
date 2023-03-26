import React, { useEffect, useContext, useState } from "react";

import { auth, signInWithGoogle } from "../../utils/firebaseLogin";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login() {
  const user = useSelector((state) => state.app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (user) {
      history("/dashboard");
    }
  }, [user]);

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    try {
      await auth().signInWithEmailAndPassword(email, password);
      history("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleEmailLogin}
      >
        <Form.Item
          name="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or
        </Form.Item>
      </Form>

      <div className="login-buttons">
        <button className="login-provider-button" onClick={signInWithGoogle}>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
            alt="google icon"
          />
          <span> Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

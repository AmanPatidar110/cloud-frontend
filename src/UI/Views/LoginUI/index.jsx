import React from 'react';

import { auth, signInWithGoogle } from '../../../utils/firebase';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input } from 'antd';

import logo from '../../../static/images/logo.webp';
import { Link } from 'react-router-dom';

export default function LoginUI({
  handleOnChange,
  handleEmailLogin,
  email,
  password,
  signInWithGoogle,
}) {
  return (
    <div className="login">
      <br />
      <div className="login-form">
        <div className="brand-image">
          <img width={100} src={logo} />
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleEmailLogin}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              name="email"
              onChange={handleOnChange}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
          </Form.Item>

          <div className="login-buttons">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
            <Divider plain>OR</Divider>
            <Button
              type="default"
              danger
              icon={<GoogleOutlined />}
              onClick={signInWithGoogle}
            >
              Continue with Google
            </Button>
          </div>
        </Form>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

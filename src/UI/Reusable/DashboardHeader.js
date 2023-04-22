import { Avatar, Button, Image, Popover } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, WarningFilled } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import useLogout from '../../helpers/hooks/useLogout';
import logo from '../../static/images/logo.webp';

const DashboardHeader = ({ currentPage, setCurrentPage }) => {
  const user = useSelector((state) => state.app.user);
  const logout = useLogout();

  const logoutClicked = () => {
    Modal.confirm({
      title: 'Logout',
      icon: <WarningFilled />,
      content: 'are you sure?',
      onOk() {
        logout();
      },
      onCancel() {},
    });
  };

  return (
    <header className="dashboard-header">
      <h1
        style={{
          borderRadius: '10px',
          padding: '0.2rem',
          margin: '0.5rem 0',
        }}
      >
        <img width={50} height={35} src={logo}></img>
      </h1>

      <div className="dashboard-header-menu">
        {Object.keys(dashboardHeaderMenu).map((key) => (
          <Link
            to={dashboardHeaderMenu[key].url}
            className={`dashboard-header-menu-item ${
              currentPage === key ? 'dashboard-header-menu-item-selected' : ''
            }`}
            key={key}
            onClick={() => setCurrentPage?.(key)}
          >
            {dashboardHeaderMenu[key].label}
          </Link>
        ))}
      </div>

      <Popover
        placement="bottomRight"
        trigger="click"
        content={
          <div>
            <p>
              <b>{user?.displayName}</b>
              <br />
              {user?.email}
            </p>
            <hr />
            <Button
              type="primary"
              color="red"
              className="w-100"
              onClick={logoutClicked}
            >
              Logout
            </Button>
          </div>
        }
      >
        <Button
          style={{ padding: 0 }}
          icon={
            user?.photoURL ? (
              <Avatar
                style={{ backgroundColor: '#87d068' }}
                src={user?.photoURL}
              />
            ) : (
              <UserOutlined />
            )
          }
          type="text"
        ></Button>
      </Popover>
    </header>
  );
};

export const dashboardHeaderMenu = {
  projects: {
    label: 'Projects',
    url: '/dashboard?page=projects',
    key: 'projects',
  },
  storage: {
    label: 'Storage',
    url: '/dashboard?page=storage',
    key: 'storage',
  },
};

export default DashboardHeader;

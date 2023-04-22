import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Input, Space } from 'antd';
import { useState } from 'react';
import ProjectsTab from '../../Controllers/Dashboard/Projects/ProjectsTab';
import AddProjectModal from '../../Modals/ProjectModal';
import DashboardHeader, {
  dashboardHeaderMenu,
} from '../../Reusable/DashboardHeader';
import StorageTab from '../../Controllers/Dashboard/Storage/StorageTab';
const { Search } = Input;
const { Header, Content, Footer } = Layout;

const DashboardUI = ({ currentPage, setCurrentPage }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const tabMap = {
    [dashboardHeaderMenu.projects.key]: <ProjectsTab />,
    [dashboardHeaderMenu.storage.key]: <StorageTab />,
  };

  return (
    <div className="dashboard">
      <DashboardHeader
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      {dashboardHeaderMenu?.[currentPage]?.fullScreen ? (
        <div className="dashboard-innercontainer-componentcard p-2">
          {tabMap[currentPage]}
        </div>
      ) : (
        <div className="container p-3 dashboard-innercontainer">
          <h1 className="h4">
            {dashboardHeaderMenu?.[currentPage]?.label ?? ''}
          </h1>

          <div className="dashboard-innercontainer-componentcard mt-3 p-2">
            {tabMap[currentPage]}
          </div>
          <br />
        </div>
      )}

      <p className="dashboard-footer"></p>
    </div>
  );
};
export default DashboardUI;

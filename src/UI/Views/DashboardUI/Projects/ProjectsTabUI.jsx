import React from "react";
import { Button, Input, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ProjectsTabUI = ({
  filteredProjectList,
  setShowAddProject,
  searchText,
  setSearchText,
  onPaginationChange,
  totalRows,
  onChangeActive,
}) => {
  const tableColumns = [
    {
      title: "Name",
      dataIndex: "projectCode",
      key: "projectCode",
    },
    {
      title: "Discount Percent",
      dataIndex: "percent",
      key: "percent",
      render: (val) => `${val}%`,
    },
    {
      title: "Max Amount",
      dataIndex: "maxAmount",
      key: "maxAmount",
      render: (val) => `Rs. ${val}`,
    },

    {
      title: "Min. Bill Amount",
      dataIndex: "minBillAmount",
      key: "minBillAmount",
      render: (val) => `Rs. ${val}`,
    },
    {
      title: "Locations",
      dataIndex: "locations",
      key: "locations",
      render: (locations) =>
        locations
          .map((location) => `${location.name} (${location.type})`)
          .join(", "),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (val, record) => {
        return (
          <React.Fragment>
            <Button
              className="table-action-button"
              type="primary"
              onClick={() => {
                setShowAddProject({ key: true, mode: "EDIT", data: record });
              }}
              size="small"
            >
              Edit
            </Button>
            <Button
              className="table-action-button"
              type={record.isActive ? "default" : "primary"}
              onClick={() => {
                onChangeActive(
                  { ...record, isActive: !record.isActive },
                  record.isActive
                );
              }}
              size="small"
            >
              {record.isActive ? "Deactivate" : "Activate"}
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <div className="dashboardtab">
        <div className="dashboardtab-searchrow">
          <Input
            placeholder="Search Projects"
            prefix={<SearchOutlined />}
            className="dashboardtab-searchrow-search me-2"
            value={searchText}
            onChange={(ev) => setSearchText(ev.target.value)}
          />
          <Button
            type="primary"
            onClick={() => setShowAddProject({ key: true, mode: "ADD" })}
          >
            Add New
          </Button>
        </div>
        <br />
        {/* <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={[
                {
                  key: 0,
                  label: "Projects",
                },
                {
                  key: 1,
                  label: `Settings`,
                },
              ]}
            />
          </Header>
          <Content
            style={{
              padding: "0 50px",
            }}
          >
            <div
              className="site-layout-content"
              style={{
                background: colorBgContainer,
                padding: "2rem",
                display: "flex",
              }}
            >
              <Search
                placeholder="input search text"
                // onSearch={onSearch}
                enterButton
              />
              <Button type="primary" icon={<PlusOutlined />}>
                Add Project
              </Button>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
          <AddProjectModal
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Layout> */}
      </div>
    </React.Fragment>
  );
};

export default ProjectsTabUI;

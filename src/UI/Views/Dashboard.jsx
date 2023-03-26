import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Input, Space } from "antd";
import AddProjectModal from "../Modals/AddProjectModal";
const { Search } = Input;
const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
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
      <AddProjectModal />
    </Layout>
  );
};
export default Dashboard;

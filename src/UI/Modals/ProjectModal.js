import { Modal } from "antd";
import React, { useState } from "react";

import { Form, Input } from "antd";
import { getProjectsList } from "../../API/Project";

const ProjectModal = ({ isModalOpen, handleCancel, setIsModalOpen }) => {
  const onFinish = async (values) => {
    console.log("OnFInish", values);
  };
  const handleOk = async (values) => {
    console.log("onok", { projectName, githubLink });
    await getProjectsList(projectName, githubLink);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [projectName, setProjectName] = useState();
  const [githubLink, setGithubLink] = useState();
  console.log({ projectName, githubLink });
  return (
    <Modal
      title="Add Project"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Project Name"
          name="projectName"
          rules={[
            {
              required: true,
              message: "Project name is required!",
            },
          ]}
        >
          <Input onChange={(e) => setProjectName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Github Link"
          name="githubLink"
          rules={[
            {
              required: true,
              message: "Github link is required!",
            },
          ]}
        >
          <Input onChange={(e) => setGithubLink(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectModal;

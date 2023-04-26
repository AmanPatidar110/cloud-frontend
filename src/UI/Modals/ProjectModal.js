import React, { useState } from 'react';

import { Button, Form, Input, InputNumber, Modal, Select, Space } from 'antd';
import useLoader from '../../helpers/hooks/useLoader';
import toasts from '../../constants/toasts';
import { postProject, putProject } from '../../API/Project';

const projectNameRegex = /^[a-z0-9-]+$/;

const ProjectModal = ({
  showAddProject,
  toggler,
  onProjectAdded,
  onProjectUpdated,
}) => {
  const projectData = showAddProject?.data;
  const [projectDetails, setProjectDetails] = useState(
    projectData ?? { replicas: 1, projectType: 'React' }
  );

  const loader = useLoader();

  const addProject = async (ev) => {
    ev?.preventDefault?.();

    if (
      !projectDetails?.githubLink ||
      !projectDetails?.projectName ||
      !projectDetails.replicas ||
      !projectDetails.projectType
    )
      return toasts.generateError('Please enter all the fields!');

    if (!projectNameRegex.test(projectDetails.projectName)) {
      return toasts.generateError(
        "Only small letters, numbers & '-' is allowed in the project name"
      );
    }
    let newDetails;
    try {
      loader('Loading...');
      if (showAddProject?.mode === 'ADD') {
        newDetails = await postProject({ ...projectDetails });
        onProjectAdded?.(newDetails);
      } else {
        newDetails = await putProject(
          {
            ...projectDetails,
            _id: undefined,
            createdAt: undefined,
            userId: undefined,
            __v: undefined,
            updatedAt: undefined,
            updatedBy: undefined,
          },
          projectDetails?._id
        );
        onProjectUpdated?.({ ...projectDetails }, projectDetails?._id);
      }

      loader();

      toasts.generateSuccess('Project added successfully');
      toggler();
    } catch (error) {
      loader();
      toasts.generateError(`Error adding new project. ${error}`);
    }
  };

  const onChange = (ev, key, value) =>
    setProjectDetails((details) => ({
      ...details,
      [key ?? ev?.target?.name]: value ?? ev?.target?.value,
    }));

  console.log('PROJECT details', projectDetails, showAddProject);
  return (
    <Modal
      title={`${showAddProject?.mode === 'ADD' ? 'Add' : 'Edit'} Project`}
      open={showAddProject?.key}
      closable
      onCancel={() => toggler()}
      width={600}
      footer={[
        <Button key="ok" type="primary" onClick={addProject}>
          Save
        </Button>,
        <Button key="cancel" type="default" onClick={toggler}>
          Cancel
        </Button>,
      ]}
    >
      <Form onFinish={addProject} className="add-kyc-request">
        <Form.Item
          label="Project Name"
          extra="Only small letters, numbers and '-' is allowed"
        >
          <Input
            placeholder="Project Name"
            name="projectName"
            value={projectDetails?.projectName}
            onChange={onChange}
          />
        </Form.Item>
        <Space size={100} style={{ width: '100%' }}>
          <Form.Item label="Project Type">
            <Select
              defaultValue="React"
              style={{
                width: 120,
              }}
              name="projectType"
              options={[
                {
                  value: 'React',
                  label: 'React Js',
                },
                {
                  value: 'Node',
                  label: 'Node Js',
                },
              ]}
              onChange={(val) => onChange('', 'projectType', val)}
            />
          </Form.Item>

          <Form.Item label="No. of Replicas">
            <InputNumber
              min={1}
              max={4}
              style={{ width: '100%' }}
              name="replicas"
              value={projectDetails?.replicas}
              onChange={(val) => onChange('', 'replicas', val)}
            />
          </Form.Item>
        </Space>

        <Form.Item label="Github Link">
          <Input
            placeholder="Github Link"
            name="githubLink"
            value={projectDetails?.githubLink}
            onChange={onChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectModal;

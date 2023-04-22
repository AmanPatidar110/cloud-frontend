import React, { useState } from 'react';

import { Button, Form, Input, Modal } from 'antd';
import useLoader from '../../helpers/hooks/useLoader';
import toasts from '../../constants/toasts';
import { postProject, putProject } from '../../API/Project';

const ProjectModal = ({
  showAddProject,
  toggler,
  onProjectAdded,
  onProjectUpdated,
}) => {
  const projectData = showAddProject?.data;
  const [projectDetails, setProjectDetails] = useState(projectData ?? {});

  const loader = useLoader();

  const addProject = async (ev) => {
    ev?.preventDefault?.();

    if (!projectDetails?.githubLink || !projectDetails?.projectName)
      return toasts.generateError('Please enter all the fields!');

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
        <Form.Item label="Project Name">
          <Input
            placeholder="Project Name"
            name="projectName"
            value={projectDetails?.projectName}
            onChange={onChange}
          />
        </Form.Item>

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

import React, { useEffect, useState } from 'react';

import {
  Card,
  Col,
  Descriptions,
  Modal,
  Row,
  Space,
  Statistic,
  Tabs,
  Tag,
} from 'antd';
import useLoader from '../../helpers/hooks/useLoader';
import toasts from '../../constants/toasts';
import { getProject } from '../../API/Project';
import { LinkOutlined, PlusOutlined } from '@ant-design/icons';
import { ProjectContainers } from '../Reusable/ProjectModalComponets/ProjectContainers';
import { ProjectLogs } from '../Reusable/ProjectModalComponets/ProjectLogs';
import { ProjectDetails } from '../Reusable/ProjectModalComponets/ProjectDetails';

const ViewProjectModal = ({ showViewProject, toggler }) => {
  const [projectDetails, setProjectDetails] = useState();
  const [containers, setContainers] = useState([]);
  const [ip, setIp] = useState('');

  const loader = useLoader();
  useEffect(() => {
    (async () => {
      try {
        loader('Loading...');
        const data = await getProject(showViewProject?.data?._id);
        setProjectDetails(data?.project);
        setContainers(data?.containers);
        setIp(data?.ip);
      } catch (error) {
        console.log(error);
        toasts.generateError(`Error fetching project details. ${error}`);
      }
      loader();
    })();
  }, []);

  //   if (!projectDetails) return loader('Loading...');

  console.log('PROJECT details', projectDetails, showViewProject, loader);
  return (
    <Modal
      //   title={` Project HI`}
      open={showViewProject?.key}
      closable
      onCancel={() => toggler()}
      width={900}
      footer={
        [
          //   <Button key="ok" type="primary" onClick={addProject}>
          //     Save
          //   </Button>,
          //   <Button key="cancel" type="default" onClick={toggler}>
          //     Cancel
          //   </Button>,
        ]
      }
    >
      <Tabs
        tabPosition={'left'}
        items={[
          {
            label: `Project Details`,
            key: 1,
            children: (
              <ProjectDetails projectDetails={projectDetails} ip={ip} />
            ),
          },
          {
            label: `Logs`,
            key: 2,
            children: <ProjectLogs projectName={projectDetails?.projectName} />,
          },
          {
            label: `Containers`,
            key: 3,
            children: <ProjectContainers containers={containers} />,
          },
        ]}
      />
    </Modal>
  );
};

export default ViewProjectModal;

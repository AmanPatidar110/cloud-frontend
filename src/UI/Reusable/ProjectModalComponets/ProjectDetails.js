// @flow
import { LinkOutlined } from '@ant-design/icons';
import { Card, Descriptions } from 'antd';
import * as React from 'react';

export const ProjectDetails = ({ projectDetails, ip }) => {
  return (
    <Card
      title={projectDetails?.projectName}
      // extra={<a href="#">More</a>}
      style={{
        width: 650,
      }}
    >
      <Descriptions title={''}>
        <Descriptions.Item label="Live at">
          <a
            target="_blank"
            href={
              projectDetails?.port && ip
                ? `http://${ip}:${projectDetails?.port}`
                : ''
            }
            style={{ textDecoration: 'underline' }}
          >
            <LinkOutlined />{' '}
            {projectDetails?.port && ip
              ? `${ip}:${projectDetails?.port}`
              : 'Processing...'}
          </a>
        </Descriptions.Item>

        <Descriptions.Item label="No. of Replicas">
          {projectDetails?.replicas || 1}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {projectDetails?.status}
        </Descriptions.Item>
        <Descriptions.Item label="GithubLink">
          <a>{projectDetails?.githubLink || 'N/A'}</a>
          <br />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

// @flow
import {
  BranchesOutlined,
  BuildOutlined,
  EditOutlined,
  EllipsisOutlined,
  GithubOutlined,
  GlobalOutlined,
  LikeOutlined,
  LinkOutlined,
  MessageOutlined,
  NumberOutlined,
  SettingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Avatar, Card, List, Skeleton, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import * as React from 'react';
import logo from '../../../../static/images/logo.webp';
import Icon from '@ant-design/icons/lib/components/Icon';

export const ProjectsList = ({
  list,
  getProject,
  totalRows,
  onPaginationChange,
  ip,
  setShowViewProject,
}) => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <List
      grid={{
        column: 2,
        gutter: 16,
      }}
      itemLayout="vertical"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page, 'page changed');
          onPaginationChange(page);
        },
        pageSize: 10,
        total: totalRows,
      }}
      dataSource={list || []}
      renderItem={(item) => (
        <List.Item
          style={{
            backgroundColor: 'black',
            border: '1px solid grey',
            borderRadius: '10px',
            cursor: 'pointer',
            padding: '0.5rem',
            minHeight: '10rem',
          }}
          onClick={() =>
            setShowViewProject({ key: true, data: { _id: item?._id } })
          }
          key={item?.projectName}
          actions={[
            <IconText
              icon={LinkOutlined}
              text={
                item?.port ? (
                  <a
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    href={`http://${ip}:${item?.port}`}
                  >
                    {ip}:{item?.port}
                  </a>
                ) : (
                  'Processing...'
                )
              }
              key="list-vertical-star-o"
            />,
            <IconText
              icon={BuildOutlined}
              text={item?.projectType || 'Unknown Type'}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={BranchesOutlined}
              text="master"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={GlobalOutlined}
              text={item?.status}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={NumberOutlined}
              text={item?.replicas || 1}
              key="list-vertical-message"
            />,
            <IconText
              icon={GithubOutlined}
              text={
                item?.githubLink
                  ? item?.githubLink.replace('https://github.com', '')
                  : ''
              }
              key="list-vertical-message"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={logo} />}
            title={<a href={item?.href}>{item?.projectName}</a>}
            //   description={
            //     item?.port ? (
            //       <a>
            //         <LinkOutlined />
            //         {ip}:{item?.port}
            //       </a>
            //     ) : (
            //       'Processing...'
            //     )
            //   }
          />
        </List.Item>
      )}
    />
  );
};

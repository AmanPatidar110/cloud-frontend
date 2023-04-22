// @flow
import {
  BranchesOutlined,
  EditOutlined,
  EllipsisOutlined,
  GlobalOutlined,
  LikeOutlined,
  MessageOutlined,
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
            // width: "48%",
          }}
          onClick={() => getProject(item?._id)}
          key={item?.projectName}
          actions={[
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
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={logo} />}
            title={<a href={item?.href}>{item?.projectName}</a>}
            description={item?.githubLink}
          />
          {item?.content}
        </List.Item>
      )}
    />
  );
};

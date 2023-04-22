// @flow
import {
  ClockCircleOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Card, List, Skeleton, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import * as React from 'react';
import logo from '../../../../static/images/logo.webp';
import Icon from '@ant-design/icons/lib/components/Icon';

export const FilesList = ({ list, removeFile, downloadFile }) => {
  console.log('INFILE<LIST', list);
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <List
      itemLayout="horizontal"
      size="small"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 15,
      }}
      dataSource={list || []}
      renderItem={(item) => (
        <List.Item
          style={{
            backgroundColor: 'black',
            border: '1px solid grey',
            borderRadius: '10px',
            margin: '0.5rem 0',
          }}
          key={item?.fileName}
          actions={[
            <IconText
              icon={ClockCircleOutlined}
              text={new Date(item?.created_at).toLocaleDateString()}
              key="list-vertical-like-o"
            />,

            <CloudDownloadOutlined
              style={{ color: '#0060df' }}
              onClick={() => {
                downloadFile(item.storageFileName, item.fileName);
              }}
            />,
            <DeleteOutlined
              style={{ color: '#db2e2e' }}
              onClick={() => {
                removeFile(item._id);
              }}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={logo} />}
            title={item?.fileName}
            description={item?.createdAt}
          />
          {item?.content}
        </List.Item>
      )}
    />
  );
};

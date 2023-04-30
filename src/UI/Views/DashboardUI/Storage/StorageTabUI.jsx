import React from 'react';
import { Button, Input, Layout, Menu, Progress, Table, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import FileModal from '../../../Modals/FileModal';
import { Header } from 'antd/es/layout/layout';
import { FileCard, FilesList } from './FilesList';
import { useSelector } from 'react-redux';

const StorageTabUI = ({
  filteredFilesList,
  setShowAddFile,
  showAddFile,
  searchText,
  setSearchText,
  onPaginationChange,
  totalRows,
  onChangeActive,
  removeFile,
  downloadFile,
  user,
}) => {
  console.log('In STORAGE UI', user);
  return (
    <React.Fragment>
      <div className="dashboardtab">
        <div className="dashboardtab-searchrow">
          <Input
            placeholder="Search Files"
            prefix={<SearchOutlined />}
            className="dashboardtab-searchrow-search me-2"
            value={searchText}
            onChange={(ev) => setSearchText(ev.target.value)}
          />
          <Button
            type="primary"
            onClick={() => setShowAddFile({ key: true, mode: 'ADD' })}
          >
            Add New
          </Button>
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Progress
            type="circle"
            size={160}
            style={{ fontSize: '1rem' }}
            percent={
              ((parseFloat(user?.usedSpace) || 0) /
                (parseFloat(user?.totalSpace) || 0)) *
              100
            }
            format={(percent) => (
              <Typography.Text strong type="success">
                {(parseFloat(user?.usedSpace) || 0).toFixed(2)} MB /{' '}
                {(parseFloat(user?.totalSpace || 0) / 1024).toFixed(2)} GB
              </Typography.Text>
            )}
          />
          <Typography.Text strong type="secondary">
            Storage Used
          </Typography.Text>
        </div>
        <br />

        <FilesList
          totalRows={totalRows}
          onPaginationChange={onPaginationChange}
          list={filteredFilesList}
          removeFile={removeFile}
          downloadFile={downloadFile}
        />
      </div>
    </React.Fragment>
  );
};

export default StorageTabUI;

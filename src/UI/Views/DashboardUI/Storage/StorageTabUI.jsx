import React from 'react';
import { Button, Input, Layout, Menu, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import FileModal from '../../../Modals/FileModal';
import { Header } from 'antd/es/layout/layout';
import { FileCard, FilesList } from './FilesList';

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
}) => {
  console.log('In STORAGE UI', filteredFilesList);
  return (
    <React.Fragment>
      <div className="dashboardtab">
        <div className="dashboardtab-searchrow">
          <Input
            placeholder="Search Files"
            prefix={<SearchOutlined />}
            className="dashboardtab-searchrow-search me-2"
            value={searchText}
            // onChange={(ev) => setSearchText(ev.target.value)}
          />
          <Button
            type="primary"
            onClick={() => setShowAddFile({ key: true, mode: 'ADD' })}
          >
            Add New
          </Button>
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

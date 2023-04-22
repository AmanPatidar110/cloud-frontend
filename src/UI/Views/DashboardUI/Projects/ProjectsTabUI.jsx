import React from 'react';
import { Button, Input, Layout, Menu, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProjectModal from '../../../Modals/ProjectModal';
import { Header } from 'antd/es/layout/layout';
import { ProjectCard, ProjectsList } from './ProjectsList';

const ProjectsTabUI = ({
  filteredProjectList,
  setShowAddProject,
  showAddProject,
  searchText,
  setSearchText,
  onPaginationChange,
  totalRows,
  onChangeActive,
  getProject,
}) => {
  return (
    <React.Fragment>
      <div className="dashboardtab">
        <div className="dashboardtab-searchrow">
          <Input
            placeholder="Search Projects"
            prefix={<SearchOutlined />}
            className="dashboardtab-searchrow-search me-2"
            value={searchText}
            onChange={(ev) => setSearchText(ev.target.value)}
          />
          <Button
            type="primary"
            onClick={() => setShowAddProject({ key: true, mode: 'ADD' })}
          >
            Add New
          </Button>
        </div>
        <br />
        <ProjectsList
          totalRows={totalRows}
          onPaginationChange={onPaginationChange}
          list={filteredProjectList}
          getProject={getProject}
        />
      </div>
    </React.Fragment>
  );
};

export default ProjectsTabUI;

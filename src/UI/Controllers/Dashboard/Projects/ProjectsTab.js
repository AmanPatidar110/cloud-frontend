import { useEffect, useState } from 'react';
import {
  getProject,
  getProjectsList,
  putProject,
} from '../../../../API/Project';
import toasts from '../../../../constants/toasts';
import useLoader from '../../../../helpers/hooks/useLoader';
import ProjectModal from '../../../Modals/ProjectModal';
import ProjectsTabUI from '../../../Views/DashboardUI/Projects/ProjectsTabUI';
import ViewProjectModal from '../../../Modals/ViewProjectModal';

const ProjectsTab = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [showAddProject, setShowAddProject] = useState({
    key: false,
    mode: '',
    data: {},
  });
  const [showViewProject, setShowViewProject] = useState({
    key: false,
    data: {},
  });
  const [searchText, setSearchText] = useState();
  const [totalRows, setTotalRows] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [ip, setIp] = useState('');

  const loader = useLoader();

  useEffect(() => {
    loader('Loading Projects...');
    console.log('page, limit, searchText', page, limit, searchText);
    (async () => {
      try {
        const data = await getProjectsList(page, limit, searchText);
        setTotalRows(data?.totalDocs || 0);
        setIp(data.ip);
        setProjectsList(data?.projects || []);
      } catch (error) {
        toasts.generateError('Error loading projects list: ' + error);
      }
      loader();
    })();
  }, [searchText, page, limit]);

  const onProjectAdded = (newProject) =>
    setProjectsList((list) => [newProject, ...list]);

  const onProjectUpdated = (updatedData, projectId) => {
    setProjectsList((list) => {
      const tempList = [...list];
      const index = tempList.findIndex((each) => each._id === projectId);
      tempList[index] = updatedData;
      return tempList;
    });
  };

  const onPaginationChange = (page, limit) => {
    setPage(page);
    setLimit(limit || 10);
  };

  const onChangeActive = async (projectDetails, isActive) => {
    try {
      loader('Updating Project');
      await putProject(
        {
          ...projectDetails,
          _id: undefined,
          createdAt: undefined,
          createdBy: undefined,
          __v: undefined,
          updatedAt: undefined,
          updatedBy: undefined,
        },

        projectDetails?._id
      );
      onProjectUpdated?.(projectDetails, projectDetails?._id);
      loader();
    } catch (error) {
      toasts.generateError('Error updating project: ' + error);
    }
  };

  return (
    <>
      <ProjectsTabUI
        filteredProjectList={projectsList}
        showAddProject={showAddProject}
        setShowAddProject={setShowAddProject}
        showViewProject={showViewProject}
        setShowViewProject={setShowViewProject}
        searchText={searchText}
        setSearchText={setSearchText}
        onProjectAdded={onProjectAdded}
        onProjectUpdated={onProjectUpdated}
        totalRows={totalRows}
        onPaginationChange={onPaginationChange}
        onChangeActive={onChangeActive}
        getProject={getProject}
        ip={ip}
      />
      {showAddProject?.key ? (
        <ProjectModal
          showAddProject={showAddProject}
          toggler={() => setShowAddProject({ key: false, mode: '' })}
          onProjectAdded={onProjectAdded}
          onProjectUpdated={onProjectUpdated}
        />
      ) : null}
      {showViewProject?.key ? (
        <ViewProjectModal
          showViewProject={showViewProject}
          toggler={() => setShowViewProject({ key: false, data: {} })}
        />
      ) : null}
    </>
  );
};

export default ProjectsTab;

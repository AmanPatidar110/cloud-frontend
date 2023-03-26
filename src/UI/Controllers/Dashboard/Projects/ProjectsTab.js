import { useEffect, useState } from "react";
import { getProjectsList, putProject } from "../../../../API/Project";
import toasts from "../../../../constants/toasts";
import useLoader from "../../../../helpers/hooks/useLoader";
import ProjectModal from "../../../Modals/ProjectModal";
import ProjectsTabUI from "../../../Views/DashboardUI/Projects/ProjectsTabUI";

const ProjectsTab = () => {
  const [projectsList, setProjectsList] = useState();
  const [showAddProject, setShowAddProject] = useState({
    key: false,
    mode: "",
    data: {},
  });
  const [searchText, setSearchText] = useState();
  const [totalRows, setTotalRows] = useState();
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();

  const loader = useLoader();

  useEffect(() => {
    loader("Loading Projects");
    (async () => {
      try {
        const data = await getProjectsList(page, limit, searchText);
        setTotalRows(data?.totalDocs);
        loader();

        setProjectsList(data?.docs || []);
      } catch (error) {
        toasts.generateError("Error loading projects list: " + error);
      }
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
    setLimit(limit);
  };

  const onChangeActive = async (projectDetails, isActive) => {
    try {
      loader("Updating Project");
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
      toasts.generateError("Error updating project: " + error);
    }
  };
  return (
    <>
      <ProjectsTabUI
        filteredProjectList={projectsList}
        showAddProject={showAddProject}
        setShowAddProject={setShowAddProject}
        searchText={searchText}
        setSearchText={setSearchText}
        onProjectAdded={onProjectAdded}
        onProjectUpdated={onProjectUpdated}
        totalRows={totalRows}
        onPaginationChange={onPaginationChange}
        onChangeActive={onChangeActive}
      />
      {showAddProject?.key ? (
        <ProjectModal
          showAddProject={showAddProject}
          toggler={() => setShowAddProject({ key: false, mode: "" })}
          onProjectAdded={onProjectAdded}
          onProjectUpdated={onProjectUpdated}
        />
      ) : null}
    </>
  );
};

export default ProjectsTab;

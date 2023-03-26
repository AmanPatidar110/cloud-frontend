import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapFromQueryString } from "../../../helpers";
import { dashboardHeaderMenu } from "../../Reusable/DashboardHeader";
import DashboardUI from "../../Views/DashboardUI";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("projects");

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Dashboard");
    const page = mapFromQueryString()["page"];
    setCurrentPage(
      dashboardHeaderMenu[page] ? page : dashboardHeaderMenu.projects.key
    );
  }, []);

  return (
    <DashboardUI
      {...{
        currentPage,
        setCurrentPage,
      }}
    />
  );
};

export default Dashboard;

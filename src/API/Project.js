import axios from "axios";
import { baseURL } from "./utils/baseURL";
import { getToken } from "./utils/firebaseToken";

export const getProjectsList = async (limit, page, searchText) => {
  console.log("token", await getToken());

  const response = await axios({
    method: "GET",
    url: `${baseURL}/project?limit=${limit}&page=${page}&searchText=${searchText}`,
    headers: {
      authorization: await getToken(),
    },
  });

  console.log("response", response.data);
};

export const putProject = async (projectName, githubLink) => {
  console.log("token", await getToken());

  const response = await axios({
    method: "POST",
    url: `${baseURL}/project/add_project`,
    data: {
      projectName,
      githubLink,
    },
  });

  console.log("response", response);
};

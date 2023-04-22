import axios from 'axios';
import { baseURL } from './utils/baseURL';
import { getToken } from './utils/firebaseToken';

export const getProjectsList = async (page, limit, searchText) => {
  console.log('token', await getToken());

  const response = await axios({
    method: 'GET',
    url: `${baseURL}/project?limit=${limit || ''}&page=${
      page || ''
    }&searchText=${searchText || ''}`,
    headers: {
      authorization: await getToken(),
    },
  });

  console.log('response', response.data);
  return response.data;
};

export const getProject = async (projectId) => {
  console.log('token', await getToken());

  const response = await axios({
    method: 'GET',
    url: `${baseURL}/project?projectId=${projectId || ''}`,
    headers: {
      authorization: await getToken(),
    },
  });

  console.log('response', response.data);
  return response.data;
};

export const postProject = async (projectDetails) => {
  console.log('token', await getToken());

  const response = await axios({
    method: 'POST',
    url: `${baseURL}/project/add_project`,
    data: {
      ...projectDetails,
    },
    headers: {
      authorization: await getToken(),
    },
  });

  console.log('response', response);
  return response?.data?.project;
};

export const putProject = async (projectDetails) => {
  console.log('token', await getToken());

  const response = await axios({
    method: 'POST',
    url: `${baseURL}/project/add_project`,
    data: {
      ...projectDetails,
    },
    headers: {
      authorization: await getToken(),
    },
  });

  console.log('response', response);
};

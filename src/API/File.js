import axios from 'axios';
import { baseURL } from './utils/baseURL';
import { getToken } from './utils/firebaseToken';

export const getFilesList = async (page, limit, searchText) => {
  console.log('token', await getToken());

  const response = await axios({
    method: 'GET',
    url: `${baseURL}/storage?limit=${limit || ''}&page=${
      page || ''
    }&searchText=${searchText || ''}`,
    headers: {
      authorization: await getToken(),
    },
  });

  console.log('response', response.data);
  return response.data;
};

export const getFile = async (fileId) => {
  console.log('token', await getToken());

  const response = await axios({
    method: 'GET',
    url: `${baseURL}/storage?fileId=${fileId || ''}`,
    headers: {
      authorization: await getToken(),
    },
  });

  console.log('response', response.data);
  return response.data;
};

export const postFile = async (file, fileName) => {
  console.log('token', await getToken());
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', fileName);

  const response = await axios({
    method: 'POST',
    url: `${baseURL}/storage/add_file`,
    data: formData,
    headers: {
      authorization: await getToken(),
      'Content-Type': 'multipart/form-data',
      enctype: 'multipart/form-data',
    },
  });

  console.log('response', response);
  return response?.data?.file;
};

// export const putFile = async (fileDetails) => {
//   console.log('token', await getToken());

//   const response = await axios({
//     method: 'POST',
//     url: `${baseURL}/storage/add_file`,
//     data: {
//       ...fileDetails,
//     },
//     headers: {
//       authorization: await getToken(),
//     },
//   });

//   console.log('response', response);
// };

export const deleteFile = async (fileId) => {
  console.log('token', await getToken());

  const response = await axios({
    method: 'DELETE',
    url: `${baseURL}/storage/delete_file?fileId=${fileId}`,
    headers: {
      authorization: await getToken(),
    },
  });

  console.log('response', response);
};

export const getFileFromStorage = async (storageFileName) => {
  console.log('token', await getToken());

  const response = await axios({
    method: 'GET',
    url: `${baseURL}/storage/download_file/${storageFileName}`,
    headers: {
      authorization: await getToken(),
    },
    responseType: 'blob',
  });

  console.log('response', response);
  return response;
};

import { useEffect, useState } from 'react';
import {
  deleteFile,
  getFileFromStorage,
  getFilesList,
} from '../../../../API/File';
import toasts from '../../../../constants/toasts';
import useLoader from '../../../../helpers/hooks/useLoader';
import FileModal from '../../../Modals/FileModal';
import StorageTabUI from '../../../Views/DashboardUI/Storage/StorageTabUI';

const StorageTab = () => {
  const [filesList, setFilesList] = useState();
  const [showAddFile, setShowAddFile] = useState({
    key: false,
    mode: '',
    data: {},
  });
  const [searchText, setSearchText] = useState();
  const [totalRows, setTotalRows] = useState();
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();

  const loader = useLoader();

  useEffect(() => {
    loader('Loading Files');
    console.log('page, limit, searchText', page, limit, searchText);
    (async () => {
      try {
        const data = await getFilesList(page, limit, searchText);
        setTotalRows(data?.totalDocs || 0);
        loader();

        setFilesList(data?.files || []);
      } catch (error) {
        toasts.generateError('Error loading files list: ' + error);
      }
    })();
  }, [searchText, page, limit]);

  const onFileAdded = (newFile) => setFilesList((list) => [newFile, ...list]);

  const onFileUpdated = (updatedData, fileId) => {
    setFilesList((list) => {
      const tempList = [...list];
      const index = tempList.findIndex((each) => each._id === fileId);
      tempList[index] = updatedData;
      return tempList;
    });
  };

  const onPaginationChange = (page, limit) => {
    setPage(page);
    setLimit(limit);
  };

  const onChangeActive = async (fileDetails, isActive) => {
    try {
      loader('Updating File');
      // await putFile(
      //   {
      //     ...fileDetails,
      //     _id: undefined,
      //     createdAt: undefined,
      //     createdBy: undefined,
      //     __v: undefined,
      //     updatedAt: undefined,
      //     updatedBy: undefined,
      //   },

      //   fileDetails?._id
      // );
      onFileUpdated?.(fileDetails, fileDetails?._id);
      loader();
    } catch (error) {
      toasts.generateError('Error updating file: ' + error);
    }
  };

  const removeFile = async (fileId) => {
    if (!fileId) return toasts.generateError('FileId not passed!');

    try {
      loader('Loading...');
      const deleteResponse = await deleteFile(fileId);
      loader();
      setFilesList((prev) => prev.filter((each) => each._id !== fileId));
      toasts.generateSuccess('File deleted successfully');
    } catch (error) {
      loader();
      toasts.generateError(`Error deleting  file. ${error}`);
    }
  };

  const downloadFile = async (storageFileName, fileName) => {
    if (!storageFileName)
      return toasts.generateError('storageFileName not passed!');

    try {
      loader('Loading...');
      const fileResponse = await getFileFromStorage(storageFileName);
      const url = window.URL.createObjectURL(new Blob([fileResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      loader();

      toasts.generateSuccess('File started downloading');
    } catch (error) {
      loader();
      toasts.generateError(`Error downloading file. ${error}`);
    }
  };

  console.log('FILES', filesList);
  return (
    <>
      <StorageTabUI
        filteredFilesList={filesList}
        showAddFile={showAddFile}
        setShowAddFile={setShowAddFile}
        searchText={searchText}
        setSearchText={setSearchText}
        onFileAdded={onFileAdded}
        onFileUpdated={onFileUpdated}
        totalRows={totalRows}
        onPaginationChange={onPaginationChange}
        onChangeActive={onChangeActive}
        removeFile={removeFile}
        downloadFile={downloadFile}
      />
      {showAddFile?.key ? (
        <FileModal
          showAddFile={showAddFile}
          toggler={() => setShowAddFile({ key: false, mode: '' })}
          onFileAdded={onFileAdded}
          onFileUpdated={onFileUpdated}
        />
      ) : null}
    </>
  );
};

export default StorageTab;

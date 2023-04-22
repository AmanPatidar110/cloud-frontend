import React, { useEffect, useState } from 'react';

import { Button, Form, Input, Modal, Space, Typography, Upload } from 'antd';
import useLoader from '../../helpers/hooks/useLoader';
import toasts from '../../constants/toasts';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import { postFile } from '../../API/File';

const FileModal = ({
  showAddFile,
  toggler,
  onFileAdded,
  onFileUpdated,
  setShowAddFile,
}) => {
  const fileData = showAddFile?.data;
  const [fileDetails, setFileDetails] = useState(fileData ?? {});
  const [fileName, setFileName] = useState('');
  const [fileExt, setFileExt] = useState('');

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const loader = useLoader();

  useEffect(() => {
    if (uploadedFiles[0]) {
      const nameArray = uploadedFiles[0]?.name.split('.');
      const ext = '.' + nameArray[nameArray.length - 1];
      setFileExt(ext);

      const name = uploadedFiles[0]?.name.replace(ext, '');
      setFileName(name);
    }
  }, [uploadedFiles]);

  const addFile = async (ev) => {
    ev?.preventDefault?.();

    if (!uploadedFiles.length)
      return toasts.generateError('Please upload a file to continue!');

    let newDetails;
    try {
      if (showAddFile?.mode === 'ADD') {
        newDetails = await postFile(
          new File([uploadedFiles[0]?.originFileObj], fileName + fileExt),
          fileName + fileExt
        );
        onFileAdded?.(newDetails);
      } else {
        // newDetails = await putFile(
        //   {
        //     ...fileDetails,
        //     _id: undefined,
        //     createdAt: undefined,
        //     userId: undefined,
        //     __v: undefined,
        //     updatedAt: undefined,
        //     updatedBy: undefined,
        //   },
        //   fileDetails?._id
        // );
        // onFileUpdated?.({ ...fileDetails }, fileDetails?._id);
      }

      loader();

      toasts.generateSuccess('File added successfully');
      toggler();
    } catch (error) {
      loader();
      toasts.generateError(`Error adding new file. ${error}`);
    }
  };

  console.log('uploaded files', uploadedFiles);

  console.log('PROJECT details', fileDetails, showAddFile);
  return (
    <Modal
      title={`${showAddFile?.mode === 'ADD' ? 'Add' : 'Edit'} File`}
      open={showAddFile?.key}
      closable
      onCancel={() => toggler()}
      width={600}
      footer={[
        <Button key="ok" type="primary" onClick={addFile}>
          Save
        </Button>,
        <Button key="cancel" type="default" onClick={toggler}>
          Cancel
        </Button>,
      ]}
    >
      <Form
        style={{ width: '100%' }}
        onFinish={addFile}
        className="add-kyc-request"
      >
        <Form.Item label="File Name">
          <Input
            placeholder="File Name"
            name="fileName"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
              setUploadedFiles((prev) => [
                { ...prev[0], name: e.target.value + fileExt },
              ]);
            }}
          />
        </Form.Item>

        <div>
          <Dragger
            style={{ width: '100%', padding: '1rem' }}
            name="file"
            action="#"
            listType="picture-card"
            maxCount={1}
            fileList={uploadedFiles?.filter((each) => !!each)}
            onChange={(file) => setUploadedFiles(file?.fileList)}
            onRemove={() => setUploadedFiles([])}
            onDrop={(e) => {
              console.log(e.dataTransfer.files);
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p style={{ width: '100%' }} className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p style={{ color: 'grey', fontSize: '0.7rem' }}>
              All file types are supported.
            </p>
          </Dragger>
        </div>
      </Form>
    </Modal>
  );
};

export default FileModal;

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  message,
  Upload,
  Modal,
} from 'antd';
import {
  LoadingOutlined,
  DownloadOutlined,
  InboxOutlined
} from '@ant-design/icons';

import {
  attachFileOnProjectVersion,
  attachFileOnProjectVersionSuccess,
  deleteFileOnProjectVersion,
  deleteFileOnProjectVersionSuccess,
} from '../../actions/projectActions';

const { Dragger } = Upload;

const ProjectDetailsMessage = ({
  uploaded,
  uploadFile,
  deleteFile,
  project,
  version,
  studentId,
  deleting,
  session,
}) => {
  const [uploading, setUploading] = useState(false);

  const uploaderProps = {
    name: 'file',
    multiple: false,
    accept: 'application/zip',
    showUploadList: true,
    action: 'https://jsonplaceholder.typicode.com/posts/',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const beforeUpload = () => {
    setUploading(true);
  };

  const onError = () => {
    setUploading(true);
  };

  const onDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'This operation can\'t be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteFile(project, version);
      },
      onCancel() {
      },
    });
  };

  useEffect(() => {
    if (uploading && uploaded) {
      setUploading(false);
    }
  }, [uploading, uploaded]);

  const customRequest = (x) => {
    uploadFile(studentId, project.id, version.id, x.file);
  };

  const renderDownload = () => (
    <div className="projectDetailsFiles">
      <div className="dragBox">
        <a href={version.file} target="blank">
          <div className="ant-upload ant-upload-drag">
            <p className="ant-upload-drag-icon">
              {
                deleting
                  ? <LoadingOutlined />
                  : <DownloadOutlined />
              }
            </p>
            <p className="ant-upload-text">Click here to download a zip with all the project files</p>
          </div>
        </a>
      </div>
      {session.user.role !== 'professor' && version.status === 'working'
      && (
        <div>
          <span>
            If you want to delete this zip or upload it again,
            {' '}
            <button type="button" className="dangerLink" onClick={onDelete}>click here</button>
            .
          </span>
        </div>
      )}
    </div>
  );

  const onSuccessDrag = () => { message.success('File successfully uploaded', 0); };

  const renderUpload = (canUpload) => (
    <div className="projectDetailsFiles">
      <div className="dragBox">
        <Dragger
          {...uploaderProps}
          customRequest={(x) => customRequest(x)}
          beforeUpload={beforeUpload}
          onSuccess={onSuccessDrag}
          onError={onError}
          disabled={!canUpload || uploading}
        >
          <p className="ant-upload-drag-icon">
            {uploading
              ? <LoadingOutlined />
              : <InboxOutlined />}
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload your project files</p>
          <p className="ant-upload-hint">Upload only a single zip file with all your project files inside</p>
        </Dragger>
      </div>
    </div>
  );

  if (version.file) {
    return renderDownload();
  } if (!version.file && session.user.role === 'student' && version.status === 'working') {
    return renderUpload(true);
  }
  return renderUpload(false);
};

const mapStateToProps = (state) => ({
  session: state.session,
  uploaded: state.projects.project_version_file_uploaded,
  deleting: state.projects.project_version_file_deleting
});

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (userid, projectid, versionid, file) => {
    dispatch(attachFileOnProjectVersion(userid, projectid, versionid, file)).payload.then((result) => {
      dispatch(attachFileOnProjectVersionSuccess(result));
    });
  },
  deleteFile: (project, version) => {
    dispatch(deleteFileOnProjectVersion(project, version)).payload.then((result) => {
      dispatch(deleteFileOnProjectVersionSuccess(result));
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsMessage);

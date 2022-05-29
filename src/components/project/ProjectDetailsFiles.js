import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  message,
  Upload,
  Modal,
} from 'antd';
import {
  CloseCircleOutlined,
  LoadingOutlined,
  DownloadOutlined,
  InboxOutlined
} from '@ant-design/icons';

import {
  attachFileOnProjectVersion, attachFileOnProjectVersionSuccess, attachFileOnProjectVersionFailure, attachFileOnProjectVersionReset,
  deleteFileOnProjectVersion, deleteFileOnProjectVersionSuccess, deleteFileOnProjectVersionFailure, deleteFileOnProjectVersionReset
} from '../../actions/projectActions';

const { Dragger } = Upload;

class ProjectDetailsMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploading: false
    };
    this.uploaderProps = {
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
        if (status !== 'uploading') {
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }

  beforeUpload = () => {
    this.setState({
      ...this.state,
      uploading: true,
    });
  };

  onSuccess = (body) => {
    // this.setState({
    //  ...this.state,
    //  uploading:false,
    // })
    body = {
      id: '1',
      link: 'http://www.google.com',
      date: moment()
    };
    // this.props.uploadFile(this.props.project, this.props.version, body);
  };

  onError = (event, body) => {
    this.setState({
      ...this.state,
      uploading: false,
    });
  };

  onDelete = () => {
    const _this = this;
    Modal.confirm({
      title: 'Are you sure you want to delete this?',
      content: 'This operation can\'t be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _this.props.deleteFile(_this.props.project, _this.props.version);
      },
      onCancel() {
      },
    });
  };

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.uploading && nextProps.uploaded) {
      this.setState({
        ...this.state,
        uploading: false
      });
    }
  }

  customRequest(x) {
    this.props.uploadFile(this.props.studentId, this.props.project.id, this.props.version.id, x.file);
  }

  renderUpload() {
    return (
      <div className="projectDetailsFiles">
        <div className="dragBox">
          <div className="ant-upload ant-upload-drag">
            <p className="ant-upload-drag-icon">
              <CloseCircleOutlined />
            </p>
            <p className="ant-upload-text">Whoops, Something went wrong</p>
            <p className="ant-upload-hint">There is no zip file to download</p>
          </div>
        </div>
      </div>
    );
  }

  renderDownload() {
    return (
      <div className="projectDetailsFiles">
        <div className="dragBox">
          <a href={this.props.version.file} target="blank">
            <div className="ant-upload ant-upload-drag">
              <p className="ant-upload-drag-icon">
                {
                  this.props.deleting
                    ? <LoadingOutlined />
                    : <DownloadOutlined />
                }
              </p>
              <p className="ant-upload-text">Click here to download a zip with all the project files</p>
              {false && <p className="ant-upload-hint">
                uploaded
                {' '}
                {moment.duration(moment().diff(moment(this.props.version.file.date))).humanize()}
                {' '}
                ago
                        </p>}
            </div>
          </a>
        </div>
        {this.props.session.user.role !== 'professor' && this.props.version.status === 'working'
        && <div>
          <span>
            If you want to delete this zip or upload it again,
            {' '}
            <button type="button" className="dangerLink" onClick={this.onDelete}>click here</button>
            .
          </span>
        </div>}
      </div>
    );
  }

  renderUpload(canUpload) {
    return (
      <div className="projectDetailsFiles">
        <div className="dragBox">
          <Dragger {...this.uploaderProps} customRequest={(x) => this.customRequest(x)} beforeUpload={this.beforeUpload} onSuccess={this.onSuccess} onError={this.onError} disabled={!canUpload || this.state.uploading}>
            <p className="ant-upload-drag-icon">
              {this.state.uploading
                ? <LoadingOutlined />
                : <InboxOutlined />}
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload your project files</p>
            <p className="ant-upload-hint">Upload only a single zip file with all your project files inside</p>
          </Dragger>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.version.file) {
      return this.renderDownload();
    } if (!this.props.version.file && this.props.session.user.role === 'student' && this.props.version.status === 'working') {
      return this.renderUpload(true);
    }
    return this.renderUpload(false);
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
  uploaded: state.projects.project_version_file_uploaded,
  deleting: state.projects.project_version_file_deleting
});

const mapDispatchToProps = (dispatch) => ({
  uploadFile: (userid, projectid, versionid, file) => {
    dispatch(attachFileOnProjectVersion(userid, projectid, versionid, file)).payload.then((result) => {
      if (true) {
        dispatch(attachFileOnProjectVersionSuccess(result));
      } else {
        dispatch(attachFileOnProjectVersionFailure(result.error));
      }
    });
  },
  deleteFile: (project, version) => {
    dispatch(deleteFileOnProjectVersion(project, version)).payload.then((result) => {
      if (true) {
        dispatch(deleteFileOnProjectVersionSuccess(result));
      } else {
        dispatch(deleteFileOnProjectVersionFailure(result.error));
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsMessage);

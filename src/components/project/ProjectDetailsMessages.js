import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  message,
  Button,
  Input,
} from 'antd';

import SingleMessage from './message/SingleMessage';
import { createMessageOnProject, createMessageOnProjectSuccess, createMessageOnProjectFailure } from '../../actions/projectActions';

const { TextArea } = Input;

class ProjectDetailsMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.message_creating && nextProps.created) {
      this.message_creating();
      this.message_creating = null;
      this.handleChange('message', '');
    }
  }

  handleChange = (attr, value) => {
    if (attr === 'message') {
      this.setState({
        ...this.state,
        message: value
      });
    }
  };

  sendNewMessage = () => {
    this.props.createMessage(this.props.studentId, this.props.project.id, {
      message: {
        text: this.state.message
      }
    });
    this.message_creating = message.loading('Sending new message', 0);
  };

  render() {
    return (
      <div className="projectDetailsMessages">
        <div>
          {this.props.project.messages.length > 0 && [...this.props.project.messages].sort((a, b) => a.id - b.id).map((item, i) => (<SingleMessage key={item.id} data={item} />))}
          {this.props.project.messages.length === 0 && <span className="empty">No messages to be shown</span>}
        </div>
        <div className="separator" />
        <div className="write">
          <TextArea style={{ width: '100%' }} autosize={{ minRows: 3 }} value={this.state.message} disabled={this.message_creating} onChange={(e) => this.handleChange('message', e.target.value)} />
          <Button type="boton1" onClick={this.sendNewMessage} disabled={this.state.message.length === 0 || this.message_creating}>Send Message</Button>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  session: state.session,
  created: state.projects.project_messages_created
});

const mapDispatchToProps = (dispatch) => ({
  createMessage: (userid, projectid, message) => {
    dispatch(createMessageOnProject(userid, projectid, message)).payload.then((result) => {
      if (true) {
        dispatch(createMessageOnProjectSuccess(result));
      } else {
        dispatch(createMessageOnProjectFailure(result.error));
      }
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsMessages);

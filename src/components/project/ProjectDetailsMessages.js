import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  message,
  Button,
  Input,
} from 'antd';

import SingleMessage from './message/SingleMessage';
import {
  createMessageOnProject,
  createMessageOnProjectSuccess,
} from '../../actions/projectActions';

const { TextArea } = Input;

const ProjectDetailsMessages = ({
  created,
  createMessage,
  studentId,
  project
}) => {
  const [messageState, setMessageState] = useState('');
  const [messageCreating, setMessageCreating] = useState(false);

  useEffect(() => {
    if (messageCreating && created) {
      message.loading('Sending new message', 4);
      setMessageCreating(false);
      setMessageState('');
    }
  }, [created, messageCreating]);

  const sendNewMessage = () => {
    createMessage(studentId, project.id, {
      message: {
        text: messageState
      }
    });
    setMessageCreating(true);
  };

  return (
    <div className="projectDetailsMessages">
      <div>
        {project.messages.length > 0 && [...project.messages]
          .sort((a, b) => a.id - b.id)
          .map((item) => (<SingleMessage key={item.id} data={item} />))}
        {project.messages.length === 0 && <span className="empty">No messages to be shown</span>}
      </div>
      <div className="separator" />
      <div className="write">
        <TextArea
          style={{ width: '100%' }}
          autosize={{ minRows: 3 }}
          value={messageState}
          disabled={messageCreating}
          onChange={({ target: { value } }) => setMessageState(value)}
        />
        <Button
          type="boton1"
          onClick={sendNewMessage}
          disabled={messageState.length === 0 || messageCreating}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.session,
  created: state.projects.project_messages_created
});

const mapDispatchToProps = (dispatch) => ({
  createMessage: (userid, projectid, message) => {
    dispatch(createMessageOnProject(userid, projectid, message)).payload.then((result) => {
      dispatch(createMessageOnProjectSuccess(result));
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsMessages);

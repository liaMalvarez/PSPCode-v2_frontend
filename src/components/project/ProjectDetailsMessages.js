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
  session,
  createMessage,
  studentId,
  project,
}) => {
  const [messageState, setMessageState] = useState('');
  const [messageCreating, setMessageCreating] = useState(false);

  useEffect(() => {
    if (messageCreating && created) {
      message.success('Message sent', 2);
      setMessageCreating(false);
      setMessageState('');
    }
  }, [created, messageCreating]);

  const sendNewMessage = async () => {
    await createMessage(studentId, project.id, {
      message: {
        text: messageState,
      },
    });

    setMessageCreating(true);
  };

  return (
    <div className="projectDetailsMessages">
      <div className="messages-container">
        {project.messages.length === 0
          ? <span className="empty">No messages to be shown</span>
          : [...project.messages]
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <SingleMessage
                key={item.id}
                data={item}
                user={session.user}
              />
            ))}
      </div>
      <div className="write">
        <TextArea
          className="text-area"
          autoSize={{ minRows: 2, maxRows: 6 }}
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
  created: state.projects.project_messages_created,
});

const mapDispatchToProps = (dispatch) => ({
  createMessage: (userid, projectid, messageContent) => {
    dispatch(createMessageOnProject(userid, projectid, messageContent)).payload.then((result) => {
      dispatch(createMessageOnProjectSuccess(result));
    }).catch(() => {
      message.error('Error sending new message', 2);
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsMessages);

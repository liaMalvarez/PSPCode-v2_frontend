import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { sessionService } from 'redux-react-session';
import InputTooltip from '../common/InputTooltip';
import { ROLES } from '../../constants/constants';
import { updateUser, updateUserSuccess, updateUserFailure } from '../../actions/userActions';

const Spin = require('antd/lib/spin');
const Button = require('antd/lib/button');
const message = require('antd/lib/message');
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Input = require('antd/lib/input');
const Select = require('antd/lib/select');
const Form = require('antd/lib/form');

require('antd/dist/antd.css');

const FormItem = Form.Item;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const UserProfile = ({
  session,
  error,
  updated,
  returnToProjectId,
  updateUser,
  user,
  loading
}) => {
  const navigate = useNavigate();

  const [canEditStudent, setCanEditStudent] = useState(true);
  const [canEditProfessor, setCanEditProfessor] = useState(true);
  const [userState, setUserState] = useState(user);
  const [sessionState, setSessionState] = useState({ token: '', uid: '', client: '' });
  const [savingMessage, setSavingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    sessionService.loadSession()
      .then((loadedSession) => {
        setSessionState(loadedSession);
      });
  });

  useEffect(() => {
    if (error) {
      if (savingMessage) {
        setSavingMessage('');
      }
      if (errorMessage) {
        setErrorMessage('');
      }
      setErrorMessage(message.error(error.msg, 7));
    }

    if (savingMessage && updated) {
      setSavingMessage('');

      if (session.user.role === 'student' && user.id === session.user.id) {
        sessionService.loadUser().then((currentUser) => {
          sessionService.saveUser({ ...currentUser, ...user });
        }).then(() => {
          if (returnToProjectId) {
            navigate(`/students/${user.id}/projects/${returnToProjectId}`);
          }
        });
      }
    }
  }, [error, updated, user, session]);

  const update = (attr, value) => {
    setUserState({ ...userState, [attr]: value });
  };

  const save = () => {
    if (savingMessage) {
      return;
    }

    setSavingMessage(message.loading('Saving user details', 0));
    updateUser(userState);
  };

  if (loading || !user) {
    return (<div><Spin size="large" /></div>);
  }

  return (
    <div className="userProfile">
      <Form onSubmit={() => {}}>
        <Row>
          <h3>Personal Info</h3>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="First Name"
            >
              <Input onChange={(e) => update('first_name', e.target.value)} value={userState.first_name} disabled={(!(canEditProfessor || canEditStudent))} />
              <InputTooltip input="user_profile_form_first_name" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Last Name"
            >
              <Input onChange={(e) => update('last_name', e.target.value)} value={userState.last_name} disabled={(!(canEditProfessor || canEditStudent))} />
              <InputTooltip input="user_profile_form_last_name" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Email"
            >
              <Input onChange={(e) => update('email', e.target.value)} value={userState.email} disabled={(!(canEditProfessor || canEditStudent))} />
              <InputTooltip input="user_profile_form_email" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label="Member Since"
            >
              <Input value={moment(userState.member_since).format('DD/MM/YYYY')} disabled />
              <InputTooltip input="user_profile_form_member_since" />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Role"
            >
              <Select onChange={(value) => update('role', value)} value={userState.role} disabled>
                {ROLES.map((item) => (<Option key={item.id} value={item.value}>{item.name}</Option>))}
              </Select>
              <InputTooltip input="user_profile_form_role" />
            </FormItem>
            {userState.role === 'student'
              && (
                <FormItem
                  {...formItemLayout}
                  label="Course"
                >
                  <Input value={userState.course.name} disabled />
                  <InputTooltip input="user_profile_form_course" />
                </FormItem>
              )}
          </Col>
        </Row>
        <div className="separator" />
        {userState.role === 'student'
          && (
            <div>
              <Row>
                <h3>Personal Background</h3>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="Programming Language"
                  >
                    <Input onChange={(e) => update('programming_language', e.target.value)} value={userState.programming_language} disabled={(!(canEditStudent))} />
                    <InputTooltip input="user_profile_form_programming_language" />
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Programming Level"
                  >
                    <Select onChange={(e) => update('programming_experience', e)} value={userState.programming_experience} disabled={(!(canEditStudent))}>
                      <Select.Option key="1" value="Less than 1 year">Less than 1 year</Select.Option>
                      <Select.Option key="2" value="1 to 2 years">1 to 2 years</Select.Option>
                      <Select.Option key="3" value="3 to 4 years">3 to 4 years</Select.Option>
                      <Select.Option key="4" value="5 or more years">5 or more years</Select.Option>
                    </Select>
                    <InputTooltip input="user_profile_form_programming_experience" />
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Have a Job?"
                  >

                    <Select onChange={(e) => update('have_a_job', e === 'true')} value={String(userState.have_a_job)} disabled={(!(canEditStudent))}>
                      <Select.Option key="1" value="true">Yes</Select.Option>
                      <Select.Option key="0" value="false">No</Select.Option>
                    </Select>
                    <InputTooltip input="user_profile_form_have_a_job" />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    label="Job Position"
                  >
                    <Input onChange={(e) => update('job_role', e.target.value)} value={userState.job_role} disabled={(!(canEditStudent))} />
                    <InputTooltip input="user_profile_form_job_role" />
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Academic Experience"
                  >
                    <Input onChange={(e) => update('academic_experience', e.target.value)} value={userState.academic_experience} disabled={(!(canEditStudent))} />
                    <InputTooltip input="user_profile_form_academic_experience" />
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="Collage Progress"
                  >
                    <Input onChange={(e) => update('collegue_career_progress', e.target.value)} value={userState.collegue_career_progress} disabled={(!(canEditStudent))} />
                    <InputTooltip input="user_profile_form_collegue_career_progress" />
                  </FormItem>
                </Col>
              </Row>
              <div className="separator" />
            </div>
          )}
        <Row className="actions">
          <a href={`?token=${sessionState.token}&uid=${sessionState.uid}&client_id=${sessionState.client}#/session/password/reset`}>Change Password</a>
          <Button type="boton1" onClick={save}>
            Save
            {returnToProjectId ? ' and Continue' : ''}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  updated: state.users.updated,
  error: state.users.error,
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => {
    dispatch(updateUser(user)).payload.then((result) => {
      dispatch(updateUserSuccess(result));
    }).catch((x) => {
      dispatch(updateUserFailure(x));
    });
  },
  reset: () => {
    // dispatch(resetUserDetails());
    // dispatch(resetUserDetailsVersion());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

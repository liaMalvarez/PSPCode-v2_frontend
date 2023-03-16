import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { sessionService } from 'redux-react-session';
import {
  message,
  Spin,
  Form,
  Select,
  Row,
  Col,
  Input,
  Button,
} from 'antd';

import InputTooltip from '../common/InputTooltip';
import { ROLES } from '../../constants/constants';
import { updateUser, updateUserSuccess, updateUserFailure } from '../../actions/userActions';

const FormItem = Form.Item;
const { Option } = Select;

const UserProfile = ({
  session,
  error,
  updated,
  returnToProjectId,
  updateUserProp,
  user,
  loading,
}) => {
  const navigate = useNavigate();

  const [canEditStudent, setCanEditStudent] = useState(true);
  const [canEditProfessor, setCanEditProfessor] = useState(true);
  const [userState, setUserState] = useState(user);
  const [sessionState, setSessionState] = useState({ token: '', uid: '', client: '' });
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    sessionService.loadSession()
      .then((loadedSession) => {
        setSessionState(loadedSession);
      });
  }, []);

  useEffect(() => {
    if (error) {
      if (isSavingInfo) {
        message.destroy();
        setIsSavingInfo(false);
      }

      message.error(error.msg, 7);
    }
  }, [error]);

  useEffect(() => {
    if (isSavingInfo && updated) {
      message.destroy();
      setIsSavingInfo(false);

      if (session.user.role === 'student' && user.id === session.user.id) {
        sessionService.loadUser().then((currentUser) => {
          sessionService.saveUser({ ...currentUser, ...user });
        }).then(() => {
          if (returnToProjectId) {
            navigate(`students/${user.id}/projects/${returnToProjectId}`);
          } else {
            message.success('Correctly Saved', 2);
          }
        });
      }
    }
  }, [updated, isSavingInfo, user, session]);

  const update = (attr, value) => {
    setUserState({ ...userState, [attr]: value });
  };

  const save = () => {
    if (isSavingInfo) {
      return;
    }
    message.loading('Saving user details', 1);
    setIsSavingInfo(true);
    updateUserProp(userState);
  };

  if (loading || !user) {
    return (<div><Spin size="large" /></div>);
  }

  return (
    <div className="userProfile">
      <Form onSubmit={() => {}}>
        <h3>Personal Info</h3>
        <Row>
          <Col span={12}>
            <FormItem
              label="First Name"
            >
              <Input onChange={(e) => update('first_name', e.target.value)} value={userState.first_name} disabled={(!(canEditProfessor || canEditStudent))} />
              <InputTooltip input="user_profile_form_first_name" />
            </FormItem>
            <FormItem
              label="Last Name"
            >
              <Input onChange={(e) => update('last_name', e.target.value)} value={userState.last_name} disabled={(!(canEditProfessor || canEditStudent))} />
              <InputTooltip input="user_profile_form_last_name" />
            </FormItem>
            <FormItem
              label="Email"
            >
              <Input onChange={(e) => update('email', e.target.value)} value={userState.email} disabled={(!(canEditProfessor || canEditStudent))} />
              <InputTooltip input="user_profile_form_email" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Member Since"
            >
              <Input value={moment(userState.member_since).format('DD/MM/YYYY')} disabled />
              <InputTooltip input="user_profile_form_member_since" />
            </FormItem>
            <FormItem
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
              <h3>Personal Background</h3>
              <Row>
                <Col span={12}>
                  <FormItem
                    label="Programming Language"
                  >
                    <Input onChange={(e) => update('programming_language', e.target.value)} value={userState.programming_language} disabled={(!(canEditStudent))} />
                    <InputTooltip input="user_profile_form_programming_language" />
                  </FormItem>
                  <FormItem
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
                    label="Job Position"
                  >
                    <Input onChange={(e) => update('job_role', e.target.value)} value={userState.job_role} disabled={(!(canEditStudent))} />
                    <InputTooltip input="user_profile_form_job_role" />
                  </FormItem>
                  <FormItem
                    label="Academic Experience"
                  >
                    <Input onChange={(e) => update('academic_experience', e.target.value)} value={userState.academic_experience} disabled={(!(canEditStudent))} />
                    <InputTooltip input="user_profile_form_academic_experience" />
                  </FormItem>
                  <FormItem
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
          <a href="/#/session/password/reset">Change Password</a>
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
  updateUserProp: (user) => {
    dispatch(updateUser(user)).payload.then((result) => {
      dispatch(updateUserSuccess(result));
    }).catch((x) => {
      dispatch(updateUserFailure(x));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

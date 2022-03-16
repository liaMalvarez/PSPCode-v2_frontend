import React, { Component, PropTypes } from 'react';
import { Link,hashHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import InputTooltip from '../common/InputTooltip';
import { ROLES } from '../../constants/constants';
import { sessionService } from 'redux-react-session';
import { updateUser, updateUserSuccess, updateUserFailure } from '../../actions/userActions'

const Spin = require('antd/lib/spin');
const Modal = require('antd/lib/modal');
const Icon = require('antd/lib/icon');
const Button = require('antd/lib/button');
const Popover = require('antd/lib/popover');
const message = require('antd/lib/message');
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Input = require('antd/lib/input');
const Select = require('antd/lib/select');
const Form = require('antd/lib/form');

require('antd/dist/antd.css');

const FormItem = Form.Item;
const Option = Select.Option;
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


class UserProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      canEditStudent: true,
      canEditProfessor: true,
      user: this.props.user,
      session: {token: '', uid: '', client: ''}
    };
  }


  componentWillUnmount() {
  }

  componentDidMount() {
    sessionService.loadSession()
      .then((session) => {
        this.setState({...this.state, session:session});
      });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.error) {
      if (this.message_saving) {
        this.message_saving();
        this.message_saving = null;
      }
      if (this.message_error) {
        this.message_error();
        this.message_error = null;
      }
      this.message_error = message.error(nextProps.error.msg, 7);
    }


    if (this.message_saving && nextProps.updated) {
      this.message_saving();
      this.message_saving = null;

      if (this.props.session.user.role === 'student' && nextProps.user.id === this.props.session.user.id) {
        sessionService.loadUser().then(currentUser => {
          sessionService.saveUser({ ...currentUser, ...nextProps.user })}).then(x => {
            if (this.props.returnToProjectId) {
              hashHistory.push('/students/' + nextProps.user.id + '/projects/' + this.props.returnToProjectId);
            }
        });
      }

    }
  }

  update(attr, value) {
    this.setState({ ...this.state, user: { ...this.state.user, [attr]: value } });
  }

  reset = () => {
    this.setState({
      ...this.state,
      user: this.props.user,
    });
  };

  save = () => {
    if (this.message_saving) {
      return;
    }

    this.message_saving = message.loading('Saving user details', 0);
    this.props.updateUser(this.state.user);
  };

  render() {
    if (this.props.loading || !this.props.user) {
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
                <Input onChange={(e) => this.update('first_name', e.target.value)} value={this.state.user.first_name} disabled={(!(this.state.canEditProfessor || this.state.canEditStudent))} />
                <InputTooltip input="user_profile_form_first_name" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Last Name"
              >
                <Input onChange={(e) => this.update('last_name', e.target.value)} value={this.state.user.last_name} disabled={(!(this.state.canEditProfessor || this.state.canEditStudent))} />
                <InputTooltip input="user_profile_form_last_name" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Email"
              >
                <Input onChange={(e) => this.update('email', e.target.value)} value={this.state.user.email} disabled={(!(this.state.canEditProfessor || this.state.canEditStudent))} />
                <InputTooltip input="user_profile_form_email" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="Member Since"
              >
                <Input value={moment(this.state.user.member_since).format('DD/MM/YYYY')} disabled={true}  />
                <InputTooltip input="user_profile_form_member_since" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Role"
              >
                <Select onChange={(value) => this.update('role',value)} value={this.state.user.role} disabled={true}>
                  {ROLES.map((item, i) => {
                    return (<Option key={item.id} value={item.value}>{item.name}</Option>);
                  })}
                </Select>
                <InputTooltip input="user_profile_form_role" />
              </FormItem>
              {this.state.user.role === 'student' &&
              <FormItem
                {...formItemLayout}
                label="Course"
              >
                <Input value={this.state.user.course.name} disabled={true}  />
                <InputTooltip input="user_profile_form_course" />
              </FormItem>
              }
            </Col>
          </Row>
          <div className="separator" />
          {this.state.user.role === 'student' &&
          <div>
            <Row>
              <h3>Personal Background</h3>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="Programming Language"
                >
                  <Input onChange={(e) => this.update('programming_language', e.target.value)} value={this.state.user.programming_language} disabled={(!(this.state.canEditStudent))} />
                  <InputTooltip input="user_profile_form_programming_language"/>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Programming Level"
                >
                  <Select onChange={(e) => this.update('programming_experience', e)} value={this.state.user.programming_experience} disabled={(!(this.state.canEditStudent))}>
                    <Select.Option key="1" value="Less than 1 year">Less than 1 year</Select.Option>
                    <Select.Option key="2" value="1 to 2 years">1 to 2 years</Select.Option>
                    <Select.Option key="3" value="3 to 4 years">3 to 4 years</Select.Option>
                    <Select.Option key="4" value="5 or more years">5 or more years</Select.Option>
                  </Select>
                  <InputTooltip input="user_profile_form_programming_experience"/>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Have a Job?"
                >

                  <Select onChange={(e) => this.update('have_a_job', e === "true")} value={String(this.state.user.have_a_job)} disabled={(!(this.state.canEditStudent))}>
                    <Select.Option key="1" value="true">Yes</Select.Option>
                    <Select.Option key="0" value="false">No</Select.Option>
                  </Select>
                  <InputTooltip input="user_profile_form_have_a_job"/>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="Job Position"
                >
                  <Input onChange={(e) => this.update('job_role', e.target.value)} value={this.state.user.job_role} disabled={(!(this.state.canEditStudent))} />
                  <InputTooltip input="user_profile_form_job_role"/>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Academic Experience"
                >
                  <Input onChange={(e) => this.update('academic_experience', e.target.value)} value={this.state.user.academic_experience} disabled={(!(this.state.canEditStudent))} />
                  <InputTooltip input="user_profile_form_academic_experience"/>
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Collage Progress"
                >
                  <Input onChange={(e) => this.update('collegue_career_progress', e.target.value)} value={this.state.user.collegue_career_progress} disabled={(!(this.state.canEditStudent))} />
                  <InputTooltip input="user_profile_form_collegue_career_progress"/>
                </FormItem>
              </Col>
            </Row>
            <div className="separator" />
          </div>
          }
          <Row className="actions">
            <a href={`?token=${this.state.session.token}&uid=${this.state.session.uid}&client_id=${this.state.session.client}#/session/password/reset`}>Change Password</a>
            <Button type="boton1" onClick={this.save}>Save{this.props.returnToProjectId?' and Continue':''}</Button>
          </Row>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    updated: state.users.updated,
    error: state.users.error,
    session: state.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

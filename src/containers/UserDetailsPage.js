import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import ProjectList from '../components/project/ProjectsList';
import UserProfile from '../components/user/UserProfile';
import { fetchUserDetails, fetchUserDetailsFailure, fetchUserDetailsSuccess } from '../actions/userActions'
import ProfessorSider from "../components/layout/ProfessorSider";
import CustomProgress from "../components/common/CustomProgress";

const Layout = require('antd/lib/layout');
const Tabs = require('antd/lib/tabs');
const Spin = require('antd/lib/spin');
const Modal = require('antd/lib/modal');
const Icon = require('antd/lib/icon');
const Breadcrumb = require('antd/lib/breadcrumb');
const Button = require('antd/lib/button');
const Popover = require('antd/lib/popover');
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Input = require('antd/lib/input');
const Form = require('antd/lib/form');

require('antd/dist/antd.css');

const { Content } = Layout;

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
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


class UserDetailsPage extends Component {


  constructor(props) {
    super(props);

    this.state = {
      defaultActiveKey: '1'
    };

  }


  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user_data) {
      if (nextProps.session && (nextProps.session.user.role === 'professor' || nextProps.session.user.id == nextProps.user_id)) {
        nextProps.fetchUserDetails(nextProps.user_id);
      } else {
        console.log('Hack detected');
        console.log(nextProps.user_id);
        console.log(nextProps.session.user.id);
      }
    }
  }

  render() {

    if (this.props.user_loading || !this.props.user_data) {
      return (<CustomProgress />);
    }

    return (
      <Layout>
        <CustomHeader/>
        <Layout className="userDetails ant-layout-has-sider">
          <ProfessorSider selected="dashboard.students" />
          <Content>
            <Breadcrumb>
              <Breadcrumb.Item><Link to="/"><Icon type="home" /></Link></Breadcrumb.Item>
              {(this.props.session.user.id != this.props.user_id && this.props.session.user.role === 'professor') && <Breadcrumb.Item><Link to={'/professor/dashboard/students'}>Students</Link></Breadcrumb.Item>}
              {(this.props.session.user.id != this.props.user_id && this.props.session.user.role === 'professor') && <Breadcrumb.Item>{this.props.user_data.first_name}</Breadcrumb.Item>}
              {(this.props.session.user.id == this.props.user_id || this.props.session.user.role !== 'professor') && <Breadcrumb.Item>My Profile</Breadcrumb.Item>}
            </Breadcrumb>
            <h1>{this.props.user_data.first_name} {this.props.user_data.last_name}</h1>
            <section>
              <Tabs defaultActiveKey={this.props.location_hash === '#activity' ? '2' : '1'}>
                <TabPane tab="PROFILE" key="1">
                  <UserProfile user={this.props.user_data} returnToProjectId={this.props.returntoprojectid} />
                </TabPane>
              </Tabs>
            </section>

            <CustomFooter/>

          </Content>

        </Layout>

      </Layout>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    location_hash: ownState.location.hash,
    user_id: ownState.params.iduser,
    returntoprojectid: ownState.params.returntoprojectid,
    session: state.session,
    user_data: state.users.active.user,
    user_loading: state.users.active.loading,
    user_error: state.users.active.error,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserDetails: (id) => {
      dispatch(fetchUserDetails(id)).payload.then((result) => {
        if (true) {
          dispatch(fetchUserDetailsSuccess(result));
        } else {
          dispatch(fetchUserDetailsFailure(result.error));
        }
      });
    },
    reset: () => {
      // dispatch(resetUserDetails());
      // dispatch(resetUserDetailsVersion());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);

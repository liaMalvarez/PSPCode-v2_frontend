import React, { Component, PropTypes } from 'react';
import {Link, hashHistory} from 'react-router';
import { connect } from 'react-redux';
import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import {logout} from "../actions/sessionActions";


const Layout = require('antd/lib/layout');
const Icon = require('antd/lib/icon');
const Breadcrumb = require('antd/lib/breadcrumb');
const Sider = require('antd/lib/layout/Sider');

const { Content } = Layout;

require('antd/dist/antd.css');



class HomePage extends Component {

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.redirectToPage();
  }
  redirectToPage() {
    if(!this.props.session.authenticated || !this.props.session.user.id) {
      hashHistory.push('/session/login');
    } else if(this.props.session.user.role === 'professor') {
      hashHistory.push('/professor/dashboard/projects');
    } else {
      hashHistory.push('/students/' + this.props.session.user.id + '/projects');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.session.authenticated || !nextProps.session.user.id ) {
      hashHistory.push('/session/login');
    } else {
      this.redirectToPage();
    }
  }

  render() {
    return (
      <div>Welcome.
        <a onClick={logout}>Logout</a>
      </div>
    );
  }
};

const mapStateToProps = (state, ownState) => {
  console.log(ownState.params);
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

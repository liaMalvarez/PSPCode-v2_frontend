import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';

import CustomHeader from '../components/layout/CustomHeader';
import CustomFooter from '../components/layout/CustomFooter';
import DashboardStudents from '../components/dashboard/DashboardStudents';
import ProfessorSider from '../components/layout/ProfessorSider';
import SpanData from '../components/common/SpanData';
import SelectCourse from '../components/common/SelectCourse';

const { Content } = Layout;

require('antd/dist/antd.css');

const DashboardStudentsPage = () => {
  const { idproject: projectId } = useParams();

  return (
    <Layout>
      <CustomHeader />
      <Layout className="ant-layout-has-sider">
        <ProfessorSider selected="dashboard.students" />
        <Content className="professorDashboard">
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/"><HomeOutlined /></Link></Breadcrumb.Item>
            { projectId && <Breadcrumb.Item><Link to="/professor/dashboard/projects">Projects</Link></Breadcrumb.Item> }
            { projectId && <Breadcrumb.Item><SpanData entityName="project" entityId={projectId} loading output="name" /></Breadcrumb.Item> }
            { !projectId && <Breadcrumb.Item>Students</Breadcrumb.Item> }
          </Breadcrumb>
          {projectId && (
            <div>
              <h1>
                <SpanData entityName="project" entityId={projectId} loading output="name" />
                {' '}
                Dashboard
              </h1>
              <div className="filters">
                <span>
                  Deadline:
                  {' '}
                  <SpanData entityName="project" entityId={projectId} loading output="deadline" format="date" />
                </span>
                <div style={{ visibility: 'hidden' }}><SelectCourse /></div>
              </div>
            </div>
          )}
          {!projectId && (
            <div>
              <h1>Students Dashboard</h1>
              <div className="filters">
                <SelectCourse />
              </div>
            </div>
          )}
          <section>
            <DashboardStudents projectId={projectId} />
          </section>

        </Content>
      </Layout>
      <CustomFooter />
    </Layout>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStudentsPage);

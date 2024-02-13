import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Popover,
} from 'antd';

const ProjectDetailsSummary = ({
  version,
  project,
  project_version_summary_loading,
}) => {
  const columsLoc = [{
    title: 'PROGRAM SIZE',
    dataIndex: 'metric',
    key: 'metric',
  }, {
    title: 'Plan',
    dataIndex: 'plan',
    key: 'plan',
  }, {
    title: 'Actual',
    dataIndex: 'actual',
    key: 'actual',
    render: (text) => {
      if (text < 0) {
        return (<Popover content={"This metric can't be yet computed. Did you finish the PM phase?"}>-</Popover>);
      }
      return (<span>{text}</span>);
    },
  }, {
    title: 'To Date',
    dataIndex: 'to_date',
    key: 'to_date',
    render: (text) => {
      if (text < 0) {
        return (<Popover content={"This metric can't be yet computed. Did you finish the PM phase?"}>-</Popover>);
      }
      return (<span>{text}</span>);
    },
  }, {
    title: 'To Date %',
    key: 'to_date_p',
    render: (_, record) => {
      const total = version.summary.locs.slice(-1).pop().to_date;
      const p = Math.round((record.to_date / total) * 100);
      if (total > 0) {
        if (p < 0) {
          return (
            <Popover content={"This metric can't be yet computed. Did you finish the PM phase?"}>-</Popover>);
        }
        return (
          <span>
            {p}
            %
          </span>
        );
      }
      return (<span> </span>);
    },
  }];

  const columsTime = [{
    title: 'TIME IN PHASES',
    dataIndex: 'metric',
    key: 'metric',
  }, {
    title: 'Plan',
    dataIndex: 'plan',
    key: 'plan',
    render: (text, record) => {
      if (record.metric === 'TOTAL') {
        return (<span>{text}</span>);
      }
      const total = version.summary.phases.slice(-1).pop().to_date;
      const p = Math.round((record.to_date / total) * 100);
      const x = Math.round(p * version.summary.phases.slice(-1).pop().plan / 100);
      return total > 0 ? (<span>{x}</span>) : (<span> </span>);
    },
  }, {
    title: 'Actual',
    dataIndex: 'actual',
    key: 'actual',
  }, {
    title: 'To Date',
    dataIndex: 'to_date',
    key: 'to_date',
  }, {
    title: 'To Date %',
    key: 'to_date_p',
    render: (_, record) => {
      const total = version.summary.phases.slice(-1).pop().to_date;
      const p = Math.round((record.to_date / total) * 100);
      return total > 0 ? (
        <span>
          {p}
          %
        </span>
      ) : (<span> </span>);
    },
  }];

  const columsDefectsInjected = [{
    title: 'DEFECTS INJECTED IN PHASES',
    dataIndex: 'metric',
    key: 'metric',
  }, {
    title: ' ',
    dataIndex: 'plan',
    key: 'plan',
  }, {
    title: 'Actual',
    dataIndex: 'actual',
    key: 'actual',
  }, {
    title: 'To Date',
    dataIndex: 'to_date',
    key: 'to_date',
  }, {
    title: 'To Date %',
    key: 'to_date_p',
    render: (_, record) => {
      const total = version.summary.defects_injected.slice(-1).pop().to_date;
      const p = Math.round((record.to_date / total) * 100);
      return total > 0 ? (
        <span>
          {p}
          %
        </span>
      ) : (<span> </span>);
    },
  }];

  const columsDefectsRemoved = [{
    title: 'DEFECTS REMOVED IN PHASES',
    dataIndex: 'metric',
    key: 'metric',
  }, {
    title: ' ',
    dataIndex: 'plan',
    key: 'plan',
  }, {
    title: 'Actual',
    dataIndex: 'actual',
    key: 'actual',
  }, {
    title: 'To Date',
    dataIndex: 'to_date',
    key: 'to_date',
  }, {
    title: 'To Date %',
    key: 'to_date_p',
    render: (_, record) => {
      const total = version.summary.defects_removed.slice(-1).pop().to_date;
      const p = Math.round((record.to_date / total) * 100);
      return total > 0 ? (
        <span>
          {p}
          %
        </span>
      ) : (<span> </span>);
    },
  }];

  return (
    <div className="projectDetailsSummary">
      {project.psp_project.process.has_plan_loc && (
        <Table
          className="projectsListTable"
          rowKey="metric"
          columns={columsLoc}
          dataSource={version.summary.locs}
          pagination={false}
          loading={project_version_summary_loading}
        />
      )}
      {project.psp_project.process.has_plan_time && (
        <Table
          className="projectsListTable"
          rowKey="metric"
          columns={columsTime}
          dataSource={version.summary.phases}
          pagination={false}
          loading={project_version_summary_loading}
        />
      )}
      <Table
        className="projectsListTable"
        rowKey="metric"
        columns={columsDefectsInjected}
        dataSource={version.summary.defects_injected}
        pagination={false}
        loading={project_version_summary_loading}
      />
      <Table
        className="projectsListTable"
        rowKey="metric"
        columns={columsDefectsRemoved}
        dataSource={version.summary.defects_removed}
        pagination={false}
        loading={project_version_summary_loading}
      />
    </div>
  );
};

const mapStateToProps = ({ projects: { project_version_summary_loading } }) => ({
  project_version_summary_loading,
});

export default connect(mapStateToProps, null)(ProjectDetailsSummary);

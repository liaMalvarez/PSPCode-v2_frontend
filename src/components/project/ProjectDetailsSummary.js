import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const Table = require('antd/lib/table');
const Popover = require('antd/lib/popover');

class ProjectDetailsSummary extends Component {

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  handleChange = (pagination, filters, sorter) => {
  };


  render() {
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
      render: (text, record, index) => {
        if (text < 0) {
          return (<Popover content={"This metric can't be yet computed. Did you finish the PM phase?"}>-</Popover>);
        } else {
          return (<span>{text}</span>);
        }
      }
    }, {
      title: 'To Date',
      dataIndex: 'to_date',
      key: 'to_date',
      render: (text, record, index) => {
        if (text < 0) {
          return (<Popover content={"This metric can't be yet computed. Did you finish the PM phase?"}>-</Popover>);
        } else {
          return (<span>{text}</span>);
        }
      }
    }, {
      title: 'To Date %',
      key: 'to_date_p',
      render: (text, record, index) => {
        const total = this.props.version.summary.locs.slice(-1).pop().to_date;
        const p = Math.round((record.to_date / total) * 100);
        if (total > 0) {
          if (p < 0) {
            return (
              <Popover content={"This metric can't be yet computed. Did you finish the PM phase?"}>-</Popover>);
          } else {
            return (<span>{p}%</span>);
          }
        } else {
          return (<span> </span>);
        }

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
      render: (text, record, index) => {
        if (record.metric === 'TOTAL') {
          return (<span>{text}</span>);
        } else {
          const total = this.props.version.summary.phases.slice(-1).pop().to_date;
          const p =Math.round((record.to_date / total) * 100);
          const x = Math.round(p * this.props.version.summary.phases.slice(-1).pop().plan / 100);
          return total>0?(<span>{x}</span>):(<span> </span>);
        }
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
      render: (text, record, index) => {
        const total = this.props.version.summary.phases.slice(-1).pop().to_date;
        const p = Math.round((record.to_date / total) * 100);
        return total>0?(<span>{p}%</span>):(<span> </span>);
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
      render: (text, record, index) => {
        const total = this.props.version.summary.defects_injected.slice(-1).pop().to_date;
        const p = Math.round((record.to_date / total) * 100);
        return total>0?(<span>{p}%</span>):(<span> </span>);
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
      render: (text, record, index) => {
        const total = this.props.version.summary.defects_removed.slice(-1).pop().to_date;
        const p = Math.round((record.to_date / total) * 100);
        return total>0?(<span>{p}%</span>):(<span> </span>);
      },
    }];
    return (
      <div className="projectDetailsSummary">
        {this.props.project.psp_project.process.has_plan_loc && <Table rowKey="metric" columns={columsLoc} dataSource={this.props.version.summary.locs} onChange={this.handleChange} pagination={false} loading={this.props.project_version_summary_loading}/>}
        {this.props.project.psp_project.process.has_plan_time && <Table rowKey="metric" columns={columsTime} dataSource={this.props.version.summary.phases} onChange={this.handleChange} pagination={false} loading={this.props.project_version_summary_loading}/>}
        <Table rowKey="metric" columns={columsDefectsInjected} dataSource={this.props.version.summary.defects_injected} onChange={this.handleChange} pagination={false} loading={this.props.project_version_summary_loading}/>
        <Table rowKey="metric" columns={columsDefectsRemoved} dataSource={this.props.version.summary.defects_removed} onChange={this.handleChange} pagination={false} loading={this.props.project_version_summary_loading}/>
        {false && this.props.project.psp_project.process.has_pip &&
          <section>
            <h3>PIP</h3>
            <p><b>Problem: </b>{this.props.version.summary.pip.problem}</p>
            <p><b>Proposal: </b>{this.props.version.summary.pip.proposal}</p>
            <p><b>Comments: </b>{this.props.version.summary.pip.comment}</p>
          </section>
        }
      </div>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    project_version_summary_loading: state.projects.project_version_summary_loading
  };
};

export default connect(mapStateToProps, null)(ProjectDetailsSummary);

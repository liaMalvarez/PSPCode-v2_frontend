import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tag, Popover } from 'antd';

require('antd/dist/antd.css');

class TagVersion extends Component {
  constructor(props) {
    super(props);

    this.last = this.props.timeline[this.props.timeline.length - 1];
  }

  popOverRender() {
    if (true || this.props.session.user.role === 'professor') {
      return this.props.timeline.reduce((x, y) => (x.some((o) => o.version.id === y.version.id) ? x : [...x, y]), []).map((item, i) => {
        if (this.props.active.id === item.version.id) {
          return (
            <span key={item.version.version}>
              Version
              {item.version.version}
              {' '}
              (this)
              <br />
            </span>
          );
        }
        return (
          <span key={item.version.version}>
            Version
            {item.version.version}
            <button type="button" onClick={() => this.props.onChange(this.props.idstudent, this.props.idproject, item.version.id)}> (review)</button>
            <br />
          </span>
        );
      });
    }

    if (this.props.active.id === this.last.version.id) {
      return (
        <div>
          <span>
            You are working on version
            {this.props.active.version}
            {' '}
            because
            <br />
            the previous version was reapproved.
          </span>
        </div>
      );
    }
    return (
      <div>
        <span>
          You are reviewing an old version of your project.
          {' '}
          <br />
          <button type="button" onClick={() => this.props.onChange(this.props.idstudent, this.props.idproject, this.last.version.id)}>Go to the last version</button>
          {' '}
          instead.
        </span>
      </div>
    );
  }

  render() {
    if (this.props.timeline.reduce((x, y) => (x.some((o) => o.version.id === y.version.id) ? x : [...x, y]), []).length === 1) {
      return (<span />);
    }

    return (
      <Popover content={this.popOverRender()} title="Project Version" trigger="hover">
        <Tag>
          version
          {' '}
          {this.props.active.version}
        </Tag>
      </Popover>
    );
  }
}

const mapStateToProps = (state, ownState) => ({
  session: state.session,
});

export default connect(mapStateToProps, null)(TagVersion);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Popover } from 'antd';

require('antd/dist/antd.css');

class TagVersion extends Component {
  constructor(props) {
    super(props);

    this.last = this.props.timeline[this.props.timeline.length - 1];
  }

  popOverRender() {
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

  render() {
    if (this.props.timeline.reduce((x, y) => (x.some((o) => o.version.id === y.version.id) ? x : [...x, y]), []).length === 1) {
      return (<div />);
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

const mapStateToProps = (state) => ({
  session: state.session,
});

export default connect(mapStateToProps, null)(TagVersion);

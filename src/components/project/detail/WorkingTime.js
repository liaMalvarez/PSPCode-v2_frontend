import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class WorkingTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workingTime: '',
    };
  }

  componentDidMount() {
    this.setWorkingTime();
    setInterval(this.setWorkingTime, 1000);
  }

  setWorkingTime = () => {
    if (!this.refDiv) {
      return;
    }

    let time = null;

    if (!this.props.working) {
      time = moment.duration({ minutes: this.props.actualTime });
    } else {
      time = moment.duration();
      let contando = false;
      this.props.phases.map((value) => {
        if (value.start_time && value.end_time) {
          time.add(moment.duration(moment(value.end_time).diff(moment(value.start_time))));
        } else if (value.start_time && !value.end_time && !contando) {
          time.add(moment.duration(moment().diff(moment(value.start_time))));
          contando = true;
        }
        if (value.interruption_time) {
          time.subtract(moment.duration(value.interruption_time, 'minutes'));
        }
      });
    }
    this.setState({
      ...this.state,
      workingTime: `${(`00${time.hours()}`).slice(-2)}:${(`00${time.minutes()}`)
        .slice(-2)}:${(`00${time.seconds()}`).slice(-2)}`,
    });
  };

  render() {
    return (
      <div ref={(workingTime) => { this.refDiv = workingTime; }}>
        <span>{this.state.workingTime}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null)(WorkingTime);

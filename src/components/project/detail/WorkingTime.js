import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';

const WorkingTime = ({ working, actualTime, phases }) => {
  const [workingTime, setWorkingTime] = useState('');
  const [changeSecond, setChangeSecond] = useState(false);

  const refDiv = useRef(null);

  const initWorkingTime = () => {
    if (!refDiv) {
      return;
    }

    let time = null;

    if (!working) {
      time = moment.duration({ minutes: actualTime });
    } else {
      time = moment.duration();
      let counting = false;

      phases.forEach((value) => {
        if (value.start_time && value.end_time) {
          time.add(moment.duration(moment(value.end_time).diff(moment(value.start_time))));
        } else if (value.start_time && !value.end_time && !counting) {
          time.add(moment.duration(moment().diff(moment(value.start_time))));

          counting = true;
        }

        if (value.interruption_time) {
          time.subtract(moment.duration(value.interruption_time, 'minutes'));
        }
      });
    }

    setWorkingTime(`${(`00${time.hours()}`).slice(-2)}:${(`00${time.minutes()}`)
      .slice(-2)}:${(`00${time.seconds()}`).slice(-2)}`);
  };

  useEffect(() => {
    initWorkingTime();
  }, [changeSecond]);

  useEffect(() => {
    setInterval(() => setChangeSecond((prev) => !prev), 1000);
  }, []);

  return (
    <div ref={refDiv}>
      <span>{workingTime}</span>
    </div>
  );
};

export default WorkingTime;

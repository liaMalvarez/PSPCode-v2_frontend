import React from 'react';
import {
  Tag,
  Popover,
  Button,
} from 'antd';

const TagVersion = ({
  timeline,
  active,
  onChange,
  idstudent,
  idproject,
}) => {
  const popOverRender = () => timeline
    .reduce((x, y) => (x
      .some((o) => o.version.id === y.version.id) ? x : [...x, y]), []).map((item) => {
      if (active.id === item.version.id) {
        return (
          <span key={item.version.version}>
            {`Version ${item.version.version} (this)`}
            <br />
          </span>
        );
      }

      return (
        <span key={item.version.version}>
          {`Version ${item.version.version} `}
          <a href={() => onChange(idstudent, idproject, item.version.id)} target="blank">(review)</a>
          <br />
        </span>
      );
    });

  if (timeline.reduce((x, y) => (x
    .some((o) => o.version.id === y.version.id) ? x : [...x, y]), []).length === 1) {
    return (<div />);
  }

  return (
    <Popover content={popOverRender()} title="Project Version" trigger="hover">
      <Tag color="#90b2b1">
        {`Version ${active.version}`}
      </Tag>
    </Popover>
  );
};

export default TagVersion;

import React from 'react';
import {
  Tag,
  Popover,
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
          <button
            type="button"
            className="version-tag-link"
            onClick={() => onChange(idstudent, idproject, item.version.id)}
          >
            (review)
          </button>
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

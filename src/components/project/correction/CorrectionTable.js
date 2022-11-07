import React, { useEffect, useState } from 'react';
import { useNavigate, generatePath, useParams } from 'react-router';
import { connect } from 'react-redux';
import {
  Table,
  Input,
} from 'antd';

import { WarningTwoTone } from '@ant-design/icons';

import routesPaths from '../../../constants/routesPaths';

const { TextArea } = Input;

const CorrectionTable = ({
  data,
  sectionName,
  setSection,
  disabled,
}) => {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { idstudent, idproject } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) return;

    let statusVar = [];

    data.forEach(({ comment, approved }) => { // initialize values from back query
      setStatus((prevState) => [...prevState, approved]);
      statusVar = [...statusVar, approved];

      setComments((prevState) => [...prevState, comment]);
    });

    setSelectedRowKeys(statusVar.reduce(
      (
        previousArr,
        isApproved,
        currentIndex,
      ) => (isApproved ? [...previousArr, currentIndex] : previousArr),
      [],
    ));
  }, []);

  useEffect(() => {
    if (status.length && status.some(
      (approved, index) => data[index].approved !== approved,
    )) {
      setSection(sectionName, 'approved', status);
    }
  }, [selectedRowKeys]);

  useEffect(() => {
    if (comments.length && comments.some(
      (comment, index) => data[index].comment !== comment,
    )) {
      setSection(sectionName, 'comment', comments);
    }
  }, [comments]);

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (_, some, index) => (
        <TextArea
          key={index}
          disabled={disabled}
          placeholder="Leave a comment for the student..."
          className="correction-table-comment"
          value={comments[index]}
          bordered={false}
          autoSize={{ minRows: 0, maxRows: 20 }}
          onChange={(e) => {
            setComments((prevState) => prevState
              .map((prevValue, i) => (index === i ? e.target.value : prevValue)));
          }}
        />
      ),
    },
    Table.EXPAND_COLUMN,
    Table.SELECTION_COLUMN,
  ];

  const expandedRowRender = ({ obs_phases }) => (
    <div style={{ margin: 0 }}>
      <div>
        {obs_phases.length > 1 ? 'Las siguientes fases no cumplen este requerimiento: ' : 'La siguiente fase no cumple este requerimiento: '}
        {obs_phases.map(({ index, name }, i) => (
          <button
            className="phaseLinkButton"
            onClick={() => {
              const path = generatePath(routesPaths.studentProjectDetailsTab, { idstudent, idproject, tab: 'phases' });
              navigate(`/${path}`, { state: { phaseIndex: index } });
            }}
          >
            {name}
            {i !== obs_phases.length - 1 && ', '}
          </button>
        ))}
      </div>
    </div>
  );

  const expandIcon = ({ onExpand, record }) => (
    <button
      onClick={(e) => onExpand(record, e)}
      className="obs_icon"
    >
      <WarningTwoTone
        style={{ fontSize: 16 }}
        twoToneColor="#ffbc5a"
      />
      OBS
    </button>
  );

  return (
    <Table
      className="correction-table"
      columns={columns}
      rowClassName={(_, index) => (selectedRowKeys.includes(index) ? '' : 'table-row-disapproved')}
      pagination={false}
      expandable={{
        columnWidth: '80px',
        expandIcon: ({ expanded, onExpand, record }) => record.obs_phases.length > 0
          && expandIcon({ expanded, onExpand, record }),
        expandedRowRender,
        childrenColumnName: 'Description',
        showExpandColumn: data.some(({ obs_phases }) => obs_phases.length),
      }}
      onRow={() => ({
        style: {
          height: '70px',
        },
      })}
      rowSelection={{
        columnTitle: 'Approved',
        getCheckboxProps: () => ({
          disabled,
        }),
        onSelect: ({ key }) => {
          const newStatus = status;
          newStatus[key] = !status[key];
          setStatus(newStatus);

          setSelectedRowKeys(newStatus.reduce(
            (
              previousArr,
              isApproved,
              currentIndex,
            ) => (isApproved ? [...previousArr, currentIndex] : previousArr),
            [],
          ));
        },
        selectedRowKeys,
      }}
      dataSource={data.map((record, key) => ({ ...record, key }))}
    />
  );
};

export default connect()(CorrectionTable);

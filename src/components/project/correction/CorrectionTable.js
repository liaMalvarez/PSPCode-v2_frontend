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

const CorrectionTable = ({ data, sectionName, setSection }) => {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { idstudent, idproject } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
    if (status.length) {
      setSection(sectionName, 'approved', status);
    }
  }, [selectedRowKeys]);

  useEffect(() => {
    if (comments.length) {
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
          placeholder="Leave a comment for the student..."
          className="correction-table-comment"
          value={comments[index]}
          bordered={false}
          autoSize={{ minRows: 2, maxRows: 20 }}
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

  const expandedRowRender = ({ phases }) => (
    <div style={{ margin: 0 }}>
      <div>
        {phases.length > 1 ? 'Las siguientes fases no cumplen este requerimiento: ' : 'La siguiente fase no cumple este requerimiento: '}
        {
          phases.map(({ index, name }, i) => (
            <button
              className="phaseLinkButton"
              onClick={() => {
                const path = generatePath(routesPaths.studentProjectDetailsTab, { idstudent, idproject, tab: 'phases' });
                navigate(`/${path}`, { state: { phaseIndex: index } });
              }}
            >
              {name}
              {i !== phases.length - 1 && ', '}
            </button>
          ))
        }
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
        expandIcon: ({ expanded, onExpand, record }) => record.phases.length > 0
          && expandIcon({ expanded, onExpand, record }),
        expandedRowRender,
        childrenColumnName: 'Description',
        showExpandColumn: data.some(({ phases }) => phases.length),
      }}
      rowSelection={{
        columnTitle: 'Approved',
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

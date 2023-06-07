import React from 'react';
import { Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { TEXTS } from '../../constants/constants';

const InputTooltip = ({ input }) => {
  if (!TEXTS[input]) {
    return (<span />);
  }

  return (
    <Popover className="input-tooltip" content={TEXTS[input]}>
      <div>
        <InfoCircleOutlined />
      </div>
    </Popover>
  );
};

export default InputTooltip;

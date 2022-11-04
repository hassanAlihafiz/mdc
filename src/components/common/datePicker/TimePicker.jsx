/* eslint-disable react/prop-types */
import { TimePicker } from 'antd';
import React from 'react';
import moment from 'moment';

const MonthPicker = ({ date, height, width, ...props }) => {
  return (
    <TimePicker
      value={date ? moment(date) : ''}
      style={{
        height: height || '34px',
        borderRadius: 2,
        width: width || 'auto',
      }}
      {...props}
    />
  );
};

export default MonthPicker;

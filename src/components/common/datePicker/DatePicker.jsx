/* eslint-disable react/prop-types */
import { DatePicker as DatePicker0 } from 'antd';
import React from 'react';
import moment from 'moment';

const DatePicker = ({ date, height, width, ...props }) => {
  return (
    <DatePicker0
      value={date ? moment(date) : ''}
      style={{
        height: height || '34px',
        width: width || 'auto',
      }}
      {...props}
    />
  );
};

export default DatePicker;

/* eslint-disable react/prop-types */
import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

const StartDatePicker = ({ date, height, width, ...props }) => {
  return (
    <DatePicker
      value={date ? moment(date) : ''}
      style={{
        height: height || '34px',
        width: width || 'auto',
      }}
      {...props}
    />
  );
};

export default StartDatePicker;

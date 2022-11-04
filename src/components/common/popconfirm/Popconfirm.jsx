import React from 'react';
import { Popconfirm as Popconfirm0 } from 'antd';

export function Popconfirm({ children, ...props }) {
  return (
    <Popconfirm0
      cancelButtonProps={{ ghost: true, danger: true, size: 'small' }}
      okButtonProps={{ ghost: true, success: true, size: 'small' }}
      okText={props.okText || 'Yes'}
      cancelText={props.cancelText || 'No'}
      title={props.title || 'Are you sure?'}
      {...props}
    >
      {children}
    </Popconfirm0>
  );
}

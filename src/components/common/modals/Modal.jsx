import React from 'react';
import { Modal as OrgModal } from 'antd';

export default function Modal({children, ...props}) {
  return (
    <OrgModal
      footer={null}
      visible={true}
      {...props}      
    >
      {children}
    </OrgModal>
  )
}

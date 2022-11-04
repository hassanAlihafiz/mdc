import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { 
  Table, Spin, Popconfirm, 
  SuccessNotification 
} from "components/common";
import { varIs, varLabel } from 'common/var'
import { callPutApiWithAuth, callDeleteApiWithAuth } from 'utils/api'
import DeleteIcon from '@ant-design/icons/DeleteFilled'
import EditIcon from '@ant-design/icons/EditFilled'
import CheckIcon from '@ant-design/icons/StarOutlined'
import CheckedIcon from '@ant-design/icons/StarFilled'

export default function TableView(props) {
  const myUser = useSelector(state => state.auth.user)
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setTableData(myUser.billing_details
      .filter(el => varIs('userBillingDetail.payType', el.pay_type, 'cc'))
    )
  }, [myUser])

  return (
    <Table
      dataSource={tableData}
      pagination={false}
      columns={[
        {
          title: 'Name',
          key: 'name',
          render: (_, record) => (
            <span>{record.name}</span>
          )
        },
        {
          title: "Card Number",
          key: 'cc_number',
          render: (_, record) => (
            <span>
              {varLabel('userBillingDetail.ccType', record.cc_type)}&nbsp;
              ************
              {record.last_cc_4}
            </span>
          )
        },
        {
          title: "Exp Date",
          key: "exp_date",
          dataIndex: "cc_exp_date",
        },
        {
          title: "Name on Card",
          key: "cc_name",
          dataIndex: 'cc_name'
        },
        {
          title: "Billing Address",
          key: "billing_address",
          render: (_, record) => (
            <div>
              <div>
                {`${record.billing_address || ''} ${record.billing_address_line2 || ''}, ${record.billing_city || ''}`}
              </div>
              <div>
                {`${record.billing_state || ''}, ${record.billing_zipcode || ''}, ${record.billing_country}`}
              </div>
            </div>
          ),
        },
        {
          title: "",
          key: "action",
          render: (_, record) => (
            <div className="comment-icons">
              <span className='edit-btn'
                onClick={() => {
                  props.setSelected(record)
                  props.setModalMode('edit')
                }}
              >
                <EditIcon />
              </span>
              <DeleteBtn data={record} />
              {varIs('userBillingDetail.isPrimary', record.is_primary, 'yes')?
                <span className='actived-btn'>
                  <CheckedIcon />
                </span>
              : <ActiveBtn data={record} />
              }
            </div>
          ),
        },
      ]}
    />
  );
}

const ActiveBtn = (props) => {
  const dispatch = useDispatch()
  const [isUpdating, setIsUpdating] = useState(false)

  const onUpdateDone = (res) => {
    setIsUpdating(false)
    SuccessNotification(res.message)
    dispatch({ type: 'auth.RELOAD' })
  }
  const onUpdateFail = () => {    
    setIsUpdating(false)
  }
  const handleUpdate = () => { 
    setIsUpdating(true)
    callPutApiWithAuth(`my_account/setting/cc_billing_detail/${props.data.id}/set_primary`, 
      {}, onUpdateDone, onUpdateFail
    )
  }

  return (
    <Popconfirm onConfirm={handleUpdate}>
      <span className='active-btn' >
        {isUpdating?
          <Spin spinning={true} />
        : <CheckIcon />
        }
      </span>
    </Popconfirm>
  )
}

const DeleteBtn = (props) => {
  const dispatch = useDispatch()
  const [isUpdating, setIsUpdating] = useState(false)

  const onDeleteDone = (res) => {
    setIsUpdating(false)
    SuccessNotification(res.message)
    dispatch({ type: 'auth.RELOAD' })
  }
  const onDeleteFail = () => {    
    setIsUpdating(false)
  }
  const handleDelete = () => { 
    setIsUpdating(true)
    callDeleteApiWithAuth(`my_account/setting/cc_billing_detail/${props.data.id}`, 
      onDeleteDone, onDeleteFail
    )
  }

  return (
    <Popconfirm onConfirm={handleDelete}>
      <span className='delete-btn' >
        {isUpdating?
          <Spin spinning={true} />
        : <DeleteIcon />
        }
      </span>
    </Popconfirm>
  )
}


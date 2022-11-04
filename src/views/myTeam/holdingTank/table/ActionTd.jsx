import React, { useState } from 'react'
import { 
  Button, Popconfirm, 
  SuccessNotification, message,
} from 'components/common'
import {
  callPutApiWithAuth
} from 'utils/api'

export default function ActionTd(props) {
  const [isUpdating, setIsUpdating] = useState(false)

  const onSubmitDone = (res) => {
    setIsUpdating(false)
    SuccessNotification(res.message)
    setTimeout(() => {
      props.loadTableData()
    }, [500])
  }
  const onSubmitFail = () => {
    setIsUpdating(false)
  }
  const handleSubmit = () => {
    if (!props.data.placement) {
      message.error('Please input placement')
      return
    }
    if (!props.data.power_leg) {
      message.error('Please input power leg')
      return
    }
    const body = {
      user_id: props.data.id,
      placement_id: props.data.placement.id,
      new_power_leg: props.data.new_power_leg
    }
    setIsUpdating(true)
    callPutApiWithAuth(`my_team/holding_tank/update_placement`, 
      body, onSubmitDone, onSubmitFail
    )
  }

  return (
    <Popconfirm onConfirm={handleSubmit}>
      <Button loading={isUpdating}>
        Submit
      </Button>
    </Popconfirm>    
  )
}

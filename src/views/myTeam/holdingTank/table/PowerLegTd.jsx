import React from 'react'
import {
  Select,
} from 'components/common'
import {
  varOptions
} from 'common/var'

export default function PowerLegTd(props) {
  const onSelectPowerLeg = (v) =>{
    let tableData0 = [
      ...props.tableData
    ]
    tableData0[props.index] = {
      ...props.data,
      new_power_leg: v
    }
    props.setTableData(tableData0)
  }

  return (
    <div className='d-flex align-itmes-center'>
      <Select 
        value={props.data.new_power_leg}
        onChange={onSelectPowerLeg}
        options={varOptions('genealogyUpdateRequest.powerLeg')}
        style={{width: 100}}
      />
    </div>    
  )
}

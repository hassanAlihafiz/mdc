import React, { useState } from 'react'
import {
  AutoComplete,
} from 'components/common'
import {
  callGetApiWithAuth
} from 'utils/api'

export default function PlacementTd(props) {
  const [placementOptions, setPlacementOptions] = useState([])

  const onSearchDone = (res) => {
    if (res.data) {
      setPlacementOptions([
        res.data
      ])
    }    
  }
  const onSearchPlacement = (v) => {
    callGetApiWithAuth(`my_team/holding_tank/search_placement/${v}`, onSearchDone)
  }

  const onSelectPlacement = (_, option) =>{
    let placement0 = null
    placementOptions.forEach(el => {
      if (el.id==option.key) {
        placement0 = el
      }
    })
    let tableData0 = [
      ...props.tableData
    ]
    tableData0[props.index] = {
      ...props.data,
      placement: placement0
    }
    props.setTableData(tableData0)
  }

  return (
    <div className='d-flex align-itmes-center'>
      <AutoComplete 
        onChange={onSearchPlacement}
        options={placementOptions.map(el => ({
          key: el.id,
          label: `${el.first_name} ${el.last_name}`,
          value: `${el.first_name} ${el.last_name}`,
        }))}
        style={{width: 250}}
        onSelect={onSelectPlacement}
        placeholder={'Search by User ID'}
      />
    </div>    
  )
}

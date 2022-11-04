import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  Alert
} from 'components/common'
import TableView from './table/TableView'

export default function HoldingTankPage() {
  const myUser = useSelector(state=>state.auth.user)
  const [isPlacable, setIsPlacable] = useState(false)

  const checkPlacable = () => {
    let isPlacable = false
    if (myUser.id==1) {
      isPlacable = true
    } else if (myUser.parent_id) {
      isPlacable = true
    }
    setIsPlacable(isPlacable)
  }
  useEffect(() => {
    checkPlacable()
  }, []);

  return (
    <Wrapper>
      <Alert type={'info'}
        showIcon
        style={{ alignItems: 'baseline' }}
        message={'Your Holding Tank is where your personally enrolled Affiliates will appear so you can assign a location in your downline. To place your Affiliates, simply enter the ID# of the person they go under, and click “place”. You have 7 days to place each Affiliate before they auto-flush to your lesser leg.'}
      />
      {!isPlacable && 
      <Alert type={'error'}
        showIcon
        style={{ alignItems: 'baseline' }}
        message={'Sorry! Once you have been placed by your Enroller, you may place your personally enrolled Affiliates.'}
      />
      }
      <div style={{height: 24}} />
      <TableView />
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

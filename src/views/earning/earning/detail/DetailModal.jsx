import React, { useState } from 'react'
import { Modal } from 'components/common'
import SummaryView from './SummaryView'
import DetailView from './DetailView'

export default function DetailModal(props) {
  const [viewMode, setViewMode] = useState('summary')
  const [bonusId, setBonusId] = useState(undefined)

  return (
    <Modal
      width={1200}
      onCancel={()=>props.setSelected(undefined)}
      title={`Earning Details (${props.selected.from} ~ ${props.selected.to})`}
    >
      {viewMode==='summary' && 
        <SummaryView selected={props.selected}
          setViewMode={setViewMode}
          setBonusId={setBonusId}
        />
      }
      {viewMode==='detail' && 
        <DetailView selected={props.selected}
          setViewMode={setViewMode}
          bonusId={bonusId}
        />
      }
    </Modal>
  )
}

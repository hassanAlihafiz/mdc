import React, { useEffect, useState } from 'react'
import {
  Row, Col
} from 'components/common'
import RankCard from './rank/RankCard'
import PeQvCard from './peQv/PeQvCard'

export default function RankSnapshotPage() {
  return (
    <Row gutter={[20, 20]}>
      <Col xs={24}>
        <RankCard />
      </Col>
      <Col xs={24}>
        <PeQvCard />
      </Col>
    </Row>    
  )
}

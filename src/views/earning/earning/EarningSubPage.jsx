import React, { useState } from "react"
import styled from "styled-components"
import { 
  Row, Col
} from "components/common"
import StatView from "./stat/StatView"
import ChartView from './chart/ChartView'
import TableView from "./table/TableView"
import DetailModal from './detail/DetailModal'

export default function EarningSubPage() {
  const [selected, setSelected] = useState(undefined)

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <StatView />
        </Col>
        <Col span={24}>
          <ChartView />
        </Col>
        <Col span={24}>
          <TableView 
            setSelected={setSelected}
          />
        </Col>
      </Row>
      {selected && 
        <DetailModal
          selected={selected}
          setSelected={setSelected}
        />
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
`

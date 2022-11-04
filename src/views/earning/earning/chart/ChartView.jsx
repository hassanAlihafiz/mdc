import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { 
  Card, SingleLineChart, 
} from 'components/common'
import {
  callGetApiWithAuth
} from 'utils/api'
import { asDate, asPrice } from 'utils/text'

export default function ChartView() {
  const [chartData, setChartData] = useState([])

  const config = {
    xField: "date",
    yField: "amount",
    yAxis: {
      label: {
        formatter: v => asPrice(v)
      },
    },
    xAxis: {
      label: {
        formatter: v => asDate(v)
      },
    },
    height: 290,
  };
  
  const onGetChartData = (res) => {
    setChartData(res.data.map(el => ({
      date: el.from,
      amount: el.amount*1
    })))
  }
  const onFailChartData = () => {}
  const loadChartData = () => {
    callGetApiWithAuth(`earning/graph`, 
      onGetChartData, onFailChartData
    )
  }

  useEffect(() => {
    loadChartData()
  }, [])

  return (
    <Card>
      <Wrapper>
        <div className="title">Earnings Growth</div>
        <SingleLineChart 
          data={chartData}
          {...config}
        />
      </Wrapper>
    </Card>
  )
}

const Wrapper = styled.div`
  .title {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 20px;
  }
`

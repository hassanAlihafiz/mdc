import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Card, Spin } from 'components/common'
import { 
  callGetApiWithAuth
} from 'utils/api'

export default function BadgeCard() {
  const [rankAches, setRankAches] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onGetListData = (res) => {
    setIsLoading(false)
    setRankAches(res.data)
  }
  const onFailListData = () => {
    setIsLoading(false)
  }
  const loadBadges = () => {
    setIsLoading(true)
    callGetApiWithAuth(`my_rank/rank_recognition/badges`, 
      onGetListData, onFailListData
    )
  }

  useEffect(() => {
    loadBadges()
  }, [])

  return (
    <Card>
      <Wrapper>
        <h4>Rank Badges</h4>        
        {isLoading ?
          <div className='loadingRoot'>
            <Spin spinning={true} />
          </div>
        : 
        <div className='badge-list'>
          {rankAches.map((el, index) => (
            <div key={index}>
              {el.is_achieved?
                <img src={el.badge} />
              :
                <img src={el.badge_inactive} />
              }
            </div>
          ))}
        </div>
        }
      </Wrapper>
    </Card>
  )
}

const Wrapper = styled.div`
  h4 {
    font-size: 18px;
  }
  .badge-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .loadingRoot {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 84px;
    height: 84px;
    margin: 12px 12px;
  }
`

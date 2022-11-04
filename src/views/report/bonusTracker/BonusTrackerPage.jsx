import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Spin } from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import RaListCard from './ra/RaListCard'
import ReListCard from './re/ReListCard'

export default function BonusTrackerPage() {
  const myUser = useSelector(state=>state.auth.user)
  const [raList, setRaList] = useState([])
  const [reList, setReList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onGetListData = (res) => {
    setRaList(res.data.ra_list)
    setReList(res.data.re_list)
    setIsLoading(false)
  }
  const onFailListData = () => {
    setIsLoading(false)
  }
  const loadListData = () => {
    setIsLoading(true)
    callGetApiWithAuth(`report/bonus_tracker/list`, onGetListData, onFailListData)
  }

  useEffect(() => {
    loadListData()
  }, [])

  return (
    <Wrapper>
      {isLoading?
        <div className='loadingRoot'>
          <Spin spinning={true} />
        </div>
      : 
      <>
        <RaListCard data={raList} />
        <div style={{height: 24}} />
        <ReListCard data={reList} />
      </>
      }      
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

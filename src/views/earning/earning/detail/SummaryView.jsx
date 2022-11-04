import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  Spin
} from 'components/common'
import {
  callGetApiWithAuth
} from 'utils/api'
import {
  asPrice, asNumber
} from 'utils/text'

export default function SummaryView(props) {
  const myUser = useSelector(state=>state.auth.user)
  const [data, setData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const onGetData = (res) => {
    setIsLoading(false)
    setData(res.data)
  }

  const onFailData = () => {
    setIsLoading(false)
  }
  const loadData = () => {
    setIsLoading(true)
    callGetApiWithAuth(`earning/${props.selected.id}/summary`, 
      onGetData, onFailData
    )
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Wrapper>
      {isLoading &&
        <div className='loadingRoot'>
          <Spin spinning={true} />
        </div>
      }
      {data &&
      <div>
        {data.caBonus &&
        <>
          <div className='d-flex align-items-center mb-1'>
            <div>
              <span className={'bonus-title'}>
                Customer Aquisition Bonus
              </span>
              <span>&nbsp;</span>              
            </div>
            <div>
              <span
                className={'detail-link'}
                onClick={() => {
                  props.setBonusId(1)
                  props.setViewMode('detail')
                }}
              >
                View Details
              </span>
            </div>
          </div>
          <div className='d-flex mb-4'>
            <div className='price-tag'>
              Amount:&nbsp;
              <span>{asPrice(data.caBonus.total)}</span>
            </div>
          </div>
        </>
        }
        {data.gpBonus &&
        <>
          <div className='d-flex align-items-center mb-1'>
            <div>
              <span className={'bonus-title'}>
                Global Bonus Pool
              </span>
            </div>
          </div>
          <div className='d-flex mb-4'>
            <div className='price-tag'>
              Amount:&nbsp;
              <span>{asPrice(data.gpBonus.total)}</span>
            </div>
            <div className='price-tag'>
              Share:&nbsp;
              <span>{data.gpBonus.shares}</span>
            </div>
          </div>
        </>
        }
        {data.jsBonus && 
        <>
          <div className='d-flex align-items-center mb-1'>
            <div>
              <span className={'bonus-title'}>
                Jump Start Bonus&nbsp;<small>(Business/Volume)</small>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>Total:&nbsp;{asPrice(data.jsBonus.total)}</span>
            </div>
            <div>
              <span
                className={'detail-link'}
                onClick={() => {
                  props.setBonusId(3)
                  props.setViewMode('detail')
                }}
              >
                View Details
              </span>
            </div>
          </div>
          <div className='mb-4'>
            <table className='level-table'>
              <thead>
                {[...Array(10).keys()].map(index => 
                  <th key={index} align={'center'}>
                    {`Level ${index+1}`}
                  </th>
                )}
                <th>Level 11+</th>
              </thead>
              <tbody>
                <tr>
                  {data.jsBonus.totalGrouped.map((el, index) => (
                    <td key={index} align={'center'}>
                      {el.amount>0?
                        `${asPrice(el.amount)}/${asNumber(el.cv)}`
                      : '-'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
        }
        {data.biBonus &&
        <>
          <div className='d-flex align-items-center mb-1'>
            <div>
              <span className={'bonus-title'}>
                Binary Commission
              </span>
              <span>&nbsp;</span>
              <span>{asPrice(data.biBonus.total)}</span>
            </div>
          </div>
          <div className='d-flex mb-4'>
            <div className='price-tag'>
              Amount:&nbsp;
              <span>{asPrice(data.biBonus.total)}</span>
            </div>
            <div className='price-tag'>
              Lesser Team BV:&nbsp;
              <span>
                {asNumber(
                  myUser.qualification.l_bgv, 
                  myUser.qualification.r_bgv
                )}
              </span>
            </div>
          </div>
        </>
        }
        {data.cmBonus &&
        <>
          <div className='d-flex align-items-center mb-1'>
            <div>
              <span className={'bonus-title'}>
                Leadership Check Matching&nbsp;<small>(Bonus/Volume)</small>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>Total:&nbsp;{asPrice(data.cmBonus.total)}</span>
            </div>
            <div>
              <span
                className={'detail-link'}
                onClick={() => {
                  props.setBonusId(5)
                  props.setViewMode('detail')
                }}
              >
                View Details
              </span>
            </div>
          </div>
          <div className='mb-4 table-container'>
            <table className='level-table'>
              <thead>
                {[...Array(10).keys()].map(index => 
                  <th key={index} align={'center'}>
                    {`Level ${index+1}`}
                  </th>
                )}
                <th>Level 11+</th>
              </thead>
              <tbody>
                <tr>
                  {data.cmBonus.totalGrouped.map((el, index) => (
                    <td key={index} align={'center'}>
                      {el.amount>0?
                        `${asPrice(el.amount)}/${asNumber(el.cv)}`
                      : '-'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
        }
        {data.raBonus && 
        <>
          <div className='d-flex align-items-center mb-1'>
            <div>
              <span className={'bonus-title'}>
                Rank Achievement&nbsp;<small>(One Time)</small>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>Total:&nbsp;{asPrice(data.raBonus.total)}</span>
            </div>
          </div>
          <div className='mb-4'>
            <table style={{width: 300}}>
              <thead>
                <th>Rank</th>
                <th>Amount</th>
              </thead>
              <tbody>
                {data.raBonus.details.map((el, index) => (
                  <tr key={index}>
                    <td>{el.rank.name}</td>
                    <td>{asPrice(el.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}
        {data.reBonus && 
        <>
          <div className='d-flex align-items-center mb-1'>
            <div>
              <span className={'bonus-title'}>
                Rank Achievement <small>(Monthly)</small>
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>Total:&nbsp;{asPrice(data.reBonus.total)}</span>
            </div>
          </div>
          <div className='mb-4'>
            <table style={{width: 300}}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Amount</th>
                </tr>                
              </thead>
              <tbody>
                {data.reBonus.details.map((el, index) => (
                  <tr key={index}>
                    <td>{el.rank.name}</td>
                    <td>{asPrice(el.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}
      </div>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .loadingRoot {
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .table-container {
    width: 100%;    
    overflow-x: auto;
  }
  table {
    th {
      position: relative;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      text-align: left;
      background: #fafafa;
      border-top: 1px solid #F2F2F2;
      border-bottom: 1px solid #F2F2F2;
      transition: background 0.3s ease;
      padding: 4px 8px;
      text-align: center;
      font-size: 13px;
      border-left: 1px solid #F2F2F2;
      border-right: 1px solid #F2F2F2;
    }
    
    td {
      position: relative;
      text-align: center;
      border-bottom: 1px solid #F2F2F2;
      border-left: 1px solid #F2F2F2;
      border-right: 1px solid #F2F2F2;
      transition: background 0.3s;
      padding: 4px 0;
    }
    
  }
  table {
    width: 100%;
  }
  .level-table {
    width: 100%;
    @media (max-width: 1400px) {      
      width: 1200px;
    }
  }
  .bonus-title {
    font-size: 16px;
    font-weight: bold;
  }
  .detail-link {
    color: ${props=>props.theme.palette.link};
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    margin-left: 12px;
  }
  .price-tag {
    background: #F3F5F8;
    padding: 8px 16px;
    margin-right: 16px;
  }
`

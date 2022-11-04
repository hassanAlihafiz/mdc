import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, Input, message
} from 'components/common'
import { callGetApiWithAuth } from 'utils/api'
import { Wrapper } from './SearchBar.styled'

export default function SearchBar( props ) {
  const dispatch = useDispatch()
  const myUser = useSelector(state=>state.auth.user)
  const [searchInput, setSearchInput] = useState('')
  const [downlines, setDownlines] = useState([])
  
  const onChangeSearch = (e) => {
    setSearchInput(e.target.value)
    if (e.target.value!='') {
      searchDownline(e.target.value)
    }
  }
  const handleSearch = (userInput) => {
    if (!userInput) {
      message.error('Input user ID')
      return 
    }
    if (isNaN(userInput)) {
      message.error('Input ID as number')
      return 
    }
    setDownlines([])
    props.search(userInput)
  }
  const searchDownline = (q) => {
    if (!q) return
    if (props.page=='unilevel')
      callGetApiWithAuth(`common/search_enroll_downline/${q}`, onGetDownlines)
    if (props.page=='binary')
      callGetApiWithAuth(`common/search_placement_downline/${q}`, onGetDownlines)
  }
  const onGetDownlines = (res) => {
    setDownlines(res.data)
  }
  const loadRoot = () => {
    setDownlines([])
    props.loadRoot()
  }
  const loadParent = () => {
    setDownlines([])
    props.loadParent()
  }

  return (
    <Wrapper>
      <div className={'searchRoot'}>
        <Input 
          value={searchInput}
          onChange={onChangeSearch}
          className={'searchInput'}
          placeholder='Search by User ID or Username' 
        />
        {downlines.length>0 &&
          <ul className={'searchResults'}>
            {downlines.map((user, index)=>(
              <li key={index} onClick={()=>handleSearch(user.id)}>
                {`${user.first_name} ${user.last_name}`}
              </li>
            ))}
          </ul>
        }

        <div style={{display: 'flex'}}>
          <Button className={`searchBtn`}
            onClick={loadParent}
            disabled={myUser && props.treeData && myUser.id==props.treeData.id}
          >
            Up 1 Level
          </Button>
          <Button className={`searchBtn`}
            onClick={loadRoot}
          >
            Top
          </Button>
        </div>
      </div>
      <div className={`descRoot`}>
        <div className={`descBox`}>
          <div className={`descTextRoot`}>
            <div className={`descTextIcon userType1Color`} 
            />
            Affiliate
          </div> 
          <div className={`descTextRoot`}>
            <div className={`descTextIcon userType2Color`} 
            />
            Customer
          </div> 
        </div>
      </div>
    </Wrapper>
  )
}

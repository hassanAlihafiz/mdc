import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { callGetApiWithAuth } from 'utils/api'
import SearchBar from './SearchBar'
import ListTable from './ListTable'
import SearchedTable from './SearchedTable'

export default function TableView() {
  const [searchParam, setSearchParam] = useState({
    uuid: '',
    level: '',
    rank_id: '',
    created_at_range: '',
  })
  const [tableMode, setTableMode] = useState('list') // list/searched
  const [selectedId, setSelectedId] = useState('')

  const goUser = (user) => {
    setTableMode("list")
    setSelectedId(user.id)
  };

  const handleSearch = (searchParam0) => {    
    setTableMode("searched")
    setSearchParam(searchParam0)
  }

  return (
    <Wrapper>
      <SearchBar 
        searchParam={searchParam}
        setSearchParam={setSearchParam}
        handleSearch={handleSearch}
      />
      <div style={{height: 24}} />
      {tableMode === 'list' && 
      <ListTable 
        selectedId={selectedId}
        goUser={goUser}
      />
      }
      {tableMode === 'searched' && 
      <SearchedTable 
        searchParam={searchParam}
        goUser={goUser}
      />
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
@media (max-width: 1400px) {
  table {
    width: 1200px;
  }
}
.chat-icon {
  margin-left: 12px;
  margin-top: -5px;
  cursor: pointer;
  color: ${props=>props.theme.palette.link};
  font-size: 16px;
}
.subscription-yes {
  color: #3ad33a;
}
.subscription-no {
  color: #ff6565;
}
`

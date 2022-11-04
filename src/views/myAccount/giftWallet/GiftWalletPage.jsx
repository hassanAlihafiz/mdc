import React, { useState } from 'react'
import styled from 'styled-components'
import ProductList from './product/ProductList'
import HistorySection from './history/HistorySection'
import BalanceSection from './sidebar/BalanceSection'
import SendBtnSection from './sidebar/SendBtnSection'
import SendModal from './sidebar/SendModal'
import TipSection from './sidebar/TipSection'

export default function GiftWalletPage() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [modalMode, setModalMode] = useState(undefined)

  return (
    <Wrapper>
      <div className='main-section'>
        <ProductList />
        <div style={{height: 24}} />
        <HistorySection 
          shouldLoad={shouldLoad}
          setShouldLoad={setShouldLoad}
        />
        <div style={{height: 24}} />
      </div>
      <div className='side-section'>
        <BalanceSection />
        <div style={{height: 24}} />
        <SendBtnSection 
          setModalMode={setModalMode}
        />
        <div style={{height: 24}} />
        <TipSection />
      </div>
      {modalMode === 'send' && 
        <SendModal 
          setModalMode={setModalMode}
          setShouldLoad={setShouldLoad}
        />
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
.main-section {
  width: calc(100% - 360px);
}
.side-section {
  width: 336px;
}
@media (max-width: 768px) {
  flex-wrap: wrap;
  .main-section {
    width: 100%;
  }
  .side-section {
    width: 100%;
  }
}
`

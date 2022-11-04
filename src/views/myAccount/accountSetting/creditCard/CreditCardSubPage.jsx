import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { message } from 'components/common'
import { varIs } from 'common/var'
import { ReactComponent as AddIcon } from "assets/icons/add.svg";
import { ReactComponent as NoDataIcon } from "assets/icons/no-data-checking.svg";
import { Wrapper } from "./CreditCardSubPage.styled";
import AddModal from "./add/AddModal";
import EditModal from "./edit/EditModal";
import TableView from './table/TableView'

export default function CreditCardSubPage() {
  const myUser = useSelector(state=>state.auth.user)
  const [modalMode, setModalMode] = useState(undefined)
  const [selected, setSelected] = useState(undefined)
  const [shouldLoad, setShouldLoad] = useState(false)

  const openAdd = () => {
    if (myUser.billing_details
      .filter(el => varIs('userBillingDetail.payType', el.pay_type, 'cc'))
      .length>=2
    ) {
      message.error('You cant add cc billing address more than 2')
      return
    }
    setModalMode('add')
  }

  return (
    <Wrapper>
      <div className="label-header-container">
        <div className="title">
          Credit Cards (
          {myUser.billing_details
          .filter(el => varIs('userBillingDetail.payType', el.pay_type, 'cc'))
          .length}
          )
        </div>
        <div className="add-container">
          <span className="icon-span" 
            onClick={openAdd}
          >
            <AddIcon />
          </span>
        </div>
      </div>
      
      {myUser.billing_details
      .filter(el => varIs('userBillingDetail.payType', el.pay_type, 'cc'))
      .length>0?
        <div className='contact-table'>
          <TableView
            shouldLoad={shouldLoad}
            setShouldLoad={setShouldLoad}
            setSelected={setSelected}
            setModalMode={setModalMode}
          />
        </div>
      : 
        <div className="checking-container">
          <NoDataIcon />
          <p className='no-text'>You do not have a credit card info.</p>
        </div>
      }
      {modalMode==='add' && (
        <AddModal
          setModalMode={setModalMode}
        />
      )}
      {(modalMode==='edit' && selected) && 
        <EditModal
          setModalMode={setModalMode}
          data={selected}
        />
      }
    </Wrapper>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { message } from 'components/common'
import { varIs } from 'common/var'
import { ReactComponent as AddIcon } from "assets/icons/add.svg";
import { Wrapper } from "./CheckingSubPage.styled";
import AddModal from "./add/AddModal";
import EditModal from "./edit/EditModal";
import TableView from './table/TableView'
import { NoData } from "components/common";

export default function CheckingSubPage() {
  const myUser = useSelector(state=>state.auth.user)
  const [modalMode, setModalMode] = useState(undefined)
  const [selected, setSelected] = useState(undefined)
  const [shouldLoad, setShouldLoad] = useState(false)

  const openAdd = () => {
    if (myUser.billing_details
      .filter(el => varIs('userBillingDetail.payType', el.pay_type, 'bank'))
      .length>=2
    ) {
      message.error('You cant add bank billing address more than 2')
      return
    }
    setModalMode('add')
  }

  return (
    <Wrapper>
      <div className="label-header-container">
        <div className="title">
          Checking (
          {myUser.billing_details
          .filter(el => varIs('userBillingDetail.payType', el.pay_type, 'bank'))
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
      .filter(el => varIs('userBillingDetail.payType', el.pay_type, 'bank'))
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
        <NoData title="You do not have a checking account on file with us." className="my-account-checking-no-data" />
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

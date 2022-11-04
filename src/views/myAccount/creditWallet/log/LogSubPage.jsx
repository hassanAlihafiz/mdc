import React, { useState } from "react";
import { Row, Col, Select } from "components/common";
import TransferTable from "./tables/TransferTable";
import ReceivedTable from "./tables/ReceivedTable";
import ConsumeTable from "./tables/ConsumeTable";
import WithdrawTable from "./tables/WithdrawTable";
import { Wrapper } from "./LogSubPage.styled";

export default function CreditLog() {
  const [showTableFor, setShowTableFor] = useState(1);
  return (
    <Wrapper>
      <div className="container-box">
        <div className='d-flex align-items-center justify-content-between'>
          <div className="title">Credit Logs</div>
          <div className="date-picker">
            <Select
              value={showTableFor}
              onChange={(val) => setShowTableFor(val)}
              options={[
                {
                  label: "Transfer Histories",
                  value: 1,
                },
                {
                  label: "Received Histories",
                  value: 2,
                },
                {
                  label: "Purchased Histories",
                  value: 3,
                },
                {
                  label: "Withdraw Histories",
                  value: 4,
                },
              ]}
            />
          </div>
        </div>
        <div className="table-container">
          {showTableFor == 1 && <TransferTable />}
          {showTableFor == 2 && <ReceivedTable />}
          {showTableFor == 3 && <ConsumeTable />}
          {showTableFor == 4 && <WithdrawTable />}
        </div>
      </div>
    </Wrapper>
  );
}

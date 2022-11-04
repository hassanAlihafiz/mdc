import React, { useState } from "react";
import { Tabs } from "components/common";
import BalanceSubPage from "./balance/BalanceSubPage";
import TransferSubPage from "./transfer/TransferSubPage";
import LogSubPage from "./log/LogSubPage";
import { Wrapper } from "./CreditWalletPage.styled";

const { TabPane } = Tabs;

export default function CreditWalletPage() {
  const [selectedTab, setSelecetedTab] = useState("Credit Wallet Balance");
  return (
    <Wrapper>
      <div className="main-container">
        <div className="subscriptions-tabs">
          <Tabs activeKey={selectedTab} onChange={(e) => setSelecetedTab(e)}>
            <TabPane
              tab={
                <span
                  className={
                    selectedTab == "Credit Wallet Balance"
                      ? "active-tab"
                      : "inactive-tab"
                  }
                >
                  Credit Wallet Balance
                </span>
              }
              key="Credit Wallet Balance"
            />

            <TabPane
              tab={
                <span
                  className={
                    selectedTab == "Transfer Credit"
                      ? "active-tab"
                      : "inactive-tab"
                  }
                >
                  Transfer Credit
                </span>
              }
              key="Transfer Credit"
            />
            <TabPane
              tab={
                <span
                  className={
                    selectedTab == "Credit Log" ? "active-tab" : "inactive-tab"
                  }
                >
                  Credit Log
                </span>
              }
              key="Credit Log"
            />
          </Tabs>
        </div>
      </div>
      {selectedTab == "Credit Wallet Balance" && <BalanceSubPage />}
      {selectedTab == "Transfer Credit" && <TransferSubPage />}
      {selectedTab == "Credit Log" && <LogSubPage />}
    </Wrapper>
  );
}

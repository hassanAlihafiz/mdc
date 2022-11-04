import React, { useState } from "react";
import styled from "styled-components";
import { Tabs } from "components/common";
import EarningSubPage from './earning/EarningSubPage'
import PayoutHistorySubPage from './payoutHistory/PayoutHistorySubPage'
import NegativeBonusSubPage from './negativeBonus/NegativeBonusSubPage'

export default function EarningPage() {
  const [selectedTab, setSelecetedTab] = useState("earning");
  return (
    <Wrapper>
      <div className="tabs-root">
        <Tabs activeKey={selectedTab} onChange={(e) => setSelecetedTab(e)}>
          <Tabs.TabPane
            tab={
              <span
                className={
                  selectedTab == "earning"
                    ? "active-tab"
                    : "inactive-tab"
                }
              >
                Earning
              </span>
            }
            key="earning"
          />

          <Tabs.TabPane
            tab={
              <span
                className={
                  selectedTab == "payout_history"
                    ? "active-tab"
                    : "inactive-tab"
                }
              >
                Payout Histories
              </span>
            }
            key="payout_history"
          />
          <Tabs.TabPane
            tab={
              <span
                className={
                  selectedTab == "negative_bonus" ? "active-tab" : "inactive-tab"
                }
              >
                Negative Bonus
              </span>
            }
            key="negative_bonus"
          />
        </Tabs>
      </div>
      {selectedTab == "earning" && <EarningSubPage />}
      {selectedTab == "payout_history" && <PayoutHistorySubPage />}
      {selectedTab == "negative_bonus" && <NegativeBonusSubPage />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: 20px;
  .tabs-root {
    background: white;
    margin: -20px -20px 20px -20px;
    border-top: 1px solid #eff3f6;
    padding: 0px 20px 0px 20px;
    .ant-tabs-nav {
      margin-bottom: 0px;
      margin-top: 3px;
    }
    .active-tab {
      font-weight: 500;
      font-size: 14px;
      color: #00b4ee;
      svg {
        margin-right: 15px;
      }
    }
    .inactive-tab {
      font-weight: 500;
      font-size: 14px;
      color: #8f9dae;
      svg {
        margin-right: 15px;
      }
    }
    .ant-tabs-tab {
      padding: 12px 0 9px;
    }
    .ant-tabs-ink-bar {
      background: #00b4ee !important;
    }
  }
`

import React, { useState } from "react";
import { Tabs } from "components/common";
import CurrentSubscriptionSubPage from "./current/CurrentSubscriptionSubPage";
import PastSubscriptionSubPage from "./past/PastSubscriptionSubPage";
import { Wrapper } from "./SubscriptionPage.styled";

const { TabPane } = Tabs;

export default function SubscriptionPage() {
  const [selectedTab, setSelecetedTab] = useState("Current Subscription");
  return (
    <Wrapper>
      <div className="main-container">
        <div className="subscriptions-tabs">
          <Tabs activeKey={selectedTab} onChange={(e) => setSelecetedTab(e)}>
            <TabPane
              tab={
                <span
                  className={
                    selectedTab == "Current Subscription"
                      ? "active-tab"
                      : "inactive-tab"
                  }
                >
                  Current Subscription
                </span>
              }
              key="Current Subscription"
            />

            <TabPane
              tab={
                <span
                  className={
                    selectedTab == "Past Subscription"
                      ? "active-tab"
                      : "inactive-tab"
                  }
                >
                  Past Subscription
                </span>
              }
              key="Past Subscription"
            />
          </Tabs>
        </div>
      </div>
      {selectedTab == "Current Subscription" && <CurrentSubscriptionSubPage />}
      {selectedTab == "Past Subscription" && <PastSubscriptionSubPage />}
    </Wrapper>
  );
}

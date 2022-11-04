import React, { useState } from "react";
import { Tabs } from "components/common";
import RecordedLiveStream from "./recorded/RecordedLiveStream";
import { Wrapper } from "./LiveStreamPage.styled";
import LiveStreams from "./liveStreams/LiveStreams";

const { TabPane } = Tabs;

export default function LiveStreamPage() {
  const [selectedTab, setSelecetedTab] = useState("Live Streams");
  return (
    <Wrapper>
      <div className="main-container">
        <div className="subscriptions-tabs">
          <Tabs activeKey={selectedTab} onChange={(e) => setSelecetedTab(e)}>
            <TabPane
              tab={
                <span
                  className={
                    selectedTab == "Live Streams"
                      ? "active-tab"
                      : "inactive-tab"
                  }
                >
                  Live Streams
                </span>
              }
              key="Live Streams"
            />
            <TabPane
              tab={
                <span
                  className={
                    selectedTab == "Recorded Live Streams"
                      ? "active-tab"
                      : "inactive-tab"
                  }
                >
                  Recorded Live Streams
                </span>
              }
              key="Recorded Live Streams"
            />
          </Tabs>
        </div>
        {selectedTab === "Live Streams" &&
          <LiveStreams />
        }
        {selectedTab === "Recorded Live Streams" &&
          <RecordedLiveStream />
        }
      </div>
    </Wrapper>
  );
}

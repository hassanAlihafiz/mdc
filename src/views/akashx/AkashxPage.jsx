import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Tabs } from "components/common";
import HomePage from "./home/HomPage";
import ForexCryptoAcademyPage from "./forexCryptoAcademy/ForexCryptoAcademyPage";
import SocialTradingPage from "./socialTrading/SocialTradingPage";
import ForexTradingPage from "./forexTrading/ForexTradingPage";
import MarketResearchPage from "./marketResearch/MarketResearchPage";
import { Wrapper } from "./AkashxPage.styled";
import CoinzoomAcademyPage from "./coinzoomAcademy/CoinzoomAcademyPage";
import LinkCoinzoomPage from "./linkCoinzoom/LinkCoinzoomPage";
import LiveCryptoCallsPage from "./liveCryptoCalls/LiveCryptoCallsPage";
import SignalsPage from "./signals/SignalsPage";
import SignalsAnalyzerPage from "./signalsAnalyzer/SignalsAnalyzerPage";
import AkashxTvPage from "./akashxTv/AkashxTvPage";
import CalendarPage from "./calendar/CalendarPage";
import CompliancePage from "./compliance/CompliancePage";
import TrainingTutorialsPage from "./trainingTutorials/TrainingTutorialsPage";

const { TabPane } = Tabs;

export default function AkashxPage() {
  const location = useLocation()
  const [tab, setTab] = useState("home");

  const handleChangeTab = (tab_) => {
    setTab(tab_);
  };

  useEffect(() => {
    if (location?.state?.tab) {
      setTab(location.state.tab);
    } else {
      setTab("home");
    }
  }, [location]);

  return (
    <Wrapper>
      <Tabs activeKey={tab} onChange={handleChangeTab}>
        <TabPane tab="Home" key="home">
          <HomePage handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="CoinZoom Academy" key="coinzoom_academy">
          <CoinzoomAcademyPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Link My CoinZoom" key="link_my_coinzoom">
          <LinkCoinzoomPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Live Crypto Calls" key="live_crypto_calls">
          <LiveCryptoCallsPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Forex &amp; Crypto Academy" key="forex_and_crypto">
          <ForexCryptoAcademyPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Forex Trading" key="forex_trading">
          <ForexTradingPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Social Trading" key="social_trading">
          <SocialTradingPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Signals" key="signals">
          <SignalsPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Signals Analyzer" key="signals_analyzer">
          <SignalsAnalyzerPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Market Research" key="market_research">
          <MarketResearchPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Akashx TV" key="akashx_tv">
          <AkashxTvPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Calendars" key="calendars">
          <CalendarPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Training &amp; Tutorials" key="training_tutorials">
          <TrainingTutorialsPage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
        <TabPane tab="Compliance" key="compliance">
          <CompliancePage tab={tab} handleChangeTab={handleChangeTab} />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
}
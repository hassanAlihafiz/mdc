import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AuthedLayout from "layouts/authed/AuthedLayout";
import AuthLayout from "layouts/auth/AuthLayout";

import LogoutRoute from "views/auth/logout/LogoutRoute";
import LoginPage from "views/auth/login/LoginPage";
import DashboardPage from "views/dashboard/DashboardPage";
import HomePage from "views/home/HomePage";
import SubscriptionPage from "views/myAccount/subscription/SubscriptionPage";
import OrderHistoryPage from "views/myAccount/orderHistory/OrderHistoryPage";
import OrderReceiptPage from "views/myAccount/orderReceipt/OrderReceiptPage";
import CreditWalletPage from "views/myAccount/creditWallet/CreditWalletPage";
import GiftWalletPage from "views/myAccount/giftWallet/GiftWalletPage";
import HoldingTankPage from "views/myTeam/holdingTank/HoldingTankPage";
import UplinePage from "views/myTeam/upline/UplinePage";
import UnilevelListPage from "views/myTeam/unilevelList/UnilevelListPage";
import BinaryListPage from "views/myTeam/binaryList/BinaryListPage";
import UnilevelTreePage from "views/myTeam/unilevelTree/UnilevelTreePage";
import BinaryTreePage from "views/myTeam/binaryTree/BinaryTreePage";
import AccountSettingPage from "views/myAccount/accountSetting/AccountSettingPage";
import LiveStreamPage from "views/liveStream/LiveStreamPage";
import PublisherPage from "views/publisher/PublisherPage";
import ViewerPage from "views/viewer/ViewerPage";
import ContactManagerPage from "views/contactManager/ContactManagerPage";
import PaymentOptionPage from "views/myAccount/paymentOption/PaymentOptionPage";
import TrainingPage from "views/training/TrainingPage";
import MarketingAssetsPage from "views/tool/marketingAsset/MarketingAssetPage";
import LeaderboardPage from "views/leaderboard/LeaderboardPage";
import EarningPage from "views/earning/EarningPage";
import ReplicatedPage from "views/myWebsite/replicated/ReplicatedPage";
import ShareCartPage from "views/myWebsite/shareCart/ShareCartPage";
import NotificationsPage from "views/notifications/NotificationsPage";
import CheckoutPage from "views/checkout/CheckoutPage";
import ChatPage from "views/teamChat/ChatPage";
import SupportPage from "views/support/SupportPage";
import LeadsAndTrafficPage from "views/tool/leadsAndTraffic/LeadsAndTrafficPage";
import CapturePage from "views/myWebsite/capture/CapturePage";
import HighLifeTravelPage from "views/highLifeTravel/HighLifeTravelPage";
import RankSnapshotPage from 'views/myRank/rankSnapshot/RankSnpashotPage'
import RankRecognitionPage from "views/myRank/rankRecognition/RankRecognitionPage";
import AkashxPage from "views/akashx/AkashxPage";
import BonusTrackerPage from 'views/report/bonusTracker/BonusTrackerPage'
import GlobalPoolPage from 'views/report/globalPool/GlobalPoolPage'
import VolumeReportPage from 'views/report/volumeReport/VolumeReportPage'
import DeclineReportPage from 'views/report/declineReport/DeclineReportPage'
import TopEarnerPage from 'views/report/topEarner/TopEarnerPage'
import RankReportPage from 'views/report/rankReport/RankReportPage'
import BinaryQualPage from 'views/report/binaryQual/BinaryQualPage'
import AnalysisSectionPage from "views/akashx/marketResearch/sections/AnalysisSectionPage";
import NewsSectionPage from "views/akashx/marketResearch/sections/NewsSectionPage";
import VideosSectionPage from "views/akashx/marketResearch/sections/VideosSectionPage";
import WebinarsSectionPage from "views/akashx/marketResearch/sections/WebinarsSectionPage";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/login" component={LoginPage} />
        <Route path="/logout" component={LogoutRoute} />
        <AuthedRoute path="/" component={HomePage} fullLayout exact={true} />
        <AuthedRoute
          publicRoute={false}
          path="/dashboard"
          component={DashboardPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_account/subscription"
          component={SubscriptionPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_account/order_history"
          component={OrderHistoryPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_account/setting"
          component={AccountSettingPage}
          fullLayout
        />
        <Route
          path="/my_account/order_receipt/:orderId"
          component={OrderReceiptPage}
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_account/credit_wallet"
          component={CreditWalletPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_account/gift_wallet"
          component={GiftWalletPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_account/payment_option"
          component={PaymentOptionPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_team/holding_tank"
          component={HoldingTankPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_team/upline"
          component={UplinePage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_team/unilevel_list"
          component={UnilevelListPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_team/binary_list"
          component={BinaryListPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_team/unilevel_tree"
          component={UnilevelTreePage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_team/binary_tree"
          component={BinaryTreePage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/team_chat"
          component={ChatPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/live_stream"
          component={LiveStreamPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/publisher"
          component={PublisherPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/viewer"
          component={ViewerPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/contact_manager"
          component={ContactManagerPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/training"
          component={TrainingPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/tool/marketing_asset"
          component={MarketingAssetsPage}
          fullLayout
        />
        {/* <AuthedRoute
          publicRoute={false}
          path="/tool/leads_and_traffic"
          component={LeadsAndTrafficPage}
          fullLayout
        /> */}
        <AuthedRoute
          publicRoute={false}
          path="/leaderboard"
          component={LeaderboardPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/earning"
          component={EarningPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_website/replicated"
          component={ReplicatedPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_website/capture"
          component={CapturePage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_website/share_cart"
          component={ShareCartPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/notifications"
          component={NotificationsPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/akashx/home"
          component={AkashxPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/akashx/market_research_analysis"
          component={AnalysisSectionPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/akashx/market_research_news"
          component={NewsSectionPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/akashx/market_research_videos"
          component={VideosSectionPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/akashx/market_research_webinars"
          component={WebinarsSectionPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/hlt"
          component={HighLifeTravelPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/support"
          component={SupportPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/checkout"
          component={CheckoutPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_rank/rank_snapshot"
          component={RankSnapshotPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/my_rank/rank_recognition"
          component={RankRecognitionPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/report/bonus_tracker"
          component={BonusTrackerPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/report/global_pool"
          component={GlobalPoolPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/report/volume_report"
          component={VolumeReportPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/report/decline_report"
          component={DeclineReportPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/report/top_earner"
          component={TopEarnerPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/report/rank_report"
          component={RankReportPage}
          fullLayout
        />
        <AuthedRoute
          publicRoute={false}
          path="/report/binary_qual"
          component={BinaryQualPage}
          fullLayout
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

const AuthRoute = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(props) => (
        <AuthLayout pathname={props.location.pathname}>
          <Component {...props} />
        </AuthLayout>
      )}
    />
  );
};

const AuthedRoute = ({
  component: Component,
  fullLayout,
  publicRoute,
  ...props
}) => {
  return (
    <Route
      {...props}
      render={(props) => (
        <AuthedLayout
          fullLayout={fullLayout}
          pathname={props.location.pathname}
          publicRoute={publicRoute}
        >
          <Component {...props} />
        </AuthedLayout>
      )}
    />
  );
};

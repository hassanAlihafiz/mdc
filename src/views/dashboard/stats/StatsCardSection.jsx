import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "components/common";
import { Wrapper } from "./StatsCardSection.styled";
import { asPrice } from "utils/text";
import { callGetApiWithAuth } from "utils/api";

export default function StatsCardSection() {
  const [stats, setStats] = useState({
    total_affiliate: 0,
    total_preferred: 0,
    total_autoships: 0,
    total_commissions_earned: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const onGetSuccessStats = ({ data }) => {
    setIsLoading(false);
    setStats({
      total_affiliate: data.affiliate_users_count,
      total_preferred: data.total_customers,
      total_autoships: data.subscriptions,
      total_commissions_earned: data.commissions_earned
    });
  };

  const onGetFailedStats = (err) => {
    setIsLoading(false);
  };

  const loadStats = () => {
    setIsLoading(true);
    callGetApiWithAuth("dashboard/header_stats", onGetSuccessStats, onGetFailedStats);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6} className="responsive-stats">
          <div className="stats-container">
            <div className="stats-label">Total Customers</div>
            <div className="stats-value">{isLoading ? <Spin spinning={true} className="loading-icon" /> : stats.total_preferred}</div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6} className="responsive-stats">
          <div className="stats-container">
            <div className="stats-label">Total Affiliates</div>
            <div className="stats-value">{isLoading ? <Spin spinning={true} className="loading-icon" /> : stats.total_affiliate}</div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6} className="responsive-stats">
          <div className="stats-container">
            <div className="stats-label">Total Autoships</div>
            <div className="stats-value">{isLoading ? <Spin spinning={true} className="loading-icon" /> : stats.total_autoships}</div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6} className="responsive-stats">
          <div className="stats-container">
            <div className="stats-label">Total Commissions Earned</div>
            <div className="stats-value">{isLoading ? <Spin spinning={true} className="loading-icon" /> : asPrice(stats.total_commissions_earned)}</div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}

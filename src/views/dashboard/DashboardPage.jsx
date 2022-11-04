import React from "react";
import { Row, Col } from "components/common";
import StatsCardSection from "./stats/StatsCardSection";
import SalesBrandSection from "./brand/SalesBrandSection";
import SalesSection from "./sales/SalesSection";
import PersonalEnrollments from "./pe/PersonalEnrollments";
import RankSection from "./rank/RankSection";
import ProductSalesSection from "./productSales/ProductSalesSection";
import BinarySection from "./binary/BinarySection";
import { Wrapper } from "./DashboardPage.styled";

export default function DashboardPage() {
  return (
    <Wrapper>
      <div className="main-container">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <StatsCardSection />
          </Col>
          <Col xs={24} xl={14}>
            <SalesSection />
          </Col>
          <Col xs={24} xl={10}>
            <PersonalEnrollments />
          </Col>
          <Col span={14} className="responsive-sales">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <RankSection />
              </Col>
              <Col span={24}>
                <BinarySection />
              </Col>
            </Row>
          </Col>
          <Col span={10} className="responsive-sales">
            <ProductSalesSection />
          </Col>
          <Col span={24}>
            <SalesBrandSection />
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}

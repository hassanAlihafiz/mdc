import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Empty } from "components/common";
import { Wrapper } from "./ProductSalesSection.styled";
import NoImage from 'assets/images/no_image.png';
import { callGetApiWithAuth } from "utils/api";
import { asPrice } from "utils/text";

export default function IndexPage() {
  const [topFiveProducts, setTopFiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const onGetSuccessTopFiveProducts = ({ data }) => {
    setIsLoading(false);
    setTopFiveProducts(data);
  };

  const onGetFailedTopFiveProducts = (err) => {
    setIsLoading(false);
  };

  const loadTopFiveProducts = () => {
    setIsLoading(true);
    callGetApiWithAuth("dashboard/top5_product_sales", onGetSuccessTopFiveProducts, onGetFailedTopFiveProducts);
  };

  useEffect(() => {
    loadTopFiveProducts();
  }, []);

  return (
    <Wrapper>
      <div className="sales-title-container">
        <div className="sales-title">Top 5 Product Sales By Team</div>
        <div className="sales-date">This Year</div>
      </div>
      <div className="divider" />
        <Row gutter={[20, 20]}>
          {isLoading ? 
            <Spin spinning={true} />
            :
            <>
              {topFiveProducts.length > 0 ? topFiveProducts.map((el, index) => (
                <Col span={24} key={index}>
                  <div className="sales-product-container">
                    <Row gutter={[10, 10]}>
                      <Col xs={24} sm={4}>
                        <div className="product-image">
                          <img src={el.product.image_path ? el.product.image_path : NoImage} />
                        </div>
                      </Col>
                      <Col xs={24} sm={20}>
                        <Row gutter={[20, 20]}>
                          <Col xs={24} sm={17}>
                            <div className="label-container">
                              <div className="label">{el.product.title}</div>
                              <div className="brand-container">
                                Brand: <span>{el.product.product_brand.title}</span>
                              </div>
                              <div className="price-container">
                                {asPrice(el.product.member_price)} <span className="price">{asPrice(el.product.recurring_price)}</span>{" "}
                                <span className="subscription">
                                  (Subscription Price)
                                </span>
                              </div>
                            </div>
                          </Col>
                          <Col xs={24} sm={7}>
                            <div className="product-price-container">{asPrice(el.sales_amount)}</div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))
              :
              <Col span={24}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </Col>
            }
          </>
        }
      </Row>
    </Wrapper>
  );
}

import React, { useState } from "react";
import { Row, Col } from "components/common";
import { ReactComponent as AccountBlueIcon } from "assets/icons/account-blue.svg";
import { ReactComponent as AccountLightIcon } from "assets/icons/account-light.svg";
import { ReactComponent as CheckingBlueIcon } from "assets/icons/checking-blue.svg";
import { ReactComponent as CheckingLightIcon } from "assets/icons/checking-light.svg";
import { ReactComponent as CreditBlueIcon } from "assets/icons/credit-blue.svg";
import { ReactComponent as CreditLightIcon } from "assets/icons/credit-light.svg";
import { ReactComponent as ShippingBlueIcon } from "assets/icons/shipping-blue.svg";
import { ReactComponent as ShippingLightIcon } from "assets/icons/shipping-light.svg";
import { ReactComponent as EnrollmentBlueIcon } from "assets/icons/enrollment-blue.svg";
import { ReactComponent as EnrollmentLightIcon } from "assets/icons/enrollment-light.svg";
import ShippingAddressSubPage from "./shippingAddress/ShippingAddressSubPage";
import CreditCardSubPage from "./creditCard/CreditCardSubPage";
import CheckingSubPage from "./checking/CheckingSubPage";
import EnrollSettingSubPage from "./enrollSetting/EnrollSettingSubPage";
import ProfileSubPage from "./profile/ProfileSubPage";
import { Wrapper } from "./AccountSettingPage.styled";
import { getUser } from "utils/auth";

export default function AccountSettingPage() {
  const myUser = getUser();
  const [isSelected, setIsSelected] = useState("account");
  return (
    <Wrapper>
      <div className="main-container">
        <Row gutter={[20, 20]} className="table-row">
          <Col xs={24} md={8} lg={6} xl={4}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <div
                  className="settings-tabs"
                  onClick={() => setIsSelected("account")}
                >
                  {isSelected == "account" ? (
                    <AccountBlueIcon />
                  ) : (
                    <AccountLightIcon />
                  )}
                </div>
              </Col>
              <Col span={24}>
                <div
                  className="settings-tabs"
                  onClick={() => setIsSelected("shipping")}
                >
                  {isSelected == "shipping" ? (
                    <ShippingBlueIcon />
                  ) : (
                    <ShippingLightIcon />
                  )}
                </div>
              </Col>
              <Col span={24}>
                <div
                  className="settings-tabs"
                  onClick={() => setIsSelected("credit")}
                >
                  {isSelected == "credit" ? (
                    <CreditBlueIcon />
                  ) : (
                    <CreditLightIcon />
                  )}
                </div>
              </Col>
              {myUser.country === "US" &&
                <Col span={24}>
                  <div
                    className="settings-tabs"
                    onClick={() => setIsSelected("checking")}
                  >
                    {isSelected == "checking" ? (
                      <CheckingBlueIcon />
                    ) : (
                      <CheckingLightIcon />
                    )}
                  </div>
                </Col>
              }
              <Col span={24}>
                <div
                  className="settings-tabs"
                  onClick={() => setIsSelected("enrollment")}
                >
                  {isSelected == "enrollment" ? (
                    <EnrollmentBlueIcon />
                  ) : (
                    <EnrollmentLightIcon />
                  )}
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={16} lg={18}  xl={20}>
            {isSelected == "shipping" && <ShippingAddressSubPage />}
            {isSelected == "credit" && <CreditCardSubPage />}
            {isSelected == "checking" && <CheckingSubPage />}
            {isSelected == "enrollment" && <EnrollSettingSubPage />}
            {isSelected == "account" && <ProfileSubPage />}
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
}

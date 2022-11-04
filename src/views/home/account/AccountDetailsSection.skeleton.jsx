import React from "react";
import { Row, Col, LiquidPlot, Spin } from "components/common";
import NoUserImage from "assets/images/user.svg";
import { ReactComponent as SettingIcon } from "assets/icons/setting.svg";
import { ReactComponent as GraySettingIcon } from "assets/icons/gray-setting.svg";

export default function AccountDetailsSectionSkeleton(props) {
  return (
      <Row gutter={[10, 10]} className="skeleton-section">
        <Col xs={24} md={12} className="left-details-container">
          <div className="left-box">
            <div className="personal-details-container">
              <img src={NoUserImage} />
              <div className="user-title">- - - - - -</div>
              <div className="user-id">- - - - - -</div>
            </div>
            <div className="personal-extra-info">
              <div className="personal-info">
                <div className="label">Username</div>
                <div className="value">- - - - - -</div>
              </div>
              <div className="personal-info">
                <div className="label">Rank</div>
                <div className="value">- - - - - -</div>
              </div>
              <div className="personal-info">
                <div className="label">Binary Qualified</div>
                <div className="value">- - - - - -</div>
              </div>
              <div className="personal-info">
                <div className="label">Personal Volume</div>
                <div className="value">- - - - - -</div>
              </div>
              <div className="personal-info">
                <div className="label">Enroller Tree Volume</div>
                <div className="value">- - - - - -</div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={12} className="right-details-container">
          <div>
            <Row gutter={[15, 10]} className="plot-container">
              <Col span={12}>
                <div className="iquid-container">
                  <LiquidPlot percent="0" />
                </div>
              </Col>
              <Col span={12}>
                <div className="liquid-setting-container">
                  <div className="liquid-settings">
                    <SettingIcon />
                    Settings
                  </div>
                </div>
              </Col>
            </Row>
            <div className="right-box">
              <div className="account-and-profile-container">
                <div className="account-section">
                  <div className="title">Account Details</div>
                  <div className="percentage">
                    - - -
                    <div className="setting">
                      <GraySettingIcon />
                    </div>
                  </div>
                </div>
                <div className="profile-section">
                  <div className="title">
                    Complete all of your account details and settings
                  </div>
                </div>
              </div>
              <div className="account-and-profile-container">
                <div className="account-section">
                  <div className="title">Your Profile</div>
                  <div className="percentage">
                    - - -
                    <div className="setting">
                      <GraySettingIcon />
                    </div>
                  </div>
                </div>
                <div className="profile-section">
                  <div className="title">
                    Upload a profile image and complete your profile
                  </div>
                </div>
              </div>
              <div className="account-and-profile-container">
                <div className="account-section">
                  <div className="title">Setup Payment Option</div>
                  <div className="percentage">
                    - - -
                    <div className="setting">
                      <GraySettingIcon />
                    </div>
                  </div>
                </div>
                <div className="profile-section">
                  <div className="title">
                    Set your payment option to receive your commissions
                  </div>
                </div>
              </div>
              <div className="account-and-profile-container">
                <div className="account-section">
                  <div className="title">Subscribe To Save</div>
                  <div className="percentage">
                    - - -
                    <div className="setting">
                      <GraySettingIcon />
                    </div>
                  </div>
                </div>
                <div className="profile-section" style={{ marginBottom: 0 }}>
                  <div className="title">
                    Maximize your savings with a subscription
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        {props.isLoading &&
          <Col xs={24} className="loading-spin-container">
            <Spin spinning={true} />
          </Col>
        }
      </Row>
  );
}

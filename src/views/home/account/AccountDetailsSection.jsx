import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Row, Col, LiquidPlot } from "components/common";
import { asNumber } from "utils/text";
import { callGetApiWithAuth } from "utils/api";
import NoPhotoIcon from "assets/images/user.svg";
import { ReactComponent as SettingIcon } from "assets/icons/setting.svg";
import { ReactComponent as GraySettingIcon } from "assets/icons/gray-setting.svg";
import CloseIcon from '@ant-design/icons/CloseOutlined';
import CheckIcon from '@ant-design/icons/CheckOutlined';
import AccountDetailsSectionSkeleton from "./AccountDetailsSection.skeleton";
import { Wrapper } from "./AccountDetailsSection.styled";

export default function AccountDetailsSection() {
  const myUser = useSelector(state=>state.auth.user)
  const [isQualified, setIsQualified] = useState(false)
  const [profileStatus, setProfileStatus] = useState({
    accountComplete: 0,
    payoutComplete: 0,
    profileComplete: 0,
    subscriptionComplete: 0,
    total: 0
  });
  const [isLoadingProfileStatus, setIsLoadingProfileStatus] = useState(false);

  const onGetSuccessProfileStatus = ({ data }) => {
    setIsLoadingProfileStatus(false);
    setProfileStatus({
      accountComplete: data.accountComplete,
      payoutComplete: data.payoutComplete,
      profileComplete: data.profileComplete,
      subscriptionComplete: data.subscriptionComplete,
      total: data.total
    });
  };

  const onGetFailedProfileStatus = (err) => {
    setIsLoadingProfileStatus(false);
  }

  const loadProfileStatus = () => {
    setIsLoadingProfileStatus(true);
    callGetApiWithAuth("home/get_profile_status", onGetSuccessProfileStatus, onGetFailedProfileStatus);
  };

  useEffect(() => {
    loadProfileStatus();
  }, []);

  useEffect(() => {
    if (
      (myUser.qualification.pv>=40 || 
      myUser.qualification.pecv>=40) && 
      myUser.qualification.l_bpev>=90 && 
      myUser.qualification.r_bpev>=90 && 
      myUser.qualification.r_bgv>=90 && 
      myUser.qualification.r_bgv>=90 
    ) {
      setIsQualified(true)
    } else {
      setIsQualified(false)
    }
  }, [myUser])

  return (
    <Wrapper>
      {(isLoadingProfileStatus) ?
        <AccountDetailsSectionSkeleton isLoading={isLoadingProfileStatus} />
        :
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12} className="left-details-container">
            <div className="left-box">
              <div className="personal-details-container">
                <img src={myUser.image ||  NoPhotoIcon} />
                <div className="user-title">{myUser.first_name} {myUser.last_name}</div>
                <div className="user-id">#{myUser.uuid}</div>
              </div>
              <div className="personal-extra-info">
                <div className="personal-info">
                  <div className="label">Username</div>
                  <div className="value">{myUser.username}</div>
                </div>
                <div className="personal-info">
                  <div className="label">Rank</div>
                  <div className="value">
                    <div className='d-flex align-items-center'>
                      {myUser.rank.badge && 
                        <img src={myUser.rank.badge} 
                          className='rank-badge'
                        />
                      }
                      <span>{myUser.rank.name}</span>
                    </div>
                  </div>
                </div>
                <div className="personal-info">
                  <div className="label">Binary Qualified</div>
                  <div className="value">
                    {isQualified?
                    <span className='binary-qual active'>
                      Yes&nbsp;<CheckIcon />
                    </span>
                    : 
                    <span className='binary-qual inactive'>
                      No&nbsp;<CloseIcon />
                    </span>
                    }
                  </div>
                </div>
                <div className="personal-info">
                  <div className="label">Personal Volume</div>
                  <div className="value">({myUser.qualification.pv}/{myUser.next_rank.settings.pv})</div>
                </div>
                <div className="personal-info">
                  <div className="label">Personal Customer Volume</div>
                  <div className="value">{myUser.qualification.pecv}</div>
                </div>
                <div className="personal-info">
                  <div className="label">Enroller Tree Volume</div>
                  <div className="value">{asNumber(myUser.qualification.gv)}</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} className="right-details-container">
            <div>
              <Row gutter={[15, 10]} className="plot-container">
                <Col span={12}>
                  <div className="iquid-container">
                    <LiquidPlot percent={profileStatus.total ? (profileStatus.total*1)/100 : 0} />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="liquid-setting-container">
                    <div className="liquid-settings">
                        <Link to="/my_account/setting"><SettingIcon />Settings</Link>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="right-box">
                <div className="account-and-profile-container">
                  <div className="account-section">
                    <div className="title">Account Details</div>
                    <div className="percentage">
                      {profileStatus.accountComplete ? <span className="completed">Completed</span> : <span className="incompleted">Incomplete</span>}
                      <div className="setting">
                        <Link to="/my_account/setting"><GraySettingIcon /></Link>
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
                      {profileStatus.profileComplete ? <span className="completed">Completed</span> : <span className="incompleted">Incomplete</span>}
                      <div className="setting">
                        <Link to="/my_account/setting"><GraySettingIcon /></Link>
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
                      {profileStatus.payoutComplete ? <span className="completed">Completed</span> : <span className="incompleted">Incomplete</span>}
                      <div className="setting">
                        <Link to="/my_account/payment_option"><GraySettingIcon /></Link>
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
                      {profileStatus.subscriptionComplete ? <span className="completed">Completed</span> : <span className="incompleted">Incomplete</span>}
                      <div className="setting">
                        <Link to="/my_account/subscription"><GraySettingIcon /></Link>
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
        </Row>
      }
    </Wrapper>
  );
}

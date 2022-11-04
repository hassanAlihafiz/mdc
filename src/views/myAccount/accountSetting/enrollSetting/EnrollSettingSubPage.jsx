import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { 
  Select, Alert, SuccessNotification 
} from "components/common";
import { varOptions } from 'common/var'
import { callPutApiWithAuth } from 'utils/api'
import { Wrapper } from "./EnrollSettingSubPage.styled";

export default function EnrollSettingSubPage() {
  const dispatch = useDispatch()
  const myUser = useSelector(state=>state.auth.user)
  const [powerLeg, setPowerLeg] = useState(4)

  const onUpdatedPowerLeg = (res) => {
    SuccessNotification(res.message)
    dispatch({ type: 'auth.RELOAD' })
  }
  const onChangePowerLeg = (v) => {
    setPowerLeg(v)
    callPutApiWithAuth(`my_account/setting/power_leg`, 
      {power_leg: v},
      onUpdatedPowerLeg
    )
  }

  useEffect(() => {
    setPowerLeg(myUser.power_leg)
  }, [myUser])

  return (
    <Wrapper>
      <div className="label-header-container">
        <div className="title">Enrollment Setting</div>
      </div>
      <div className="enrollment-settings-description">
        <Alert
          type="info"
          message="Your Enrollment Settings Put YOU In Control!"
          description={<span dangerouslySetInnerHTML={{ __html: `
            <p><strong>By setting your enrollment settings to the LEFT LEG</strong>, all of your personally enrolled users will be placed at the bottom of your LEFT leg. Similarly, if set your enrollment settings to the RIGHT leg, all of your personally enrolled users will be placed at the bottom of your RIGHT leg.</p>
            <p><strong>By setting your enrollments settings to ALTERNATE</strong>, every other personally enrolled users will be placed at the bottom of your RIGHT leg, and every other personally enrolled user will be placed at the bottom of your LEFT leg. For example, if your enrollment settings are ALTERNATE and you enroll 10 users personally, 5 will be allocated to your RIGHT leg and 5 will be allocated to your LEFT leg.</p>
            <p><strong>By setting your enrollment settings to LESSER LEG</strong>, all of your personally enrolled users will be placed on the leg that has the least volume.</p>
            <p><strong>By setting your enrollment settings to HOLDING TANK</strong>, your personally enrolled users will go into your Holding Tank page where you can manually place them wherever you’d like in the binary. You have 7 days to place your users before they auto-flush to your lesser leg.</p>` }} />
          }
          showIcon
        />
      </div>
      <div className="enorllment-container">
        <div className="select-container">
          <div className="label">Enrollment Settings</div>
          <div className="select-box">
            <Select
              value={powerLeg}
              options={varOptions('user.powerLeg')}
              onChange={onChangePowerLeg}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

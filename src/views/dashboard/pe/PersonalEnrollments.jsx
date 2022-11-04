import React, { useEffect, useState } from "react";
import { ColumnLineChart, Spin } from "components/common";
import { Wrapper } from "./PersonalEnrollments.styled";
import { callGetApiWithAuth } from "utils/api";

export default function PersonalEnrollments() {
  const [peData, setPeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGetSuccessPeData = ({ data }) => {
    setIsLoading(false);
    setPeData(data.map((el, index) => ({
      time: el.date,
      value: el.enroll_cnt,
      key: index
    })));
  };

  const onGetFailedPeData = (err) => {
    setIsLoading(false);
  };

  const loadPeData = () => {
    setIsLoading(true);
    callGetApiWithAuth("dashboard/personal_enrolls", onGetSuccessPeData, onGetFailedPeData);
  };

  useEffect(() => {
    loadPeData();
  }, []);

  return (
    <Wrapper>
      <div className="sales-title-container">
        <div className="sales-title">Personal Enrollments</div>
        <div className="sales-date">This Year</div>
      </div>
      <div className="sales-chart">
        <ColumnLineChart data={peData} />
        {isLoading &&
          <Spin spinning={true} className="loading-spin" />
        }
      </div>
    </Wrapper>
  );
}

import React, { useEffect, useState } from "react";
import { MultiLineChart } from "components/common";
import { Wrapper } from "./SalesSection.styled";
import { callGetApiWithAuth } from "utils/api";
import moment from "moment";
import { Spin } from "components/common";

export default function SalesSection() {  
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGetSuccessSalesData = ({ data }) => {
    setIsLoading(false);
    const teamSales = Object.keys(data).map((key) => (
      {
        date: moment(new Date(key)).format("YYYY/M/D"),
        type: "Team Sales",
        value: data[key][0].team_sales,
      }
    ));
    const personalSales = Object.keys(data).map((key) => (
      {
        date: moment(new Date(key)).format("YYYY/M/D"),
        type: "Personal Sales",
        value: data[key][0].personal_sales,
      }
    ));
    setSalesData([
      ...teamSales,
      ...personalSales
    ]);
  };

  const onGetFailedSalesData = (err) => {
    setIsLoading(false);
  };

  const loadSalesData = () => {
    setIsLoading(true);
    callGetApiWithAuth("dashboard/personal_sales", onGetSuccessSalesData, onGetFailedSalesData);
  };

  useEffect(() => {
    loadSalesData();
  }, []);

  return (
    <Wrapper>
      <div className="sales-title-container">
        <div className="sales-title">Sales</div>
        <div className="sales-date">This Year</div>
      </div>
      <div className="multi-line-container">
        <MultiLineChart data={salesData} />
        {isLoading &&
          <Spin spinning={true} className="loading-spin" />
        }
      </div>
    </Wrapper>
  );
}

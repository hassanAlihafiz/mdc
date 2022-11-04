import React from "react";
import styled from "styled-components";

export default function Badge (props) {
  return (
    <Wrapper>
      <div className={`statusTag ${props.label?.toLowerCase()} ${props.type}_${props.keyName}`}>
        {props.label}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .statusTag {
    display: inline-block;
    width: auto;
    min-width: 100px !important;
    padding: 5px 10px 5px;
    color: white;
    font-weight: bold;
    font-size: 10px;
    text-align: center;
    text-transform: uppercase;
    background-color: lightgrey;
    border-radius: 3px;
  }
  .userStatus_active {
    background-color: ${props=>props.theme.palette.success};
  }
  .userStatus_hold {
    background-color: ${props=>props.theme.palette.warning};
  }
  .userStatus_suspended {
    background-color: ${props=>props.theme.palette.error};
  }
  .userStatus_pending {
    background: #1890ff;
  }
  .subscriptionStatus_active {
    background-color: ${props=>props.theme.palette.success};
  }
  .subscriptionStatus_inactive {
    background-color: ${props=>props.theme.palette.warning};    
  }
  .subscriptionStatus_cancelled {
    background-color: ${props=>props.theme.palette.error};
  }
  .orderStatus_paid {
    background-color: ${props=>props.theme.palette.success};
  }
  .orderStatus_pending {
    background-color: ${props=>props.theme.palette.warning};
  }
  .orderStatus_refunded {
    background-color: ${props=>props.theme.palette.error};
  }
  .orderStatus_partial_refunded {
    background-color: ${props=>props.theme.palette.error};
  }
  .orderStatus_chargebacked {
    background-color: ${props=>props.theme.palette.error};
  }
  .orderShipStatus_none {
  }
  .orderShipStatus_pending {
    background-color: ${props=>props.theme.palette.pending};
  }
  .orderShipStatus_shipped {
    background-color: ${props=>props.theme.palette.success};
  }
  .orderShipStatus_failed {
    background-color: ${props=>props.theme.palette.error};
  }
  .orderShipStatus_cancelled {
    background-color: ${props=>props.theme.palette.error};
  }
  .creditWithdrawRequestStatus_pending {
    background-color: ${props=>props.theme.palette.pending};
  }
  .creditWithdrawRequestStatus_paid {
    background-color: ${props=>props.theme.palette.success};
  }
  .creditWithdrawRequestStatus_rejected {
    background-color: ${props=>props.theme.palette.warning};
  }
  .creditWithdrawRequestStatus_failed {
    background-color: ${props=>props.theme.palette.error};
  }
  .giftTransferHistoryStatus_pending {
    background-color: ${props=>props.theme.palette.pending};
  }
  .giftTransferHistoryStatus_accepted {
    background-color: ${props=>props.theme.palette.success};
  }
  .giftTransferHistoryStatus_cancelled {
    background-color: ${props=>props.theme.palette.error};
  }
  .userBonusStatus_pending {
    background-color: ${props=>props.theme.palette.pending};
  }
  .userBonusStatus_paid {
    background-color: ${props=>props.theme.palette.success};
  }
  .userBonusStatus_rejected {
    background-color: ${props=>props.theme.palette.error};
  }
  .liveStreamStatus_publish {
    background-color: ${props=>props.theme.palette.success};
  }
  .liveStreamStatus_draft {
    
  }
  // .confirmed {
  //   background: #79b779;
  // }
  .active {
    background: #79b779;
  }
  // .resolved {
  //   background: #79b779;
  // }
  .inactive {
    background: #f56b6e;
  }
  // .urgent {
  //   background: #f56b6e;
  // }
  // .resolved {
  //   background: #45b854;
  // }
  // .ended {
  //   background: #f56b6e;
  // }
  // .failed {
  //   background: #f56b6e;
  // }

  // .saved {
  //   background: #1890ff;
  // }
  // .hidden {
  //   background: #f7d250;
  // }
  // .low {
  //   background: #f7d250;
  // }
  // .resolving {
  //   background: #f7d250;
  // }
  // .open {
  //   background: #f7d250;
  // }
  // .success {
  //   background: #79b779;
  // }
  // .resent {
  //   background: #79b779;
  // }
  // .shipped {
  //   background: #45b854;
  // }
  // .refunded {
  //   background: #f7d250;
  // }
  // .partial_refunded {
  //   background: #f7d250;
  // }
  // .cancelled {
  //   background: #f7d250;
  // }
  // .completed {
  //   background: #45b854;
  // }

  // .deleted {
  //   background: #f56b6e;
  // }
  // .requested {
  //   background: #1890ff;
  // }
  // .chargebacked {
  //   background: #1890ff;
  // }
  // .accepted {
  //   background: #45b854;
  // }
  // .rejected {
  //   background: #f56b6e;
  // }
  // .draft {
  //   background: #f56b6e;
  // }
  // .in_progress {
  //   background: #45b854;
  // }
  // .verified {
  //   background: #79b779;
  // }
  // .none {
  //   background: rgba(0, 0, 0, 0.25);
  // }
  // .uploaded {
  //   background: #45b854;
  // }
  // .processed {
  //   background: #45b854;
  // }
  // .unprocessed {
  //   background: #f7d250;
  // }
  // .yes {
  //   background: #f56b6e;
  // }
  // .waiting {
  //   background: #7e6bf5;
  // }
  // .pending {
  //   background: #7e6bf5;
  // }
  // .medium {
  //   background: #7e6bf5;
  // }
  // .paid {
  //   background: #45b854;
  // }
`;

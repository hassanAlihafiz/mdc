import styled from "styled-components";

export const Wrapper = styled.div`
  .main-container {
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .left-section {
      width: calc(100% - 430px);
      display: flex;
      justify-content: center;
      padding: 50px 20px;
      background: #ffffff;
    }
    .left-section .main-content {
      width: 100%;
      max-width: 770px;
    }
    .left-section .ant-picker {
      border-radius: unset;
      height: 40px;
      width: 100%;
    }
    h2 {
      font-weight: 600;
      margin-top: 50px;
      margin-bottom: 50px;
      font-size: 24px;
      color: #232838;
      text-align: center;
    }
    .left-section.checkout-section .btn-primary {
      width: fit-content;
      background: #00b2ff;
      border: none;
      color: #ffffff;
      font-size: 1rem;
      padding: 0.375rem 0.75rem;
      height: 40px;
    }
    .left-section.checkout-section .btn-primary:hover {
      box-shadow: 0 0 0 0.2rem rgb(0 178 255 / 60%) !important;
      opacity: 0.8;
    }
    .left-section.checkout-section .btn-primary {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .left-section.checkout-section .btn-secondary {
      width: fit-content;
    }
    .left-section.checkout-section .user-type-box.affiliate .btn-primary {
      background: transparent;
      border: 2px solid #00b2ff;
      color: #00b2ff;
      font-size: 14px;
      font-weight: 600;
      margin-top: 50px;
    }
    .left-section.checkout-section .user-type-box.customer .btn-primary {
      background: transparent;
      border: 2px solid #3c4356;
      color: #3c4356;
      font-size: 14px;
      font-weight: 600;
      margin-top: 50px;
    }
    .left-section.checkout-section .user-type-box.customer .btn-primary:hover {
      box-shadow: 0 0 0 0.2rem rgb(60 67 86 / 60%) !important;
    }
    .left-section.checkout-section ul {
      list-style: disc;
    }
    .left-section.checkout-section .checkout-form {
      margin-bottom: 30px;
    }
    .left-section.checkout-section .checkout-form .edit {
      display: flex;
      align-items: flex-end;
      margin-bottom: 2px;
    }
    .left-section.checkout-section .checkout-title {
      font-size: 20px;
      color: #00b2ff;
      font-weight: 600;
    }
    .left-section.checkout-section label {
      font-weight: 600;
      margin-top: 12px;
      margin-bottom: 5px;
    }
    .left-section.checkout-section .ant-input {
      width: 100%;
      border-radius: unset;
      height: 40px;
    }
    .left-section.checkout-section .ant-input-affix-wrapper {
      padding: 0 11px;
      border-radius: unset;
    }
    .left-section.checkout-section .ant-input-affix-wrapper input {
      height: 38px;
    }
    .left-section.checkout-section .ant-select {
      width: 100%;
    }
    .left-section.checkout-section .ant-select .ant-select-selector {
      border-radius: unset;
    }
    .left-section.checkout-section .input-error {
      color: #ff4d4f;
      margin-top: 5px;
    }
    /*************** Choose Type Section **************/
    .choose-type-wrapper {
      margin-bottom: 30px;
      height: 700px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .choose-type-wrapper .confirm-change-usertype {
      margin-top: 20px;
      text-align: center;
    }
    .choose-type-wrapper .confirm-change-usertype button {
      width: 100px;
      margin-left: 30px;
    }
    .choose-type-wrapper .checkout-title {
      margin-bottom: 20px;
    }
    .choose-type-wrapper .type-title {
      color: #6C757D;
      font-size: 16px;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 30px;
    }
    .choose-type-wrapper .btn-primary {
      margin-top: 24px;
    }
    .choose-type-wrapper .user-type-box {
      width: 47%;
      max-width: 470px;
      padding: 50px 40px;
      border-radius: 6px;
      margin: 6px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .choose-type-wrapper .user-type-box img {
      width: 60px;
      height: 60px;
    }
    .choose-type-wrapper .user-type-box.affiliate {
      background: #e6f8ff;
    }
    .choose-type-wrapper .user-type-box.customer {
      background: #e5e5e5;
    }
    .choose-type-wrapper .user-type-box h6 {
      margin: 20px 0;
      font-size: 18px;
      font-weight: 600;
      color: #232838;
    }
    .choose-type-wrapper .user-type-box p {
      font-size: 14px;
      color: #3c4356;
    }
    
    /**************** User Information Section **************/
    .left-section.checkout-section .password-visibility {
      cursor: pointer;
    }
    .checkout-form .action-row {
      margin-top: 24px;
    }
    
    /***************** Billing Form Section ***************/
    .checkout-form .bitcoin-description {
      margin-top: 12px;
    }
    .checkout-form .btn-checkout {
      width: 160px;
      margin-left: 12px;
    }
    .checkout-form .btn-checktax {
      width: 200px;
    }
    .checkout-form .agreement {
      margin-top: 12px;
    }
    .checkout-form input[type="checkbox"] {
      width: 18px;
      height: 18px;
      min-width: 18px;
      margin-right: 5px;
    }
    .checkout-form .action-row {
      flex-direction: row !important;
      margin-top: 24px;
    }
    .checkout-form .billing-same-shipping-checkbox {
      margin-top: 12px;
      margin-bottom: 12px;
    }
    .left-section.checkout-section .checkout-form .billing-checkbox {
      display: flex;
      align-items: flex-start;
      margin-top: 12px;
    }
    .left-section.checkout-section .checkout-form .billing-checkbox label {
      display: flex;
      align-items: flex-start;
      margin-top: 0;
    }
    .checkout-form .policy-hyperlink {
      color: #00b2ff;
    }
    .checkout-form .ant-spin-dot {
      font-size: 20px;
    }
    .left-section.checkout-section .checkout-form .edit {
      display: flex;
      align-items: flex-end;
      margin-bottom: 0;
      margin-top: 12px;
    }
    
    /****************** Side Cart *****************/
    .side-cart {
      width: 400px;
      height: 100%;
      background-color: #ffffff;
      z-index: 10;
      display: flex;
      flex-direction: column;
      padding: 50px 20px 10px;
      line-height: 1.5715;
      img {
        max-width: 100%;
      }
      .mobile-close-cart {
        display: none;
        position: absolute;
        top: 30px;
        right: 15px;
        padding: 3px;
      }
      h5 {
        font-size: 20px;
        font-weight: 700;
      }
      .order-notify {
        .ant-alert {
          font-size: 12px;
          border-radius: unset;
          padding: 8px 5px;
          margin: 10px 0 0;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          .ant-alert-icon {
            margin-top: 2px;
          }
          .ant-alert-message {
            color: rgba(0, 0, 0, 0.85);
          }
        }
        .ant-alert-info {
          .ant-alert-icon {
            color: #00B2FF;
          }
        }
        .ant-alert-success {
          background-color: #f6ffed;
          border: 1px solid #b7eb8f;
          .ant-alert-icon {
            color: #52c41a;
            font-size: 14px;
          }
        }
      }
      .order-type {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
  
        h6 {
          font-weight: 600;
          color: #344470;
          margin-bottom: 0px;
          margin-right: 5px;
          white-space: nowrap;
        }
        hr {
          width: 100%;
          margin-left: 50px;
        }
      }
      .order {
        padding: 12px;
        margin: 15px 0;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        display: flex;
        flex-direction: row;
        .order-image {
          width: 90px;
          height: 100%;
        }
        .order-info {
          width: 270px;
          padding-left: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .order-title-remove {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            font-size: 14px;
            font-weight: 600;
            .order-remove {
              width: 20px;
              padding: 5px;
              border: 1px solid #9f9f9f;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
          .order-quantity-price {
            margin-top: 15px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            .order-prices {
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-items: flex-start;
              .price-volume {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                min-width: 86px;
              }
              span {
                font-size: 12px;
                font-weight: 600;
                opacity: 0.6;
              }
            }
            .order-quantity {
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              align-items: center;
              label {
                margin-right: 14px;
                font-weight: 600;
                opacity: 0.6;
                font-size: 12px;
              }
            }
            .ant-input-number {
              width: 70px;
              border-radius: unset;
              .ant-input-number-handler-wrap {
                opacity: 1;
                border-radius: unset;
              }
              .ant-input-number-input {
                border-radius: unset;
              }
            }
          }
          .includes-products {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 12px;
            b {
              font-size: 12px;
              font-weight: 500;
              opacity: 0.6;
            }
            span {
              font-size: 12px;
              font-weight: 500;
              opacity: 0.6;
              margin-left: 10px;
            }
          }
          .total-prices {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin-top: 12px;
            .total-original-price {
              margin-right: 20px;
              b {
                opacity: 0.6;
              }
              strong {
                text-decoration: line-through;
                text-decoration-color: #00b2ff;
              }
            }
          }
        }
      }
      .move-order {
        margin-top: 12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        label {
          font-size: 12px;
          color: #f14705;
          font-weight: 600;
          cursor: pointer;
        }
        label.not-subscription {
          color: #344470;
        }
        .cart-pulse {
          box-shadow: 0 0 0 0 rgb(241 71 5 / 40%);
          animation: cart-pulse 1.5s infinite;
          margin-right: 10px;
          border-radius: 50%;
          width: 5px;
          height: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cart-pulse:hover {
          animation: none;
        }
        @-webkit-keyframes cart-pulse {
          0% {
            -webkit-box-shadow: 0 0 0 0 rgba(241, 71, 5, 0.4);
          }
          70% {
              -webkit-box-shadow: 0 0 0 10px rgba(241, 71, 5, 0);
          }
          100% {
              -webkit-box-shadow: 0 0 0 0 rgba(241, 71, 5, 0);
          }
        }
        @keyframes cart-pulse {
          0% {
            -moz-box-shadow: 0 0 0 0 rgba(241, 71, 5, 0.4);
            box-shadow: 0 0 0 0 rgba(241, 71, 5, 0.4);
          }
          70% {
              -moz-box-shadow: 0 0 0 10px rgba(241, 71, 5, 0);
              box-shadow: 0 0 0 10px rgba(241, 71, 5, 0);
          }
          100% {
              -moz-box-shadow: 0 0 0 0 rgba(241, 71, 5, 0);
              box-shadow: 0 0 0 0 rgba(241, 71, 5, 0);
          }
        }
      }
      .order-details {
        overflow-y: auto;
      }
      .order-summary {
        .order-summary-details {
          padding-bottom: 15px;
          border-bottom: 1px solid #d9d9d9;
          .summary-label-value {
            opacity: 0.5;
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            b {
              text-align: right;
            }
          }
        }
        .order-summary-result {
          padding-top: 15px;
          .order-total-price {
            display: flex;
            justify-content: space-between;
            h6 {
              font-weight: 600;
              font-size: 16px;
            }
          }
        }
        .new-checkout-button {
          width: 100%;
          height: 38px;
          margin: 10px 0;
          padding: 5px;
          border: unset;
          border-radius: 2px;
          font-weight: 600;
          color: #ffffff;
          background: #344470;
        }
      }
    }
    @media (min-width: 240px) and (max-width: 576px) {
      .side-cart {
        width: 300px;
        padding: 30px 10px 10px;
        .mobile-close-cart {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          img {
            padding: 3px;
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
        }
        .order-type {
          h6 {
            margin-right: 10px;
          }
        }
        .order {
          padding: 5px;
          .order-image {
            width: 60px;
          }
          .order-info {
            width: 210px;
            padding-left: 5px;
          }
        }
      }
    }
    
    /****************** Step Bar Section ****************/
    .step-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 64px;
      font-family: 600;
    }
    .step-point {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: #e2e2e2;
      position: relative;
    }
    .step-label {
      position: absolute;
      top: 24px;
      left: 0;
      margin-left: -45px;
      width: 120px;
      text-align: center;
    }
    .step-point:last-child .step-label {
      text-align: left;
    }
    .step-point.active {
      background-color: #00b2ff;
    }
    .step-line {
      width: 100px;
      height: 4px;
      background-color: #e2e2e2;
    }
    .step-line.active {
      background-color: #00b2ff;
    }
    
    /***************** Confirmation ****************/
    
    .wrapper.order-completion {
      width: 100%;
      background: #ffffff;
      display: flex;
      justify-content: center;
      padding: 50px 20px;
    }
    .wrapper.order-completion .result-content {
      width: 100%;
      max-width: 700px;
    }
    .wrapper.order-completion h2 {
      font-size: 24px;
      margin-top: 12px;
    }
    .wrapper.order-completion h4 {
      font-size: 20px;
      margin-top: 24px;
    }
    .wrapper.order-completion .confirmed-img {
      width: 60px; height: 60px;
    }
    .wrapper.order-completion .btn-checkout {
      margin: 0 8px;
    }
    .wrapper.order-completion .order-complete-label {
      text-align: center;
    }
    .wrapper.order-completion .confirm-box {
      border: 1px solid #E2E2E2;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 24px;
      margin: 20px 0;
    }
    .wrapper.order-completion .confirm-box .ant-table-content {
      overflow-x: auto;
    }
    .wrapper.order-completion .confirm-box table {
      white-space: nowrap;
    }
    .wrapper.order-completion .total-price {
      font-size: 16px;
      font-weight: 700;
      color: #000;
    }
    .wrapper.order-completion .btn-checkout {
      width: 180px;
    }
    .wrapper.order-completion .btn-back {
      margin-right: 12px;
    }
    .wrapper.order-completion .checkout-confirm__warning {
      max-width: 68%;
    }
    .confirmed-icon {
      font-size: 40px;
      color: #52c41a;
    }
    .confirmed-icon.bitcoin {
      color: #faad14;
    }
    .confirmed-icon.flagged {
      color: #ff4d4f;
    }
    .btn-back {
      margin-right: 12px;
      background: #d9d9d9;
    }
    
    .order-completion .go-cbo {
      min-width: 168px;
    }

    @media (min-width: 992px) and (max-width: 1220px) {
      .checkout-form .col-lg-6,
      .checkout-form .col-sm-9,
      .checkout-form .col-sm-3 {
        width: 100%;
      }
    }

    @media (min-width: 901px) and (max-width: 991px) {
      .checkout-form .col-sm-9,
      .checkout-form .col-sm-3 {
        width: 100%;
      }
    }

    @media (min-width: 768px) and (max-width: 874px) {
      .checkout-form .col-md-12 {
        width: 50%;
      }
    }
    
    @media (min-width: 1024px) {
      .choose-type-wrapper .choose-type-wrapper > div {
        flex-direction: row;
      }
    }
    @media (max-width: 1220px) {
      .left-section .main-content {
        width: 100%;
      }
      .side-cart {
        width: 300px;
      }
      .left-section {
        width: calc(100% - 330px);
      }
    }
    @media (max-width: 1024px) {
      .choose-type-wrapper .choose-type-wrapper > div {
        align-items: center;
      }
      .user-type-box {
        width: 100%;
      }
      .choose-type-wrapper {
        height: auto;
        margin: 50px 0;
      }
    }
    @media (max-width: 874px) {
      {
        flex-direction: column;
      }
      .side-cart {
        width: 100%;
      }
      .left-section {
        width: 100%;
        flex-direction: column;
        padding: 50px 20px 0 20px;
      }
      .side-cart .order-info {
        width: 100%;
      }
    }
    @media (max-width: 768px) {
      .wrapper.order-completion .confirm-box-2 .d-flex {
        flex-direction: column;
      }
    }
    @media (max-width: 700px) {
      .wrapper.order-completion {
        width: calc(100% - 20px);
        margin-left: 10px;
      }
      .wrapper.order-completion .confirm-box .d-flex {
        flex-direction: column;
      }
    }
    @media (max-width: 575px) {
      .left-section.checkout-section .checkout-form .edit {
        display: flex;
        align-items: flex-end;
        margin-bottom: 0;
        margin-top: 12px;
      }
    }
    @media (max-width: 550px) {
      .step-label {
        width: 102px;
        font-size: 10px;
      }
      .step-point {
        width: 14px;
        height: 14px;
      }
      .step-point:last-child .step-label {
        text-align: center;
      }
    }
    @media (max-width: 480px) {
      .choose-type-wrapper .confirm-change-usertype button {
        margin-left: 0;
        margin-top: 15px;
      }
      .checkout-form .btn-checkout {
        margin-left: 0;
        margin-top: 10px;
      }
      .step-line {
        width: 40px;
      }
    }
    @media screen and (max-width: 350px) {
      .step-label {
        width: 95px;
        font-size: 8px;
      }
    }
  }
`;

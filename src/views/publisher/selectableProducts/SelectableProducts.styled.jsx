import styled from "styled-components";

export const Wrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 5px transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #3849717d;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #3849717d;
  }
  .cart-box {
  }
  .small-products-card {
    background: white;
    box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
    padding: 12px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .small-products-card {
    }
    .product-details {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .label {
        font-weight: 500;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap !important;
        text-overflow: ellipsis;
      }
      .unselect-button {
        button {
          margin-top: 5px;
          width: 100px;
        }
      }
      .select-button {
        button {
          background: #52c41a;
          border-color: #52c41a;
          margin-top: 5px;
          width: 100px;
        }
      }
    }
  }
  @media (max-width: 1460px) {
    .product-details {
      .label {
        font-size: 14px !important;
      }
      .unselect-button {
        button {
          width: 100% !important;
          padding: 0px;
        }
      }
      .select-button {
        button {
          width: 100% !important;
          padding: 0px;
        }
      }
    }
  }
`;

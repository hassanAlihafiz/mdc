import styled from 'styled-components'

export const Wrapper = styled.div`
height: 100%;
  // .ant-btn-primary {
  //   border-color: ${props=>props.theme.palette.primary};
  //   background: ${props=>props.theme.palette.primary};
  // }
  .ant-btn.btn-negative {
    background-color: ${props=>props.theme.palette.error};
    border-color: ${props=>props.theme.palette.error};
  }
  .ant-btn-link {
    background: transparent !important;
    border-color: transparent !important;
    box-shadow: none;
  }
  .ant-btn {
    border-radius: 4px;
    &.ant-btn-background-ghost {
      border: 1px solid ${props=>props.theme.palette.primary};
      border-radius: 4px;
      &:hover{
        color: white;
        background-color: ${props=>props.theme.palette.primary}; !important;
      }
      &.ant-btn-dangerous {
        color: ${props=>props.theme.palette.error};;
        border-color: ${props=>props.theme.palette.error}; !important;
        &:hover{
          color: white;
          background-color: ${props=>props.theme.palette.error}; !important;
        }
      }
      &.ant-btn-success {
        color: ${props=>props.theme.palette.success};;
        border-color: ${props=>props.theme.palette.success}; !important;
        &:hover {
          color: white;
          background-color: ${props=>props.theme.palette.success}; !important;
        }
      }
    }
    .anticon {
      vertical-align: middle;
    }
  }
  .ant-btn-loading-icon {
    padding-right: 10px;
  }
  .ant-input {
    &.has-error {
      border-color: @error-color;
      box-shadow: none;
    }
    span {
      &.error {
        color: @error-color;
      }
    }
  }  
  .ant-select-selector{
    overflow: auto;
  }
`

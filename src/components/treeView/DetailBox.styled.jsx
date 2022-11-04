import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  width: 270px;
  // left: ${props=>props.left?props.left+'px':0};
  // top: ${props=>props.top?props.top+'px':0};
  z-index: 130;

  background: #fff;
  border: 1px solid ${props=>props.theme.palette.border};
  box-sizing: border-box;
  // box-shadow: 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.00843437), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0121168), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.015), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0178832), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0215656), 0px 100px 80px rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  // &:after, &:before {
  //   right: 100%;
  //   top: 40px;
  //   border: solid transparent;
  //   content: " ";
  //   height: 0;
  //   width: 0;
  //   position: absolute;
  //   pointer-events: none;
  // }
  // &:after {
  //   border-color: rgba(255, 255, 255, 0);
  //   border-right-color: #fff;
  //   border-width: 16px;
  //   margin-top: -16px;
  // }
  // &:before {
  //   border-color: rgba(230, 234, 238, 0);
  //   border-right-color: ${props=>props.theme.palette.border};
  //   border-width: 17px;
  //   margin-top: -17px;
  // }
  .headerBar {
    text-align: center;
    padding: 24px 0 11px 0;
  }
  .photo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  .name {
    font-size: 12px;
    margin: 6px 0 4px 0;
  }
  .usernameLabel {
    font-size: 12px;
    color: ${props=>props.theme.palette.secondaryText};
  }
  .username {
    font-size: 12px;
  }
  .userLink {
    margin-top: 3px;
    font-size: 12px;
  }
  table {
    width: 100%;
    padding: 0 10px;
    border-top: 1px solid #f0f0f0;
    th {
      background: #fafafa;
      // border-bottom: 1px solid #f0f0f0;
      font-weight: 500;
      padding: 4px 8px;
      font-size: 12px;
      &:first-child {
        padding-left: 12px;
        // border-right: 1px solid #f0f0f0;
      }
      &:last-child {
        padding-right: 12px;
        text-align: right;
      }
    }
    td {
      // border-bottom: 1px solid #f0f0f0;
      padding: 2px 8px;
      font-size: 12px;
      &:first-child {
        padding-left: 12px;
        // border-right: 1px solid #f0f0f0;
      }
      &:last-child {
        padding-right: 12px;
        text-align: right;
      }
    }
  }
`

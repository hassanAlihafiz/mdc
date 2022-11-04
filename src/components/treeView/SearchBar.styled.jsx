import styled from 'styled-components'

export const Wrapper = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 101;
  width: 100%;
  display: flex;
  justify-content: space-between;
  // padding: 0 40px;
  .searchRoot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 200px;
    position: relative;
  }
  .searchInput {
    width: 100%;
  }
  .searchBtn {
    margin-top: 4px;
    margin-right: 4px;
    width: 90px;
    height: 32px;
    cursor: pointer;
    border-radius: 4px;
  }
  .searchResults {
    position: absolute;
    left: 0;
    top: 34px;
    width: 100%;
    margin-top: 0;
    padding-left: 0;
    background: #fff;
    z-index: 12;
    list-style: none;
    cursor: pointer;
    li {
      background: transparent;
      padding: 8px 8px;
    }
  }
  .descRoot {
    position: absolute;
    right: 40px;
    top: 0px;
    z-index: 101;
    padding: 12px 18px;
    width: 450;
    display: flex;
    // background: #FFFFFF;
    // border: 1px solid #E6EAEE;
    // box-sizing: content-box;
    // border-radius: 6px;
    margin-left: 16px;
    @media(max-width: 480px) {
      margin-left: 0px;
      margin-top: 16px;
    }
  }
  .descBox {
    padding: 6px 12px;
    background: #FFFFFF;
    border: 1px solid #E6EAEE;
    box-sizing: border-box;
    border-radius: 6px;
    display: flex;
    margin-left: 16px;
    align-items: center;
    height: 42px;
  }
  .descTextRoot {
    display: flex;
    align-items: center;
    margin-left: 12px;
    margin-right: 12px;
  }
  .descTextIcon {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .userType1Color {
    background-color: ${props=>props.theme.palette.primary};
  }
  .userType2Color {
    background-color: ${props=>props.theme.palette.secondary};
  }
`

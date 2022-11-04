import styled from 'styled-components'

export const Wrapper = styled.div`
.container {
  width: 110px;
  height: 170px;
  background: #fff;
  border: 1px solid ${props=>props.theme.palette.border};
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 12;
  margin: 0 0;
  position: relative;
  .chat-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}
.emptyContainer {
  width: 110px;
  height: 170px;
  background: transparent;
  border: 1px dashed rgba(53, 64, 82, 0.25);
  box-sizing: border-box;
  border-radius: 8px;
  z-index: 12;
  margin: 0 0;
  overflow: hidden;
}
.coloredTopBorder {
  position: absolute;
  width: 100%;
  height: 5px;
  left: 0;
  top: 0;
  border-radius: 5px 5px 0 0;
  background-color: ${props=>props.theme.palette.primary};
}
.coloredTopBorderForCustomer {
  background-color: ${props=>props.theme.palette.secondary};
}
.showMoreButton {
  width: 20px;
  height: 14px;
  position: absolute;
  bottom: -30px;
  left: calc(50% - 10px);
  cursor: pointer;
  filter: invert(44%) sepia(57%) saturate(2818%) hue-rotate(165deg) brightness(93%) contrast(96%);
}
.searchBackButton {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -30px;
  left: calc(50% - 10px);
  cursor: pointer;
}
.photoWrapper {  
  cursor: pointer;
  width: 60px;
  height: 60px;
  position: relative;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }
}
.statusBadge {
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: lightgrey;
  &.active {
    background-color: ${props=>props.theme.palette.success};
  }
  &.hold {
    background-color: ${props=>props.theme.palette.warning};
  }
  &.suspended {
    background-color: ${props=>props.theme.palette.error};
  }
}
.userRow {
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 12px;
  line-height: 1em;
  padding-left: 10px;
  padding-right: 10px;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.userid {
  text-decoration: underline;
  font-size: 12px;
}
.rankTag {
  min-width: 100% !important;
  padding: 2px 5px;
}
`

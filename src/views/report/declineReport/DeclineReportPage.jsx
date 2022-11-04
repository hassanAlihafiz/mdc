import React, { useState } from "react";
import styled from "styled-components";
import {
  Drawer 
} from 'components/common'
import TableView from './table/TableView'
import CommentDrawer from './drawer/CommentDrawer'

export default function DeclineReportPage() {
  const [selectedUser, setSelectedUser] = useState(undefined)

  return (
    <Wrapper>
      <TableView 
        setSelectedUser={setSelectedUser}
      />
      {selectedUser && 
        <Drawer
          title={null}
          size={"large"}
          placement="right"
          onClose={()=>setSelectedUser(undefined)}
          visible={true}
          className="contant-manager-drawer"
        >
          <CommentDrawer 
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </Drawer>
      }
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  padding-bottom: 20px;
  .username {
    cursor: pointer;
    color: ${props=>props.theme.palette.link};
  }
`;

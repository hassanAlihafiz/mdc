import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Drawer 
} from 'components/common'
import TableView from './table/TableView'
import CommentDrawer from './drawer/CommentDrawer'

export default function ContactManagerPage() {
  const [shouldLoad, setShouldLoad] = useState(true)
  const [selectedUser, setSelectedUser] = useState(undefined)

  return (
    <Wrapper>
      <TableView 
        shouldLoad={shouldLoad}
        setShouldLoad={setShouldLoad}
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
            setShouldLoad={setShouldLoad}
          />
        </Drawer>
      }
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  padding-bottom: 20px;
  .chat-icon {
    margin-left: 6px;
    margin-top: -5px;
    cursor: pointer;
    color: ${props=>props.theme.palette.link};
    font-size: 16px;
  }
  .username {
    cursor: pointer;
    color: ${props=>props.theme.palette.link};
  }
  .subscription-yes {
    color: #3ad33a;
  }
  .subscription-no {
    color: #ff6565;
  }
`;

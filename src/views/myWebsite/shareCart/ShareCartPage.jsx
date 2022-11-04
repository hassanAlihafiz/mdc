import React, { useState } from "react";
import { Row, Col, Alert } from "components/common";
import TableView from "./table/TableView";
import AddModal from './add/AddModal'
import EditModal from './edit/EditModal'
import { Wrapper } from "./ShareCartPage.styled";

export default function ShareCartPage() {
  const [shouldLoad, setShouldLoad] = useState(true)
  const [modalMode, setModalMode] = useState(undefined)
  const [selected, setSelected] = useState(undefined)

  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <Alert type="info" message={<div dangerouslySetInnerHTML={{ __html: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. For questions, please email <a style="color: #1890ff; text-decoration: none" href="mailto:support@mydailychoice.com">support@mydailychoice.com</a>.`}} />} className="replicate-alert" showIcon />
        </Col>
      </Row>
      <TableView 
        shouldLoad={shouldLoad}
        setShouldLoad={setShouldLoad}
        setModalMode={setModalMode}
        setSelected={setSelected}
      />
      {modalMode==='add' && 
        <AddModal
          setModalMode={setModalMode}
          setShouldLoad={setShouldLoad}
        />
      }
      {(modalMode==='edit' && selected) &&
        <EditModal setModalMode={setModalMode}
          selected={selected}
          setShouldLoad={setShouldLoad}
        />
      }
    </Wrapper>
  );
}

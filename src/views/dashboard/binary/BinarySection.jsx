import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Tabs, Card } from "components/common";
import { ReactComponent as BinaryIcon } from "assets/icons/binary-icon.svg";
import { ReactComponent as UnilevelIcon } from "assets/icons/unilevel-icon.svg";
import { ReactComponent as BinaryActiveIcon } from "assets/icons/binary-icon-active.svg";
import { ReactComponent as UnilevelActiveIcon } from "assets/icons/unilevel-icon-active.svg";
import BinaryDiagram from './BinaryDiagram'
import BinaryTable from './BinaryTable'
import UnilevelTable from './UnilevelTable'

export default function BinarySection() {
  const [selectedTab, setSelecetedTab] = useState("binary");

  return (
    <Card>
      <Wrapper>
        <Row gutter={[20, 20]}>
          <Col span={9} className="responsive-binary-qualified">
            <BinaryDiagram />
          </Col>
          <Col span={15} className="responsive-binary-qualified">
            <div className="binary-section">
              <div className="binary-tabs">
                <Tabs
                  activeKey={selectedTab}
                  onChange={(e) => setSelecetedTab(e)}
                >
                  <Tabs.TabPane
                    tab={
                      <span
                        className={
                          selectedTab == "binary" ? "active-tab" : "inactive-tab"
                        }
                      >
                        {selectedTab == "binary" ? (
                          <BinaryActiveIcon />
                        ) : (
                          <BinaryIcon />
                        )}
                        Binary
                      </span>
                    }
                    key="binary"
                  />

                  <Tabs.TabPane
                    tab={
                      <span
                        className={
                          selectedTab == "unilevel"
                            ? "active-tab"
                            : "inactive-tab"
                        }
                      >
                        {selectedTab == "unilevel" ? (
                          <UnilevelActiveIcon />
                        ) : (
                          <UnilevelIcon />
                        )}
                        Unilevel
                      </span>
                    }
                    key="unilevel"
                  />
                </Tabs>
              </div>
              <div className="binary-table">
                {selectedTab === 'unilevel' && 
                  <UnilevelTable />
                }
                {selectedTab === 'binary' && 
                  <BinaryTable />
                }
              </div>
            </div>
          </Col>
        </Row>
      </Wrapper>
    </Card>
  );
}

const Wrapper = styled.div`
  .binary-tabs {
    padding-top: 5px;
    .active-tab {
      font-weight: 600;
      font-size: 14px;
      color: #00b4ee;
      svg {
        margin-right: 15px;
      }
    }
    .inactive-tab {
      font-weight: 500;
      font-size: 14px;
      color: #8f9dae;
      svg {
        margin-right: 15px;
      }
    }
    .ant-tabs-tab {
      padding: 12px 0 9px;
    }
    .ant-tabs-ink-bar {
      background: #00b4ee !important;
    }
  }
  .binary-section {
    border-left: 1px solid #f2f2f2;
    height: 100%;
    padding-left: 20px;
    .binary-table {
      margin-left: -20px;
      margin-right: -20px;
      margin-top: -16px;
      .th {
        background: #f2f2f2;
        font-weight: normal;
        font-size: 14px;
        padding: 10px 15px;
      }
      .td-label {
        font-weight: normal;
        padding: 15px;
        font-size: 14px;
        border-bottom: 1px solid #eff3f6;
      }
      .td {
        font-weight: normal;
        padding: 15px;
        font-size: 14px;
        color: #7f8fa3;
        border-bottom: 1px solid #eff3f6;
      }
    }
  }
  
  @media (max-width: 1045px) {
    .responsive-binary-qualified {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
    .binary-section {
      border-left: none;
      padding-left: 0px;
      padding-bottom: 8px;
    }
  }
  @media (max-width: 550px) {
    .binary-table {
      overflow-x: scroll;
    }
    .responsive-binary-table {
      width: 700px;
      overflow-x: scroll;
    }
  }
`

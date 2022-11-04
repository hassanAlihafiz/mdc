import React, { useState, useEffect } from "react";
import {
  TablePanel,
  Button,
  TinyAreaChart,
  SuccessNotification,
  AddEditModal,
  Popconfirm
} from "components/common";
import { varLabel } from "common/var";
import EditWebsiteModal from "./modal/editWebsiteModal/EditWebsiteModal";
import { callGetApiWithAuth, callDeleteApiWithAuth } from "utils/api";
import styled from "styled-components";

export default function TableView({ reloadData, setReloadData }) {
  const columns = [
    {
      title: "Source",
      dataIndex: "source",
      render: (text) => <span>{text || "-"}</span>,
    },
    {
      title: "Placement User",
      render: (_, record) => (
        <span>
          {record.placement_user?record.placement_user.username: "-"}
        </span>
      ),
    },
    {
      title: "Rotator",
      dataIndex: "leg",
      render: (text) => (
        <span>{text ? varLabel("conversionTrack.leg", text) : "-"}</span>
      ),
    },
    {
      title: "Clicks",
      dataIndex: "total_clicked_cnt",
      render: (text, record) => {
        return (
          <div className="chart-container">
            {text}{" "}
            <TinyAreaChart
              data={
                record?.daily_chart?.length > 0
                  ? [...record?.daily_chart?.map((el) => el.clicked_cnt)]
                  : [0, 0, 0, 0]
              }
            />
          </div>
        );
      },
    },
    {
      title: "Enrollments",
      dataIndex: "total_conversion_cnt",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="action-container">
          {/* <Button
            onClick={() => {
              setEditData(record);
              setActiveEditModal(true);
            }}
          >
            Edit
          </Button> */}
          <Button
            onClick={() => {
              SuccessNotification("Successfully copied to clipboard");
              navigator.clipboard.writeText(
                `${process.env.REACT_APP_CORP_URL}?ref=${record.referer.username}&source=${record.source}&placement_username=${record.placement_user.username}&leg=${varLabel(
                  "conversionTrack.leg",
                  record.leg
                ).toLowerCase()}`
              );
            }}
          >
            Copy Url
          </Button>
          <Popconfirm onConfirm={() => deleteReplicatedWebsite(record.id)}>
            <Button
              loading={isDeleteLoading && id == record.id}
              className="inactive-btn"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const [activeEditModal, setActiveEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTabledata] = useState([]);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [id, setId] = useState(false);

  const deleteReplicatedWebsite = (id_) => {
    setId(id_);
    setIsDeleteLoading(true);
    callDeleteApiWithAuth(
      `my_website/replicated/track/${id_}`,
      onDeleteSuccess,
      onDeleteFail
    );
  };
  const onDeleteSuccess = () => {
    SuccessNotification("Successfully Deleted");
    setIsDeleteLoading(false);
    loadTableData();
  };

  const onDeleteFail = () => {
    setIsDeleteLoading(false);
  };

  const loadTableData = () => {
    setIsLoading(true);
    callGetApiWithAuth(
      "my_website/replicated/tracks",
      onGetTableDataSuccess,
      onGetTableDataFail
    );
  };

  const onGetTableDataSuccess = (data) => {
    setTabledata(data.data);
    setIsLoading(false);
  };

  const onGetTableDataFail = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (reloadData) {
      loadTableData();
      setReloadData(false);
    }
  }, [reloadData]);

  useEffect(() => {
    loadTableData();
  }, []);

  return (
    <Wrapper>
      <div className="table-container">
        <TablePanel
          title={'Replicated Website Traffic'}
          data={tableData}
          loading={isLoading}
          paginationParam={false}
          columns={columns}
        />
      </div>
      {activeEditModal && (
        <AddEditModal
          onClose={() => {
            setActiveEditModal(false);
          }}
          open={activeEditModal}
          width="720px"
          toggle={() => setActiveEditModal(!activeEditModal)}
        >
          <EditWebsiteModal
            loadTableData={loadTableData}
            toggle={setActiveEditModal}
            editData={editData}
          />
        </AddEditModal>
      )}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44, 39, 56, 0.06);
  .active-btn {
    background: #79b779;
    min-width: 100px;
    border-color: #79b779;
  }
  .inactive-btn {
    min-width: 100px;
    border-color: #f56b6e;
    background: #f56b6e;
  }
  .chart-container {
    width: 140px;
    display: flex;
    align-items: center;
  }
  .action-container {
    button {
      min-width: 80px;
      margin-right: 10px;
    }
  }
  @media (max-width: 1250px) {
    .table-container {
      .ant-table {
        overflow-x: scroll;
        .ant-table-container {
          width: 1000px;
        }
      }
    }
  }
`;

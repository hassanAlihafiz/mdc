import { Modal } from "antd";
import styled from "styled-components";
import { asDateTime } from "utils/text";

export default function NotificationDetailModal({ notificationData, handleCloseNotificationDetailModal }) {
  return (
    <Modal
      centered
      closable
      width={600}
      visible={true}
      onCancel={handleCloseNotificationDetailModal}
      footer={null}
    >
      <Wrapper>
        <div className="notification-modal-container">
          <div>
            <h5>{notificationData.title}</h5>
          </div>
          <div>
            <span>{asDateTime(notificationData.created_at)}</span>
          </div>
          <div className="content"
            dangerouslySetInnerHTML={{ __html: notificationData.description }}
          />
        </div>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  .notification-modal-container {
    .content {
      margin-top: 20px;
    }
  }
`;
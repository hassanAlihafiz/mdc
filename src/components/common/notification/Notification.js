import { notification as notification_ } from "antd";

export function notification({ type, ...props }) {
  notification_[type]({
    ...props,
  });
}

export function SuccessNotification(description) {
  notification({
    message: "Success",
    description,
    placement: "bottomLeft",
    type: "success",
  });
}
export function ErrorNotification(description) {
  notification({
    message: "Error",
    description,
    placement: "bottomLeft",
    type: "error",
  });
}
export function InfoNotification(description) {
  notification({
    message: "Info",
    description,
    placement: "bottomLeft",
    type: "info",
  });
}
export function WarningNotification(description) {
  notification({
    message: "Warning",
    description,
    placement: "bottomLeft",
    type: "warning",
  });
}
export function ValidationNotification(description) {
  notification({
    message: "Validation",
    description,
    placement: "bottomLeft",
    type: "warning",
  });
}

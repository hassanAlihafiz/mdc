import { Button as Button0 } from "antd";

export function Button({ ...props }) {
  return (
    <Button0
      type="primary"
      {...props}
      style={{ borderRadius: 2 }}
      className={`${props.success ? "ant-btn-success" : ""} ${props.className}`}
    />
  );
}

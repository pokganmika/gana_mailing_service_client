import { message } from "antd";

export const info = msg => {
  message.info(msg);
};

export const success = msg => {
  message.success(msg);
};

export const error = msg => {
  message.error(msg);
};

export const warning = msg => {
  message.warning(msg);
};

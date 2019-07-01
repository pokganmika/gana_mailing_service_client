import React from "react";
import { useObserver } from "mobx-react-lite";

const SendMailBottom = () => {
  return useObserver(() => (
    <div>SendMailBottom</div>;
  ));
};

export default SendMailBottom;

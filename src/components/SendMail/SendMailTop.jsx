import React from "react";
import { useObserver } from "mobx-react-lite";

const SendMailTop = () => {
  return useObserver(() => (
    <div>SendMailTop</div>;
  ));
};

export default SendMailTop;

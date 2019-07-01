import React from "react";
import { useObserver } from "mobx-react-lite";

const SendMailMid = () => {
  return useObserver(() => (
    <div>SendMailMid</div>;
  ));
};

export default SendMailMid;

import React from "react";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";

const SendLaterList = () => {
  return useObserver(() => <div>SendLaterList Component</div>);
};

export default SendLaterList;

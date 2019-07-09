import React from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";

const MailMid = () => {
  // console.log('::mailbottom::component::state:: ---> : ', toJS(state));
  return useObserver(() => <div>MailMid Component</div>);
};

export default MailMid;

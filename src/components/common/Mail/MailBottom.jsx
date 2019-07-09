import React from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";

const MailBottom = () => {
  // console.log('::mailbottom::component::state:: ---> : ', toJS(state));
  return useObserver(() => <div>MailBottom Component</div>);
};

export default MailBottom;

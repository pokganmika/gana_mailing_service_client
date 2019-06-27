import React from "react";
import { Input } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";

const TestMailBottom = () => {
  return useObserver(() => {
    <div>TestMailBottom Component</div>;
  });
};

export default TestMailBottom;

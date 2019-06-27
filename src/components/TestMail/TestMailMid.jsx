import React from "react";
import { Input } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";

const TestMailMid = () => {
  return useObserver(() => {
    <div>TestMailMid Component</div>;
  });
};

export default TestMailMid;

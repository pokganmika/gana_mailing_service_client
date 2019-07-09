import React from "react";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import axios from "axios";
import styled from "styled-components";

import { PageWrapper } from "../styles/PageWrapper";

const SendLaterList = () => {
  return useObserver(() => (
    <PageWrapper>
      <div>SendLaterList Component</div>
    </PageWrapper>
  ));
};

export default SendLaterList;

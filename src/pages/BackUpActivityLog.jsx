import React, { useEffect } from "react";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import axios from "axios";
import styled from "styled-components";

import { PageWrapper } from "../styles/PageWrapper";

import config from "../config";
const { SERVER_URL } = config();

const ActivityLogInitState = {
  allLog: [],
  emailLog: [],
  subsLog: [],
};

const BackUpActivityLog = () => {
  const state = useLocalStore(() => ActivityLogInitState);

  const target = "http://192.168.0.114";

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios.get(`${SERVER_URL}/log`);
      const result = await axios.get(`${target}/log`);
      state.allLog = result.data;
    };
    fetchData();
  }, []);

  console.log("::BackUpActivityLog.js::state::check:: ---> ", toJS(state));
  return useObserver(() => (
    <ActivityLogWrapper>
      <div>
        {state.allLog.map((log, i) => (
          <div key={i} value={log.operName}>
            {log.operName}
          </div>
        ))}
      </div>
    </ActivityLogWrapper>
  ));
};
// const BackUpActivityLog = () => {
//   return <ActivityLogWrapper>Activity Log</ActivityLogWrapper>;
// };

const ActivityLogWrapper = styled(PageWrapper)``;

export default BackUpActivityLog;

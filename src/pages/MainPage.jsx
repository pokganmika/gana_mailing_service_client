import React, { useEffect } from "react";
import axios from "axios";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import { PageWrapper } from "../styles/PageWrapper";

import config from "../config";
const { SERVER_URL } = config();

const MainPageInitState = {
  mailData: [],
  dbData: {
    subsCount: "",
    unSunbCount: "",
    totalCount: "",
  },
};

const MainPage = props => {
  const state = useLocalStore(() => MainPageInitState);

  useEffect(() => {
    const fetchData = async () => {
      const mailResult = await axios.get(`${SERVER_URL}/main`);
      const dbResult = await axios.get(`${SERVER_URL}/subscribe/main`);
      console.log("::mainPage::mailResult:: ---> : ", mailResult.data.body);
      console.log("::mainPage::dbResult:: ---> : ", dbResult.data);
      state.mailData = mailResult.data.body;
      state.dbData.totalCount = dbResult.data.scannedCount;
    };
    fetchData();
  }, []);

  console.log(toJS(state));

  return useObserver(() => (
    <MainPageWrapper>
      <div className="db-status">
        <div>DB status</div>
        {state.dbData.totalCount ? (
          <div>
            {state.dbData.subsCount} / {state.dbData.totalCount}
          </div>
        ) : (
          <div className="main-spinner">
            <Loader type="Oval" color="blue" height="100" width="100" />
          </div>
        )}
      </div>

      <div className="mail-status">
        {state.mailData.length !== 0 ? (
          <>
            <div className="mail-status-child">Weekly</div>
            <div className="mail-status-child">Monthly</div>
          </>
        ) : (
          <div className="main-spinner">
            <Loader type="Oval" color="blue" height="100" width="100" />
          </div>
        )}
      </div>
    </MainPageWrapper>
  ));
};

const MainPageWrapper = styled(PageWrapper)`
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  .main-spinner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .db-status {
    width: 95%;
    height: 30%;
    border: 1px solid green;
  }
  .mail-status {
    width: 95%;
    height: 65%;
    border: 1px solid blue;
    .mail-status-child {
      width: 100%;
      height: 50%;
      border: 1px solid black;
    }
  }
  border: 1px solid red;
`;

export default MainPage;

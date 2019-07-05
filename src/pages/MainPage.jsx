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
  mailWeeklyData: null,
  mailMonthlyData: null,
  dbData: null,
};

const MainPage = props => {
  const state = useLocalStore(() => MainPageInitState);

  useEffect(() => {
    const fetchData = async () => {
      const mailWeeklyResult = await axios.get(`${SERVER_URL}/main/weekly`);
      const mailMonthlyResult = await axios.get(`${SERVER_URL}/main/monthly`);
      const dbResult = await axios.get(`${SERVER_URL}/subscribe/main`);
      console.log("::mainPage::mailWeeklyResult:: ---> : ", mailWeeklyResult);
      console.log("::mainPage::mailMonthlyResult:: ---> : ", mailMonthlyResult);
      console.log("::mainPage::dbResult:: ---> : ", dbResult.data);
      state.dbData = dbResult.data;
      state.mailWeeklyData = mailWeeklyResult.data[0].stats[0].metrics;
      state.mailMonthlyData = mailMonthlyResult.data[0].stats[0].metrics;
    };
    fetchData();
  }, []);

  console.log(toJS(state));

  return useObserver(() => (
    <MainPageWrapper>
      <div className="db-status">
        <h3>Subscriber Data</h3>
        {state.dbData !== null ? (
          <div>
            {state.dbData.subsCount} / {state.dbData.scannedCount}
          </div>
        ) : (
          <div className="main-spinner">
            <Loader type="Oval" color="blue" height="100" width="100" />
          </div>
        )}
      </div>

      <div className="mail-status">
        {state.mailWeeklyData !== null && state.mailMonthlyData !== null ? (
          <>
            <div className="mail-status-child">
              <h3>Weekly Mail Data</h3>
              <div className="mail-data">
                <div>bounces : {state.mailWeeklyData.bounces}</div>
                <div>clicks : {state.mailWeeklyData.clicks}</div>
                <div>delivered : {state.mailWeeklyData.delivered}</div>
                <div>
                  invalide_emails : {state.mailWeeklyData.invalide_emails}
                </div>
                <div>opens : {state.mailWeeklyData.opens}</div>
                {/* <div>processed : {state.mailWeeklyData.processed}</div> */}
                {/* <div>requests : {state.mailWeeklyData.requests}</div> */}
                <div>spam_reports : {state.mailWeeklyData.spam_reports}</div>
                <div>unsubscribes : {state.mailWeeklyData.unsubscribes}</div>
              </div>
            </div>
            <div className="mail-status-child">
              <h3>Monthly Mail Data</h3>
              <div className="mail-data">
                <div>bounces : {state.mailMonthlyData.bounces}</div>
                <div>clicks : {state.mailMonthlyData.clicks}</div>
                <div>delivered : {state.mailMonthlyData.delivered}</div>
                <div>
                  invalide_emails : {state.mailMonthlyData.invalide_emails}
                </div>
                <div>opens : {state.mailMonthlyData.opens}</div>
                {/* <div>processed : {state.mailMonthlyData.processed}</div> */}
                {/* <div>requests : {state.mailMonthlyData.requests}</div> */}
                <div>spam_reports : {state.mailMonthlyData.spam_reports}</div>
                <div>unsubscribes : {state.mailMonthlyData.unsubscribes}</div>
              </div>
            </div>
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
      .mail-data {
        width: 100%;
        height: 35%;
        display: flex;
        flex-flow: wrap;
        div {
          margin: 1em;
          border: 1px solid orange;
        }
      }
    }
  }
  border: 1px solid red;
`;

export default MainPage;

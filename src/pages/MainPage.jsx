import React, { useEffect } from "react";
import axios from "axios";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import { PageWrapper } from "../styles/PageWrapper";
import { MainPageInitState } from "../components/MainPage";
import Card from "../components/common/Card";

import config from "../config";
const { SERVER_URL } = config();

const MainPage = props => {
  const state = useLocalStore(() => MainPageInitState);

  useEffect(() => {
    const fetchData = async () => {
      const mailWeeklyResult = await axios.get(`${SERVER_URL}/main/weekly`);
      const mailMonthlyResult = await axios.get(`${SERVER_URL}/main/monthly`);
      const dbResult = await axios.get(`${SERVER_URL}/subscribe/main`);
      state.dbData = dbResult.data;
      state.mailWeeklyData = mailWeeklyResult.data[0].stats[0].metrics;
      state.mailMonthlyData = mailMonthlyResult.data[0].stats[0].metrics;
    };
    fetchData();
  }, []);

  console.log("::MainPage::state:: ---> : ", toJS(state));

  return useObserver(() => (
    <MainPageWrapper>
      <div className="db-status">
        <h2>Subscriber Data</h2>
        {state.dbData !== null ? (
          <div
            style={{
              width: "30%",
              marginLeft: "1em",
              borderRadius: "15px",
              backgroundColor: "#f1f2f6",
              boxShadow: "0 0 20px -3px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                width: "100%",
                padding: "1em 0 0 1em",
                fontSize: "3em",
                fontWeight: "bold",
              }}
            >
              {`${state.dbData.subsCount} / ${state.dbData.scannedCount}`}
            </div>
            <div
              style={{
                width: "100%",
                padding: "1em 0 1em 2em",
                fontWeight: "bold",
              }}
            >{`( Subscriber / Total )`}</div>
          </div>
        ) : (
          <div className="main-spinner">
            <Loader type="Oval" color="#1B9CFC" height="100" width="100" />
          </div>
        )}
      </div>

      <div className="mail-status">
        {state.mailWeeklyData !== null && state.mailMonthlyData !== null ? (
          <>
            <div className="mail-status-child">
              <h2>Weekly Mail Data</h2>
              <div className="mail-data">
                <Card title={"REQUESTS"} data={state.mailWeeklyData.requests} />
                <Card
                  title={"DELIVERED"}
                  data={state.mailWeeklyData.delivered}
                  per={
                    state.mailWeeklyData.delivered /
                    state.mailWeeklyData.requests
                  }
                />
                <Card
                  title={"OPEND"}
                  data={state.mailWeeklyData.opens}
                  per={
                    state.mailWeeklyData.opens / state.mailWeeklyData.requests
                  }
                />
                <Card
                  title={"CLICKED"}
                  data={state.mailWeeklyData.clicks}
                  per={
                    state.mailWeeklyData.clicks / state.mailWeeklyData.requests
                  }
                />
                <Card
                  title={"BOUNCES"}
                  data={state.mailWeeklyData.bounces}
                  per={
                    state.mailWeeklyData.bounces / state.mailWeeklyData.requests
                  }
                />
                <Card
                  title={"SPAM REPORTS"}
                  data={state.mailWeeklyData.spam_reports}
                  per={
                    state.mailWeeklyData.spam_reports /
                    state.mailWeeklyData.requests
                  }
                />
                <Card
                  title={"UNSUBSCRIBED"}
                  data={state.mailWeeklyData.unsubscribes}
                  per={
                    state.mailWeeklyData.unsubscribes /
                    state.mailWeeklyData.requests
                  }
                />
              </div>
            </div>

            <div className="mail-status-child">
              <h2>Monthly Mail Data</h2>
              <div className="mail-data">
                <Card
                  title={"REQUESTS"}
                  data={state.mailMonthlyData.requests}
                />
                <Card
                  title={"DELIVERED"}
                  data={state.mailMonthlyData.delivered}
                  per={
                    state.mailMonthlyData.delivered /
                    state.mailMonthlyData.requests
                  }
                />
                <Card
                  title={"OPEND"}
                  data={state.mailMonthlyData.opens}
                  per={
                    state.mailMonthlyData.opens / state.mailMonthlyData.requests
                  }
                />
                <Card
                  title={"CLICKED"}
                  data={state.mailMonthlyData.clicks}
                  per={
                    state.mailMonthlyData.clicks /
                    state.mailMonthlyData.requests
                  }
                />
                <Card
                  title={"BOUNCES"}
                  data={state.mailMonthlyData.bounces}
                  per={
                    state.mailMonthlyData.bounces /
                    state.mailMonthlyData.requests
                  }
                />
                <Card
                  title={"SPAM REPORTS"}
                  data={state.mailMonthlyData.spam_reports}
                  per={
                    state.mailMonthlyData.spam_reports /
                    state.mailMonthlyData.requests
                  }
                />
                <Card
                  title={"UNSUBSCRIBED"}
                  data={state.mailMonthlyData.unsubscribes}
                  per={
                    state.mailMonthlyData.unsubscribes /
                    state.mailMonthlyData.requests
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <div className="main-spinner">
            <Loader type="Oval" color="#1B9CFC" height="100" width="100" />
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
    height: 25%;
    border: 1px solid green;
  }
  .mail-status {
    width: 95%;
    height: 70%;
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
        /* div {
          margin: 1em;
          border: 1px solid orange;
        } */
      }
    }
  }
  border: 1px solid red;
`;

export default MainPage;

import React, { useEffect } from "react";
import axios from "axios";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { Card as ACard } from "antd";

import { PageWrapper } from "../styles/PageWrapper";
import { MainPageInitState } from "../components/MainPage";
import { dataPerCalc } from "../service/dataService";
import MainCard from "../components/common/MainCard";
import Card from "../components/common/Card";

import config from "../config";
const { SERVER_URL } = config();

const MainPage = props => {
  const state = useLocalStore(() => MainPageInitState);

  useEffect(() => {
    const fetchData = async () => {
      // ===== with try catch =====
      try {
        const mailWeeklyResult = await axios.get(`${SERVER_URL}/main/weekly`);
        const mailMonthlyResult = await axios.get(`${SERVER_URL}/main/monthly`);
        const dbResult = await axios.get(`${SERVER_URL}/subscribe/main`);

        state.dbData = dbResult.data;
        state.mailWeeklyData = mailWeeklyResult.data[0].stats[0].metrics;
        state.mailMonthlyData = mailMonthlyResult.data[0].stats[0].metrics;

        setTimeout(() => {
          if (!mailWeeklyResult) {
            state.mailWeeklyData = false;
          }
          if (!mailMonthlyResult) {
            state.mailMonthlyData = false;
          }
          if (!dbResult) {
            state.dbData = false;
          }
        }, 5000);

        console.log("::mainpage::mailweeklyresult:: ---> : ", mailWeeklyResult);
        console.log(
          "::mainpage::mailmonthlyresult:: ---> : ",
          mailMonthlyResult,
        );
        console.log("::mainpage::dbresult:: ---> : ", dbResult);
      } catch (err) {
        console.log("error : ", err);
      }
      // ===== without try catch =====
      // const mailWeeklyResult = await axios.get(`${SERVER_URL}/main/weekly`);
      // const mailMonthlyResult = await axios.get(`${SERVER_URL}/main/monthly`);
      // const dbResult = await axios.get(`${SERVER_URL}/subscribe/main`);
      // state.dbData = dbResult.data;
      // state.mailWeeklyData = mailWeeklyResult.data[0].stats[0].metrics;
      // state.mailMonthlyData = mailMonthlyResult.data[0].stats[0].metrics;
      // console.log("::mainpage::mailweeklyresult:: ---> : ", mailWeeklyResult);
      // console.log("::mainpage::mailmonthlyresult:: ---> : ", mailMonthlyResult);
      // console.log("::mainpage::dbresult:: ---> : ", dbResult);
      // ===== then catch =====
      // await axios
      //   .get(`${SERVER_URL}/main/weekly`)
      //   .then(data => {
      //     // state.mailWeeklyData = data.data[0].stats[0].metrics;
      //     console.log("::data::check::weekly::", data);
      //   })
      //   .catch(err =>
      //     console.log("::mainpage::weekly::data::error:: ---> : ", err),
      //   );
      // await axios
      //   .get(`${SERVER_URL}/main/monthly`)
      //   .then(data => {
      //     state.mailMonthlyData = data.data[0].stats[0].metrics;
      //     console.log("::data::check::monthly::", data);
      //   })
      //   .catch(err =>
      //     console.log("::mainpage::monthly::data::error:: ---> : ", err),
      //   );
      // await axios
      //   .get(`${SERVER_URL}/subscribe/main`)
      //   .then(data => {
      //     state.dbData = data.data;
      //     console.log("::data::check::subscriber::", data);
      //   })
      //   .catch(err =>
      //     console.log("::mainpage::subscriber::data::error:: ---> : ", err),
      //   );
    };

    fetchData();
  }, []);

  console.log("::MainPage::state:: ---> : ", toJS(state));
  return useObserver(() => (
    <MainPageWrapper>
      <div className="db-status">
        <h2>Subscriber Data</h2>

        {state.dbData !== null ? (
          <div className="db-status-card-wrapper">
            <div className="db-status-card">
              <ACard title="Total User" bordered={false}>
                <p>{state.dbData.scannedCount}</p>
              </ACard>
            </div>

            <div className="db-status-card">
              <ACard title="Subscriber" bordered={false}>
                <p>{state.dbData.subsCount}</p>
              </ACard>
            </div>

            <div className="db-status-card">
              <ACard title="Unsubscriber" bordered={false}>
                <p>{state.dbData.scannedCount - state.dbData.subsCount}</p>
              </ACard>
            </div>

            <div className="db-status-card">
              <ACard title="Avg. Subscribe Rate" bordered={false}>
                <p>{`${(state.dbData.subsCount / state.dbData.scannedCount).toFixed(2) *
                  100} %`}</p>
              </ACard>
            </div>
          </div>
        ) : (
          <div className="main-spinner">
            <Loader type="Oval" color="#1B9CFC" height="70" width="70" />
          </div>
        )}
      </div>

      {/** TODO: Add percent data in card (Need refactoring) */}
      <div className="mail-status">
        <div className="mail-status-child">
          <h2>Weekly Mail Data</h2>

          {state.mailWeeklyData ? (
            <div className="mail-status-card-wrapper">
              <div className="mail-status-card">
                <ACard title="REQUESTS" bordered={false}>
                  <p>{state.mailWeeklyData.requests}</p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="DELIVERED" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailWeeklyData.delivered,
                      state.mailWeeklyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="OPENED" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailWeeklyData.opens,
                      state.mailWeeklyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="CLICKED" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailWeeklyData.clicks,
                      state.mailWeeklyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="BOUNCES" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailWeeklyData.bounces,
                      state.mailWeeklyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="SPAM REPORTS" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailWeeklyData.spam_reports,
                      state.mailWeeklyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="UNSUBSCRIBED" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailWeeklyData.unsubscribes,
                      state.mailWeeklyData.requests,
                    )}
                  </p>
                </ACard>
              </div>
            </div>
          ) : (
            <>
              {state.mailWeeklyData === false ? (
                <div>No Data</div>
              ) : (
                <div className="main-spinner">
                  <Loader type="Oval" color="#1B9CFC" height="70" width="70" />
                </div>
              )}
            </>
          )}
        </div>

        <div className="mail-status-child">
          <h2>Monthly Mail Data</h2>
          {state.mailMonthlyData ? (
            <div className="mail-status-card-wrapper">
              <div className="mail-status-card">
                <ACard title="REQUESTS" bordered={false}>
                  <p>{state.mailMonthlyData.requests}</p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="DELIVERED" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailMonthlyData.delivered,
                      state.mailMonthlyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="OPENED" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailMonthlyData.opens,
                      state.mailMonthlyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="CLICKED" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailMonthlyData.clicks,
                      state.mailMonthlyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="BOUNCES" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailMonthlyData.bounces,
                      state.mailMonthlyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="SPAM REPORTS" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailMonthlyData.spam_reports,
                      state.mailMonthlyData.requests,
                    )}
                  </p>
                </ACard>
              </div>

              <div className="mail-status-card">
                <ACard title="UNSUBSCRIBED" bordered={false}>
                  <p>
                    {dataPerCalc(
                      state.mailMonthlyData.unsubscribes,
                      state.mailMonthlyData.requests,
                    )}
                  </p>
                </ACard>
              </div>
            </div>
          ) : (
            <>
              {state.mailMonthlyData === false ? (
                <div>No Data</div>
              ) : (
                <div className="main-spinner">
                  <Loader type="Oval" color="#1B9CFC" height="70" width="70" />
                </div>
              )}
            </>
          )}
        </div>
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
    padding: 1.5em;
    /* box-shadow: 0 0 20px -3px rgba(0, 0, 0, 0.1); */
    .db-status-card-wrapper {
      width: 100%;
      display: flex;
      /* justify-content: space-between; */
      .db-status-card {
        width: 100%;
        margin-right: 1em;
        margin-left: 1em;
        padding-bottom: 0;
        p {
          font-weight: bold;
          font-size: 1.8em;
          text-align: center;
          margin-bottom: 0;
        }
      }
    }
  }

  .mail-status {
    width: 95%;
    height: 70%;
    /* box-shadow: 0 0 20px -3px rgba(0, 0, 0, 0.1); */
    padding: 1.5em;
    .mail-status-child {
      width: 100%;
      height: 50%;
      .mail-status-card-wrapper {
        width: 100%;
        display: flex;
        /* justify-content: space-between; */
        /* flex-flow: row wrap; */
        .mail-status-card {
          width: 100%;
          margin: 1em;
          padding-bottom: 0;
          p {
            font-weight: bold;
            font-size: 1.8em;
            text-align: center;
            margin-bottom: 0;
          }
        }
      }
    }
  }
`;

export default MainPage;

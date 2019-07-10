import React, { useEffect } from "react";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import { Card } from "antd";
import { Button as MButton } from "@material-ui/core";
import Loader from "react-loader-spinner";

import { SendLaterInitState } from "../components/SendLaterList";
import { PageWrapper } from "../styles/PageWrapper";
import { success, error } from "../service/messageService";

import config from "../config";
const { SERVER_URL } = config();

const SendLaterList = () => {
  const state = useLocalStore(() => SendLaterInitState);

  useEffect(() => {
    const fetchData = async () => {
      const listData = await axios.get(`${SERVER_URL}/mailedit`);
      state.list = listData.data;
    };
    fetchData();
  }, []);

  const onSubmitRepend = async () => {
    await axios
      .post(`${SERVER_URL}/mailedit/`)
      .then(result => {
        console.log(result);
        success();
      })
      .catch(err => {
        console.log(err);
        error();
      });
  };

  const onSubmitPause = async () => {
    await axios
      .post(`${SERVER_URL}/mailedit/`)
      .then(result => {
        console.log(result);
        success();
      })
      .catch(err => {
        console.log(err);
        error();
      });
  };

  const onSubmitCancel = async () => {
    await axios
      .post(`${SERVER_URL}/mailedit/`)
      .then(result => {
        console.log(result);
        success();
      })
      .catch(err => {
        console.log(err);
        error();
      });
  };

  console.log("::sendlaterlist::page::state:: ---> : ", toJS(state));
  return useObserver(() => (
    <ListPageWrapper>
      <h2 style={{ width: "100%" }}>Send Later List</h2>

      {state.list.length !== 0 ? (
        state.list.map((e, i) => (
          <Card
            className="card-wrapper"
            title={e.emailTitle}
            bordered={false}
            key={i}
            style={{ margin: "1em" }}
          >
            <div className="card-inner-wrapper">
              <div className="list-contents">
                <p
                  className={
                    e.status === "Pending"
                      ? "list-green"
                      : e.status === "Pause"
                      ? "list-orange"
                      : "list-red"
                  }
                >
                  {e.status}
                </p>
                <div>
                  SCHEDULED TIME :{" "}
                  {`${moment
                    .unix(e.scheduledTime / 1000)
                    .format("MMMM Do YYYY, h:mm:ss a")} (${moment
                    .unix(e.scheduledTime / 1000)
                    .fromNow()})`}
                </div>
                <p>SENDING TIME : {e.time}</p>
                <p>
                  BATCH ID : {e.batchId}
                  {/** TODO: batch_id를 보여줘야 되나? */}
                </p>
              </div>

              <div className="list-buttons">
                {e.status === "Pause" && (
                  <MButton
                    className="list-button"
                    variant="outlined"
                    color="primary"
                    style={{
                      borderColor: "green",
                      color: "green",
                    }}
                  >
                    Repend
                  </MButton>
                )}

                {e.status === "Pending" && (
                  <MButton
                    className="list-button"
                    variant="outlined"
                    color="primary"
                    style={{
                      borderColor: "orange",
                      color: "orange",
                    }}
                  >
                    Pause
                  </MButton>
                )}

                {e.status !== "Cancel" && (
                  <MButton
                    className="list-button"
                    variant="outlined"
                    color="primary"
                    style={{ borderColor: "red", color: "red" }}
                  >
                    Cancel
                  </MButton>
                )}
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="list-spinner">
          {/* TODO: NoData after setTimeout 5000  */}
          <Loader type="Oval" color="#1B9CFC" height="100" width="100" />
        </div>
      )}
    </ListPageWrapper>
  ));
};

const ListPageWrapper = styled(PageWrapper)`
  .card-wrapper {
    width: 100%;
  }

  .card-inner-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .list-contents {
  }
  .list-buttons {
    display: flex;
    flex-flow: wrap column;
    .list-button {
      margin: 0.5em;
    }
  }

  .list-spinner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-green {
    color: green;
    font-weight: bold;
  }
  .list-orange {
    color: orange;
    font-weight: bold;
  }
  .list-red {
    color: red;
    font-weight: bold;
  }
`;

export default SendLaterList;

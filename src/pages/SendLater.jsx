import React from "react";
import axios from "axios";
import styled from "styled-components";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { Button as MButton } from "@material-ui/core";
// antd
import { Divider } from "antd";
// import { Button as AButton, Input, Divider, Select, Switch } from "antd";
// const { TextArea } = Input;
// const { Option } = Select;
// const InputGroup = Input.Group;

import { MailWrapper } from "../styles/MailWrapper";
import {
  SendLaterInitState,
  selector,
  timeTable,
  SendLaterTop,
  SendLaterMid,
  SendLaterBottom,
} from "../components/SendLater";
import { error } from "../service/messageService";

import config from "../config";
const { SERVER_URL } = config();

const SendLater = () => {
  const state = useLocalStore(() => SendLaterInitState);
  const setInputFieldChange = e => {
    state.field[e.target.id] = e.target.value;
  };
  const setInputTempChange = e => {
    state.temp[e.target.id] = e.target.value;
  };
  //TODO: blur check!
  // const blurCheck = () => {
  //   state.validate[e.target.id] = !state.validate[e.target.id];
  // };
  const onSubmit = async state => {
    const {
      emailTitle,
      mainTitle,
      detailTitleEng,
      textEng,
      detailTitleKor,
      textKor,
      time: { month, day, hour },
    } = state.field;
    if (!month || !day || !hour) {
      error("MONTH and DAY, HOUR are absolutely necessary.");
      return;
    } else if (
      !emailTitle ||
      !mainTitle ||
      !detailTitleEng ||
      !textEng ||
      !detailTitleKor ||
      !textKor
    ) {
      error("Please fill the text filed");
      return;
    } else {
      const data = state.field;
      console.log("check::this::-second::check-:: -----> : ", toJS(data));
      await axios
        .post(`${SERVER_URL}/sendmail/sendlater`, data)
        .then(res => console.log("res : ", res))
        .catch(err => console.log("err : ", err));
    }
  };

  // console.log("SendLater.jsx -> state : ", JSON.stringify(state));
  console.log("SendLater.jsx -> state : ", toJS(state));
  console.log("SendLater.jsx -> timeTable : ", timeTable);

  return useObserver(() => (
    <SendLaterPage>
      <h2 style={{ width: "100%" }}>Send Later</h2>

      <SendLaterTop
        state={state}
        setInputFieldChange={setInputFieldChange}
        timeTable={timeTable}
      />

      <Divider />

      <SendLaterMid state={state} setInputFieldChange={setInputFieldChange} />

      <Divider />

      <SendLaterBottom
        state={state}
        selector={selector}
        setInputFieldChange={setInputFieldChange}
        setInputTempChange={setInputTempChange}
      />

      <div className="mail-buttons">
        <MButton
          variant="outlined"
          color="primary"
          className="mail-button"
          onClick={e => {
            e.preventDefault();
            onSubmit(state);
          }}
        >
          Send
        </MButton>
      </div>
    </SendLaterPage>
  ));
};

const SendLaterPage = styled(MailWrapper)`
  .time-input {
    margin: 1em 1em 1em 0;
  }
  .time-input-select {
    width: 100%;
    margin: 1em;
  }
  .time-input-select-last {
    width: 100%;
    margin: 1em 0 1em 1em;
  }
`;

export default SendLater;

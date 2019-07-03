import React from "react";
import axios from "axios";
// import styled from "styled-components";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { Button as MButton } from "@material-ui/core";
// antd
import { Divider } from "antd";
// import { Button as AButton, Input, Divider, Select, Switch } from "antd";
// const { TextArea } = Input;
// const { Option } = Select;
// const InputGroup = Input.Group;

import { isCorrectEmail } from "../service/validateService";
import { MailWrapper } from "../styles/MailWrapper";
import {
  TestMailInitState,
  selector,
  TestMailTop,
  TestMailMid,
  TestMailBottom,
} from "../components/TestMail";

import config from "../config";
const { SERVER_URL } = config();

const TestMail = () => {
  const state = useLocalStore(() => TestMailInitState);
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
    const data = state.field;
    console.log("check::this::-second::check-:: -----> : ", toJS(data));
    await axios
      .post(`${SERVER_URL}/sendmail/test`, data)
      .then(res => console.log("res : ", res))
      .catch(err => console.log("err : ", err));
    // .post(`${SERVER_URL}/sendmail/test`, data)
  };

  // console.log("TestMail.jsx -> state : ", JSON.stringify(state));
  console.log("TestMail.jsx -> state : ", toJS(state));

  return useObserver(() => (
    <MailWrapper>
      <h2 style={{ width: "100%" }}>Test Mail</h2>

      <TestMailTop
        state={state}
        setInputFieldChange={setInputFieldChange}
        isCorrectEmail={isCorrectEmail}
      />

      <Divider />

      <TestMailMid state={state} setInputFieldChange={setInputFieldChange} />

      <Divider />

      <TestMailBottom
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
    </MailWrapper>
  ));
};

export default TestMail;

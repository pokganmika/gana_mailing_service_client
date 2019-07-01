import React from "react";
import axios from "axios";
import styled from "styled-components";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { Button as MButton } from "@material-ui/core";
// antd
import { Button as AButton, Input, Divider, Select, Switch } from "antd";
const { TextArea } = Input;
const { Option } = Select;
const InputGroup = Input.Group;

import { isCorrectEmail } from "../service/validateService";
import { PageWrapper } from "../styles/PageWrapper";
import {
  TestMailInitState,
  selector,
  TestMailTop,
  TestMailMid,
  TestMailBottom,
} from "../components/TestMail";
// import TestMailTop from "../components/TestMail/TestMailTop";
// import TestMailMid from "../components/TestMail/TestMailMid";
// import TestMailBottom from "../components/TestMail/TestMailBottom";

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
      .post(`http://192.168.0.114/sendmail/test`, data)
      .then(res => console.log("res : ", res))
      .catch(err => console.log("err : ", err));
    // .post(`${SERVER_URL}/sendmail/test`, data)
  };

  // console.log("TestMail.jsx -> state : ", JSON.stringify(state));
  console.log("TestMail.jsx -> state : ", toJS(state));

  return useObserver(() => (
    <TestMailPage>
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
    </TestMailPage>
  ));
};

const TestMailPage = styled(PageWrapper)`
  .email-input {
    margin-top: 0.7em;
    margin-bottom: 0.7em;
  }
  .mail-buttons {
    width: 100%;
    margin: 1em;
    display: flex;
    justify-content: flex-end;
  }

  .email-top {
    width: 100%;
    display: flex;
  }
  .email-top-inner {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .email-mid {
    width: 100%;
    display: flex;
  }
  .email-mid-inner {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .email-bottom {
    width: 100%;
    display: flex;
  }
  .email-bottom-inner {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .link-list {
    border-radius: 10px;
    margin: 0.5em;
    background-color: #f1f2f6;
    box-shadow: 0 0 20px -3px rgba(0, 0, 0, 0.2);
    width: 100%;
    display: flex;
    justify-content: space-between;
    div {
      width: 100%;
      font-weight: bold;
    }
  }
  .link-list-element {
    margin: 1em;
  }
  .list-card {
    font-weight: bold;
    border-radius: 10px;
    background-color: #dfe4ea;
    max-width: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;
  }
`;

export default TestMail;

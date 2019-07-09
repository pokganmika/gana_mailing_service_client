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

import { MailWrapper } from "../styles/MailWrapper";
import {
  SendMailInitState,
  selector,
  SendMailTop,
  SendMailMid,
  SendMailBottom,
} from "../components/SendMail";
import { MailMid, MailBottom } from "../components/common/Mail";
import { error } from "../service/messageService";

import config from "../config";
const { SERVER_URL } = config();

const SendMail = () => {
  const state = useLocalStore(() => SendMailInitState);
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
    } = state.field;

    if (
      !emailTitle ||
      !mainTitle ||
      !detailTitleEng ||
      !detailTitleKor ||
      !textEng ||
      !textKor
    ) {
      error("Please fill the text filed");
      return;
    } else {
      const data = state.field;
      console.log("check::this::-second::check-:: -----> : ", toJS(data));
      await axios
        .post(`${SERVER_URL}/sendmail`, data)
        .then(res => console.log("res : ", res))
        .catch(err => console.log("err : ", err));
    }
  };

  // console.log("SendMail.jsx -> state : ", JSON.stringify(state));
  console.log("SendMail.jsx -> state : ", toJS(state));

  return useObserver(() => (
    <MailWrapper>
      <h2 style={{ width: "100%" }}>Send Mail</h2>

      <SendMailTop state={state} setInputFieldChange={setInputFieldChange} />

      <Divider />

      <MailMid state={state} setInputFieldChange={setInputFieldChange} />

      <Divider />

      <MailBottom
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

export default SendMail;

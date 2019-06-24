import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Input } from "antd";
const { TextArea } = Input;

import { isCorrectEmail } from "../service/validateService";
import { PageWrapper } from "../styles/PageWrapper";

import config from "../config";
const { SERVER_URL } = config();

const TestMail = () => {
  const [state, setState] = useState({
    email: "",
    text: "",
    emailValidated: false,
    textValidated: false,
  });

  const onSubmit = async e => {
    e.preventDefault();
    const data = { email: state.email, text: state.text };
    await axios
      .post(`${SERVER_URL}/sendmail/test`, data)
      .then(res => console.log("res : ", res))
      .catch(err => console.log("error : ", err));
  };

  console.log("TestMail.jsx -> state : ", state);

  return (
    <TestMailPage>
      <h3 style={{ width: "100%" }}>TestMail Component</h3>
      <Input
        className="email-address-input"
        placeholder="Email Address"
        id="email"
        onChange={e => setState({ ...state, [e.target.id]: e.target.value })}
        onBlur={() => {
          !isCorrectEmail(state.email)
            ? setState({ ...state, emailValidated: true })
            : setState({ ...state, emailValidated: false });
        }}
      />

      {state.emailValidated && (
        <div style={{ color: "red" }}>Please enter a valid email</div>
      )}

      <TextArea
        className="email-contents-input"
        rows={10}
        id="text"
        onChange={e => setState({ ...state, [e.target.id]: e.target.value })}
        onBlur={() => {
          state.text.length === 0
            ? setState({ textValidated: true })
            : setState({ textValidated: false });
        }}
      />

      {state.textValidated && (
        <div style={{ color: "red" }}>Please enter your details</div>
      )}

      <div className="mail-buttons">
        <Button
          variant="outlined"
          color="primary"
          className="mail-button"
          onClick={onSubmit}
        >
          Send
        </Button>
      </div>
    </TestMailPage>
  );
};

const TestMailPage = styled(PageWrapper)`
  .email-address-input {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .email-contents-input {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  .mail-buttons {
    width: 100%;
    margin: 2em;
    display: flex;
    justify-content: flex-end;
  }
`;

export default TestMail;

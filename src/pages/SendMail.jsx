import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Input } from "antd";
const { TextArea } = Input;

const SendMail = props => {
  const [state, setState] = useState({
    email: "",
  });
  console.log("SendMail.jsx -> state.email", state);
  return (
    <SendMailPage>
      <div>SendMail Component</div>
      <TextArea
        rows={8}
        id="email"
        onChange={e => setState({ ...state, [e.target.id]: e.target.value })}
      />
      {/* <Button type="primary">Send</Button>
      <Button type="danger">Cancel</Button> */}
      <div className="mail-buttons">
        <Button variant="outlined" color="primary" className="mail-button">
          Send
        </Button>
        <Button variant="outlined" color="secondary" className="mail-button">
          Cancel
        </Button>
      </div>
    </SendMailPage>
  );
};

const SendMailPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mail-buttons {
    margin: 10px;
    width: 95%;
    display: flex;
    justify-content: flex-end;
    .mail-button {
      margin: 10px;
    }
  }
`;

export default SendMail;

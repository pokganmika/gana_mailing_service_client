import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Input } from "antd";
const { TextArea } = Input;

import { PageWrapper } from "../styles/PageWrapper";

const TestMail = () => {
  return (
    <TestMailPage>
      <div>TestMail Component</div>
      <TextArea
        rows={8}
        id="email"
        onChange={e => setState({ ...state, [e.target.id]: e.target.value })}
      />
      <div className="mail-buttons">
        <Button variant="outlined" color="primary" className="mail-button">
          Send
        </Button>
        <Button variant="outlined" color="secondary" className="mail-button">
          Cancel
        </Button>
      </div>
    </TestMailPage>
  );
};

const TestMailPage = styled(PageWrapper)``;

export default TestMail;

import React, { useState } from "react";
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
    field: {
      email: "",
      emailTitle: "",
      mainTitle: "",
      detailTitleEng: "",
      textEng: "",
      detailTitleKor: "",
      textKor: "",
    },
    validate: {
      emailValidated: false,
      emailTitleValidated: false,
      mainTitleValidated: false,
      detailTitleEngValidated: false,
      textEngValidated: false,
      detailTitleKorValidated: false,
      textKorValidated: false,
    },
  });

  const onSubmit = async state => {
    const data = { email: state.email, textEng: state.textEng };
    console.log("check this : ", data);
    await axios
      .post(`http://192.168.0.114/sendmail/test`, data)
      .then(res => console.log("res : ", res))
      .catch(err => console.log("err : ", err));
    // .post(`${SERVER_URL}/sendmail/test`, data)
  };

  console.log("TestMail.jsx -> state : ", state);
  console.log(
    "state.validate.textEngValidated : ",
    state.validate.textEngValidated,
  );
  return (
    <TestMailPage>
      <h3 style={{ width: "100%" }}>Test Mail</h3>

      <Input
        className="email-input"
        placeholder="Email Address"
        id="email"
        onChange={e =>
          setState({
            ...state,
            field: { ...state.field, [e.target.id]: e.target.value },
          })
        }
        onBlur={() => {
          !isCorrectEmail(state.field.email)
            ? setState({
                ...state,
                validate: { ...state.validate, emailValidated: true },
              })
            : setState({
                ...state,
                validate: { ...state.validate, emailValidated: false },
              });
        }}
      />

      {state.validate.emailValidated && (
        <div style={{ color: "red" }}>Please enter a valid email</div>
      )}

      <Input
        className="email-input"
        placeholder="Email Title"
        id="emailTitle"
        onChange={e =>
          setState({
            ...state,
            field: { ...state.field, [e.target.id]: e.target.value },
          })
        }
        onBlur={() => {
          state.field.emailTitle.length === 0
            ? setState({
                ...state,
                validate: { ...state.validate, emailTitleValidated: true },
              })
            : setState({
                ...state,
                validate: { ...state.validate, emailTitleValidated: false },
              });
        }}
      />

      {state.validate.emailTitleValidated && (
        <div style={{ color: "red" }}>Please enter a email title</div>
      )}

      <Input
        className="email-input"
        placeholder="Main Title"
        id="mainTitle"
        onChange={e =>
          setState({
            ...state,
            field: { ...state.field, [e.target.id]: e.target.value },
          })
        }
        onBlur={() => {
          state.field.mainTitle.length === 0
            ? setState({
                ...state,
                validate: { ...state.validate, mainTitleValidated: true },
              })
            : setState({
                ...state,
                validate: { ...state.validate, mainTitleValidated: false },
              });
        }}
      />

      {state.validate.mainTitleValidated && (
        <div style={{ color: "red" }}>Please enter a main title</div>
      )}

      <Input
        className="email-input"
        placeholder="Detail Title (ENG)"
        id="detailTitleEng"
        onChange={e =>
          setState({
            ...state,
            field: { ...state.field, [e.target.id]: e.target.value },
          })
        }
        onBlur={() => {
          state.field.detailTitleEng.length === 0
            ? setState({
                ...state,
                validate: { ...state.validate, detailTitleEngValidated: true },
              })
            : setState({
                ...state,
                validate: { ...state.validate, detailTitleEngValidated: false },
              });
        }}
      />

      {state.validate.detailTitleEngValidated && (
        <div style={{ color: "red" }}>Please enter a detail title (ENG)</div>
      )}

      <TextArea
        className="email-input"
        placeholder="Email (ENG)"
        rows={6}
        id="textEng"
        onChange={e =>
          setState({
            ...state,
            field: { ...state.field, [e.target.id]: e.target.value },
          })
        }
        onBlur={() => {
          state.field.textEng.length === 0
            ? setState({
                ...state,
                validate: { ...state.validate, textEngValidated: true },
              })
            : setState({
                ...state,
                validate: { ...state.validate, textEngValidated: false },
              });
        }}
      />

      {state.validate.textEngValidated && (
        <div style={{ color: "red" }}>Please enter your details</div>
      )}

      <Input
        className="email-input"
        placeholder="Detail Title (KOR)"
        id="detailTitleKor"
        onChange={e =>
          setState({
            ...state,
            field: { ...state.field, [e.target.id]: e.target.value },
          })
        }
        onBlur={() => {
          state.field.detailTitleKor.length === 0
            ? setState({
                ...state,
                validate: { ...state.validate, detailTitleKorValidated: true },
              })
            : setState({
                ...state,
                validate: { ...state.validate, detailTitleKorValidated: false },
              });
        }}
      />

      {state.validate.detailTitleKorValidated && (
        <div style={{ color: "red" }}>Please enter a detail title (KOR)</div>
      )}

      <TextArea
        className="email-input"
        placeholder="Email (KOR)"
        rows={6}
        id="textKor"
        onChange={e =>
          setState({
            ...state,
            field: { ...state.field, [e.target.id]: e.target.value },
          })
        }
        onBlur={() => {
          state.field.textKor.length === 0
            ? setState({
                ...state,
                validate: { ...state.validate, textKorValidated: true },
              })
            : setState({
                ...state,
                validate: { ...state.validate, textKorValidated: false },
              });
        }}
      />

      {state.validate.textKorValidated && (
        <div style={{ color: "red" }}>Please enter your details (KOR)</div>
      )}

      <div className="mail-buttons">
        <Button
          variant="outlined"
          color="primary"
          className="mail-button"
          onClick={e => {
            e.preventDefault();
            onSubmit(state);
          }}
        >
          Send
        </Button>
      </div>
    </TestMailPage>
  );
};

const TestMailPage = styled(PageWrapper)`
  .email-input {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  .mail-buttons {
    width: 100%;
    margin: 1em;
    display: flex;
    justify-content: flex-end;
  }
`;

export default TestMail;

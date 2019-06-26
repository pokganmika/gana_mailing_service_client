import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { Button as MButton } from "@material-ui/core";
// antd
import { Button as AButton, Input, Divider, Select } from "antd";
const { TextArea } = Input;
const { Option } = Select;
const InputGroup = Input.Group;

import { isCorrectEmail } from "../service/validateService";
import { PageWrapper } from "../styles/PageWrapper";
import { TestMailInitState, selector } from "../components/TestMail";

import TestMailTop from "../components/TestMail/TestMailTop";

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
    console.log("check this : ", data);
    await axios
      .post(`http://192.168.0.114/sendmail/test`, data)
      .then(res => console.log("res : ", res))
      .catch(err => console.log("err : ", err));
    // .post(`${SERVER_URL}/sendmail/test`, data)
  };

  console.log("TestMail.jsx -> state : ", JSON.stringify(state));

  return useObserver(() => (
    <TestMailPage>
      <h2 style={{ width: "100%" }}>Test Mail</h2>

      {/*TODO: for refactoring */}
      {/* <TestMailTop
        state={state}
        setInputFieldChange={setInputFieldChange}
        isCorrectEmail={isCorrectEmail}
      /> */}

      <div className="email-top">
        <div className="email-top-inner">
          <Input
            className="email-input"
            id="email"
            value={state.field.email}
            placeholder="Email Address"
            onChange={setInputFieldChange}
            onBlur={() => {
              !isCorrectEmail(state.field.email)
                ? (state.validate.emailValidated = true)
                : (state.validate.emailValidated = false);
            }}
          />

          {state.validate.emailValidated && (
            <div style={{ color: "red" }}>Please enter a valid email</div>
          )}
        </div>

        <div className="email-top-inner" style={{ marginLeft: "1em" }}>
          <Input
            className="email-input"
            placeholder="Email Title"
            id="emailTitle"
            value={state.field.emailTitle}
            onChange={setInputFieldChange}
            onBlur={() => {
              state.field.emailTitle.length === 0
                ? (state.validate.emailTitleValidated = true)
                : (state.validate.emailTitleValidated = false);
            }}
          />

          {state.validate.emailTitleValidated && (
            <div style={{ color: "red" }}>Please enter a email title</div>
          )}
        </div>
      </div>

      <Divider />

      <Input
        className="email-input"
        placeholder="Main Title"
        id="mainTitle"
        value={state.field.mainTitle}
        onChange={setInputFieldChange}
        onBlur={() => {
          state.field.mainTitle.length === 0
            ? (state.validate.mainTitleValidated = true)
            : (state.validate.mainTitleValidated = false);
        }}
      />

      {state.validate.mainTitleValidated && (
        <div style={{ color: "red" }}>Please enter a main title</div>
      )}

      <div className="email-mid">
        <div className="email-mid-inner" style={{ marginRight: "1em" }}>
          <Input
            className="email-input"
            placeholder="Detail Title (ENG)"
            id="detailTitleEng"
            value={state.field.detailTitleEng}
            onChange={setInputFieldChange}
            onBlur={() => {
              state.field.detailTitleEng.length === 0
                ? (state.validate.detailTitleEngValidated = true)
                : (state.validate.detailTitleEngValidated = false);
            }}
          />

          {state.validate.detailTitleEngValidated && (
            <div style={{ color: "red" }}>
              Please enter a detail title (ENG)
            </div>
          )}

          <TextArea
            className="email-input"
            placeholder="Email (ENG)"
            rows={5}
            id="textEng"
            value={state.field.textEng}
            onChange={setInputFieldChange}
            onBlur={() => {
              state.field.textEng.length === 0
                ? (state.validate.textEngValidated = true)
                : (state.validate.textEngValidated = false);
            }}
          />

          {state.validate.textEngValidated && (
            <div style={{ color: "red" }}>Please enter your details</div>
          )}
        </div>

        <div className="email-mid-inner" style={{ marginLeft: "1em" }}>
          <Input
            className="email-input"
            placeholder="Detail Title (KOR)"
            id="detailTitleKor"
            value={state.field.detailTitleKor}
            onChange={setInputFieldChange}
            onBlur={() => {
              state.field.detailTitleKor.length === 0
                ? (state.validate.detailTitleKorValidated = true)
                : (state.validate.detailTitleKorValidated = false);
            }}
          />

          {state.validate.detailTitleKorValidated && (
            <div style={{ color: "red" }}>
              Please enter a detail title (KOR)
            </div>
          )}

          <TextArea
            className="email-input"
            placeholder="Email (KOR)"
            rows={5}
            id="textKor"
            onChange={setInputFieldChange}
            onBlur={() => {
              state.field.textKor.length === 0
                ? (state.validate.textKorValidated = true)
                : (state.validate.textKorValidated = false);
            }}
          />

          {state.validate.textKorValidated && (
            <div style={{ color: "red" }}>Please enter your details (KOR)</div>
          )}
        </div>
      </div>

      <Divider />

      <h3 style={{ width: "100%", marginBottom: "1em" }}>Optional</h3>

      <div className="email-bottom">
        <div className="email-bottom-inner" style={{ marginRight: "1em" }}>
          <InputGroup compact className="email-input">
            <div style={{ display: "flex" }}>
              <Select
                defaultValue={selector[0]}
                onChange={value => {
                  state.temp.selectEng = value;
                }}
              >
                {selector.map((sel, i) => (
                  <Option value={sel} key={i}>
                    {sel}
                  </Option>
                ))}
              </Select>
              <Input
                placeholder="Link (ENG)"
                id="linkTitleEng"
                value={state.temp.linkTitleEng}
                onChange={setInputTempChange}
              />
              <Input
                placeholder="Link URL (ENG)"
                id="linkUrlEng"
                value={state.temp.linkUrlEng}
                onChange={setInputTempChange}
              />
              <AButton
                onClick={e => {
                  e.preventDefault();
                  state.temp.linkUrlEng.length !== 0 &&
                    state.field.linkEng[state.temp.selectEng].push({
                      title: state.temp.linkTitleEng,
                      url: state.temp.linkUrlEng,
                    });
                  state.temp.linkTitleEng = "";
                  state.temp.linkUrlEng = "";
                }}
              >
                Add
              </AButton>
            </div>
          </InputGroup>

          {state.field.linkEng.email.length !== 0 &&
            state.field.linkEng.email.map((eo, i) => (
              <div className="link-list" value={eo.title} key={i}>
                <div className="list-card">email</div>
                <div>
                  <div className="link-list-element">Link(ENG): {eo.title}</div>
                  <div className="link-list-element">
                    Link URL(ENG): {eo.url}
                  </div>
                </div>
                <AButton
                  className="link-list-element"
                  type="danger"
                  onClick={e => {
                    e.preventDefault();
                    state.field.linkEng.email.splice(i, 1);
                  }}
                >
                  Del
                </AButton>
              </div>
            ))}

          {state.field.linkEng.segment.length !== 0 &&
            state.field.linkEng.segment.map((eo, i) => (
              <div className="link-list" value={eo.title} key={i}>
                <div className="list-card">segment</div>
                <div>
                  <div className="link-list-element">Link(ENG): {eo.title}</div>
                  <div className="link-list-element">
                    Link URL(ENG): {eo.url}
                  </div>
                </div>
                <AButton
                  className="link-list-element"
                  type="danger"
                  onClick={e => {
                    e.preventDefault();
                    state.field.linkEng.segment.splice(i, 1);
                  }}
                >
                  Del
                </AButton>
              </div>
            ))}

          {state.field.linkEng.link.length !== 0 &&
            state.field.linkEng.link.map((eo, i) => (
              <div className="link-list" value={eo.title} key={i}>
                <div className="list-card">link</div>
                <div>
                  <div className="link-list-element">Link(ENG): {eo.title}</div>
                  <div className="link-list-element">
                    Link URL(ENG): {eo.url}
                  </div>
                </div>
                <AButton
                  className="link-list-element"
                  type="danger"
                  onClick={e => {
                    e.preventDefault();
                    state.field.linkEng.link.splice(i, 1);
                  }}
                >
                  Del
                </AButton>
              </div>
            ))}

          <TextArea
            className="email-input"
            placeholder="Email (ENG) - Optional"
            rows={3}
            id="textEngOp"
            value={state.field.textEngOp}
            onChange={setInputFieldChange}
          />
        </div>

        <div className="email-bottom-inner" style={{ marginLeft: "1em" }}>
          <InputGroup compact className="email-input">
            <div style={{ display: "flex" }}>
              <Select
                defaultValue={selector[0]}
                onChange={value => {
                  state.temp.selectKor = value;
                }}
              >
                {selector.map((sel, i) => (
                  <Option value={sel} key={i}>
                    {sel}
                  </Option>
                ))}
              </Select>
              <Input
                placeholder="Link (KOR)"
                id="linkTitleKor"
                value={state.temp.linkTitleKor}
                onChange={setInputTempChange}
              />
              <Input
                placeholder="Link URL (KOR)"
                id="linkUrlKor"
                value={state.temp.linkUrlKor}
                onChange={setInputTempChange}
              />
              <AButton
                onClick={e => {
                  e.preventDefault();
                  state.temp.linkUrlKor.length !== 0 &&
                    state.field.linkKor[state.temp.selectKor].push({
                      title: state.temp.linkTitleKor,
                      url: state.temp.linkUrlKor,
                    });
                  state.temp.linkTitleKor = "";
                  state.temp.linkUrlKor = "";
                }}
              >
                Add
              </AButton>
            </div>
          </InputGroup>

          {state.field.linkKor.email.length !== 0 &&
            state.field.linkKor.email.map((eo, i) => (
              <div className="link-list" value={eo.title} key={i}>
                <div className="list-card">email</div>
                <div>
                  <div className="link-list-element">Link(KOR): {eo.title}</div>
                  <div className="link-list-element">
                    Link URL(KOR): {eo.url}
                  </div>
                </div>
                <AButton
                  className="link-list-element"
                  type="danger"
                  onClick={e => {
                    e.preventDefault();
                    state.field.linkKor.email.splice(i, 1);
                  }}
                >
                  Del
                </AButton>
              </div>
            ))}

          {state.field.linkKor.segment.length !== 0 &&
            state.field.linkKor.segment.map((eo, i) => (
              <div className="link-list" value={eo.title} key={i}>
                <div className="list-card">segment</div>
                <div>
                  <div className="link-list-element">Link(KOR): {eo.title}</div>
                  <div className="link-list-element">
                    Link URL(KOR): {eo.url}
                  </div>
                </div>
                <AButton
                  className="link-list-element"
                  type="danger"
                  onClick={e => {
                    e.preventDefault();
                    state.field.linkKor.segment.splice(i, 1);
                  }}
                >
                  Del
                </AButton>
              </div>
            ))}

          {state.field.linkKor.link.length !== 0 &&
            state.field.linkKor.link.map((eo, i) => (
              <div className="link-list" value={eo.title} key={i}>
                <div className="list-card">link</div>
                <div>
                  <div className="link-list-element">
                    Link(linkKor): {eo.title}
                  </div>
                  <div className="link-list-element">
                    Link URL(linkKor): {eo.url}
                  </div>
                </div>
                <AButton
                  className="link-list-element"
                  type="danger"
                  onClick={e => {
                    e.preventDefault();
                    state.field.linkKor.link.splice(i, 1);
                  }}
                >
                  Del
                </AButton>
              </div>
            ))}

          <TextArea
            className="email-input"
            placeholder="Email (KOR) - Optional"
            rows={3}
            id="textKorOp"
            value={state.field.textKorOp}
            onChange={setInputFieldChange}
          />
        </div>
      </div>

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
    background-color: white;
    box-shadow: 0 0 20px -3px rgba(0, 0, 0, 0.3);
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
    background-color: #dcdde1;
    max-width: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;
  }
`;

export default TestMail;

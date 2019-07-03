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

import { PageWrapper } from "../styles/PageWrapper";
import {
  SendLaterInitState,
  selector,
  timeTable,
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
    const { month, day, hour } = state.field.time;
    if (!month || !day || !hour) {
      error("MONTH and DAY, HOUR are absolutely necessary.");
      return;
    }

    const data = state.field;
    console.log("check::this::-second::check-:: -----> : ", toJS(data));
    await axios
      .post(`http://192.168.0.114/sendmail/sendlater`, data)
      .then(res => console.log("res : ", res))
      .catch(err => console.log("err : ", err));
    // .post(`${SERVER_URL}/sendmail/test`, data)
  };

  // console.log("SendLater.jsx -> state : ", JSON.stringify(state));
  console.log("SendLater.jsx -> state : ", toJS(state));
  console.log("SendLater.jsx -> timeTable : ", timeTable);

  return useObserver(() => (
    <TestMailPage>
      <h2 style={{ width: "100%" }}>Send Later</h2>

      <div style={{ width: "100%", display: "flex" }}>
        <Input
          defaultValue="2019"
          placeholder="YEAR"
          onChange={e => {
            e.preventDefault();
            state.field.time.year = e.target.value;
          }}
        />
        <Select
          style={{ width: "100%" }}
          placeholder="MONTH"
          onChange={value => (state.field.time.month = value)}
        >
          {timeTable.month.map((month, i) => (
            <Option key={i} value={month}>
              {month}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: "100%" }}
          placeholder="DAY"
          onChange={value => (state.field.time.day = value)}
        >
          {timeTable.day.map((day, i) => (
            <Option key={i} value={day}>
              {day}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: "100%" }}
          placeholder="HOUR"
          onChange={value => (state.field.time.hour = value)}
        >
          {timeTable.hour.map((hour, i) => (
            <Option key={i} value={hour}>
              {hour}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: "100%" }}
          placeholder="MINUTE"
          onChange={value => (state.field.time.minute = value)}
        >
          {timeTable.minute.map((minute, i) => (
            <Option key={i} value={minute}>
              {minute}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: "100%" }}
          placeholder="SECOND"
          onChange={value => (state.field.time.second = value)}
        >
          {timeTable.second.map((second, i) => (
            <Option key={i} value={second}>
              {second}
            </Option>
          ))}
        </Select>
      </div>

      <div className="email-top">
        <div className="email-top-inner">
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

      <div
        style={{
          width: "100%",
          marginBottom: "1em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Optional</h3>

        <div
          style={{
            display: "flex",
            padding: "0.7em",
            backgroundColor: "#f1f2f6",
            borderRadius: "10px",
            boxShadow: "0 0 20px -3px rgba(0, 0, 0, 0.2)",
          }}
        >
          <span style={{ marginRight: "0.5em" }}>info mail link : </span>
          {state.field.infoMail ? (
            <span
              style={{ color: "blue", fontWeight: "bold", marginRight: "1em" }}
            >
              ON
            </span>
          ) : (
            <span
              style={{ color: "red", fontWeight: "bold", marginRight: "1em" }}
            >
              OFF
            </span>
          )}
          <Switch
            defaultChecked
            onChange={checked => (state.field.infoMail = checked)}
          />
        </div>
      </div>

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
                placeholder="Link Title (ENG)"
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

          {state.field.linkEng.segment.length !== 0 &&
            state.field.linkEng.segment.map((el, i) => (
              <div className="link-list" value={el.title} key={i}>
                <div className="list-card">SEGMENT</div>
                <div>
                  <div className="link-list-element">
                    Link Title(ENG) : {el.title}
                  </div>
                  <div className="link-list-element">
                    Link URL(ENG) : {el.url}
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
            state.field.linkEng.link.map((el, i) => (
              <div className="link-list" value={el.title} key={i}>
                <div className="list-card">LINK</div>
                <div>
                  <div className="link-list-element">
                    Link Title(ENG) : {el.title}
                  </div>
                  <div className="link-list-element">
                    Link URL(ENG) : {el.url}
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
                placeholder="Link Title (KOR)"
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

          {state.field.linkKor.segment.length !== 0 &&
            state.field.linkKor.segment.map((el, i) => (
              <div className="link-list" value={el.title} key={i}>
                <div className="list-card">SEGMENT</div>
                <div>
                  <div className="link-list-element">
                    Link Title(KOR) : {el.title}
                  </div>
                  <div className="link-list-element">
                    Link URL(KOR) : {el.url}
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
            state.field.linkKor.link.map((el, i) => (
              <div className="link-list" value={el.title} key={i}>
                <div className="list-card">LINK</div>
                <div>
                  <div className="link-list-element">
                    Link Title(KOR) : {el.title}
                  </div>
                  <div className="link-list-element">
                    Link URL(KOR) : {el.url}
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

export default SendLater;

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

import { isCorrectEmail } from "../../service/validateService";
import { PageWrapper } from "../../styles/PageWrapper";

import config from "../../config";
const { SERVER_URL } = config();

const TestMail = () => {
  const [state, setState] = useState({
    field: {
      email: "",
      emailTitle: "",
      mainTitle: "",
      detailTitleEng: "",
      textEng: "",
      textEngOp: "",
      detailTitleKor: "",
      textKor: "",
      textKorOp: "",
      linkEng: {
        email: [],
        segment: [],
        link: [],
      },
      linkKor: {
        email: [],
        segment: [],
        link: [],
      },
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

  const selector = ["email", "segment", "link"];
  const [temp, setTemp] = useState({
    selectEng: selector[0],
    selectKor: selector[0],
    linkTitleEng: "",
    linkTitleKor: "",
    linkUrlEng: "",
    linkUrlKor: "",
  });

  const onSubmit = async state => {
    const data = state.field;
    console.log("check this : ", data);
    await axios
      .post(`http://192.168.0.114/sendmail`, data)
      .then(res => console.log("res : ", res))
      .catch(err => console.log("err : ", err));
    // .post(`${SERVER_URL}/sendmail/test`, data)
  };

  console.log("TestMail.jsx -> state : ", state);
  console.log("TestMail.jsx -> temp : ", temp);

  return (
    <TestMailPage>
      <h2 style={{ width: "100%" }}>Test Mail</h2>

      <div className="email-top">
        <div className="email-top-inner" style={{ marginRight: "1em" }}>
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
        </div>

        <div className="email-top-inner" style={{ marginLeft: "1em" }}>
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
        </div>
      </div>

      <Divider />

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

      <div className="email-mid">
        <div className="email-mid-inner" style={{ marginRight: "1em" }}>
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
                    validate: {
                      ...state.validate,
                      detailTitleEngValidated: true,
                    },
                  })
                : setState({
                    ...state,
                    validate: {
                      ...state.validate,
                      detailTitleEngValidated: false,
                    },
                  });
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
        </div>

        <div className="email-mid-inner" style={{ marginLeft: "1em" }}>
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
                    validate: {
                      ...state.validate,
                      detailTitleKorValidated: true,
                    },
                  })
                : setState({
                    ...state,
                    validate: {
                      ...state.validate,
                      detailTitleKorValidated: false,
                    },
                  });
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
                  setTemp({ ...temp, selectEng: value });
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
                value={temp.linkTitleEng}
                onChange={e =>
                  setTemp({ ...temp, linkTitleEng: e.target.value })
                }
              />
              <Input
                placeholder="Link URL (ENG)"
                value={temp.linkUrlEng}
                onChange={e => setTemp({ ...temp, linkUrlEng: e.target.value })}
              />
              <AButton
                onClick={e => {
                  e.preventDefault();
                  setState({
                    ...state,
                    field: {
                      ...state.field,
                      linkEng: {
                        ...state.field.linkEng,
                        [temp.selectEng]: [
                          ...state.field.linkEng.email,
                          // { [temp.linkTitleEng]: temp.linkUrlEng },
                          { title: temp.linkTitleEng, url: temp.linkUrlEng },
                        ],
                      },
                    },
                  });
                  setTemp({ ...temp, linkTitleEng: "", linkUrlEng: "" });
                }}
              >
                Add
              </AButton>
            </div>
          </InputGroup>

          {/*TODO: React에서는 object를 render할 수 없다!*/}
          {state.field.linkEng.email.length !== 0 &&
            state.field.linkEng.email.map((eo, i) => (
              <div value={eo.title} key={i} style={{ display: "flex" }}>
                <div>Link(ENG): {eo.title} / </div>
                <div>Link URL(ENG): {eo.url}</div>
                <AButton
                  onClick={e => {
                    e.preventDefault();
                    setState({
                      ...state,
                      field: {
                        ...state.field,
                        linkEng: {
                          ...state.field.linkEng,
                          email: [...state.field.linkEng.email].filter(
                            el => el.title !== eo.title && el.url !== eo.title,
                          ),
                          // email: [...state.field.linkEng.email].splice(i, 1),
                        },
                      },
                    });
                  }}
                >
                  Del
                </AButton>
              </div>
            ))}
          {state.field.linkEng.segment.length !== 0 &&
            state.field.linkEng.segment.map((s, i) => (
              <div value={s} key={i}>
                {s}
                <AButton>Del</AButton>
              </div>
            ))}
          {state.field.linkEng.link.length !== 0 &&
            state.field.linkEng.link.map((l, i) => (
              <div value={l} key={i}>
                {l}
                <AButton>Del</AButton>
              </div>
            ))}

          <TextArea
            className="email-input"
            placeholder="Email (ENG) - Optional"
            rows={3}
            id="textEngOp"
            onChange={e =>
              setState({
                ...state,
                field: { ...state.field, [e.target.id]: e.target.value },
              })
            }
          />
        </div>

        <div className="email-bottom-inner" style={{ marginLeft: "1em" }}>
          <InputGroup compact className="email-input">
            <div style={{ display: "flex" }}>
              <Select
                defaultValue={selector[0]}
                onChange={value => {
                  setTemp({ ...temp, selectKor: value });
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
                value={temp.linkTitleKor}
                onChange={e =>
                  setTemp({ ...temp, linkTitleKor: e.target.value })
                }
              />
              <Input
                placeholder="Link URL (KOR)"
                value={temp.linkUrlKor}
                onChange={e => setTemp({ ...temp, linkUrlKor: e.target.value })}
              />
              <AButton
                onClick={e => {
                  e.preventDefault();
                  setState({
                    ...state,
                    field: {
                      ...state.field,
                      linkKor: {
                        ...state.field.linkKor,
                        email: [
                          ...state.field.linkKor.email,
                          { [temp.linkTitleKor]: temp.linkUrlKor },
                        ],
                      },
                    },
                  });
                  setTemp({ ...temp, linkTitleKor: "", linkUrlKor: "" });
                }}
              >
                Add
              </AButton>
            </div>
          </InputGroup>

          <TextArea
            className="email-input"
            placeholder="Email (KOR) - Optional"
            rows={3}
            id="textKorOp"
            onChange={e =>
              setState({
                ...state,
                field: { ...state.field, [e.target.id]: e.target.value },
              })
            }
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
  );
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
`;

export default TestMail;

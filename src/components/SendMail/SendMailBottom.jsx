import React from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { Button as AButton, Input, Select, Switch } from "antd";
const { TextArea } = Input;
const { Option } = Select;
const InputGroup = Input.Group;

const SendMailBottom = ({
  state,
  selector,
  setInputFieldChange,
  setInputTempChange,
}) => {
  console.log("::sendmail::bottom::component::state:: ---> : ", toJS(state));
  return useObserver(() => (
    <>
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
    </>
  ));
};

export default SendMailBottom;

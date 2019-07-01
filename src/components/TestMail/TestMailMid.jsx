import React from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { Input } from "antd";
const { TextArea } = Input;

const TestMailMid = ({ state, setInputFieldChange }) => {
  console.log("::mid::component::state:: ---> ", toJS(state));
  return useObserver(() => (
    <>
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
            value={state.field.textKor}
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
    </>
  ));
};

export default TestMailMid;

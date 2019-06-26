import React from "react";
import { Input } from "antd";
import { useLocalStore, useObserver } from "mobx-react-lite";

const TestMailTop = ({ state, setInputFieldChange, isCorrectEmail }) => {
  // console.log("TestMailTop::props::check:: -> : ", props);
  return useObserver(() => (
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
  ));
};

export default TestMailTop;

import React from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { Input } from "antd";

const SendMailTop = ({ state, setInputFieldChange }) => {
  console.log("::sendmail::top::component::state:: ---> ", toJS(state));
  return useObserver(() => (
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
  ));
};

export default SendMailTop;

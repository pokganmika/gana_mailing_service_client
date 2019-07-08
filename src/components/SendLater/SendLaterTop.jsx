import React from "react";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { Input, Select } from "antd";
const { Option } = Select;

const SendLaterTop = ({ state, setInputFieldChange, timeTable }) => {
  console.log("::sendlater::top::component::state:: ---> : ", toJS(state));
  return useObserver(() => (
    <>
      <div style={{ width: "100%", display: "flex" }}>
        <Input
          className="time-input"
          defaultValue="2019"
          placeholder="YEAR"
          onChange={e => {
            e.preventDefault();
            state.field.time.year = e.target.value;
          }}
        />
        <Select
          className="time-input-select"
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
          className="time-input-select"
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
          className="time-input-select"
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
          className="time-input-select"
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
          className="time-input-select-last"
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
    </>
  ));
};

export default SendLaterTop;

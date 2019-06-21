import React from "react";
import styled from "styled-components";
import { Input, Button, Icon } from "antd";

const Login = props => {
  return (
    <LoginWrapper>
      <div className="login-box">
        <Input
          className="login-input"
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          id="id"
          placeholder="ID"
          // onChange={this.onInputChange}
          // onBlur={() => this.isCorrectEmail(email)}
        />
        <Input
          className="login-input"
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          id="password"
          placeholder="PASSWORD"
          // onChange={this.onInputChange}
          // onBlur={() => this.isCorrectPassword(password)}
          // onKeyPress={e =>
          //   e.key === 'Enter' &&
          //   this.onSubmitClick(setUser, setUserMail, setAuth)
          // }
        />

        <Button
          className="login-button"
          type="primary"
          // onClick={}
        >
          Login
        </Button>
      </div>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 50%;
    height: 50%;
    border-radius: 20px;
    box-shadow: 0 0 20px -3px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-input {
      width: 50%;
      margin: 2em;
    }
    .login-button {
      width: 50%;
      margin: 2em;
    }
  }
`;

export default Login;

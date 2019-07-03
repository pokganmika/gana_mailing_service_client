import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Input, Button, Icon } from "antd";

import config from "../config";
const { SERVER_URL } = config();

import { error } from "../service/messageService";

const Login = props => {
  console.log("::Login.jsx::props:: ---> : ", props);

  const tryLogin = async props => {
    console.log("::trylogin::props::check:: ---> : ", props);
    const data = {
      id: props.auth.inputId,
      password: props.auth.inputPw,
    };
    console.log("::trylogin::data::check:: ---> :", data);
    await axios
      .post(`http://192.168.0.114/users/login`, data)
      .then(data => {
        console.log("::::::::::", data);
        if (data.data.res) {
          localStorage.setItem("userVerified", data.data.token);
          props.authCheck();
          props.setAuth({
            ...auth,
            inputId: "",
            inputPw: "",
          });
        } else {
          error("Check your Id or Password");
        }
      })
      .catch(err => {
        console.log(err);
      });
    // .post(`${SERVER_URL}/sendmail/test`, data)
  };

  return (
    <LoginWrapper>
      <div className="login-box">
        <Input
          className="login-input"
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          id="id"
          value={props.auth.inputId}
          placeholder="ID"
          onChange={e => {
            e.preventDefault();
            props.setAuth({
              ...props.auth,
              inputId: e.target.value,
            });
          }}
        />
        <Input
          className="login-input"
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          id="password"
          value={props.auth.inputPw}
          placeholder="PASSWORD"
          onChange={e => {
            e.preventDefault();
            props.setAuth({
              ...props.auth,
              inputPw: e.target.value,
            });
          }}
          onKeyPress={e => e.key === "Enter" && tryLogin(props)}
        />

        <Button
          className="login-button"
          type="primary"
          onClick={() => tryLogin(props)}
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

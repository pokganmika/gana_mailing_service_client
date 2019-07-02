import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import jwt from "jwt-decode";
import moment from "moment";

import Main from "./components/Main";
import Login from "./pages/Login";

//TODO: dotenv issue
/**
 * require("dotenv").config();
 *
 * import dotenv from "dotenv";
 * dotenv.config();
 * */

const App = () => {
  const [auth, setAuth] = useState({
    authenticated: false,
    inputId: "",
    inputPw: "",
  });

  useEffect(() => {
    if (localStorage.userVerified) {
      const decoded = jwt(localStorage.userVerified);
      console.log("::decoded::", decoded);
      if (decoded.id === "admin") {
        authCheck();
      }
    }
  }, []);

  const authCheck = () => {
    setAuth({
      ...auth,
      authenticated: !auth.authenticated,
    });
  };

  console.log("[+] NODE_ENV =", process.env.NODE_ENV);
  console.log("::App.jsx::auth(state):: ---> : ", auth);
  return (
    <div className="App">
      {auth.authenticated ? (
        <Router>
          <Main authCheck={authCheck} />
        </Router>
      ) : (
        <Login auth={auth} setAuth={setAuth} authCheck={authCheck} />
      )}
    </div>
  );
};

export default App;

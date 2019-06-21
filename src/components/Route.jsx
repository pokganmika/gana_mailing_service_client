import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import SendMail from "../pages/SendMail";
import UserSetting from "../pages/UserSetting";

import TempUserSetting from "../pages/TempUserSetting";

const MainRoute = props => {
  return (
    <>
      <Route exact path="/" component={MainPage} />
      <Route path="/sendmail" component={SendMail} />
      <Route path="/usersetting" component={UserSetting} />
      <Route path="/tempusersetting" component={TempUserSetting} />
    </>
  );
};

export default MainRoute;

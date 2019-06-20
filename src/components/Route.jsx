import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import SendMail from "../pages/SendMail";
import UserSetting from "../pages/UserSetting";

const MainRoute = props => {
  return (
    <Router>
      <Route exact path="/" component={MainPage} />
      <Route path="/sendmail" component={SendMail} />
      <Route path="/usersetting" component={UserSetting} />
    </Router>
  );
};

export default MainRoute;

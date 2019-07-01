import React from "react";
import { Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import ActivityLog from "../pages/ActivityLog";
import SendMail from "../pages/SendMail";
import TestMail from "../pages/TestMail";
import SendLater from "../pages/SendLater";
import UserSetting from "../pages/UserSetting";

const MainRoute = props => {
  return (
    <>
      <Route exact path="/" component={MainPage} />
      <Route path="/activitylog" component={ActivityLog} />
      <Route path="/sendmail" component={SendMail} />
      <Route path="/testmail" component={TestMail} />
      <Route path="/sendlater" component={SendLater} />
      <Route path="/usersetting" component={UserSetting} />
    </>
  );
};

export default MainRoute;

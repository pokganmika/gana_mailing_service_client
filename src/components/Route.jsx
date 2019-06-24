import React from "react";
import { Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import SendMail from "../pages/SendMail";
import TestMail from "../pages/TestMail";
import ReservationMail from "../pages/ReservationMail";
import UserSetting from "../pages/UserSetting";

import TempUserSetting from "../pages/TempUserSetting";

const MainRoute = props => {
  return (
    <>
      <Route exact path="/" component={MainPage} />
      <Route path="/sendmail" component={SendMail} />
      <Route path="/testmail" component={TestMail} />
      <Route path="/reservationmail" component={ReservationMail} />
      <Route path="/usersetting" component={UserSetting} />
      <Route path="/tempusersetting" component={TempUserSetting} />
    </>
  );
};

export default MainRoute;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "../Components/User/user";
import UserInfo from "../Components/UserInfo/userInfo"
const Routes = (
  <Router>
    <Route path={"/"} component={User} exact />
    <Route path={"/:id"} component={UserInfo} exact />
  </Router>
);
export default Routes
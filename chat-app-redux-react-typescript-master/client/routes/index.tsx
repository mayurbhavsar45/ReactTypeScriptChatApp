
import * as React from "react";
import { Route, IndexRoute, Router } from "react-router";

// import { history } from "../main";
import { browserHistory } from "react-router";
import App from "../containers/App/index";
import Welcome from "../containers/WelcomePage/Welcome";
import SignUp from "../containers/SignUpPage/SignUp";
import SignIn from "../containers/SignInPage/SignIn";
import Chat from "../containers/ChatPage/Chat";
import Test from "../containers/socketTest";


// tslint:disable-next-line:typedef
const Routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/chat" component={Chat} />
      <Route path="/test" component={Test} />
    </Route>
  </Router>
);
export default Routes;

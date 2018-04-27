
import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";


import { signUp } from "./containers/SignUpPage/reducer";
import { signIn } from "./containers/SignInPage/reducer";
import { chat } from "./containers/ChatPage/reducer";
import { channels } from "./containers/ChannelsPage/reducer";

// tslint:disable-next-line:typedef
const rootReducer = combineReducers({
  routing: routerReducer,
  signUp:signUp,
  signIn:signIn,
  chat:chat,
  channels:channels,
});

export default rootReducer;

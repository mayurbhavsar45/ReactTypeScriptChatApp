// import { fork } from "redux-saga/effects";
import { signUpWatcherSaga } from "./containers/SignUpPage/saga";
import { signInWatcherSaga } from "./containers/SignInPage/saga";
import { channelsWatcherSaga } from "./containers/ChannelsPage/saga";
import { chatWatcherSaga } from "./containers/ChatPage/saga";

// tslint:disable:typedef
function* allWatcherSagas() {
  // yield takeEvery(Login_RequestLogin, requestLogin);
  // loginWatcherSaga();
}


// export default function* mySaga() {
//   yield [
//     allWatcherSagas,
//     signUpWatcherSaga,
//   ];
// }
export default [
    // allWatcherSagas,
    signUpWatcherSaga,
    signInWatcherSaga,
    channelsWatcherSaga,
    chatWatcherSaga
];
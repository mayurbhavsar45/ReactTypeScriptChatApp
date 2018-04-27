// tslint:disable:typedef
import { call, takeEvery, takeLatest, put } from "redux-saga/effects";
import * as AC from "./constants";
import { IRequestSignInAction } from "./actionModels";
import { SignIn } from "../Api/SignIn_SignUp_API";
import {signInActionCreators} from "./actions";

// ----------------
// saga
function* requestSignIn(request: IRequestSignInAction) {
  try {
    const signin = yield call(SignIn, request.userName, request.password);
    if (signin.length > 0 && signin.length <= 1) {
      localStorage.clear();
      localStorage.setItem("id",signin[0]._id);
      localStorage.setItem("username",signin[0].username);
      window.location.href="/chat";
    } else {
      yield put(signInActionCreators.signInSetErrors("Incorrect username or password"));

    }
  } catch (e) {
    console.log(e);
  }
}
export function* signInWatcherSaga() {
  yield takeLatest(AC.SignIn_RequestSignIn, requestSignIn);
}

// tslint:disable:typedef
import { call, takeEvery, takeLatest, put } from "redux-saga/effects";
import * as AC from "./constants";
import { IRequestSignUp } from "./actionModels";
import { SignUp } from "../Api/SignIn_SignUp_API";
import { isNullOrUndefined } from "util";

// ----------------
// saga
function* requestSignUp(request: IRequestSignUp) {
  try {
    const signup = yield call(
      SignUp,
      request.userName,
      request.password,
      request.confirmPassword
    );
      window.location.href = "/signin";
  } catch (e) {
    console.log(e);
  }
}
export function* signUpWatcherSaga() {
  yield takeLatest(AC.SignUp_RequestSignup, requestSignUp);
}

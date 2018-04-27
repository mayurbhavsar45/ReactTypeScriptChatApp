import * as React from "react";

import * as AC from "./constants";

import { IFieldChangedAction, IResetValues, IRequestSignInAction, ISetErrorAction } from "./actionModels";

// tslint:disable-next-line:typedef
export const signInActionCreators = {
  signInFieldChanged: (fieldName: string, value: any): IFieldChangedAction => ({
    type: AC.SignIn_FieldChanged,
    fieldname: fieldName,
    value: value
  }),
  signInResetValues:():IResetValues=>({
    type:AC.SignIn_ResetValues
  }),
  signInRequestSignIn:(uName:string,pass:string): IRequestSignInAction =>({
    type:AC.SignIn_RequestSignIn,
    userName:uName,
    password:pass
  }),
  signInSetErrors:(msg:string): ISetErrorAction =>({
    type:AC.SignIn_SetError,
    error:msg,
  }),
};

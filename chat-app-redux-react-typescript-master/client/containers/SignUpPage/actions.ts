import * as React from "react";

import * as AC from "./constants";
import { IFieldChangedAction, IResetValues, IRequestSignUp } from "./actionModels";

// tslint:disable-next-line:typedef
export const actionCreators = {
  signUpFieldChanged: (fieldName: string, value: any): IFieldChangedAction => ({
    type: AC.SignUp_FieldChanged,
    fieldname: fieldName,
    value: value
  }),
  signUpResetValues:():IResetValues=>({
    type:AC.SignUp_ResetValues
  }),
  signUpRequestSignUp:(uname:string,pass:string,cPass:string):IRequestSignUp=>({
    type:AC.SignUp_RequestSignup,
    userName:uname,
    password:pass,
    confirmPassword:cPass
  }),
};

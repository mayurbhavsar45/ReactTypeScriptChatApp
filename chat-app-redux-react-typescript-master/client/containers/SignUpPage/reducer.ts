// tslint:disable:typedef
import * as React from "react";
import * as AC from "./constants";
import { Action, Reducer, ActionCreator } from "redux";

import { IFieldChangedAction,IResetValues } from "./actionModels";


export interface ISignUpState {
  userName?: string;
  password?: string;
  confirmPassword?: string;
}

const unloadedState: ISignUpState = {
    userName: "",
    password: "",
    confirmPassword:"",
};

type KnownAction=Action |IFieldChangedAction|IResetValues;

export const signUp: Reducer<ISignUpState> =
    (state: ISignUpState = unloadedState, action: KnownAction): ISignUpState => {
        switch (action.type) {

            case AC.SignUp_FieldChanged:
            let actionValue2 = action as IFieldChangedAction;
            let fieldName = actionValue2.fieldname;
            let result = {
                ...state,
                [fieldName]: actionValue2.value
            };
            return result;
            case AC.SignUp_RequestSignup:
            return {
                ...state
            };
            case AC.SignUp_ResetValues:
            return unloadedState;
            default:
                let defaultResult :any = state || unloadedState;
                return defaultResult;
        }
    };

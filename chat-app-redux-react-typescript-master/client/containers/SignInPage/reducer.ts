// tslint:disable:quotemark
// tslint:disable:typedef

import { Reducer } from 'redux';
import { Action } from "redux";
import * as React from "react";
import { IFieldChangedAction, IResetValues, ISetErrorAction } from "./actionModels";
import * as AC from "./constants";

export interface ISignInState {
  userName?: string;
  password?: string;
  error?:string;
}

const unloadedState: ISignInState = {
  userName: "",
  password: "",
  error:""
};

type KnownAction = Action | IFieldChangedAction | IResetValues;

export const signIn: Reducer<ISignInState> =
    (state: ISignInState = unloadedState, action: KnownAction): ISignInState => {
        switch (action.type) {
            case AC.SignIn_FieldChanged:
            let actionValue2 = action as IFieldChangedAction;
            let fieldName = actionValue2.fieldname;
            let result = {
                ...state,
                [fieldName]: actionValue2.value
            };
            return result;
            case AC.SignIn_RequestSignIn:
            return {
                ...state
            };

            case AC.SignIn_SetError:
            let setErrorText=action as ISetErrorAction;
            return {
                ...state,
                error:setErrorText.error
            };

            case AC.SignIn_ResetValues:
            return unloadedState;
            default:
                let defaultResult :any = state || unloadedState;
                return defaultResult;
        }
    };


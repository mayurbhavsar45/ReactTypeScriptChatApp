export interface IFieldChangedAction {
    type: string;
    fieldname:string;
    value:string;
}

export interface IResetValues {
    type:string;
}

export interface IRequestSignInAction {
    type:string;
    userName:string;
    password:string;
}
export interface ISetErrorAction {
    type:string;
    error:string;
}

export interface IFieldChangedAction {
    type: string;
    fieldname:string;
    value:string;
}

export interface IResetValues {
    type:string;
}

export interface IRequestSignUp {
    type:string;
    userName:string;
    password:string;
    confirmPassword:string;
}
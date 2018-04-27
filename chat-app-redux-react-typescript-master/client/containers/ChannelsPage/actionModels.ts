export interface IFieldChangedAction {
    type: string;
    fieldname:string;
    value:string;
}

export interface IResetValues {
    type:string;
}

export interface IAddChannel {
    type:string;
    channelObject:any;
}
export interface IRequestAllChannel {
    type:string;
}
export interface IReceivedAllChannel {
    type:string;
    allChannels:any;
}

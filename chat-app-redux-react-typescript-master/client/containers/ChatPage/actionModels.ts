export interface IFieldChangedAction {
    type: string;
    fieldname:string;
    value:string;
}

export interface IResetValues {
    type:string;
}
export interface ISendMessage {
    type:string;
    chatObj:any;
}
export interface IRequestChatByChannelName {
    type:string;
    channelName:string;
}
export interface IReceiveChatByChannelName {
    type:string;
    messagesByChannelNameList:any;
}

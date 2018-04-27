import * as React from "react";

import * as AC from "./constants";

import { IFieldChangedAction, IResetValues, ISendMessage, IRequestChatByChannelName, IReceiveChatByChannelName } from "./actionModels";

// tslint:disable-next-line:typedef
export const chatActionCreators = {
  chatFieldChanged: (fieldName: string, value: any): IFieldChangedAction => ({
    type: AC.Chat_FieldChanged,
    fieldname: fieldName,
    value: value
  }),
  chatResetValues:():IResetValues=>({
    type:AC.Chat_ResetValues
  }),
  chatSendMessage:(obj:any):ISendMessage=>({
    type:AC.Chat_SendMessage,
    chatObj:obj
  }),
  chatRequestChatByChannelName:(channelName:string):IRequestChatByChannelName => ({
    type:AC.Chat_RequestChatByChannelName,
    channelName:channelName
  }),
  chatReceiveChatByChannelName:(messageList:any):IReceiveChatByChannelName => ({
    type:AC.Chat_ReceiveChatByChannelName,
    messagesByChannelNameList:messageList
  }),
  chatReceiveChatByChannelNameFromSocket:(messageList:any):IReceiveChatByChannelName => ({
    type:AC.Chat_ReceiveSocketNewMessageList,
    messagesByChannelNameList:messageList
  }),
};
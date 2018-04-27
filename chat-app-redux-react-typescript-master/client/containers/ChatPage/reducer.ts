// tslint:disable:quotemark
// tslint:disable:typedef
// tslint:disable:no-trailing-whitespace

import { Reducer } from "redux";
import { Action } from "redux";
import * as React from "react";

import * as socketIOClient from "socket.io-client";
// socket EndPoint
const endPoint = "http://localhost:8081";
export const sockets = socketIOClient(endPoint);


import * as AC from "./constants";
import {
  IFieldChangedAction,
  IResetValues,
  IReceiveChatByChannelName,
  IRequestChatByChannelName
} from "./actionModels";

export interface IChatState {
  id: string;
  channelID: string;
  text: string;
  user: object;
  time: string;
  messagesByChannelNameList?: any;
  socket?:any;
}

const unloadedState: IChatState = {
  id: "",
  channelID: "",
  text: "",
  user: {},
  time: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
  messagesByChannelNameList: [],
  socket: sockets
};

type KnownAction =
  | Action
  | IFieldChangedAction
  | IResetValues
  | IRequestChatByChannelName
  | IReceiveChatByChannelName;

export const chat: Reducer<IChatState> = (
  state: IChatState = unloadedState,
  action: KnownAction
): IChatState => {
  switch (action.type) {
    case AC.Chat_FieldChanged:
      let actionValue2 = action as IFieldChangedAction;
      let fieldName = actionValue2.fieldname;
      let result = {
        ...state,
        [fieldName]: actionValue2.value
      };
      return result;

    case AC.Chat_SendMessage:
      return {
        ...state
      };

    case AC.Chat_ResetValues:
      state.id = "";
      state.text = "";
      state.channelID = "";
      state.time = unloadedState.time;
      state.user = {};
      return {
        ...state
      };

    case AC.Chat_RequestChatByChannelName:
      return {
        ...state
      };

    case AC.Chat_ReceiveChatByChannelName:
      let receivedList = action as IReceiveChatByChannelName;
      state.socket.emit("FetchLatestMessageList", receivedList.messagesByChannelNameList);
      return {
        ...state,
        // messagesByChannelNameList: receivedList.messagesByChannelNameList
      };
    case AC.Chat_ReceiveSocketNewMessageList:
      let receivedList1 = action as IReceiveChatByChannelName;
      return {
        ...state,
        messagesByChannelNameList: receivedList1.messagesByChannelNameList
      };

    default:
      let defaultResult: any = state || unloadedState;
      return defaultResult;
  }
};

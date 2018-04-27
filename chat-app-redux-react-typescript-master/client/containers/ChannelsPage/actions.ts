import * as React from "react";

import * as AC from "./constants";

import { IFieldChangedAction, IResetValues,IAddChannel,IRequestAllChannel,IReceivedAllChannel } from "./actionModels";

// tslint:disable-next-line:typedef
export const channelsActionCreators = {
  channelFieldChanged: (fieldName: string, value: any): IFieldChangedAction => ({
    type: AC.Channels_FieldChanged,
    fieldname: fieldName,
    value: value
  }),
  channelResetValues:():IResetValues=>({
    type:AC.Channels_ResetValues
  }),
  channelAddChannel:(obj:any):IAddChannel=>({
    type:AC.Channels_AddChannel,
    channelObject:obj
  }),
  channelRequestAllChannels:():IRequestAllChannel=>({
    type:AC.Channels_RequestAllChannels
  }),
  channelReceivedAllChannels:(channelsList:any):IReceivedAllChannel=>({
    type:AC.Channels_ReceivedAllChannels,
    allChannels:channelsList
  }),
  channelReceivedFromSocketAllChannels:(channelsList:any):IReceivedAllChannel=>({
    type:AC.Channels_ReceiveSocketNewChannels,
    allChannels:channelsList
  }),

};
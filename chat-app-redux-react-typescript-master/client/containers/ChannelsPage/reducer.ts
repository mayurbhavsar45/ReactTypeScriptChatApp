// tslint:disable:quotemark
// tslint:disable:typedef
// tslint:disable:no-trailing-whitespace
import { Reducer } from "redux";
import { Action } from "redux";
import * as React from "react";

import * as AC from "./constants";
import { IFieldChangedAction, IResetValues, IReceivedAllChannel } from './actionModels';
// import {sockets} from "../ChatPage/reducer";
import * as socketIOClient from "socket.io-client";
// socket EndPoint
const endPoint = "http://localhost:8081";
 // const sockets = socketIOClient(endPoint);

export interface IChannels {
    name: string;
    id: string;
    private: boolean;
    between: any;
}
export interface IChannelState {
    name: string;
    id: string;
    private: boolean;
    between: any;
    allChannels:IChannels[];
    selectedChannelIndex?:number;
    socket?:any;
}

const unloadedState: IChannelState = {
    name:"",
    id: "",
    private:false,
    between:[],
    allChannels:[],
    selectedChannelIndex:null,
    socket:socketIOClient(endPoint)
};

type KnownAction = Action | IFieldChangedAction | IResetValues;


export const channels: Reducer<IChannelState> =
    (state: IChannelState = unloadedState, action: KnownAction): IChannelState => {
        switch (action.type) {
      
            case AC.Channels_FieldChanged:
            let actionValue2 = action as IFieldChangedAction;
            let fieldName = actionValue2.fieldname;
            let result = {
                ...state,
                [fieldName]: actionValue2.value
            };
            return result;

            case AC.Channels_AddChannel:
            return {
                ...state
            };

            case AC.Channels_RequestAllChannels:
            return {
                ...state
            };

            case AC.Channels_ReceivedAllChannels:
            let listOfChannels = action as IReceivedAllChannel;
            state.socket.emit("FetchLatestChannels", listOfChannels.allChannels);
            return {
                ...state,
                 // allChannels:listOfChannels.allChannels
            };

            case AC.Channels_SetValues:
            return {
                ...state
            };
            
            case AC.Channels_ReceiveSocketNewChannels:
            let listOfChannels1 = action as IReceivedAllChannel;
            return {
                ...state,
                 allChannels:listOfChannels1.allChannels
            };

            case AC.Channels_ResetValues:
            return unloadedState;
            default:
                let defaultResult :any = state || unloadedState;
                return defaultResult;
        }
    };

import { IChannels } from "./../ChannelsPage/reducer";
import { IChatState } from "../ChatPage/reducer";
const uri: string = "http://localhost:8081";

// tslint:disable:no-trailing-whitespace
// tslint:disable:typedef

export function GetAllChannels() {
  var url = uri + "/GetAllChannels";
  return fetch(url, {
    method: "GET"
  }).then(response => {
    return response.json();
  });
}
export function GetMessagesByChannel(channelName:string) {
  var url = uri + "/GetMessagesByChannel/"+channelName;
  return fetch(url, {
    method: "GET"
  }).then(response => {
    return response.json();
  });
}

export function AddChannel(channelObj: IChannels) {
  var url = uri + "/AddChannel";
  var data = "";
  if (channelObj !== null) {
    data = JSON.stringify({
      name: channelObj.name,
      id: channelObj.id,
      private: channelObj.private,
      between: channelObj.between
    });
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: data
    }).then(response => {
      return response.json();
    });
  }
}

export function SendMessage(messageObj: IChatState) {
  var url = uri + "/SendMessage";
  var data = "";
  if (messageObj !== null) {
		data = JSON.stringify(messageObj);
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: data
    }).then(response => {
      return response.json();
    });
  }
}

import { IRequestChatByChannelName } from "./actionModels";

// tslint:disable:typedef
import { call, takeEvery, takeLatest, put } from "redux-saga/effects";
import * as AC from "./constants";
import { ISendMessage, IReceiveChatByChannelName } from "./actionModels";
import { SendMessage, GetMessagesByChannel } from "../Api/ChatApi";
import { chatActionCreators } from "./actions";

function* requestSendMessage(request: ISendMessage) {
  try {
    const sentMessage = yield call(SendMessage, request.chatObj);
    if (sentMessage !== null) {
      yield call(fetchAllMessagesByChannelName, sentMessage.channelID);
      yield put(chatActionCreators.chatResetValues());
    }
  } catch (e) {
    console.log(e);
  }
}
function* requestChatMessageByChannel(request: IRequestChatByChannelName) {
  try {
    yield call(fetchAllMessagesByChannelName, request.channelName);
  } catch (e) {
    console.log(e);
  }
}

function* fetchAllMessagesByChannelName(channelName: string) {
  const listOfMessagesByChannel = yield call(GetMessagesByChannel, channelName);
  yield put(chatActionCreators.chatReceiveChatByChannelName(listOfMessagesByChannel));
}

export function* chatWatcherSaga() {
  yield takeLatest(AC.Chat_SendMessage, requestSendMessage);
  yield takeLatest(
    AC.Chat_RequestChatByChannelName,
    requestChatMessageByChannel
  );
}

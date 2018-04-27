// tslint:disable:typedef
import { call, takeEvery, takeLatest, put } from "redux-saga/effects";
import * as AC from "./constants";
import {
  IRequestAllChannel,
  IReceivedAllChannel,
  IAddChannel
} from "./actionModels";
import { GetAllChannels, AddChannel } from "../Api/ChatApi";
import { channelsActionCreators } from "./actions";


// ----------------
// saga
function* requestAllChannels(request: IRequestAllChannel) {
  try {
    yield call(fetchAllChannels);
  } catch (e) {
    console.log(e);
  }
}
function* requestAddChannel(request: IAddChannel) {
  try {
    const addChannel = yield call(AddChannel,request.channelObject);
    yield call(fetchAllChannels);
  } catch (e) {
    console.log(e);
  }
}

function* fetchAllChannels() {
  const listOfChannels = yield call(GetAllChannels);
    yield put(channelsActionCreators.channelReceivedAllChannels(listOfChannels));
}

export function* channelsWatcherSaga() {
  yield takeLatest(AC.Channels_RequestAllChannels, requestAllChannels);
  yield takeLatest(AC.Channels_AddChannel, requestAddChannel);
}

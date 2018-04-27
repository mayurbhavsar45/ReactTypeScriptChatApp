import * as React from "react";
import * as ReactDOM from "react-dom";
import { applyMiddleware, Store, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { syncHistoryWithStore } from "react-router-redux";

import rootReducer from "./reducers";
import { browserHistory } from "react-router";
import routes from "./routes/index";
import mySaga from "./sagas";

// tslint:disable:typedef

// import * as socketIOClient from "socket.io-client";
// // socket EndPoint
//  const endPoint = "http://localhost:8081";
// export const socket = socketIOClient(endPoint);


const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const store: Store<any> = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// export const history = syncHistoryWithStore(browserHistory, store);

 // sagaMiddleware.run(mySaga);
 mySaga.map((saga:any) => sagaMiddleware.run(saga));

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById("app")
);



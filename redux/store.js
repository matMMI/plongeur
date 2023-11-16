import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import crReducer from "./reducers";

const rootReducer = combineReducers({ crReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));

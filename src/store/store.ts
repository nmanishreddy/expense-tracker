import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { TransactionState } from "./Type";
import transactionReducer from './usereducer'

const saveToSessionStorage = (state: TransactionState) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("state", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

const loadFromSessionStorage = () => {
  try {
    const serialisedState = localStorage.getItem("state");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(transactionReducer, loadFromSessionStorage(), applyMiddleware(thunk));

store.subscribe(() => saveToSessionStorage(store.getState()));

export default store;
import { createStore } from "redux";
import { authReducer } from "./authReducer";
import storage from "./storage";

export let store;

const createAppStore = () => {
  let initialState = storage.getItem("auth") || {
    isLoggedIn: false,
    id: "",
  };

  store = createStore(authReducer, initialState);

  store.subscribe(() => {
    storage.setItem("auth", store.getState());
  });

  return store;
};

export default createAppStore;

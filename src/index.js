import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import i18n from "./locale/i18n";
// import AuthContextWrapper from "./state/AuthContextWrapper";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import createAppStore from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <AuthContextWrapper>
  <Provider store={createAppStore()}>
    <Router>
      <App />
    </Router>
  </Provider>
  /* </AuthContextWrapper> */
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import "./styles/index.scss";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <StyleProvider hashPriority="high">
        <Provider store={store}>
          <App />
        </Provider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

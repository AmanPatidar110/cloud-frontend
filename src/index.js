import React from "react";
import "./styles/index.scss";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ReactDOM from "react-dom";

const { darkAlgorithm } = theme;
ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: [darkAlgorithm],
        token: {
          colorPrimary: "#0000",
        },
      }}
    >
      <StyleProvider hashPriority="high">
        <Provider store={store}>
          <App />
        </Provider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

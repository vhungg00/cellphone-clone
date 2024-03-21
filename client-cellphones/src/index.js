import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/assets/css/bootstrap.min.css";
import "./styles/assets/css/default.css";
import "./styles/assets/css/animate.min.css";
import "./styles/assets/css/fontAwesome5Pro.css";
import "./styles/assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./appRedux/store";
import "antd/dist/antd.css";
import "leaflet/dist/leaflet.css";
import GlobalStyles from "./components/GlobalStyles";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
const gtmParams = {
  id: "G-F7234320ZL",
  dataLayerName: "customDataLayerName",
};
require("dotenv").config();
let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <GTMProvider state={gtmParams}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </PersistGate>
      </Provider>
    </GTMProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

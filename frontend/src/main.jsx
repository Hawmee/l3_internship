import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from './App.jsx'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./assets/fonts/fonts.css";
import currentUserReducer from './features/currentUser.js';
import tokenReducer from './features/token.js';
import backendUrlReducer from './features/urlBackend.js';
import toastConfigReducer from './features/toastConfig.js'
import "./global.css";
import router from "./routes/router.jsx";

const store = configureStore({
  reducer:{
    token : tokenReducer ,
    currentUser : currentUserReducer ,
    backendUrl : backendUrlReducer ,
    toastConfig : toastConfigReducer
  }
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </StrictMode>
);

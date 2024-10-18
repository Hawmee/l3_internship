import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from './App.jsx'
import "./assets/fonts/fonts.css";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import tokenReducer from './features/token.js'
import currentUserReducer from './features/currentUser.js'
import App from "./App.jsx";

const store = configureStore({
  reducer:{
    token : tokenReducer ,
    currentUser : currentUserReducer
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

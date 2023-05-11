import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor } from "./app/store";
import store from "./app/store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/lib/integration/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <Toaster />
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

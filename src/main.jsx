import { store } from "./store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter store={store}>
        <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
        </HelmetProvider>
    </BrowserRouter>
  </Provider>
);

// main
import { BrowserRouter } from "react-router-dom";
import RouteX from "./routes/routes";

import { Provider } from "react-redux";
import { AuthProvider } from "./context/authcontext";

import "./App.css";
import store from "./store/configureStore";


export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <RouteX />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}
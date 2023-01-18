import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import store from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

function PrivateRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      component={({ location }) => {
        return auth.isAuthenticated === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
            }}
          />
        );
      }}
    />
  );
}

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeEditorProvider>
            <BrowserRouter>
              <Switch>
                <Route path={`/auth`} component={AuthLayout} />
                <PrivateRoute path={`/admin`}>
                  <AdminLayout />
                </PrivateRoute>
                <Redirect from="/" to="/admin" exact />
              </Switch>
            </BrowserRouter>
          </ThemeEditorProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);

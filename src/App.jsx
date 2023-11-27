import { cacheRtl, theme } from "./common/utils/theme";

import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import { Authentication } from "./features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { setUser } from "./redux/reducers/userSlice";
import Character from "./features/character/Character";
import User from "./models/User";

function App() {
  const dispatch = useDispatch();

  const activeUser = useSelector((state) => state.user.user);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(new User(user)));
      } else {
        dispatch(setUser(null));
      }
    });

    //eslint-disable-next-line
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <CssVarsProvider theme={theme}>
        <CssBaseline>
          <HashRouter>
            <Routes>
              <Route
                element={activeUser ? <Home /> : <Navigate to="/register" />}
                path="/"
              />

              <Route
                element={activeUser ? <Navigate to="/" /> : <Authentication />}
                path="register"
              />
              <Route
                element={
                  activeUser ? <Character /> : <Navigate to="/register" />
                }
                path="/character/:id"
              />
            </Routes>
          </HashRouter>
        </CssBaseline>
      </CssVarsProvider>
    </CacheProvider>
  );
}

export default App;

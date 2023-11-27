import { cacheRtl, theme } from "./common/utils/theme";
import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Authentication } from "./features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { setUser } from "./redux/reducers/userSlice";
import User from "./models/User";
import { Character } from "./features/character";
import { Home } from "./features/home";

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
                element={activeUser ? <Home /> : <Navigate to="/auth" />}
                path="/"
              />

              <Route
                element={activeUser ? <Navigate to="/" /> : <Authentication />}
                path="/auth"
              />
              <Route
                element={activeUser ? <Character /> : <Navigate to="/auth" />}
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

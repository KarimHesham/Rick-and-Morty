import { cacheRtl, theme } from "./common/utils/theme";

import { CacheProvider } from "@emotion/react";
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import Authentication from "./features/authentication/Authentication";

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <CssVarsProvider theme={theme}>
        <CssBaseline>
          <HashRouter>
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Authentication />} path="register" />
            </Routes>
          </HashRouter>
        </CssBaseline>
      </CssVarsProvider>
    </CacheProvider>
  );
}

export default App;

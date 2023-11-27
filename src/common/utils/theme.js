import { experimental_extendTheme as extendTheme } from "@mui/material";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer],
});

export const theme = extendTheme({
  direction: "ltr",
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#FFF",
          default2: "#F3F6F9",
          paper: "#FFF",
          paper2: "#FFF",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#001E3C",
          default2: "#0A1929",
          paper: "#1E293B",
          paper2: "#132F4C",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: 16,
    h1: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 16,
    },
    button: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 16,
    },
    span: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
    },
  },
});

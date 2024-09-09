import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance
const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#000",
        },
        secondary: {
          main: "#fff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#fff",
        },
        secondary: {
          main: "#000",
        },
      },
    },
  },
});

export default theme;

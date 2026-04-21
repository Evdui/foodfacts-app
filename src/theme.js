import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // green theme
    },
    secondary: {
      main: "#ff6f00",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
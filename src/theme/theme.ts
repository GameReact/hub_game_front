import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1262ac",
      contrastText: "#fff",
    },
    secondary: {
      main: "#3E7CB5",
    },
  },
  typography: {
    fontFamily: "Kurale",
  },
});

export default theme;

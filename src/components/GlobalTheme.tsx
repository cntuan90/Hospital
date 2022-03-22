import { createTheme } from "@mui/material";

const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#53abe0",
      light: "#27a8e0",
    },
    secondary: {
      main: "#e91e63",
      light: "#f9e2e4",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    subtitle2: {
      fontSize: "12px",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          wordBreak: "break-word",
          padding: "8px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          a: {
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export default globalTheme;

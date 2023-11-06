import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008000",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          color: "black",
          height: "100%",
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;

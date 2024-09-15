import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A61D33",
      // dark: "#90192C",
      // light: "#f9dde1",
    },
    secondary: {
      main: "#bbdfb8",
      // light: "##EDF7ED",
    },
    text: {
      // primary: "#FFF",
      // secondary: "#666666",
      // disabled: "#AAAAAA",
    },
    // background: {
    // default: "#f3f3f3",
    // paper: "#ffffff",
    // },
    // action: {
    //   active: "#444",
    //   hover: "#444",
    //   hoverOpacity: 0.08,
    //   selected: "#003580",
    //   disabled: "#bbbbbb",
    //   disabledBackground: "#e0e0e0",
    //   focus: "#00509e",
    //   focusOpacity: 0.12,
    // },
  },
});

export default theme;

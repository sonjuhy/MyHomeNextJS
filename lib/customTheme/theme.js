import { Palette } from "@mui/icons-material";
import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";

const whiteBase = "#FFFFFF";
const whiteMain = alpha(whiteBase, 0.7);

const transBase = whiteBase;
const transMain = alpha(transBase, 0);

const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

export default theme;

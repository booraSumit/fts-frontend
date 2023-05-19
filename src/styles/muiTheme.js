import { createTheme } from "@mui/material";

const theme = createTheme({
  shape: {
    borderRadius: 8,
  },

  palette: {
    text: {
      secondaryText: "#6c757d",
      title: "#212529",
    },
    border: {
      color: "#e2e8f0",
    },
  },
});

theme.shadows[25] = "0px 10px 20px rgba(200, 208, 216, 0.3)";

export default theme;

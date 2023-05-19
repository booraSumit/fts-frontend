import { Box } from "@mui/material";
import React from "react";

export default function LottieSize(props) {
  return (
    <Box
      sx={{
        width: `${props?.width}px`,
        height: `${props?.height}px`,
        overflow: "hidden",
        border: `${props.border ? "1px solid red" : "none"}`,
        // transform: "translate(-50% , -50%)",
      }}
    >
      {props.children}
    </Box>
  );
}

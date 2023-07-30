import {
  AppBar,
  Box,
  Dialog,
  Slide,
  Toolbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";

import { showFIlePreviewer } from "../../store/ui";
import { useDispatch } from "react-redux";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const FilePreview = ({ file, open, onClose }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        transitionDuration={1}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: 123213,
            // backgroundColor: "white",
            borderRadius: "100%",
            right: "8.5rem",
            top: ".5rem",
          }}
          ml="auto"
          width="max-content"
        >
          <Tooltip title="close">
            <IconButton
              sx={{
                ":hover": {
                  backgroundColor: "#424649",
                },
              }}
              onClick={() => {
                dispatch(showFIlePreviewer());
                onClose();
              }}
            >
              <ClearRoundedIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <object
          data={file && URL.createObjectURL(file)}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>Unable to display PDF.</p>
        </object>
      </Dialog>
    </>
  );
};

export default FilePreview;

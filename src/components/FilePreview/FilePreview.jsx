import { AppBar, Box, Dialog, Slide, Toolbar } from "@mui/material";
import React from "react";

import { showFIlePreviewer } from "../../store/ui";
import { useDispatch } from "react-redux";

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
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <button
              onClick={() => {
                dispatch(showFIlePreviewer());
                onClose();
              }}
            >
              close
            </button>
          </Toolbar>
        </AppBar>
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

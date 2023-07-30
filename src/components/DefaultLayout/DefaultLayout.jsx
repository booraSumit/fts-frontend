import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Slide,
  Snackbar,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Drawer from "../SideNav/Drawer";
import Header from "../Header/Header";
import { drawerWidth } from "../../styles/utilStyles";
import useBoundingClientRect from "../../hooks/useBoundingClientRect";
import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import { disconnect, initializeSocket } from "../../store/socket";

const Transistion = React.forwardRef((props, ref) => (
  <Slide direction="down" ref={ref} {...props} />
));

export default function DefaultLayout(props) {
  const dispatch = useDispatch();
  const [showWelcome, setShowWelcome] = useState(false);
  const { isAuthenticated, user, token } = useSelector(
    (state) => state.entity.auth
  );
  const { socket, error, isConnected } = useSelector(
    (state) => state.entity.socket
  );
  const navigate = useNavigate();

  const showDrawer = useSelector((state) => state.ui.showDrawer);
  const breakPointlg = useMediaQuery(useTheme().breakpoints.up("lg"));
  const mainBound = useBoundingClientRect(".main");
  useEffect(() => {
    if (isAuthenticated) {
      setShowWelcome(true);
      // dispatch(initializeSocket());
    }
  }, [isAuthenticated]);

  return (
    <>
      <Snackbar
        TransitionComponent={Transistion}
        open={showWelcome}
        autoHideDuration={1500}
        onClose={() => setShowWelcome(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          // onClose={() => setShowWelcome(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Welcome User
        </Alert>
      </Snackbar>

      <Drawer />
      <Stack
        sx={{
          width: `calc(100% - ${
            showDrawer && breakPointlg ? drawerWidth : 0
          }px)`,
          ml: "auto",
          transition: `width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`,
        }}
      >
        <Header />
        <Box
          sx={{
            p: 4.5,
            backgroundColor: "#f1f5f9",
            height: `calc(100vh - ${mainBound.top}px)`,
            boxSizing: "border-box",
            overflowY: "auto",
          }}
          component="div"
          className="main"
        >
          <Breadcrumbs />
          {/* {props.children} */}
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}

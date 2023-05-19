import React, { useEffect } from "react";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import Drawer from "../SideNav/Drawer";
import Header from "../Header/Header";
import { drawerWidth } from "../../styles/utilStyles";
import useBoundingClientRect from "../../hooks/useBoundingClientRect";
import { Outlet, useNavigate } from "react-router-dom";

export default function DefaultLayout(props) {
  const { isAuthenticated } = useSelector((state) => state.entity.auth);
  const navigate = useNavigate();

  const showDrawer = useSelector((state) => state.ui.showDrawer);
  const breakPointlg = useMediaQuery(useTheme().breakpoints.up("lg"));
  const mainBound = useBoundingClientRect(".main");
  useEffect(() => {
    // if (!isAuthenticated) navigate("/sign-in");
  }, [isAuthenticated]);
  return (
    <>
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
          }}
          component="div"
          className="main"
        >
          {/* {props.children} */}
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}

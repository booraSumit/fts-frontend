import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { drawerWidth } from "../../styles/utilStyles";
import { toggleDrawer } from "../../store/ui";

export default function AppDrawer() {
  const dispatch = useDispatch();
  const showDrawer = useSelector((state) => state.ui.showDrawer);
  const breakPointlg = useMediaQuery(useTheme().breakpoints.up("lg"));
  return (
    <>
      <Drawer
        open={showDrawer}
        variant={`${breakPointlg ? "persistent" : "temporary"}`}
        ModalProps={{
          keepMounted: true,
        }}
        onClose={() => dispatch(toggleDrawer())}
        sx={{
          "& .MuiDrawer-paper": {
            // zIndex: (theme) => theme.zIndex.drawer - 200,
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      ></Drawer>
    </>
  );
}

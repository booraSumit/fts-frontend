import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { drawerWidth } from "../../styles/utilStyles";
import { toggleDrawer } from "../../store/ui";

import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/img/cblu logo.png";

const navigationList = [
  {
    lable: "New Case",
    path: "/editor",
    icon: <NoteAddRoundedIcon sx={{ color: "primary.main" }} />,
  },
];

export default function AppDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDrawer = useSelector((state) => state.ui.showDrawer);
  const breakPointlg = useMediaQuery(useTheme().breakpoints.up("lg"));
  const theme = useTheme();
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
      >
        <Box textAlign={"center"} my={2}>
          <img style={{ width: "80px" }} src={logo} alt="university logo" />
          <Typography mt={1} sx={{ fontSize: "14px", fontWeight: 500 }}>
            Chaudhary Bansi Lal University
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Toolbar>
          <List sx={{ width: 1 }}>
            {navigationList.map((navigation) => (
              <ListItem
                key={navigation.lable}
                onClick={() => {
                  navigate(navigation.path);
                  dispatch(toggleDrawer());
                }}
                sx={{
                  borderRadius: 1,
                  overflow: "hidden",
                  border: "1px solid transparent",
                }}
                disablePadding
              >
                <ListItemButton sx={{ color: "primary.main" }}>
                  <ListItemIcon>{navigation.icon}</ListItemIcon>
                  <ListItemText
                    sx={{ fontWeight: "600 " }}
                    primary={navigation.lable}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </Drawer>
    </>
  );
}

import React, { useState } from "react";
import {
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  ListItemButton,
  Divider,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { logout } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
import zIndex from "@mui/material/styles/zIndex";

const menu = {
  menuItem: {
    padding: "6px 4px",
    borderRadius: "8px",
  },
};

export default function AppAvatar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const showMenu = Boolean(anchorEl);

  const { isLoading } = useSelector((state) => state.entity.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };
  return (
    <>
      <Loading open={isLoading} />
      <Tooltip title={"User Profile"}>
        <IconButton>
          <Avatar onClick={(e) => setAnchorEl(e.target)} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={showMenu}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          mt: 2.7,
          //   filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        }}
        PaperProps={{
          sx: {
            px: 2,
            width: "220px",
            border: "1px solid #efefef",
          },
        }}
        elevation={0}
      >
        <MenuItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            "&:hover": { backgroundColor: "transparent" },
            cursor: "initial",
            borderRadius: "4px",
            padding: 0,
          }}
        >
          <Typography variant="h6">Sumit</Typography>
          <Typography variant="subtitle1" color={"GrayText"}>
            sumitbura75@gmail.com
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem style={menu.menuItem}>
          <ListItemIcon>
            <PersonOutlineRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem
          style={menu.menuItem}
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <TuneRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem style={menu.menuItem}>
          <ListItemIcon>
            <CreditCardRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Billing" />
        </MenuItem>
        <MenuItem style={menu.menuItem}>
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={handleLogout} />
        </MenuItem>
      </Menu>
    </>
  );
}

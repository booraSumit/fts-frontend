import React, { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  Button,
  Divider,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { logout } from "../../store/auth";
import Loading from "../loading";

const menu = {
  menuItem: {
    padding: "6px 4px",
    borderRadius: "8px",
  },
};

export default function AppAvatar() {
  const [showDialog, setShowDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const showMenu = Boolean(anchorEl);

  const { isLoading, user, error } = useSelector((state) => state.entity.auth);
  const { socket } = useSelector((state) => state.entity.socket);

  const dispatch = useDispatch();

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    // socket.disconnect();
  };

  useEffect(() => {
    if (error) {
      toast(error, {
        autoClose: 3000,
        progress: false,
        type: "error",
        position: "top-center",
      });
    }
  }, [error]);
  return (
    <>
      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <DialogContentText>Are You Sure !</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogout}>Yes</Button>
          <Button onClick={() => setShowDialog(false)}>No</Button>
        </DialogActions>
      </Dialog>
      <Loading open={isLoading} />
      <Tooltip title={"User Profile"}>
        <IconButton onClick={(e) => setAnchorEl(e.target)}>
          <Avatar />
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
          <Typography variant="h6">{user?.user_name}</Typography>
          <Typography variant="subtitle1" color={"GrayText"}>
            {user?.name}
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

        <MenuItem
          style={menu.menuItem}
          onClick={() => {
            setAnchorEl(null);
            setShowDialog(true);
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
}

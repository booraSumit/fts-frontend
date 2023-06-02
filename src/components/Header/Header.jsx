import React from "react";
import {
  AppBar,
  Box,
  Button,
  TextField,
  Toolbar,
  Stack,
  InputAdornment,
  IconButton,
  Badge,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../store/ui";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Avatar from "./Avatar";

export default function Header() {
  const dispatch = useDispatch();
  const showDrawer = useSelector((state) => state.ui.showDrawer);
  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: "white",
          py: 1,
          position: "relative",
        }}
        elevation={0}
      >
        <Toolbar>
          <Stack direction="row" gap={3}>
            <Button
              startIcon={
                showDrawer ? (
                  <ArrowBackIosNewRoundedIcon fontSize="large" />
                ) : (
                  <MenuRoundedIcon />
                )
              }
              variant="contained"
              size="large"
              onClick={() => dispatch(toggleDrawer())}
              sx={{ boxShadow: 0 }}
            >
              Menu
            </Button>

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search"
              variant="outlined"
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  fontWeight: "600",
                },
                "& .MuiInputBase-input": {
                  py: 1.2,
                },
                display: { xs: "none", md: "block" },
              }}
            />
          </Stack>
          <Stack
            sx={{ ml: "auto" }}
            direction="row"
            gap={3}
            alignItems="center"
          >
            <Badge badgeContent={4} color="error">
              <IconButton
                sx={{ borderRadius: "8px", border: "1px solid #efefef" }}
                size="medium"
              >
                <SearchRoundedIcon />
              </IconButton>
            </Badge>
            <Avatar />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import React from "react";
import { Box, Breadcrumbs, Link, Typography, styled } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
  ":hover": {
    textDecoration: "underline",
  },
}));

export default function AppBreadcrumbs() {
  const routeLocation = useLocation();
  let currentLocation = "";
  const crumbs = routeLocation.pathname
    .split("/")
    .filter((crumb) => crumb !== "");

  currentLocation = crumbs[crumbs.length - 1];

  return (
    <>
      {crumbs.length > 0 && (
        <Box pb={2}>
          <Breadcrumbs>
            <StyledNavLink to={"/"}>DashBoard</StyledNavLink>
            {crumbs.map((crumb) =>
              crumb !== currentLocation ? (
                <StyledNavLink key={crumb} to={crumb}>
                  {crumb}
                </StyledNavLink>
              ) : (
                <Typography color={"#111111"} key={crumbs}>
                  {crumb}
                </Typography>
              )
            )}
          </Breadcrumbs>
        </Box>
      )}
    </>
  );
}

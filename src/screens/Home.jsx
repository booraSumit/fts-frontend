import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import AggregateCard from "../components/Cards/AggregateCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { EDITOR } from "../routing/routePaths";

export default function Home() {
  const navigate = useNavigate();
  return (
    <Box>
      <Box>
        <Typography
          fontWeight={700}
          color="text.title"
          variant="h5"
          gutterBottom
        >
          New Case
        </Typography>
        <Stack>
          <Box
            padding={2}
            bgcolor={"white"}
            maxWidth={"200px"}
            sx={{ borderRadius: "8px", textAlign: "center", cursor: "pointer" }}
            boxShadow={25}
            border={1}
            borderColor="border.color"
            onClick={() => navigate(EDITOR)}
          >
            <FontAwesomeIcon
              icon={faFileLines}
              color="#1565c0"
              fontSize={48}
              bounce
            />
            <Typography variant="body" component="p" mt={2}>
              Create new case
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import FilePreview from "../FilePreview";
import { showFIlePreviewer } from "../../store/ui";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

export default function FileDetailsCard(props) {
  const { fileName, fileSize, file, onRemove, onPreview } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [currentFile, setCurrentFile] = useState(null);

  const handlePreview = () => {
    // console.log(file);
    onPreview(file);
    dispatch(showFIlePreviewer());
  };

  return (
    <>
      <Box
        // sx={{ maxWidth: 275 }}
        width={{ xs: "100%", sm: 300 }}
        border={"solid"}
        borderRadius={4}
        borderColor={"border.color"}
        py={2}
        px={3}
        sx={{ boxSizing: "border-box" }}
      >
        {/* header */}
        <Box sx={{ textAlign: "right" }} mb={3}>
          <Tooltip title="Remove">
            <IconButton
              sx={{ mr: -2, mt: -1 }}
              onClick={() => {
                onRemove(fileName);
              }}
            >
              <ClearRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {/* body  */}
        <Stack my={1} direction="column" alignItems="center" overflow="hidden">
          <FontAwesomeIcon
            fontSize={80}
            icon={faFilePdf}
            color={theme.palette.primary.main}
          />
          <Tooltip title={fileName ? fileName : "No File "}>
            <Typography noWrap gutterBottom mt={3} textAlign="center">
              {fileName ? fileName : "No File "}
            </Typography>
          </Tooltip>
        </Stack>
        <Divider sx={{ my: 2 }} />
        {/* footer */}
        <Stack direction="row" justifyContent="space-between">
          <div>
            <Typography>File Size:</Typography>
            <Typography variant="body2" color="text.secondary">
              {fileSize ? Math.ceil(+fileSize / 1024) : "No file"} kb
            </Typography>
          </div>
          <Button onClick={handlePreview}>Preview</Button>
        </Stack>
      </Box>
    </>
  );
}

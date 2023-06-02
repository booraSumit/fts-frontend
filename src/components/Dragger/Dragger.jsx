import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

const DraggableFileUpload = ({
  acceptedFileTypes,
  maxFileSize,
  onFileUpload,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    const fileArr = [];
    files.forEach((file) => {
      if (acceptedFileTypes && acceptedFileTypes.indexOf(file.type) === -1) {
        console.error("Invalid file type!");
        return;
      }

      if (maxFileSize && file.size > maxFileSize) {
        console.error("File size exceeds the limit!");
        return;
      }

      // Perform file upload logic here
      fileArr.push(file);
      //   console.log(file);
    });
    onFileUpload(fileArr);
  };

  //   const onFileUpload = (file) => {};

  return (
    <Box
      component={"div"}
      sx={{
        width: "100%",
        height: "200px",
        border: `2px dashed ${isDragging ? "#1565c0" : " #e2e8f0"}`,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Stack alignItems="center">
        <InboxOutlinedIcon
          sx={{ fontSize: 80 }}
          color={isDragging ? "secondary" : "primary"}
        />
        <Typography variant="h6" color={isDragging ? "secondary" : "primary"}>
          {isDragging ? "Drop files here" : "Drag and drop files here"}
        </Typography>
        <Typography
          variant="body1"
          component="label"
          htmlFor="fileInput"
          color="textSecondary"
          textAlign="center"
          sx={{ cursor: "pointer" }}
        >
          Click to browse
          <input
            id="fileInput"
            type="file"
            hidden
            onChange={handleFileChange}
            multiple
            value={""}
          />
        </Typography>
      </Stack>
    </Box>
  );
};

export default DraggableFileUpload;

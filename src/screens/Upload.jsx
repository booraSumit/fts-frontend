import React, { useState } from "react";

import Dragger from "../components/Dragger";
import FilePreview from "../components/FilePreview";

import { Badge, Box, Card, IconButton, Stack, Tooltip } from "@mui/material";
import FileDetailsCard from "../components/Cards/FileDetailsCard";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import FormDrawer from "../components/Drawer/FormDrawer";

const acceptFile = [
  // "application/msword",
  // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
];

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [currentPreviewFile, setCurrentPreviewFile] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleFileUpload = (file) => {
    const uniqueFiles = [];
    file.forEach((newFile) => {
      const isDuplicate = files.some(
        (existingFile) => existingFile.name === newFile.name
      );
      if (isDuplicate) {
        toast("Duplicate File Found!", {
          type: "error",
          autoClose: 3000,
        });
      }
      if (!isDuplicate) {
        uniqueFiles.push(newFile);
      }
    });
    setFiles([...files, ...uniqueFiles]);
  };

  const handleRemove = (name) => {
    const fileArr = files.filter((file, idx) => file.name != name);
    setFiles(fileArr);
  };

  const handlePreview = (file) => {
    setCurrentPreviewFile(file);
  };

  const handlePreviewClose = () => {
    setCurrentPreviewFile(null);
  };

  return (
    <Box>
      <Dragger
        onFileUpload={handleFileUpload}
        maxFileSize={1024 * 1024 * 10 /*upload size 10mb */}
        acceptedFileTypes={acceptFile}
      />

      <Stack direction="row" flexWrap="wrap" gap={2} mt={5}>
        {files.length > 0 &&
          files.map((file, idx) => (
            <FileDetailsCard
              key={idx}
              fileName={file.name}
              file={file}
              fileSize={file.size}
              onRemove={handleRemove}
              onPreview={handlePreview}
            />
          ))}
      </Stack>
      <FilePreview
        open={Boolean(currentPreviewFile)}
        file={currentPreviewFile}
        onClose={handlePreviewClose}
      />
      {files.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            // zIndex: 20000,
          }}
        >
          <Tooltip title="Oper Drawer" onClick={() => setShowDrawer(true)}>
            <IconButton>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <FormDrawer files={files} open={showDrawer} closeDrawer={setShowDrawer} />
    </Box>
  );
}

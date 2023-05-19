import React from "react";

import Dragger from "../components/Dragger";

const acceptFile = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
];

export default function Upload() {
  const handleFileUpload = (files) => {
    console.log(files);
  };
  return (
    <div>
      <Dragger
        onFileUpload={handleFileUpload}
        maxFileSize={1024 * 1024 * 10 /*upload size 10mb */}
        acceptedFileTypes={acceptFile}
      />
    </div>
  );
}

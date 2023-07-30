import React, { useRef, createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { SpeedDial, SpeedDialAction, Tooltip } from "@mui/material";

import SunEditor from "suneditor-react";
import plugins from "suneditor/src/plugins";
import katex from "katex";
import "suneditor/dist/css/suneditor.min.css";

import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormDrawer from "../Drawer/FormDrawer";

const btnList = [
  ["undo", "redo"],
  ["font", "fontSize"],
  ["blockquote"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor", "textStyle"],
  ["removeFormat"],
  ["outdent", "indent"],
  ["align", "horizontalRule", "list", "lineHeight"],
  ["table", "link", "image", "math"],
  ["fullScreen"],
  ["preview", "print"],
  ["save"],
];

export default function Editor() {
  const editor = useRef();
  const [editorContainerBound, setEditorContainerBound] = useState(0);
  const [hideSpeedDial, setHideSpeedDial] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const headerBound = useSelector((state) => state.ui.headerBound);

  const hideDrawer = (value) => {
    setShowDrawer(value);
    setHideSpeedDial(value);
  };

  const handleSpeedDialClick = () => {
    const content = editor.current.getContents();
    // console.log(content);
    setHideSpeedDial(true);
    setShowDrawer(true);
  };

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  function handleImageUploadError(errorMessage, result) {
    console.log(errorMessage, result);
  }
  // function handleImageUploadBefore(files, info, uploadHandler) {
  //   // uploadHandler is a function
  //   console.log(files, info);

  //   uploadHandler(files, "Error while uploading an Image");
  // }
  const handleSave = (content) => {
    console.log(content);
    // setShowDrawer(true);
  };

  useEffect(() => {
    const resizeErrorHandle = (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    };
    window.addEventListener("error", resizeErrorHandle);
    return () => {
      window.removeEventListener("error", resizeErrorHandle);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", beforeunload);
    window.addEventListener("unload", unload);
    return () => {
      window.removeEventListener("beforeunload", beforeunload);
      window.removeEventListener("unload", unload);
    };
  }, []);

  function beforeunload() {
    console.log("calling before unload");
  }
  function unload() {
    console.log("calling before unload");
  }

  return (
    <>
      <div
        className="editorContainer"
        ref={(el) => {
          if (!el) return;
          setEditorContainerBound(el.getBoundingClientRect().top);
        }}
      >
        <SunEditor
          setAllPlugins
          getSunEditorInstance={getSunEditorInstance}
          height={`calc(100vh - ${
            headerBound?.bottom + editorContainerBound + 20
          }px)`}
          onSave={handleSave}
          onImageUploadError={handleImageUploadError}
          setOptions={{
            katex: katex,
            plugins: plugins,
            buttonList: btnList,
            imageMultipleFile: true,
          }}
        />
      </div>
      <Tooltip title="Send Document">
        <SpeedDial
          ariaLabel="Send"
          icon={<FontAwesomeIcon icon={faShareFromSquare} size="xl" />}
          sx={{ position: "absolute", bottom: 48, right: 48 }}
          hidden={hideSpeedDial}
          onClick={handleSpeedDialClick}
        ></SpeedDial>
      </Tooltip>
      <FormDrawer open={showDrawer} closeDrawer={hideDrawer} />
    </>
  );
}

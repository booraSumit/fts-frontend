import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Joi from "joi";
import Lottie from "react-lottie-player";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { fetchDepartment } from "../../store/department";
import { formDrawerWidth } from "../../styles/utilStyles";
import { sendFile } from "../../store/file";
import uploadingLottie from "../../assets/lottie/uploading.json";
import doneLottie from "../../assets/lottie/done.json";

const validate = (value) => {
  const schema = Joi.object({
    file_id: Joi.string().min(5).required(),
    subject: Joi.string().min(10).required(),
    description: Joi.string().min(0).optional(),
    
    recipient_department_id: Joi.string().length(24).hex().required(),
  }).options({ abortEarly: false, allowUnknown: true });
  return schema.validate(value);
};

export default function FormDrawer(props) {
  const { open, closeDrawer } = props;

  const [formError, setFormError] = useState({});
  const [showUploadingModel, setShowUploadingModel] = useState(false);
  const [progress, setProgress] = useState(0);

  const { departments, error } = useSelector(
    (state) => state.entity.department
  );
  const contoller = new AbortController();
  const signal = contoller.signal;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.entity.auth);
  const { error: fileError } = useSelector((state) => state.entity.file);

  const [form, setForm] = useState({
    file_id: "",
    subject: "",
    description: "",
    sender_id: user?.dept_id,
    recipient_department_id: "",
  });

  if (fileError)
    toast(fileError, {
      autoClose: 3000,
      progress: false,
      type: "error",
      position: "top-center",
    });
  if (error)
    toast("An error occured during fetching department", {
      autoClose: 3000,
      progress: false,
      type: "error",
      position: "top-center",
    });

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (formError[field] && formError[field] != null)
      setFormError({
        ...formError,
        [field]: null,
      });
  };

  const handleSubmit = () => {
    const { error } = validate(form);
    const errorList = {};
    if (error) {
      error.details.forEach((err) => {
        errorList[err.path[0]] = err.message;
      });
      return setFormError(errorList);
    }

    const formData = new FormData();
    console.log(props.files);
    formData.append("files", ...props.files);
    for (const key in form) {
      if (form.hasOwnProperty(key)) {
        formData.append(key, form[key]);
      }
    }
    const progress = (p) => {
      setProgress(p);
      if (p == 100) setShowUploadingModel(false);
    };
    setShowUploadingModel(true);
    dispatch(sendFile(formData, signal, progress));
  };

  useEffect(() => {
    dispatch(fetchDepartment());
  }, []);

  return (
    <>
      <Dialog
        open={showUploadingModel}
        // onClose={() => {
        //   setShowUploadingModel(false);
        // }}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent sx={{ textAlign: "center" }}>
          {progress == 100 ? (
            <Lottie
              play
              loop
              animationData={doneLottie}
              style={{ width: 280, margin: "auto" }}
            />
          ) : (
            <Lottie
              play
              loop
              animationData={uploadingLottie}
              style={{ width: 280, margin: "auto" }}
            />
          )}
          <DialogContentText sx={{ color: "text.primary" }}>
            Uploading...
          </DialogContentText>
          <Stack mt={3} gap={2} direction={"row"} alignItems="center">
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 16, borderRadius: 8, width: "100%" }}
            />
            <Typography>{progress}%</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowUploadingModel(false);
              contoller.abort();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="right"
        open={open}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            // zIndex: (theme) => theme.zIndex.drawer - 200,
            boxSizing: "border-box",
            width: { xs: "100%", sm: formDrawerWidth },
          },
        }}
      >
        <Box textAlign="right" p={1}>
          <IconButton onClick={() => closeDrawer(!open)}>
            <ClearRoundedIcon />
          </IconButton>
        </Box>
        <Stack p={2} gap={3}>
          <Box>
            <InputLabel sx={{ mb: 1 }}>File Id</InputLabel>

            <TextField
              fullWidth
              hiddenLabel
              error={!!formError.file_id}
              helperText={formError.file_id}
              placeholder="Enter File Number"
              type="Number"
              value={form["file_id"]}
              onChange={(e) => setField("file_id", e.target.value)}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  fontWeight: "500",
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                },
              }}
            />
          </Box>
          <Box>
            <InputLabel sx={{ mb: 1 }}>Subject</InputLabel>

            <TextField
              fullWidth
              hiddenLabel
              error={!!formError.subject}
              helperText={formError.subject}
              placeholder="Subject"
              type="text"
              value={form["subject"]}
              onChange={(e) => setField("subject", e.target.value)}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  fontWeight: "500",
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                },
              }}
            />
          </Box>
          <Box>
            <InputLabel sx={{ mb: 1 }}>Send To</InputLabel>
            <Select
              sx={{
                width: "100%",
                "& .MuiInputBase-input::placeholder": {
                  fontWeight: "600",
                },
                "& .MuiInputBase-input": {
                  py: 1.5,
                },
              }}
              error={!!formError.recipient_department_id}
              value={form["recipient_department_id"]}
              defaultValue={""}
              onChange={(e) =>
                setField("recipient_department_id", e.target.value)
              }
            >
              <MenuItem value="">Select Department</MenuItem>
              {departments.map((department, idx) => (
                <MenuItem key={department.name} value={department.dept_id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <InputLabel sx={{ mb: 1 }}>Description</InputLabel>
            <TextField
              error={formError.description}
              helperText={formError.description}
              value={form["description"]}
              onChange={(e) => setField("description", e.target.value)}
              multiline
              rows={10}
              sx={{ width: "100%" }}
            />
          </Box>
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            endIcon={<SendRoundedIcon />}
          >
            Send
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}

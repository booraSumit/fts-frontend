import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Stack,
} from "@mui/material";
import Joi from "joi";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import cbluLogo from "../../assets/img/cblu logo.png";

import { login } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
import { toast } from "react-toastify";

const validate = (value) => {
  const schema = Joi.object({
    userName: Joi.string().max(50).min(3).required().label("email"),

    password: Joi.string().min(8).max(50).required(),
  }).options({ abortEarly: false, allowUnknown: true });

  return schema.validate(value);
};

export default function Signin() {
  const dispatch = useDispatch();
  const {
    isAuthenticated,
    isLoading,
    error: apiError,
  } = useSelector((state) => state.entity.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const [error, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (error[field] && error[field] != null)
      setErrors({
        ...error,
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
      return setErrors(errorList);
    }
    dispatch(login(form));
  };

  useEffect(() => {
    // console.log(isAuthenticated);
    if (isAuthenticated) navigate("/");
    if (apiError)
      toast(apiError, {
        autoClose: 3000,
        progress: false,
        type: "error",
        position: "top-center",
      });
  }, [isAuthenticated, apiError]);

  return (
    <>
      <Loading open={isLoading} />
      <Stack
        sx={{
          background:
            "linear-gradient(187deg, rgba(172,90,190,1) 0%, rgba(82,90,199,1) 100%)",
          overflowY: "auto",
        }}
        justifyContent="center"
        alignItems="center"
        height={"100vh"}
        px={2}
      >
        <Stack
          direction={{ sx: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={3}
          sx={{ backgroundColor: "white", borderRadius: "15px" }}
          boxShadow={25}
          p={{ xs: "2rem 0", sm: 10 }}
        >
          <Box maxWidth={{ xs: "180px", md: "280px" }}>
            <img
              style={{ width: "100%" }}
              src={cbluLogo}
              alt="log in illustration"
            />
          </Box>

          <Box p={4} maxWidth={"350px"}>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight={500}
              textAlign={"center"}
              color={"#111"}
              mb={3}
            >
              Login
            </Typography>
            {/* <Typography variant="h5" my={1}>
              Login your account
            </Typography> */}
            <Box>
              <TextField
                fullWidth
                hiddenLabel
                error={!!error.userName}
                helperText={error.userName}
                placeholder="User Name"
                type="text"
                value={form["userName"]}
                onChange={(e) => setField("userName", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faUser} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    fontWeight: "600",
                  },
                  "& .MuiInputBase-input": {
                    py: 1.5,
                  },
                  my: 2,
                }}
              />
              <TextField
                fullWidth
                hiddenLabel
                error={!!error.password}
                helperText={error.password}
                placeholder="Password"
                type="password"
                value={form["password"]}
                onChange={(e) => setField("password", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faLock} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputBase-input::placeholder": {
                    fontWeight: "600",
                  },
                  "& .MuiInputBase-input": {
                    py: 1.5,
                  },
                  my: 2,
                }}
              />
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ my: 2 }}
                onClick={handleSubmit}
              >
                Log in
              </Button>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

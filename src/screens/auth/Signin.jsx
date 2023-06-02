import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
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

const validate = (value) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .label("email"),

    password: Joi.string().min(8).max(50).required(),
  }).options({ abortEarly: false, allowUnknown: true });

  return schema.validate(value);
};

export default function Signin() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.entity.auth
  );
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    device_id: "window",
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
    console.log(isAuthenticated);
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <>
      <Loading open={isLoading} />
      <Stack justifyContent="center" alignItems="center" height={"100vh"}>
        <Stack
          direction={{ sx: "column", md: "row" }}
          alignItems="center"
          gap={3}
        >
          <Box maxWidth={{ xs: "250px", md: "300px" }}>
            <img
              style={{ width: "100%" }}
              src={cbluLogo}
              alt="log in illustration"
            />
          </Box>

          <Box p={4}>
            <Typography
              variant="h4"
              gutterBottom
              fontWeight={500}
              textAlign={"center"}
              color={"primary.main"}
              mb={4}
            >
              Welcome Back
            </Typography>
            <Typography variant="h5" my={1}>
              Login your account
            </Typography>
            <Box>
              <TextField
                fullWidth
                hiddenLabel
                error={!!error.email}
                helperText={error.email}
                placeholder="Email"
                type="email"
                value={form["email"]}
                onChange={(e) => setField("email", e.target.value)}
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

import React, { useState } from "react";
import { Box, Button, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment    } from "@mui/material";
import { useTranslation } from 'react-i18next'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function Security() {

  //Translation
  const { t } = useTranslation()
  //Password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //Confirm Password
  const [cfpassword, setCFPassword] = useState("");
  const [showCFPassword, setShowCFPassword] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
      autoComplete="off"
    >
      <Typography
        variant="h5"
        sx={{
          width: "100%",
        }}
      >
        Change Password
      </Typography>

      <TextField
        label="Last Password"
        type="password"
        variant="outlined"
        fullWidth
        required
      />

      <FormControl fullWidth>
        <InputLabel>{t("Password")}</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </InputAdornment>
          }
          type={!showPassword ? "password" : "text"}
          label={t("Password ")}
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>{t("ConfirmPassword")}</InputLabel>
        <OutlinedInput
          endAdornment={
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setShowCFPassword(!showCFPassword);
              }}
            >
              {!showCFPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </InputAdornment>
          }
          type={!showCFPassword ? "password" : "text"}
          label={t("ConfirmPassword")}
          autoComplete="off"
          value={cfpassword}
          onChange={(e) => setCFPassword(e.target.value)}
        />
      </FormControl>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" type="submit">
          Change Password
        </Button>
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, setLoading } from "~/libs/features/loading/loadingSlice";
import { registerDesigner } from "./service";
import { Link, useNavigate } from "react-router-dom";
import { setPopup } from "~/libs/features/popup/popupSlice";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function Register() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading.value);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(true);
  const [errorFullname, setErrorFullname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorGender, setErrorGender] = useState("");
  const [errorAddress, setErrorAddress] = useState("");

  const handleUserRegister = async (event) => {
    event.preventDefault();
    dispatch(setLoading());

    const data = {
      fullname,
      email,
      password,
      confirmPassword,
      phone,
      gender,
      address,
    };

    const res = await registerDesigner(data);
    dispatch(clearLoading());

    if (res.success) {
      const dataPopup = {
        type: "success",
        message: res.message,
      };
      dispatch(setPopup(dataPopup));
      navigate("/auth/login");
    } else {
      res.message.map((msg) => {
        if (
          msg.vi == t("EmailAlreadyExists") ||
          msg.en == t("EmailAlreadyExists")
        ) {
          setErrorEmail("EmailAlreadyExists");
        }
        if (
          msg.vi == t("PhoneNumberAlreadyExists") ||
          msg.en == t("PhoneNumberAlreadyExists")
        ) {
          setErrorPhone("PhoneNumberAlreadyExists");
        }
      });
      const dataPopup = {
        type: "error",
        message: res.message,
      };
      dispatch(setPopup(dataPopup));
    }
  };

  useEffect(() => {
    const regexFullname = /^(?! )[a-zA-Z\s\u{0080}-\u{FFFF}]{2,50}(?<! )$/u;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexPassword = /^(?!\s)[\S\s]{6,30}$/;
    const regexPhone = /^0[9|8|1|7|3|5]([-. ]?[0-9]{7,9})$/;

    // fullname
    if (!fullname || fullname.trim() === "") {
      setErrorFullname("PleaseEnterYourFullName");
    } else if (!regexFullname.test(fullname)) {
      setErrorFullname("RegexFullname");
    } else {
      setErrorFullname("");
    }

    // email
    if (!email || email.trim() === "") {
      setErrorEmail("PleaseEnterYourEmail");
    } else if (!regexEmail.test(email)) {
      setErrorEmail("RegexEmail");
    } else {
      setErrorEmail("");
    }

    // password
    if (!password || password.trim() === "") {
      setErrorPassword("PleaseEnterYourPassword");
    } else if (!regexPassword.test(password)) {
      setErrorPassword("RegexPassword");
    } else {
      setErrorPassword("");
    }

    // confirmPassword
    if (!confirmPassword || confirmPassword.trim() === "") {
      setErrorConfirmPassword("PleaseEnterConfirmPassword");
    } else if (password !== confirmPassword) {
      setErrorConfirmPassword("RegexConfirmPassword");
    } else {
      setErrorConfirmPassword("");
    }

    // phone
    if (!phone || phone.trim() === "") {
      setErrorPhone("PleaseEnterYourPhoneNumber");
    } else if (!regexPhone.test(phone)) {
      setErrorPhone("RegexPhoneNumber");
    } else {
      setErrorPhone("");
    }

    // gender
    if (!gender || gender.trim() === "") {
      setErrorGender("PleaseChooseYourGender");
    } else {
      setErrorGender("");
    }

    // address
    if (!address || address.trim() === "") {
      setErrorAddress("PleaseEnterYourAddress");
    } else {
      setErrorAddress("");
    }
  }, [fullname, email, password, confirmPassword, phone, gender, address]);

  useEffect(() => {
    if (
      errorFullname ||
      errorEmail ||
      errorPassword ||
      errorConfirmPassword ||
      errorPhone ||
      errorGender ||
      errorAddress
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }, [
    errorFullname,
    errorEmail,
    errorPassword,
    errorConfirmPassword,
    errorPhone,
    errorGender,
    errorAddress,
  ]);

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("CreateAccount")}
        </title>
      </Helmet>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "700px" },
            maxWidth: "700px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "uppercase",
                paddingBottom: "5px",
              }}
            >
              {t("Register")}
            </span>
            <span
              style={{
                fontSize: "15px",
                paddingBottom: "10px",
              }}
            >
              {t(
                "RegisterToShopAndTrackOrdersSaveFavoriteProductListsAndReceiveManyOffers"
              )}
            </span>
          </Box>

          <form
            onSubmit={handleUserRegister}
            style={{
              padding: "10px 0px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              id="fullname"
              autoComplete="off"
              label={t("Fullname")}
              variant="outlined"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              helperText={t(errorFullname)}
              color={!errorFullname ? "success" : "error"}
            />
            <TextField
              sx={{ width: "100%" }}
              id="email"
              autoComplete="off"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText={t(errorEmail)}
              color={!errorEmail ? "success" : "error"}
            />
            <TextField
              sx={{ width: "100%" }}
              type="password"
              id="password"
              label={t("Password")}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={t(errorPassword)}
              color={!errorPassword ? "success" : "error"}
            />
            <TextField
              sx={{ width: "100%" }}
              type="password"
              id="confirmPassword"
              label={t("ConfirmPassword")}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText={t(errorConfirmPassword)}
              color={!errorConfirmPassword ? "success" : "error"}
            />
            <TextField
              sx={{ width: "100%" }}
              id="phone"
              autoComplete="off"
              label={t("PhoneNumber")}
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              helperText={t(errorPhone)}
              color={!errorPhone ? "success" : "error"}
            />
            <FormControl fullWidth>
              <InputLabel
                id="select-gender"
                color={!errorGender ? "success" : "error"}
              >
                {t("Gender")}
              </InputLabel>
              <Select
                labelId="select-gender"
                id="gender-select"
                value={gender}
                label={t("Gender")}
                onChange={(e) => setGender(e.target.value)}
                color={!errorGender ? "success" : "error"}
              >
                <MenuItem value={"male"}>{t("Male")}</MenuItem>
                <MenuItem value={"female"}>{t("Female")}</MenuItem>
              </Select>
              <FormHelperText>{t(errorGender)}</FormHelperText>
            </FormControl>

            <TextField
              sx={{ width: "100%" }}
              id="address"
              autoComplete="off"
              label={t("Address")}
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              helperText={t(errorAddress)}
              color={!errorAddress ? "success" : "error"}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading || error}
            >
              {t("CreateAccountDesigner")}
            </Button>
          </form>

          <Link to="/auth/login" style={{ width: "100%" }}>
            <Button variant="outlined" style={{ width: "100%" }}>
              {t("YouAlreadyHaveAnAccount")}
            </Button>
          </Link>

          <Box
            sx={{
              fontSize: "15px",
              paddingBottom: "10px",
              userSelect: "none",
              paddingTop: "15px",
            }}
          >
            {t("ByClicking")}{" "}
            <span style={{ fontWeight: "bold" }}>
              {t("CreateAccountDesigner")}
            </span>
            , {t("YouAgreeToOurTermsOfServiceAndPrivacyPolicy")}.
          </Box>
        </Box>
      </Box>
    </>
  );
}

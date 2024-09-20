import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registerSupplier } from "./service";
import { setPopup } from "~/libs/features/popup/popupSlice";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { setUser } from "~/libs/features/user/userSlice";

export default function RegisterSupplier() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegisterSupplier = async () => {
    setLoading(true);

    const data = {
      role: "supplier",
    };

    try {
      const res = await registerSupplier(data, user.data.id);
      if (res.success) {
        setOpenDialog(true);
        const dataPopup = {
          type: "success",
          message: [
            {
              vi: "Đăng ký nhà cung cấp thành công.",
              en: "Supplier registration successful.",
            },
          ],
        };
        dispatch(setPopup(dataPopup));
        dispatch(
          setUser({
            ...user.data,
            role: "supplier",
          })
        );
      } else {
        const dataPopup = {
          type: "error",
          message: [
            {
              vi: "Có lỗi xảy ra trong quá trình đăng ký nhà cung cấp.",
              en: "An error occurred during the supplier registration process.",
            },
          ],
        };
        dispatch(setPopup(dataPopup));
      }
    } catch (error) {
      console.error(error);
      dispatch(
        setPopup({
          type: "error",
          message: t("An error occurred. Please try again later."),
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("RegisterSupplier")}
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
          }}
        >
          <TextField
            InputLabelProps={{ shrink: true }}
            label={t("Fullname")}
            variant="outlined"
            value={user.data.fullname}
            disabled
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label={t("Email")}
            variant="outlined"
            value={user.data.email}
            disabled
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label={t("Phone")}
            variant="outlined"
            value={user.data.phone}
            disabled
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label={t("Address")}
            variant="outlined"
            value={user.data.address}
            disabled
            sx={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            onClick={handleRegisterSupplier}
            disabled={loading}
          >
            {t("Register as Supplier")}
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{t("Confirmation")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Successfully updated to Supplier role!")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              navigate("/");
            }}
            color="primary"
          >
            {t("OK")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

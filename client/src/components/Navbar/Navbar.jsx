import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.value);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "60px",
        padding: "0px 20px",
      }}
    >
      {/* Left */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="logo" width={"147px"} height={"40px"} />
        </Link>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <Button className="products">{t("Products")}</Button>
          </Link>
          <Link
            to="/about-us"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button className="about-us">{t("AboutUs")}</Button>
          </Link>
          <Link
            to="/contact-us"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button className="contact-us">{t("ContactUs")}</Button>
          </Link>
          <Link
            to="https://www.facebook.com/aptech.fpt"
            style={{ display: "flex", alignItems: "center" }}
            target="_blank"
          >
            <Button className="fanpage">Fanpage</Button>
          </Link>
        </Box>
      </Box>

      {/* Right */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {!user.exist && (
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Link
              to="/auth/login"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Button className="login">{t("Login")}</Button>
            </Link>
            <Link
              to="/auth/register"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Button className="create-account" variant="contained">
                {t("CreateAccount")}
              </Button>
            </Link>
          </Box>
        )}
        <NavbarMenu />
      </Box>
    </Box>
  );
}

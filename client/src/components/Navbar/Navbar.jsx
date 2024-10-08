import { Box, Button, Tooltip, IconButton, Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";
import { useTranslation } from "react-i18next";
import Cart from "~/components/Cart/Cart";
import NotificationsIcon from "@mui/icons-material/Notifications";

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
      {/* Left Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/Images/Logo/logo-navbar-white.png"
            alt="logo"
            height="50px"
          />
        </Link>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Link to="/product" style={{ display: "flex", alignItems: "center" }}>
            <Button>{t("Products")}</Button>
          </Link>
          <Link to="/gallery" style={{ display: "flex", alignItems: "center" }}>
            <Button>Gallery</Button>
          </Link>
          <Link to="/about-us" style={{ display: "flex", alignItems: "center" }}>
            <Button>{t("About Us")}</Button>
          </Link>
          <Link
            to="/contact-us"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button>{t("Contact Us")}</Button>
          </Link>
          <Link to="/blog" style={{ display: "flex", alignItems: "center" }}>
            <Button>Blog</Button>
          </Link>
          <Link to="/faq" style={{ display: "flex", alignItems: "center" }}>
            <Button>FAQ</Button>
          </Link>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {!user.exist ? (
          <Box
            sx={{
              display: { xs: "none", md: "flex", width: "100%" },
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Link to="/auth/register-designer" style={{ display: "flex", alignItems: "center" }}>
              <Button>{t("CreateAccountDesigner")}</Button>
            </Link>
            <Link to="/auth/login" style={{ display: "flex", alignItems: "center" }}>
              <Button>{t("Login")}</Button>
            </Link>
            <Link to="/auth/register" style={{ display: "flex", alignItems: "center" }}>
              <Button variant="contained">{t("CreateAccount")}</Button>
            </Link>
          </Box>
        ) : (
          <>
            <Cart />
            <Link to="/user/notification">
              <Tooltip>
                <IconButton
                  aria-label="notifications"
                  color="primary"
                  sx={{
                    marginLeft: "10px",
                  }}
                >
                  <Badge color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
          </>
        )}
        <NavbarMenu />
      </Box>
    </Box>
  );
}

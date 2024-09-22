import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, List } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "~/libs/features/logout/logoutSlice";
import SelectLocale from "./SelectLocale";
import { useTranslation } from "react-i18next";

export default function NavbarMenu() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { to: "/", label: t("Homepage") },
    { to: "/product", label: t("Products") },
    { to: "/gallery", label: t("Gallery") },
    { to: "/about-us", label: t("About Us") },
    { to: "/contact-us", label: t("Contact Us") },
    { to: "/blog", label: "Blog" },
    { to: "/faq", label: "FAQ" },
  ];

  const renderMenuLinks = (links) =>
    links.map((link, index) => (
      <Link
        key={index}
        onClick={toggleDrawer(false)}
        to={link.to}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button sx={{ width: "100%" }}>{link.label}</Button>
      </Link>
    ));

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }} onClick={toggleDrawer(true)}>
        <MoreVertIcon />
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }} onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Box>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        PaperProps={{ sx: { width: { xs: "100%", md: "auto" } } }}
      >
        <Box sx={{ width: { xs: "100%", md: 350 }, padding: { xs: "0 20px" } }} role="presentation">
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
              alignItems: "center",
              height: "61px",
              padding: "0px 20px",
            }}
          >
            <CloseIcon sx={{ fontSize: "30px" }} onClick={toggleDrawer(false)} />
          </Box>

          <List sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: "20px", padding: "20px" }}>
            {renderMenuLinks(menuItems)}
          </List>

          <Box sx={{ padding: { xs: "0 20px", md: "20px 0" } }}>
            <SelectLocale />
          </Box>

          {!user.exist && (
            <List sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", gap: "20px" }}>
              <Link
                onClick={toggleDrawer(false)}
                to="/auth/login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button sx={{ width: "100%" }}>{t("Login")}</Button>
              </Link>
              <Link
                onClick={toggleDrawer(false)}
                to="/auth/register"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button sx={{ width: "100%" }}>{t("CreateAccount")}</Button>
              </Link>
            </List>
          )}

          {user.exist && (
            <List sx={{ display: 'flex', flexDirection: "column", gap: { xs: "20px", md: "10px" } }}>
              <Link
                onClick={toggleDrawer(false)}
                to="/user"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button sx={{ width: "100%" }} variant="contained">
                  {t("Hi")}, <span style={{ fontWeight: "bold", paddingLeft: "5px" }}>{user.data.fullname}</span>
                </Button>
              </Link>
              {user.data.role === "admin" && (
                <Link
                  onClick={toggleDrawer(false)}
                  to="/management"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button sx={{ width: "100%" }}>{t("Management")}</Button>
                </Link>
              )}
              {user.data.role === "designer" && (
                <Link
                  onClick={toggleDrawer(false)}
                  to="/designer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button sx={{ width: "100%" }}>{t("Designer")}</Button>
                </Link>
              )}

              <Button
                sx={{ width: "100%" }}
                onClick={() => {
                  setOpen(false);
                  dispatch(setLogout());
                }}
              >
                {t("Logout")}
              </Button>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}

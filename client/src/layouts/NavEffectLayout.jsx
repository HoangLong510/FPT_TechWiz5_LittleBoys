import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  LinearProgress,
  Button,
  Drawer,
  List,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "~/libs/features/logout/logoutSlice";
import locales from "~/locales";
import Footer from "~/components/Footer/Footer";
import Backtotop from "~/components/Backtotop/Backtotop";
import Cart from "~/components/Cart/Cart";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NavEffectLayout({ children }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const loading = useSelector((state) => state.loading.value);

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("locale", event.target.value);
  };

  const [navbarLogo, setNavbarLogo] = useState(
    "/Images/Logo/logo-navbar-black.png"
  );
  const [navbarColor, setNavbarColor] = useState("transparent");
  const [dk, setdk] = useState("contained");
  const [HoverButtonColor, setHoverButtonColor] = useState("white");
  const [textColor, setTextColor] = useState("white");
  const [btnCreateColor, setbtnCreateColor] = useState("white");
  const [btnCreateTextColor, setbtnCreateTextColor] = useState("black");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setNavbarLogo("/Images/Logo/logo-navbar-white.png");
        setNavbarColor("#fff");
        setdk("contained");
        //Background
        setbtnCreateColor("black");
        setHoverButtonColor("gray");
        //Text
        setbtnCreateTextColor("white");
        setTextColor("black");
      } else {
        setNavbarLogo("/Images/Logo/logo-navbar-black.png");
        setNavbarColor("transparent");
        setdk("text");
        //Background
        setHoverButtonColor("gray");
        setbtnCreateColor("transparent");
        //Text
        setTextColor("white");
        setbtnCreateTextColor("white");
      }
      // Update CSS variables
      document.documentElement.style.setProperty(
        "--btn-create-color",
        btnCreateColor
      );
      document.documentElement.style.setProperty(
        "--hover-button-color",
        HoverButtonColor
      );
      document.documentElement.style.setProperty("--text-color", textColor);
      document.documentElement.style.setProperty(
        "--btn-create-text-color",
        btnCreateTextColor
      );
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [btnCreateColor, HoverButtonColor, textColor, btnCreateTextColor]);

  return (
    <div className="navbar-layout">
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("AboutUs")}
        </title>
      </Helmet>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <div
          className="header"
          style={{
            position: "fixed",
            width: "100%",
            top: "0",
            left: "0",
            backgroundColor: navbarColor,
            transition: "background-color 0.3s",
            color: textColor,
            zIndex: "1",
          }}
        >
          {/* LOADING */}
          <div
            className="loading"
            style={{ position: "absolute", width: "100%", top: 0 }}
          >
            {loading && <LinearProgress />}
          </div>
          {/* NAVBAR */}
          <div
            className="navbar"
            style={{
              height: "60px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "60px",
                padding: "0px 20px",
                position: "absolute",
                width: "100%",
              }}
            >
              {/* Left */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                  {navbarLogo === "/Images/Logo/logo-navbar-white.png" ? (
                    <img
                      src="/Images/Logo/logo-navbar-white.png"
                      alt="logo"
                      height={"50px"}
                    />
                  ) : (
                    <img
                      src="/Images/Logo/logo-navbar-black.png"
                      alt="logo"
                      height={"50px"}
                    />
                  )}
                </Link>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Link
                    to="/product"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button className="scroll-button">{t("Products")}</Button>
                  </Link>
                  <Link
                    to="/gallery"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button className="scroll-button">{t("Gallery")}</Button>
                  </Link>
                  <Link
                    to="/about-us"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button className="scroll-button">{t("About Us")}</Button>
                  </Link>
                  <Link
                    to="/contact-us"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button className="scroll-button">{t("Contact Us")}</Button>
                  </Link>
                  <Link
                    to="/blog"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button className="scroll-button">Blog</Button>
                  </Link>
                  <Link
                    to="/faq"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button className="scroll-button">FAQ</Button>
                  </Link>
                </Box>
              </Box>

              {/* Right */}

              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                {!user.exist ? (
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                      gap: "8px",
                      width: "100%",
                    }}
                  >
                    <Link to="/auth/register-designer" style={{ display: "flex", alignItems: "center" }}>
                      <Button className="scroll-button">{t("CreateAccountDesigner")}</Button>
                    </Link>
                    <Link
                      to="/auth/login"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Button className="scroll-button">{t("Login")}</Button>
                    </Link>
                    <Link
                      to="/auth/register"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Button variant="dk" className="scroll-button-create">
                        {t("CreateAccount")}
                      </Button>
                    </Link>
                  </Box>
                ) : (
                  <>
                    <Cart textColor={textColor} />
                    <Link to="/user/notification">
                      <Tooltip>
                        <IconButton className="scroll-button"
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
                {/* Start NavbarMenu */}
                <div className="navbar-menu">
                  <Box
                    sx={{ display: { xs: "none", md: "flex" } }}
                    className="button"
                    onClick={toggleDrawer(true)}
                  >
                    <MoreVertIcon style={{ color: textColor }} />
                  </Box>
                  <Box
                    className="button"
                    onClick={toggleDrawer(true)}
                    sx={{ display: { xs: "flex", md: "none" } }}
                  >
                    <MenuIcon />
                  </Box>
                  <Drawer
                    open={open}
                    onClose={toggleDrawer(false)}
                    anchor={"right"}
                    PaperProps={{ sx: { width: { xs: "100%", md: "auto" } } }}
                  >
                    <Box
                      sx={{ width: { xs: "100%", md: 350 } }}
                      role="presentation"
                    >
                      <Box
                        sx={{
                          display: { xs: "flex", md: "none" },
                          justifyContent: "end",
                          alignItems: "center",
                          height: "61px",
                          padding: "0px 20px",
                        }}
                      >
                        <Box
                          className="button"
                          onClick={toggleDrawer(false)}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <CloseIcon sx={{ fontSize: "30px" }} />
                        </Box>
                      </Box>

                      <List
                        sx={{
                          display: { xs: "flex", md: "none" },
                          flexDirection: "column",
                          padding: "20px",
                          gap: "20px",
                        }}
                      >
                        <Link
                          onClick={toggleDrawer(false)}
                          to="/"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>
                            {t("Homepage")}
                          </Button>
                        </Link>
                        <Link
                          onClick={toggleDrawer(false)}
                          to="/product"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>
                            {t("Products")}
                          </Button>
                        </Link>
                        <Link
                          onClick={toggleDrawer(false)}
                          to="/gallery"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>{t("Gallery")}</Button>
                        </Link>
                        <Link
                          onClick={toggleDrawer(false)}
                          to="/about-us"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>
                            {t("About Us")}
                          </Button>
                        </Link>
                        <Link
                          onClick={toggleDrawer(false)}
                          to="/contact-us"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>Contact Us</Button>
                        </Link>
                        <Link
                          onClick={toggleDrawer(false)}
                          to="/blog"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>Blog</Button>
                        </Link>
                        <Link
                          onClick={toggleDrawer(false)}
                          to="/faq"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>FAQ</Button>
                        </Link>
                      </List>
                      {/* Right   */}
                      <Box
                        sx={{
                          padding: { xs: "0px 20px", md: "20px 20px 0px 20px" },
                        }}
                      >
                        {/* Start SelectLocate */}
                        <div className="select-locate">
                          <FormControl sx={{ width: "100%" }} size="small">
                            <InputLabel id="select-locale">Locale</InputLabel>
                            <Select
                              labelId="select-locale"
                              id="demo-select-small"
                              value={locale}
                              label="Locale"
                              onChange={handleChange}
                            >
                              {locales.map((locale) => (
                                <MenuItem key={locale.code} value={locale.code}>
                                  {locale.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {/* End SelectLocate */}
                        </div>
                      </Box>
                      {!user.exist && (
                        <List
                          sx={{
                            display: { xs: "flex", md: "none" },
                            flexDirection: "column",
                            padding: "20px",
                            gap: "20px",
                          }}
                        >
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
                            <Button sx={{ width: "100%" }}>
                              {t("CreateAccount")}
                            </Button>
                          </Link>

                          <Link
                            onClick={toggleDrawer(false)}
                            to="/auth/register-designer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button sx={{ width: "100%" }}>
                              {t("CreateAccountDesigner")}
                            </Button>
                          </Link>
                        </List>
                      )}

                      {user.exist && (
                        <List
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "20px",
                            gap: { xs: "20px", md: "10px" },
                          }}
                        >
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
                              {t("Hi")},
                              <span
                                style={{
                                  fontWeight: "bold",
                                  paddingLeft: "5px",
                                }}
                              >
                                {user.data.fullname}
                              </span>
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
                              <Button sx={{ width: "100%" }}>
                                {t("Management")}
                              </Button>
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
                              <Button sx={{ width: "100%" }}>
                                {t("Designer")}
                              </Button>
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
                </div>
                {/* End NavbarMenu */}
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <div className="content" style={{ padding: "0" }}>
        {children}
      </div>
      <Footer />
      <Backtotop />
    </div>
  );
}

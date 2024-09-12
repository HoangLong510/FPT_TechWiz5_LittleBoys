import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
  Grid,
  LinearProgress,
  Button,
  Drawer,
  List,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { deepPurple, lightBlue, teal } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";
import TeamIcon from "@mui/icons-material/Groups";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import DevicesIcon from "@mui/icons-material/Devices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "~/libs/features/logout/logoutSlice";
import locales from "~/locales";
import Footer from "~/components/Footer/Footer";
import './style.css'

const teamMembers = [
  {
    name: "Nguyễn Văn A",
    position: "CEO & Founder",
    description:
      "Nguyễn Văn A là người sáng lập công ty với tầm nhìn và kinh nghiệm trong ngành công nghệ.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "nguyenvana@company.com",
  },
  {
    name: "Trần Thị B",
    position: "CTO",
    description: "",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "tranthib@company.com",
  },
  {
    name: "Nguyễn Văn C",
    position: "COO",
    description:
      "Nguyễn Văn C điều hành hoạt động hàng ngày của công ty và tối ưu hoá hiệu suất làm việc.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "nguyenvanc@company.com",
  },
  {
    name: "Nguyễn Văn D",
    position: "COO",
    description:
      "Nguyễn Văn D điều hành hoạt động hàng ngày của công ty và tối ưu hoá hiệu suất làm việc.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "nguyenvanc@company.com",
  },
];

const features = [
  {
    title: "Hiệu Suất Cao",
    description:
      "Các giải pháp của chúng tôi được tối ưu hóa cho hiệu suất cao, đảm bảo hoạt động mượt mà với lượng người dùng lớn.",
    icon: <SpeedIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
  {
    title: "Bảo Mật Cao",
    description:
      "Chúng tôi luôn đặt sự bảo mật lên hàng đầu, bảo vệ thông tin người dùng với các tiêu chuẩn an ninh cao nhất.",
    icon: <SecurityIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
  {
    title: "Tương Thích Mọi Thiết Bị",
    description:
      "Dịch vụ của chúng tôi hoạt động tốt trên mọi thiết bị, từ điện thoại, máy tính bảng cho đến máy tính bàn.",
    icon: <DevicesIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
];

export default function AboutUs  () {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const loading = useSelector((state) => state.loading.value);
  const user = useSelector((state) => state.user.value);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { i18n } = useTranslation();
  const locale = i18n.language;

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("locale", event.target.value);
  };

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
        setNavbarColor("#fff");
        setdk("contained");
        //Background
        setbtnCreateColor("black");
        setHoverButtonColor("gray");
        //Text
        setbtnCreateTextColor("white");
        setTextColor("black");


      } else {
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
      document.documentElement.style.setProperty('--btn-create-color',btnCreateColor);
      document.documentElement.style.setProperty('--hover-button-color', HoverButtonColor);
      document.documentElement.style.setProperty('--text-color', textColor);
      document.documentElement.style.setProperty('--btn-create-text-color', btnCreateTextColor);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [btnCreateColor, HoverButtonColor, textColor, btnCreateTextColor]);

  return (
    <div className="about-us">
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("AboutUs")}
        </title>
      </Helmet>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* HEADER */}
        <div className="header"
        style={{ position: 'fixed',
          width: '100%',
          top: '0',
          left: '0',
          backgroundColor: navbarColor,
          transition: "background-color 0.3s",
          color: textColor  }}
          >
          {/* LOADING */}
          <div className="loading"
            style={{ position: "absolute", width: "100%", top: 0 }}
          >
              {loading && <LinearProgress />}
            </div>
          {/* NAVBAR */}
          <div className="navbar"
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
                width: '100%',
              }}
            >
              {/* Left */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src="/logo.png"
                    alt="logo"
                    width={"147px"}
                    height={"40px"}
                  />
                </Link>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Link
                    to="/"
                    style={{ display: "flex", alignItems: "center",  }}
                  >
                    <Button className="scroll-button" >{t("Products")}</Button>
                  </Link>
                  <Link
                    to="/about-us"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button className="scroll-button" >{t("AboutUs")}</Button>
                  </Link>
                  <Link
                    to="/contact-us"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Button className="scroll-button">{t("ContactUs")}</Button>
                  </Link>
                  <Link
                    to="https://www.facebook.com/aptech.fpt"
                    style={{ display: "flex", alignItems: "center" }}
                    target="_blank"
                  >
                    <Button className="scroll-button">Fanpage</Button>
                  </Link>
                </Box>
              </Box>

              {/* Right */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
                      <Button className="scroll-button">{t("Login")}</Button>
                    </Link>
                    <Link
                      to="/auth/register"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Button  variant="dk" className="scroll-button-create">{t("CreateAccount")}</Button>
                    </Link>
                  </Box>
                )}
                {/* Start NavbarMenu */}
                <div className="navbar-menu">
                  <Box
                    sx={{ display: { xs: "none", md: "flex" } }}
                    className="button"
                    onClick={toggleDrawer(true)}
                  >
                    <MoreVertIcon  style={{color: textColor}}/>
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
                          to="/"
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
                          to="/"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>{t("AboutUs")}</Button>
                        </Link>
                        <Link
                          onClick={toggleDrawer(false)}
                          to="https://www.facebook.com/aptech.fpt"
                          target="_blank"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button sx={{ width: "100%" }}>Fanpage</Button>
                        </Link>
                      </List>

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
                            to="/"
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
        {/* BODY */}
        <div className="body">
        
          {/* Hình nền lớn ở đầu trang */}
          <Box 
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "250px", md: "400px" },
              backgroundImage: `url('./test.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                color: "white",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              Về Chúng Tôi
            </Typography>
          </Box>
          <Container maxWidth="lg" sx={{ paddingTop: 8, paddingBottom: 8 }}>
            {/* Phần Giới Thiệu */}
            <Typography variant="body1" align="center" paragraph>
              Chúng tôi là một công ty công nghệ với đội ngũ nhân viên tài năng,
              đam mê và sáng tạo. Sứ mệnh của chúng tôi là cung cấp các giải
              pháp công nghệ tiên tiến, mang lại giá trị thực sự cho khách hàng.
              Với sự phát triển không ngừng, chúng tôi tự hào về những sản phẩm
              và dịch vụ mà mình cung cấp, giúp đỡ hàng ngàn người dùng trên
              khắp thế giới.
            </Typography>

            {/* Tính Năng Nổi Bật */}
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ marginTop: 6 }}
            >
              Tính Năng Nổi Bật
            </Typography>
            <Grid container spacing={4} sx={{ marginBottom: 6 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box textAlign="center">
                    {feature.icon}
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Tầm Nhìn và Sứ Mệnh */}
            <Divider sx={{ marginBottom: 4 }} />
            <Typography variant="h5" align="center" gutterBottom>
              <VisibilityIcon
                sx={{
                  verticalAlign: "middle",
                  marginRight: 1,
                  fontSize: "4.5rem",
                  color: lightBlue[500],
                }}
              />
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
              Tầm Nhìn và Sứ Mệnh
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Tầm nhìn của chúng tôi là trở thành công ty dẫn đầu trong lĩnh vực
              công nghệ, mang lại những sản phẩm và dịch vụ chất lượng hàng đầu.
              Chúng tôi luôn không ngừng đổi mới và sáng tạo để đáp ứng nhu cầu
              ngày càng cao của khách hàng. Sứ mệnh của chúng tôi là giúp các
              doanh nghiệp và cá nhân khai phá tiềm năng của họ thông qua các
              giải pháp công nghệ tiên tiến, tạo nên một tương lai số hóa bền
              vững và thành công.
            </Typography>
            {/* Đội Ngũ */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={5}
            >
              <TeamIcon sx={{ fontSize: 80, color: deepPurple[500] }} />
            </Box>
            <Typography variant="h5" align="center" gutterBottom mb={4} mt={2}>
              Đội Ngũ Của Chúng Tôi
            </Typography>

            <Slider {...sliderSettings}>
              {teamMembers.map((member, index) => (
                <div key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "10px",
                      minHeight: 230,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          src={member.avatar}
                          alt={member.name}
                          sx={{
                            width: 64,
                            height: 64,
                            marginRight: 2,
                            backgroundColor: lightBlue[500],
                          }}
                        />
                        <Box>
                          <Typography variant="h6">{member.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {member.position}
                          </Typography>
                          <Box display="flex" alignItems="center" mt={1}>
                            <EmailIcon
                              fontSize="small"
                              sx={{ marginRight: 1 }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ fontSize: "0.875rem" }}
                            >
                              {member.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Divider sx={{ marginBottom: 2 }} />

                      <Typography
                        variant="body1"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {member.description || "Thông tin chưa được cập nhật."}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </Slider>
          </Container>
        </div>
        {/* FOOTER */}
        <div className="footer">
        <Footer />
        </div>
      </div>
    </div>
  );
};




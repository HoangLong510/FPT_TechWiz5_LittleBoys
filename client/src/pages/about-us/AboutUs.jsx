import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { deepPurple, lightBlue, teal } from "@mui/material/colors";
import EmailIcon from "@mui/icons-material/Email";
import TeamIcon from "@mui/icons-material/Groups";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";
import DevicesIcon from "@mui/icons-material/Devices";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { teamMembers } from "./Members";
import "./style.css";

const features = [
  {
    title: "High Performance",
    description:
      "Our solutions are optimized for high performance, ensuring smooth operation with large user volumes.",
    icon: <SpeedIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
  {
    title: "High Security",
    description:
      "We always put security first, protecting user information with the highest security standards.",
    icon: <SecurityIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
  {
    title: "Compatible with All Devices",
    description:
      "Our service works well on all devices, from phones, tablets to desktops.",
    icon: <DevicesIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
];

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
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

  return (
    <div className="about-us">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "250px", md: "600px" },
            backgroundImage: `url('Images/bg/blogdetail1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
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
            About Us
          </Typography>
        </Box>
      </motion.div>
      <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Paper
            elevation={4}
            sx={{ p: 4, borderRadius: 2, backgroundColor: "#f5f5f5" }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <motion.img
                  src="/Images/bg/about2.png"
                  alt="Our Team"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
                  component={motion.h4}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  DECOR VISTA
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  paragraph
                  component={motion.p}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  sx={{ lineHeight: 1.8, color: "#555" }}
                >
                  We are a technology company with a team of talented, passionate and creative people. Our mission is to provide innovative technology solutions that bring real value to our customers. With continuous development, we are proud of the products and services we provide, helping thousands of users around the world.
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  paragraph
                  component={motion.p}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  sx={{ lineHeight: 1.8, color: "#555" }}
                >
                  Every detail, every product and image is a mark, a story that Decor Vista wants to convey to each customer. Decor Vista hopes that each collection, each product and service will become a part of each family's home, like a message of "bringing love to every living space". Aiming for convenience, modernity, minimalism and environmental friendliness is the desire that Decor Vista constantly pursues.
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  paragraph
                  component={motion.p}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  sx={{ lineHeight: 1.8, color: "#555" }}
                >
                  We create the ultimate living space, the place we call “Home”.
                  What we want to build here is to bring high-end designs to everyone. We want to help customers personalize their living space to be truly suitable and ideal. At Decor Vista, we do everything for the customers.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

      <Container maxWidth="lg" sx={{ paddingTop: 8, paddingBottom: 8 }}>
        
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ marginTop: 6 }}
        >
          Outstanding Features
        </Typography>
        <Grid container spacing={4} sx={{ marginBottom: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Box textAlign="center" className="feature-box">
                  {feature.icon}
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ marginBottom: 4 }} />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
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
          Vision and Mission
          </Typography>
          <Typography variant="body1" align="center" paragraph>
          Our vision is to be a leading company in the interior design industry, providing top quality products and services. We are constantly innovating and creating to meet the increasing demands of our customers. Our mission is to help businesses and individuals realize their potential through advanced design solutions, creating a sustainable and modern living space.
          </Typography>
        </motion.div>

        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <TeamIcon sx={{ fontSize: 80, color: deepPurple[500] }} />
        </Box>
        <Typography variant="h5" align="center" gutterBottom mb={4} mt={2}>
        Our Team
        </Typography>

        <Slider {...sliderSettings} className="team-slider">
          {teamMembers.map((member, index) => (
            <div key={index}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    display: "flex",
                    width:"360px",
                    flexDirection: "column",
                    margin: "10px",
                    minHeight: 230,
                    justifyContent: "space-between",
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    },
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
                          <EmailIcon fontSize="small" sx={{ marginRight: 1 }} />
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
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </Slider>
      </Container>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
      </motion.div>
    </div>
  );
}

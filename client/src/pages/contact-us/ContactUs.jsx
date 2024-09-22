import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Paper,
  Snackbar,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import RoomIcon from "@mui/icons-material/Room";
import LanguageIcon from "@mui/icons-material/Language";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "Câu hỏi chung",
    message: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate("/thank-you");
    }, 3000);
  };

  const faqItems = [
    {
      question: "How do I place an order?",
      answer:
        "You can place an order online through our website or by calling directly.",
    },
    {
      question: "What is the return policy?",
      answer: "We accept returns within 30 days of purchase.",
    },
    {
      question: "How long does delivery take?",
      answer: "The usual delivery time is 3-5 business days.",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
        backgroundImage: "url('/Images/bg/living-room-2732939.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 4,
            textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
          }}
        >
          Contact Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Address */}
          <Grid item xs={12} sm={3} textAlign="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <RoomIcon sx={{ fontSize: 40, color: "#555" }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Address:
              </Typography>
              <Typography variant="body2">
                62 Street 36, Van Phuc Residential Area, Hiep Binh Phuoc Ward,
                Thu Duc City
              </Typography>
            </Box>
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={3} textAlign="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <PhoneIcon sx={{ fontSize: 40, color: "#555" }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Phone:
              </Typography>
              <Typography variant="body2">
                <Typography variant="body2">
                  0911 789 450 - 0931 313 329
                </Typography>
              </Typography>
            </Box>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={3} textAlign="center">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
              }}
            >
              <EmailIcon sx={{ fontSize: 40, color: "#555" }} />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Email:
              </Typography>
              <Typography variant="body2">
                <Typography variant="body2">aptech.fpt@fe.edu.vn</Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Image on the Left */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/Images/bg/blogdetail3.jpg" // Replace with image path
              alt="Featured Image"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </Grid>

          {/* Content on the Right */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              Contact Us at DecorVista
            </Typography>
            <Typography variant="body1" color="black" paragraph>
            We are always ready to assist you in your journey to create the perfect living space. At DecorVista, our team not only provides sophisticated interior solutions but also ensures that all your inquiries and requests are addressed promptly and professionally. Reach out to us for consultation, order support, or any product-related questions. DecorVista is committed to delivering exceptional customer service and the best experience possible.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;

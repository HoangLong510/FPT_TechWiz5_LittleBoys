import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SecurityIcon from "@mui/icons-material/Security";
import ReplayIcon from "@mui/icons-material/Replay";
import Gallery from "~/pages/home/Gallery/Gallery";
import ProductsSwiper from "./ProductsSwiper/ProductsSwiper";
export default function Homepage() {
  const { t } = useTranslation();
  const services = [
    {
      title: "Giao hàng nhanh",
      description: "Nhận hàng nhanh chóng trong vòng 24 giờ.",
      icon: <LocalShippingIcon fontSize="large" />,
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Dịch vụ hỗ trợ khách hàng mọi lúc mọi nơi.",
      icon: <SupportAgentIcon fontSize="large" />,
    },
    {
      title: "Thanh toán an toàn",
      description: "Đảm bảo an toàn và bảo mật cho mọi giao dịch.",
      icon: <SecurityIcon fontSize="large" />,
    },
    {
      title: "Chính sách hoàn trả",
      description: "Dễ dàng trả lại sản phẩm nếu không hài lòng.",
      icon: <ReplayIcon fontSize="large" />,
    },
  ];
  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("Homepage")}
        </title>
      </Helmet>

      {/* Banner + Slider */}
      <Box sx={{ maxWidth: "100%", mb: 4 }}>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <img src="https://via.placeholder.com/1500x500" alt="Banner 1" />
          </div>
          <div>
            <img src="https://via.placeholder.com/1500x500" alt="Banner 2" />
          </div>
          <div>
            <img src="https://via.placeholder.com/1500x500" alt="Banner 3" />
          </div>
        </Carousel>
      </Box>

      {/* 4 Service Icons */}
      <Container sx={{ mb: 4 }}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={4}
        >
          {services.map((service, index) => (
            <Box
              key={index}
              sx={{
                flex: "1 1 calc(25% - 16px)",
                minWidth: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              {service.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>
                {service.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {service.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
      {/* Gallery */}
      <Container>
        <Gallery />
      </Container>
      {/* ProductsSwiper */}
      <Container>
        <ProductsSwiper />
      </Container>
    </>
  );
}

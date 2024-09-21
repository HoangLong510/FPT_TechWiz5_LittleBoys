import React from "react";
import ProductsSwiper from "./ProductsSwiper/ProductsSwiper";
import FAQ from "./FAQ/FAQ.jsx";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Gallery from "./Gallery-Slider/Gallery";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <Box className="home-container">
      {/* Video Section */}
      <Box
        className="video-section"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
          backgroundImage: "url('/video/bg-homepage-df.png')",
        }}
      >
        <video
          className="video-background"
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/video/bg-homepage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box
          className="video-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
          }}
        >
          <Typography
            className="video-title"
            sx={{
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "3rem",
              },
            }}
          >
            Welcome to DecorVista
          </Typography>
          <Button
            component={Link} to={`/product`}
            sx={{
              padding: { xs: "8px 16px", sm: "10px 20px", md: "12px 24px" },
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              backgroundColor: "#f57c00",
              color: "white",
              "&:hover": {
                backgroundColor: "#e64a19",
              },
            }}
            className="shop-now-button"
          >
            Shop Now
          </Button>
        </Box>
      </Box>
      {/* Category Image Slider */}
      <Box sx={{ mt: 8 }}>
        <Gallery />
      </Box>
     
      {/* Product Slider */}
      <Box sx={{ mt: 3 }}>
        <ProductsSwiper />
      </Box>
      <Box
        sx={{
          backgroundImage: `url('/Images/bg/living-room-2732939.jpg')`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.3)", 
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              color: "red",
              fontWeight: "bold",
              fontSize: "4rem",
              textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
            }}
          >
            BIG SALE - UP TO 30% OFF
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "2.0rem",
              textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
            }}
          >
            ALL FURNITURE AND DECORATIONS
          </Typography>
          <Button
            component={Link} to={`/product`}
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
              fontSize: "1.2rem",
              padding: "10px 30px",
              backgroundColor: "#f57c00",
              "&:hover": {
                backgroundColor: "#e64a19",
              },
            }}
          >
            OWN IT NOW
          </Button>
        </Container>
      </Box>

      {/* Section về các sản phẩm nổi bật */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Best Choice For You
        </Typography>
        <Grid container spacing={3}  sx={{ paddingBottom: "40px" }}>
          {/* Sản phẩm 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image="/Images/bg/bg1.png"
                  alt="Product 1"
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Tên sản phẩm 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mô tả ngắn về sản phẩm 1.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Sản phẩm 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image="/Images/bg/bg1.png"
                  alt="Product 2"
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Tên sản phẩm 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mô tả ngắn về sản phẩm 2.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Sản phẩm 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image="/Images/bg/bg1.png"
                  alt="Product 3"
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Tên sản phẩm 3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mô tả ngắn về sản phẩm 3.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          {/* Sản phẩm 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                sx={{
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "15px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image="/Images/bg/bg1.png"
                  alt="Product 3"
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Tên sản phẩm 3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mô tả ngắn về sản phẩm 3.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Section giới thiệu thương hiệu */}
      <Box sx={{ py: 8,
         backgroundImage: `url('/Images/bg/living-room-2732939.jpg')`, 
         backgroundSize: "cover",
         backgroundPosition: "center",
         boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.3)",
         textShadow: "2px 2px 5px rgba(0,0,0,0.7)", }}>
        <Container>
        <Typography 
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#fff" }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              maxWidth: "600px",
              mx: "auto",
              color: "#fff",
              mt: 2,
              lineHeight: "1.8",
            }}
          >
            We specialize in providing high-quality products with beautiful designs, suitable for many interior decoration styles. Our team is always ready to support and advise customers.
          </Typography>
        </Container>
      </Box>

      <FAQ />
    </Box>
  );
}

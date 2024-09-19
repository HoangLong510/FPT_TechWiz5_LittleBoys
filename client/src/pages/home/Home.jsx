import React from "react";
import ProductsSwiper from "./ProductsSwiper/ProductsSwiper";
import FAQ from "./FAQ/FAQ.jsx";
import { Box, Typography, Button } from "@mui/material";
import Gallery from "./Gallery-Slider/Gallery";
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
          backgroundImage: "url('/video/bg-homepage-df.png')"
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
            objectFit: "cover"
          }}        
        >
          <source 
            src="/video/bg-homepage.mp4" 
            type="video/mp4" />
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
          <Typography className="video-title"
            sx={{ 
              fontSize:{ 
                xs: "1.5rem",
                sm: "2rem",
                md: "3rem" 
              }}}
          >
            Title of the Video
          </Typography>
          <Button
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
      <Box sx={{  mt: 8 }}>
        <Gallery/>
      </Box>
      <Box
        className="video-section"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100%",
          m: '10%'
        }}
      >
        <video
          className="video-background"
          autoPlay
          loop
          muted
          style={{ width: "100%" }}
        >
          <source src="/video/bg-homepageSmall.mp4" type="video/mp4" />
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
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }}
            className="video-title"
          >
            Title of the Video
          </Typography>
          <Button
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
      {/* Product Slider */}
      <Box sx={{ mt: 3 }}>
        <ProductsSwiper />
      </Box>

      {/* Get in Touch Section */}
      <FAQ />
    </Box>
  );
}

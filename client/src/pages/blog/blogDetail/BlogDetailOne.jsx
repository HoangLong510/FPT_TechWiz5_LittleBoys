import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
  Avatar,
  Divider,
  CardContent,
  Button,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { FormatQuote } from "@mui/icons-material";

export default function BlogDetail() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
            backgroundImage:
              "url('/Images/bg/blogdetail2.jpg?height=400&width=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            textAlign: "center",
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Blog Detail
            </Typography>
            <Typography
              variant="h7"
              align="center"
              paragraph
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              Discover the 2023 Scandinavian Interior Design Trends
            </Typography>
          </Container>
        </Box>
      </Box>

      <Box
        maxWidth="lg"
        sx={{
          my: 4,
          fontFamily: "'Roboto', sans-serif",
          padding: 0,
        }}
      >
        {/* Blog Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "2.5rem", color: "#333" }}
        >
          What is Scandinavian Design?
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          By Nguyen Van A | May 15, 2023
        </Typography>

        {/* Blog Content */}
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "#555", fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          Scandinavian Design is a modern Nordic interior design trend that many
          people choose for its minimalistic and elegant beauty. This design
          style is widely applied not only in bedrooms or living rooms but also
          in kitchens.
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "1.5rem", color: "#333" }}
        >
          Characteristics of Scandinavian Design
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "#555", fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          When talking about Scandinavian Design, simplicity and rustic beauty
          immediately come to mind. The dominant colors in this style are white
          and other neutral tones such as black, blue, cream, gray, etc. These
          neutral colors not only create a soft, comfortable feeling but also
          bring a modern and youthful breath to the space.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "#555", fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          A highlight of Scandinavian Design is minimalism. This minimalism is
          reflected in the neat arrangement of furniture and the choice of
          multifunctional pieces that save space. Looking at rooms designed in
          the Nordic style, we can see the sophistication in choosing and
          arranging furniture, creating an airy, spacious, and well-lit
          environment.
        </Typography>

        {/* Quote */}
        <Card
          sx={{
            my: 4,
            p: 4,
            backgroundColor: "#f9f9f9",
            borderLeft: "5px solid #ccc",
            boxShadow: "none",
          }}
        >
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={2}>
                <FormatQuote sx={{ fontSize: "4rem", color: "#ddd" }} />
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  sx={{ color: "#333", fontSize: "2.0rem" }}
                >
                  "Less is more." – Ludwig Mies van der Rohe
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "1.5rem", color: "#333" }}
        >
          High Applicability of Scandinavian Design
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "#555", fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          The highlight of Scandinavian Design is minimalism. This minimalism is
          reflected in the neat arrangement of furniture and the choice of
          multifunctional pieces that save space. Looking at rooms designed in
          the Nordic style, we can see the sophistication in choosing and
          arranging furniture, creating an airy, spacious, and well-lit
          environment.
        </Typography>

        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "1.9rem", color: "#333" }}
        >
          Top Scandinavian Style Kitchen Designs for 2023
        </Typography>
      </Box>
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
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              By Nguyen Van A | May 15, 2023
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              A Kitchen with White as the Main Color
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              White is the characteristic color of Scandinavian Design. It
              brings a simple, light, yet elegant beauty. White is also easy to
              combine with other neutral colors like black, gray, brown, and
              blue, creating a unique contrast. Additionally, with white as the
              dominant color, this design helps to open up the space, making it
              more airy, spacious, and modern...
            </Typography>

            <Button
              component="a"
              href="https://jysk.vn/trang-tri-nha-bep-phong-cach-scandinavian-design-tinh-te-va-hien-dai"
              target="_blank" // Opens link in new tab
              rel="noopener noreferrer"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#333",
                color: "#333",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderColor: "#333",
                },
              }}
            >
              Read More
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

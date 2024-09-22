import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Gallery from "./Gallery-Slider/Gallery";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <Box className="home-container">
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
            component={Link}
            to={`/product`}
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
      <Box sx={{ mt: 8, mb: 8 }}>
        <Gallery />
      </Box>

      <Box
        className="video-section"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "70vh",
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
          <source src="" type="video/mp4" />
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
              component={Link}
              to={`/product`}
              variant="contained"
              color="primary"
              sx={{
                mt: 4,
                fontSize: "1rem",
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
        <Grid container spacing={3} sx={{ paddingBottom: "10px" }}>
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
                    Table
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
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    Chair
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
                    Lamp
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
                    Rugs
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mt: 8, mb: 15 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          New-season style
        </Typography>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          A fresh take on colour
        </Typography>

        {/* Buttons */}
        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            variant="outlined"
            component={Link}
            to="/gallery"
            sx={{ marginRight: 2 }}
          >
            Explore the gallery
          </Button>
        </Box>

        {/* Image and Content Grid */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundImage: "url('/Images/bg/home1.png')", // Change this to your image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                position: "relative",
                overflow: "hidden",
              }}
            ></Box>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
              Colour play
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Design a home that inspires you every day with colours you love
              and shades that lift your spirit. From calming blues to new
              neutrals, our new-season colours add personality to every room.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundImage: "url('/Images/bg/home2.jpg')", // Change this to your image path
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                position: "relative",
                overflow: "hidden",
              }}
            ></Box>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
              New-season fabrics
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Transform your space with material and texture. Find the perfect
              match with our new Avellino and Capri fabrics, as well as Nordic
              traceable leathers.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          position: "relative",
          height: "450px",
          backgroundImage: 'url("/Images/bg/home3.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          marginBottom: "120px",
          marginLeft: "50px",
          marginRight: "50px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></Box>

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            component="div"
            sx={{
              fontWeight: "arial-bold",
              mb: 3,
              fontSize: { xs: "1.5rem", md: "2.5rem" },
            }}
          >
            Get inspired in store
          </Typography>
          <Button
            component={Link}
            to={"https://maps.app.goo.gl/KdPzavXu21cp1Nts6"}
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#999",
                backgroundPosition: "left bottom",
                transform: "scale(1.05)",
              },
            }}
          >
            Find my local store
          </Button>
        </Box>
      </Box>

      <Container sx={{ mt: 8, mb: 12 }}>
        <Grid container spacing={4}>
          {/* Phần bên trái */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
              What we offer
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontFamily: "Open Sans" }}>
              What we offer is of the highest quality, leading design brand
              DecorVista is one of the most prominent names globally in luxury
              furniture, lighting and accessories. With an extensive network of
              stores, DecorVista offers a rich portfolio of contemporary
              products that can be customized to meet the specific needs of each
              individual project. We pride ourselves on being a
              solution-oriented, value-added partner to the community, with many
              reference projects in the contract sector, including all types of
              residential developments, hotel and office interiors. We strive to
              enhance people’s lives through our design, and this mission
              inspires our motto.
            </Typography>
            <Button
              component={Link}
              to={"/product"}
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              About Us →
            </Button>
          </Grid>

          {/* Phần bên phải */}
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Easy one-stop solution</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We provide complete solutions from product selection to
                  delivery and setup.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Brand recognition</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  As a global leader in premium furniture design, DecorVista is
                  synonymous with quality and innovation.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Manufacture control</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our in-house manufacturing process ensures consistent quality
                  and on-time delivery.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Customized solutions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We offer tailored solutions to meet the specific needs of
                  every project.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Sustainability credentials</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our products are made with sustainable materials and ethical
                  manufacturing processes.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Bespoke interior design</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our bespoke design services ensure that every project is
                  unique and personalized.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mt: 8, mb: 12 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                width: "100%",
                height: "0.5px",
                backgroundColor: "black",
                mt: -3,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <img
                src="/Images/bg/home5.jpg"
                style={{ width: "100%", borderRadius: "8px", height: "200px" }}
              />
              <Typography
                component={Link}
                to="/blog"
                sx={{
                  mt: 2,
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    backgroundPosition: "left bottom",
                    transform: "scale(1.05)",
                    color: "brown",
                  },
                }}
              >
                Decor Vista Blog
              </Typography>
            </Box>
          </Grid>

          {/* Second Section - Need help? Let's talk */}
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <img
                src="/Images/bg/home4.png"
                style={{ width: "100%", borderRadius: "8px", height: "200px" }}
              />
              <Typography
                component={Link}
                to="/contact-us"
                sx={{
                  mt: 2,
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    backgroundPosition: "left bottom",
                    transform: "scale(1.05)",
                    color: "brown",
                  },
                }}
              >
                Need help? Contact us
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        className="video-section"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "40vh",
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
          <source src="" type="video/mp4" />
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
          <Container>
            <Typography
              variant="h2"
              sx={{
                marginBottom: "10px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "2rem",
                textShadow: "2px 2px 5px rgba(0,0,0,2)",
              }}
            >
              Decor Vista
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
                textShadow: "2px 2px 5px rgba(0,0,0,2)",
              }}
            >
              Once again we affirm our value, DecorVista is committed to
              bringing sophisticated and classy interior solutions, helping
              customers create the perfect living space.
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

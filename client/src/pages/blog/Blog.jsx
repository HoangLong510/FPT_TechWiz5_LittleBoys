import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import EmailIcon from "@mui/icons-material/Email";
import { motion } from "framer-motion";


const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: "56.25%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  background: "linear-gradient(45deg, #ab6e35 30%, #292929 90%)",
  border: 0,
  borderRadius: 20,
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    background: "linear-gradient(45deg, #292929 30%, #ab6e35 90%)",
  },
}));


const blogPosts = [
  {
    id: 1,
    title: "Scandinavian Interior Design Trends 2023",
    excerpt: "Scandinavian Design is the Nordic interior design trend...",
    image: "/Images/bg/3617170_2.jpg?height=300&width=400",
    category: "Trends",
    date: "May 15, 2023",
    author: "Nguyen Van A",
    featured: true,
  },
  {
    id: 2,
    title: "5 Creative Ideas for Small Living Rooms",
    excerpt: "Optimize living space with smart solutions...",
    image: "/Images/bg/phongkhachnho.png?height=300&width=400",
    category: "Design",
    date: "May 10, 2023",
    author: "Tran Thi B",
    featured: true,
  },
  {
    id: 3,
    title: "How to Choose the Right Sofa for Your Living Room",
    excerpt: "A detailed guide to selecting the perfect sofa for your space...",
    image: "/Images/bg/phongkhachnho.png?height=300&width=400",
    category: "Shopping",
    date: "May 5, 2023",
    author: "Le Van C",
  },
  {
    id: 4,
    title: "The Art of Wall Decoration in Interior Design",
    excerpt: "Discover creative ways to decorate your home's walls...",
    image: "/Images/bg/phongkhachnho.png?height=300&width=400",
    category: "DIY",
    date: "May 1, 2023",
    author: "Pham Thi D",
  },
  {
    id: 5,
    title: "Top 10 Easy-to-Care Houseplants for Interiors",
    excerpt:
      "Learn about the best houseplants for decorating and purifying indoor air...",
    image: "/Images/bg/phongkhachnho.png?height=300&width=400",
    category: "Plants",
    date: "April 25, 2023",
    author: "Hoang Van E",
  },
];

const categories = [
  "Trends",
  "Design",
  "DIY",
  "Shopping",
  "Feng Shui",
  "Plants",
];

const popularPosts = [
  "10 Simple Ways to Decorate Your Bedroom",
  "Tips for Choosing Paint Colors for the Kitchen",
  "Top 5 Sustainable Interior Materials",
  "How to Arrange Lighting in the Living Room",
];

const FurnitureBlog = () => {
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleNewsletterSignup = (event) => {
    event.preventDefault();
    console.log("Newsletter signup:", email);
   
  };

  return (
    <Box>
      
      <Box
        className="video-section"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "80vh",
          backgroundImage: "url('/video/blog-df.png')",
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
          <source src="/video/blog.mp4" type="video/mp4" />
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
              Decor Vista Blog
            </Typography>
            <Typography
              variant="h7"
              align="center"
              paragraph
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              Discover trends, ideas, and advice on interior design
            </Typography>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="lg">
       
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Featured Posts
          </Typography>
          <Grid container spacing={4}>
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <Grid item key={post.id} xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <StyledCard>
                      <StyledCardMedia image={post.image} title={post.title} />
                      <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                          {post.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          By {post.author} | {post.date}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {post.excerpt}
                        </Typography>
                        <StyledButton
                          component={Link}
                          to={`/blog/blogdetailone`}
                        >
                          Read More
                        </StyledButton>
                      </CardContent>
                    </StyledCard>
                  </motion.div>
                </Grid>
              ))}
          </Grid>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
           
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", mt: 0 }}
            >
              All Posts
            </Typography>
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                
                <StyledCard
                  sx={{
                    mb: 4,
                    position: "relative",
                    height: "450px", 
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  
                  <StyledCardMedia
                    image={post.image}
                    title={post.title}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(70%)",
                    }}
                  />

                 
                  <CardContent
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
                      color: "white",
                      padding: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="rgba(255, 255, 255, 0.8)" 
                      gutterBottom
                      sx={{
                        fontSize: "0.8rem", 
                        mb: 2,
                      }}
                    >
                      By {post.author} | {post.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      sx={{
                        fontSize: "0.75rem",
                        lineHeight: 1.4,
                        mb: 2,
                      }}
                    >
                      {post.excerpt}
                    </Typography>

                    <StyledButton
                      component={Link}
                      to={`/post/${post.id}`}
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        fontSize: "0.8rem",
                        borderRadius: "20px",
                        backgroundColor: "rgb(90, 90, 90, 0.7",
                        color: "#333",
                        fontWeight: "500",
                        "&:hover": {
                          backgroundColor: "rgb(90, 90, 90, 0.9)",
                        },
                      }}
                    >
                      Read More
                    </StyledButton>
                  </CardContent>
                </StyledCard>
              </motion.div>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={1}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4} sx={{ mt: 6.68 }}>
            <Box sx={{ position: "sticky", top: 20 }}>

              <Card sx={{ mt: 0 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Popular Posts
                  </Typography>
                  <List>
                    {popularPosts.map((post, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText primary={post} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          my: 4,
          textAlign: "center",
          backgroundImage: "url('/Images/bg/shop-collection1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px 0",
          color: "black",
        }}
      >
        <Divider sx={{ my: 4, backgroundColor: "rgba(255,255,255,0.7)" }} />
        <Grid container spacing={4} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                color: "#fff",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Decor Vista is a leading inspiration for interior design and home
              decor.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                color: "#fff",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: info@decorvista.com
              <br />
              Phone: (123) 456-7890
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                color: "#fff",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Our Services
            </Typography>
            <Typography variant="body2">
              We provide comprehensive interior design solutions and decoration
              services for your living space.
              <br />
              Our services include: Living room, bedroom, and other living space
              design.
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, opacity: 0.8 }}
        >
          © 2024 Decor Vista. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default FurnitureBlog;

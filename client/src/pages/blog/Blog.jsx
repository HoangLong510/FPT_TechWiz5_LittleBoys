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

// Styled components
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
  paddingTop: "56.25%", // 16:9 aspect ratio
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

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Xu hướng thiết kế nội thất Scandinavian 2023",
    excerpt: "Khám phá sự đơn giản và tinh tế trong phong cách Scandinavian...",
    image: "/Images/bg/3617170_2.jpg?height=300&width=400",
    category: "Xu hướng",
    date: "15 Tháng 5, 2023",
    author: "Nguyễn Văn A",
    featured: true,
  },
  {
    id: 2,
    title: "5 ý tưởng sáng tạo cho phòng khách nhỏ",
    excerpt: "Tối ưu hóa không gian sống với những giải pháp thông minh...",
    image: "/Images/bg/phongkhachnho.png?height=300&width=400",
    category: "Thiết kế",
    date: "10 Tháng 5, 2023",
    author: "Trần Thị B",
    featured: true,
  },
  {
    id: 3,
    title: "Cách chọn sofa phù hợp cho phòng khách",
    excerpt:
      "Hướng dẫn chi tiết để lựa chọn sofa hoàn hảo cho không gian của bạn...",
    image: "/Images/bg/phongkhachnho.png?height=300&width=400",
    category: "Mua sắm",
    date: "5 Tháng 5, 2023",
    author: "Lê Văn C",
  },
  {
    id: 4,
    title: "Nghệ thuật trang trí tường trong thiết kế nội thất",
    excerpt: "Khám phá các phương pháp sáng tạo để trang trí tường nhà bạn...",
    image: "/Images/bg/phongkhachnho.png?height=300&width=400",
    category: "DIY",
    date: "1 Tháng 5, 2023",
    author: "Phạm Thị D",
  },
  {
    id: 5,
    title: "Top 10 cây cảnh dễ chăm sóc cho không gian nội thất",
    excerpt:
      "Tìm hiểu về những loại cây cảnh phù hợp để trang trí và làm sạch không khí trong nhà...",
    image: "/Images/bg/phongkhachnho.png?height=300&width=400",
    category: "Cây cảnh",
    date: "25 Tháng 4, 2023",
    author: "Hoàng Văn E",
  },
];

const categories = [
  "Xu hướng",
  "Thiết kế",
  "DIY",
  "Mua sắm",
  "Phong thủy",
  "Cây cảnh",
];

const popularPosts = [
  "10 cách trang trí phòng ngủ đơn giản",
  "Bí quyết chọn màu sơn cho nhà bếp",
  "Top 5 vật liệu nội thất bền vững",
  "Cách bố trí ánh sáng trong phòng khách",
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
    // Implement newsletter signup logic here
  };

  return (
    <Box>
      {/* Hero Section */}
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
              Blog Decor Vista
            </Typography>
            <Typography
              variant="h7"
              align="center"
              paragraph
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              Khám phá xu hướng, ý tưởng và lời khuyên về thiết kế nội thất
            </Typography>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Featured Posts */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            Bài Viết Nổi Bật
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
                        <Chip
                          label={post.category}
                          color="primary"
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h5" component="h2" gutterBottom>
                          {post.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Bởi {post.author} | {post.date}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {post.excerpt}
                        </Typography>
                        <StyledButton component={Link} to={`/post/${post.id}`}>
                          Đọc tiếp
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
            {/* All Posts */}
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", mt: 0 }}
            >
              Tất Cả Bài Viết
            </Typography>
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Card wrapper để chứa hình ảnh và nội dung */}
                <StyledCard
                  sx={{
                    mb: 4,
                    position: "relative",
                    height: "450px", // Giữ chiều cao hình ảnh
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {/* Hình ảnh full khung */}
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

                  {/* Phần nội dung nằm đè lên hình ảnh */}
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
                        fontSize: "1.2rem", // Chữ tiêu đề nhỏ hơn
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="rgba(255, 255, 255, 0.8)" // Màu chữ dễ đọc hơn
                      gutterBottom
                      sx={{
                        fontSize: "0.8rem", // Giảm kích thước chữ thông tin
                        mb: 2,
                      }}
                    >
                      Bởi {post.author} | {post.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      sx={{
                        fontSize: "0.75rem", // Chữ nhỏ gọn hơn
                        lineHeight: 1.4,
                        mb: 2,
                      }}
                    >
                      {post.excerpt}
                    </Typography>

                    {/* Nút nhỏ và nằm bên phải dưới */}
                    <StyledButton
                      component={Link}
                      to={`/post/${post.id}`}
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        fontSize: "0.8rem", // Nút nhỏ hơn
                        borderRadius: "20px",
                        backgroundColor: "rgb(90, 90, 90, 0.7", // Xám nhạt
                        color: "#333", // Màu chữ đậm hơn
                        fontWeight: "500",
                        "&:hover": {
                          backgroundColor: "rgb(90, 90, 90, 0.9)", // Tăng độ rõ khi hover
                        },
                      }}
                    >
                      Đọc tiếp
                    </StyledButton>
                  </CardContent>
                </StyledCard>
              </motion.div>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={10}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={4} sx={{ mt: 6.68 }}>
            <Box sx={{ position: "sticky", top: 20 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Danh mục
                  </Typography>
                  <List>
                    {categories.map((category, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText primary={category} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card sx={{ mt: 4 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Bài viết phổ biến
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

              <Card sx={{ mt: 4 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Đăng ký nhận bản tin
                  </Typography>
                  <form onSubmit={handleNewsletterSignup}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Địa chỉ email của bạn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                    <StyledButton type="submit" fullWidth>
                      Đăng ký
                    </StyledButton>
                  </form>
                </CardContent>
              </Card>

              <Card sx={{ mt: 4 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Theo dõi chúng tôi
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: 2,
                    }}
                  >
                    <FacebookIcon color="primary" />
                    <TwitterIcon color="primary" />
                    <InstagramIcon color="primary" />
                    <PinterestIcon color="primary" />
                  </Box>
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
                textShadow:
                  "1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Decor Vista là nguồn cảm hứng hàng đầu về thiết kế nội thất và
              trang trí nhà cửa.
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
                textShadow:
                  "1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white",
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: info@decorvista.com
              <br />
              Điện thoại: (123) 456-7890
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
                textShadow: '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white'
              },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Our Services
            </Typography>
            <Typography variant="body2">
              Chúng tôi cung cấp các giải pháp toàn diện về thiết kế nội thất và
              thi công trang trí cho không gian sống của bạn.
              <br />
              Các dịch vụ bao gồm: Thiết kế phòng khách, phòng ngủ, và các không
              gian sống khác.
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, opacity: 0.8 }}
        >
          © 2023 Decor Vista. Tất cả các quyền được bảo lưu.
        </Typography>
      </Box>
    </Box>
  );
};

export default FurnitureBlog;

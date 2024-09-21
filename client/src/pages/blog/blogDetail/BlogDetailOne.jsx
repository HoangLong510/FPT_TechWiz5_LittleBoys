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
              Khám phá xu hướng thiết kế nội thất Scandinavian 2023
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
        {/* Phần tiêu đề blog */}
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "2.5rem", color: "#333" }}
        >
          Scandinavian Design là gì?
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Bởi Nguyễn Văn A | 15 Tháng 5, 2023
        </Typography>

        {/* Nội dung blog */}
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "#555", fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          Scandinavian Design là xu hướng thiết kế nội thất Bắc Âu (Scandinavian
          Interior Design) hiện đại được nhiều người lựa chọn với nét đẹp tối
          giản và tinh tế. Phong cách thiết kế này không chỉ được ứng dụng rộng
          rãi trong phòng ngủ hay phòng khách mà kể cả phòng bếp.
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "1.5rem", color: "#333" }}
        >
          Đặc trưng phong cách Scandinavian Design
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "#555", fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          Nhắc đến Scandinavian Design, không thể không nhắc đến sự mộc mạc và
          bình dị, nhưng không kém phần tinh tế. Nét bình dị thể hiện rõ ở gam
          màu chủ đạo của phong cách này là màu trắng và các gam màu đơn sắc
          khác như đen, xanh, kem, xám,… Các màu sắc trung tính không những tạo
          cảm giác nhẹ nhàng, thoải mái lại mang đến hơi thở trẻ trung, hiện đại
          cho không gian.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "#555", fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          Điểm nổi bật trong Scandinavian Design đó là chủ nghĩa tối giản. Nét
          tối giản thể hiện ở sự gọn gàng khi sắp xếp đồ đạc, lựa chọn các sản
          phẩm nội thất đa công năng giúp tiết kiệm diện tích. Nhìn vào những
          căn phòng thiết kế theo phong cách Bắc Âu, chúng ta thấy được sự tinh
          tế trong sự lựa chọn và bố trí đồ đạc, giúp tạo nên một không gian
          thoáng đãng, rộng rãi và tràn ngập ánh sáng.
        </Typography>

        {/* Trích dẫn */}
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
          Tính ứng dụng cao của phong cách Scandinavian Design
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "#555", fontSize: "1.125rem", lineHeight: "1.8" }}
        >
          Điểm nổi bật trong Scandinavian Design đó là chủ nghĩa tối giản. Nét
          tối giản thể hiện ở sự gọn gàng khi sắp xếp đồ đạc, lựa chọn các sản
          phẩm nội thất đa công năng giúp tiết kiệm diện tích. Nhìn vào những
          căn phòng thiết kế theo phong cách Bắc Âu, chúng ta thấy được sự tinh
          tế trong sự lựa chọn và bố trí đồ đạc, giúp tạo nên một không gian
          thoáng đãng, rộng rãi và tràn ngập ánh sáng.
        </Typography>

        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "1.9rem", color: "#333" }}
        >
          TOP mẫu nhà bếp phong cách Scandinavian Design đẹp, hiện đại, xu hướng
          2023
        </Typography>
      </Box>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Hình ảnh bên trái */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/Images/bg/blogdetail3.jpg" // Đường dẫn hình ảnh thay thế
              alt="Featured Image"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </Grid>

          {/* Nội dung bên phải */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Bởi Nguyễn Văn A | 15 Tháng 5, 2023
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              Mẫu nhà bếp sử dụng tông màu trắng chủ đạo
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Màu trắng là gam màu đặc trưng của phong cách Scandinavian Design.
              Nó mang đến vẻ đẹp đơn giản, nhẹ nhàng nhưng tinh tế. Màu trắng
              còn dễ kết hợp với các màu sắc trung tính khác như đen, xám, nâu,
              xanh,… tạo nên nét tương phản độc đáo. Ngoài ra, với màu trắng chủ
              đạo, thiết kế này giúp cho không gian được mở rộng, thoáng đãng và
              hiện đại hơn...
            </Typography>

            <Button
              component="a"
              href="https://jysk.vn/trang-tri-nha-bep-phong-cach-scandinavian-design-tinh-te-va-hien-dai"
              target="_blank" // Mở liên kết trong tab mới
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
      {/* Phần chia sẻ trên mạng xã hội */}
      <Box sx={{ my: 4, display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Search:
        </Typography>
        <Facebook sx={{ mx: 1, cursor: "pointer", color: "#4267B2" }} />
        <Twitter sx={{ mx: 1, cursor: "pointer", color: "#1DA1F2" }} />
        <Instagram sx={{ mx: 1, cursor: "pointer", color: "#C13584" }} />
        <LinkedIn sx={{ mx: 1, cursor: "pointer", color: "#0077b5" }} />
      </Box>
    </Container>
  );
}

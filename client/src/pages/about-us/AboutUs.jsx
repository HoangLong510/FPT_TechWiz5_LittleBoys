import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
  Grid,
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
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const teamMembers = [
  {
    name: "Nguyễn Văn A",
    position: "CEO & Founder",
    description:
      "Nguyễn Văn A là người sáng lập công ty với tầm nhìn và kinh nghiệm trong ngành công nghệ.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "nguyenvana@company.com",
  },
  {
    name: "Trần Thị B",
    position: "CTO",
    description: "",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "tranthib@company.com",
  },
  {
    name: "Nguyễn Văn C",
    position: "COO",
    description:
      "Nguyễn Văn C điều hành hoạt động hàng ngày của công ty và tối ưu hoá hiệu suất làm việc.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "nguyenvanc@company.com",
  },
  {
    name: "Nguyễn Văn D",
    position: "COO",
    description:
      "Nguyễn Văn D điều hành hoạt động hàng ngày của công ty và tối ưu hoá hiệu suất làm việc.",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "nguyenvanc@company.com",
  },
];

const features = [
  {
    title: "Hiệu Suất Cao",
    description:
      "Các giải pháp của chúng tôi được tối ưu hóa cho hiệu suất cao, đảm bảo hoạt động mượt mà với lượng người dùng lớn.",
    icon: <SpeedIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
  {
    title: "Bảo Mật Cao",
    description:
      "Chúng tôi luôn đặt sự bảo mật lên hàng đầu, bảo vệ thông tin người dùng với các tiêu chuẩn an ninh cao nhất.",
    icon: <SecurityIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
  {
    title: "Tương Thích Mọi Thiết Bị",
    description:
      "Dịch vụ của chúng tôi hoạt động tốt trên mọi thiết bị, từ điện thoại, máy tính bảng cho đến máy tính bàn.",
    icon: <DevicesIcon sx={{ fontSize: 60, color: teal[500] }} />,
  },
];

export default function AboutUs() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  const { t, i18n } = useTranslation();
  
  const locale = i18n.language;
    return (

    <div className="about-us">
      {/* BODY */}
      <div className="body">
        {/* Hình nền lớn ở đầu trang */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "250px", md: "400px" },
            backgroundImage: `url('./test.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
            Về Chúng Tôi
          </Typography>
        </Box>
        <Container maxWidth="lg" sx={{ paddingTop: 8, paddingBottom: 8 }}>
          {/* Phần Giới Thiệu */}
          <Typography variant="body1" align="center" paragraph>
            Chúng tôi là một công ty công nghệ với đội ngũ nhân viên tài năng,
            đam mê và sáng tạo. Sứ mệnh của chúng tôi là cung cấp các giải pháp
            công nghệ tiên tiến, mang lại giá trị thực sự cho khách hàng. Với sự
            phát triển không ngừng, chúng tôi tự hào về những sản phẩm và dịch
            vụ mà mình cung cấp, giúp đỡ hàng ngàn người dùng trên khắp thế
            giới.
          </Typography>

          {/* Tính Năng Nổi Bật */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ marginTop: 6 }}
          >
            Tính Năng Nổi Bật
          </Typography>
          <Grid container spacing={4} sx={{ marginBottom: 6 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box textAlign="center">
                  {feature.icon}
                  <Typography variant="h6" sx={{ marginTop: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Tầm Nhìn và Sứ Mệnh */}
          <Divider sx={{ marginBottom: 4 }} />
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
            Tầm Nhìn và Sứ Mệnh
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            Tầm nhìn của chúng tôi là trở thành công ty dẫn đầu trong lĩnh vực
            công nghệ, mang lại những sản phẩm và dịch vụ chất lượng hàng đầu.
            Chúng tôi luôn không ngừng đổi mới và sáng tạo để đáp ứng nhu cầu
            ngày càng cao của khách hàng. Sứ mệnh của chúng tôi là giúp các
            doanh nghiệp và cá nhân khai phá tiềm năng của họ thông qua các giải
            pháp công nghệ tiên tiến, tạo nên một tương lai số hóa bền vững và
            thành công.
          </Typography>
          {/* Đội Ngũ */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
          >
            <TeamIcon sx={{ fontSize: 80, color: deepPurple[500] }} />
          </Box>
          <Typography variant="h5" align="center" gutterBottom mb={4} mt={2}>
            Đội Ngũ Của Chúng Tôi
          </Typography>

          <Slider {...sliderSettings}>
            {teamMembers.map((member, index) => (
              <div key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px",
                    minHeight: 230,
                    display: "flex",
                    justifyContent: "space-between",
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
                          {[i18n.language]}
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
                      {member.description || "Thông tin chưa được cập nhật."}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </Container>
      </div>
    </div>
  );
}

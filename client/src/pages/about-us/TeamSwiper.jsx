import React from "react";
import Slider from "react-slick";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email"; // Import Email Icon
import { Avatar, Typography } from "@mui/material";
import "./style.css";

// Team data
const teamMembers = [
  {
    name: "Hoàng Gia Huy",
    phone: "0983653430",
    email: "hoanggiahuy@example.com",
    description:
      "A software engineer with a passion for building scalable and efficient systems.",
    avatarUrl: "/images/avatars/team-4.jpg",
  },
  {
    name: "Trần Nhật Linh",
    phone: "0983653430",
    email: "nhatlinh@example.com",
    description:
      "A software engineer with a passion for building scalable and efficient systems.",
    avatarUrl: "/images/avatars/team-4.jpg",
  },
  {
    name: "Nguyễn Trần Hoàng Long",
    phone: "0983653430",
    email: "nguyenhoanglong@example.com",
    description:
      "A software engineer with a passion for building scalable and efficient systems.",
    avatarUrl: "/images/avatars/team-4.jpg",
  },
  {
    name: "Nguyễn Anh Quân",
    phone: "0983653430",
    email: "anhquan@example.com",
    description:
      "A software engineer with a passion for building scalable and efficient systems.",
    avatarUrl: "/images/avatars/team-4.jpg",
  },
];

const TeamSwiper = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1300,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 4000,
    
  };

  return (
    <Slider {...settings}>
      {teamMembers.map((member, index) => (
        <div key={index} className="card d-flex flex-row align-items-center">
          <Avatar
            className="avatar ms-4 me-3"
            alt={member.name}
            src={member.avatarUrl}
            sx={{ width: 150, height: 150 }}
            onError={(e) => (e.target.src = "/images/avatars/placeholder.jpg")}
          />
          <div className="card-body">
            <div className="row">
              <div className="col-md-5">
                <Typography  className="card-name">{member.name}</Typography>
                <hr />
                <div className="information" >
                    <div className="phone-info">
                      <PhoneIcon />
                      <span className="info">{member.phone}</span>
                    </div>
                    <div className="email-info">
                      <EmailIcon />
                      <span className="info">{member.email}</span>
                    </div>
                </div>
              </div>
              <div className="col-md-7">
                <Typography variant="body1" className="card-description">
                  {member.description}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default TeamSwiper;

import React from "react";
import Slider from "react-slick";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Box, Typography } from "@mui/material";
import "./style.css";

// Team data
const teamMembers = [
  {
    name: "Hoàng Gia Huy",
    phone: "0983653430",
    description:
      "A software engineer with a passion for building scalable and efficient systems.",
    avatarUrl: "/images/avatars/team-4.jpg",
  },
  {
    name: "Trần Nhật Linh",
    phone: "00000000",
    description:
      "A software engineer with a passion for building scalable and efficient systems.",
    avatarUrl: "/images/avatars/team-4.jpg",
  },
  {
    name: "Nguyễn Trần Hoàng Long",
    phone: "0983653430",
    description:
      "A software engineer with a passion for building scalable and efficient systems.",
    avatarUrl: "/images/avatars/team-4.jpg",
  },
  {
    name: "Nguyễn Anh Quân",
    phone: "0983653430",
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
            sx={{ width: 100, height: 100 }}
          />
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                <Typography variant="h5" className="card-name">
                  {member.name}
                </Typography>
                <hr />
                <div className="phone-info">
                  <PhoneIcon />
                  <span className="info">{member.phone}</span>
                </div>
              </div>
              <div className="col-md-9">
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

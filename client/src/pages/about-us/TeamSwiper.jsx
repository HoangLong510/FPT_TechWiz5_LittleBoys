import React from "react";
import Slider from "react-slick";
import PhoneIcon from "@mui/icons-material/Phone";
import "./style.css";

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
      <div className="card d-flex flex-row align-items-center">
        <img
          className="avatar ms-4 me-3"
          src="/images/avatars/team-4.jpg"
          alt="Jessica Doe"
        />
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <h3 className="card-name">Hoàng Gia Huy</h3>
              <hr />
              <div className="phone-info">
                <PhoneIcon />
                <span className="info">0983653430</span>
              </div>
            </div>
            <div className="col-md-9">
              <h5 className="card-description">
                A software engineer with a passion for building scalable and
                efficient systems.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="card d-flex flex-row align-items-center">
        <img
          className="avatar ms-4 me-3"
          src="/images/avatars/team-4.jpg"
          alt="Jessica Doe"
        />
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <h3 className="card-name">Trần Nhật Linh</h3>
              <hr />
              <div className="phone-info">
                <PhoneIcon />
                <span className="info">00000000</span>
              </div>
            </div>
            <div className="col-md-9">
              <h5 className="card-description">
                A software engineer with a passion for building scalable and
                efficient systems.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="card d-flex flex-row align-items-center">
        <img
          className="avatar ms-4 me-3"
          src="/images/avatars/team-4.jpg"
          alt="Jessica Doe"
        />
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <h3 className="card-name">Nguyễn Trần Hoàng Long</h3>
              <hr />
              <div className="phone-info">
                <PhoneIcon />
                <span className="info">0983653430</span>
              </div>
            </div>
            <div className="col-md-9">
              <h5 className="card-description">
                A software engineer with a passion for building scalable and
                efficient systems.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="card d-flex flex-row align-items-center">
        <img
          className="avatar ms-4 me-3"
          src="/images/avatars/team-4.jpg"
          alt="Jessica Doe"
        />
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <h3 className="card-name">Nguyễn Anh Quân</h3>
              <hr />
              <div className="phone-info">
                <PhoneIcon />
                <span className="info">0983653430</span>
              </div>
            </div>
            <div className="col-md-9">
              <h5 className="card-description">
                A software engineer with a passion for building scalable and
                efficient systems.
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* Thêm các card khác tại đây */}
    </Slider>
  );
};

export default TeamSwiper;

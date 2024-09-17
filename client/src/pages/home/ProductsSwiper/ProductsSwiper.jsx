import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Card, CardContent, Typography, Box, Divider, IconButton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareIcon from '@mui/icons-material/Compare';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './ProductsSwiper.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { data } from './ProductSwiper'; 


export default function ProductsSwiper() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleMouseEnter = (icon) => {
    setHoveredIcon(icon);
  };

  const handleMouseLeave = () => {
    setHoveredIcon(null);
  };

  const sliderBigSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    draggable: false,
    swipe: false,
    touchMove: false,
    touchThreshold: 10,
    adaptiveHeight: true,
    prevArrow: <ArrowBackIosIcon />,
    nextArrow: <ArrowForwardIosIcon />,
  };

  const sliderSmallSettings = {
    infinite: true,
    arrows: false,
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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className='Slider' style={{ minHeight: '600px' }}>
      <Slider {...sliderBigSettings}>
        {data.map((category, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div className='slider-header'>
              <Typography
                variant="h2"
                sx={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                }}
              >
                {category.title}
              </Typography>
            </div>
            <div className="slider-content">
              <Slider {...sliderSmallSettings}>
                {category.products.map((product, idx) => (
                  <div key={idx}>
                    <Box>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        position: 'relative',
                        margin: "10px",
                        height: '100%',
                        justifyContent: "space-between",
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={product.imgSrc}
                        alt={product.name}
                        className="card-image"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          maxHeight: '300px',
                          flexShrink: 0,
                        }}
                      />
                      <CardContent 
                        sx={{ 
                          flexGrow: 1,
                          padding: '10px',
                          }}>
                        <Box display="flex" flexDirection="column">
                          <Box display="flex" alignItems="center" mb={2}>
                            <Box>
                              <Typography variant="h6">{product.name}</Typography>
                              <Box display="flex" alignItems="center">
                                <Typography variant="body2" color="textSecondary">
                                  {product.price}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{ textDecoration: 'line-through', marginLeft: '8px' }}
                                >
                                  {product.oldPrice}
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
                            {product.description || "No description available."}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            position: 'relative',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'space-around',
                            padding: '10px',
                            boxSizing: 'border-box', 
                            flexShrink: 0,
                          }}
                        >
                          <div className="icon-container">
                            <div className="icon-group">
                              <div
                                className={`icon-singlesp ${hoveredIcon === 'add' ? 'hovered' : ''}`}
                                onMouseEnter={() => handleMouseEnter('add')}
                                onMouseLeave={handleMouseLeave}
                              >
                                <IconButton className="icon-button-with-text">
                                  <AddShoppingCartIcon sx={{ fontSize: 16, color: 'white' }} />
                                  <span className="hover-text" data-aos="fade-right">Add to Bag</span>
                                </IconButton>
                              </div>
                              <div
                                className={`icon-single ${hoveredIcon === 'favorite' ? 'hovered' : ''}`}
                                onMouseEnter={() => handleMouseEnter('favorite')}
                                onMouseLeave={handleMouseLeave}
                              >
                                <IconButton className="icon-button-with-text">
                                  <FavoriteIcon sx={{ fontSize: 16, color: 'white' }} />
                                  <span className="hover-text" data-aos="fade-right">Wishlist</span>
                                </IconButton>
                              </div>
                              <div
                                className={`icon-single ${hoveredIcon === 'compare' ? 'hovered' : ''}`}
                                onMouseEnter={() => handleMouseEnter('compare')}
                                onMouseLeave={handleMouseLeave}
                              >
                                <IconButton className="icon-button-with-text">
                                  <CompareIcon sx={{ fontSize: 16, color: 'white' }} />
                                  <span className="hover-text" data-aos="fade-right">Compare</span>
                                </IconButton>
                              </div>
                              <div
                                className={`icon-single ${hoveredIcon === 'view' ? 'hovered' : ''}`}
                                onMouseEnter={() => handleMouseEnter('view')}
                                onMouseLeave={handleMouseLeave}
                              >
                                <IconButton className="icon-button-with-text">
                                  <VisibilityIcon sx={{ fontSize: 16, color: 'white' }} />
                                  <span className="hover-text" data-aos="fade-right">View More</span>
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </CardContent>
                    </Card>
                    </Box>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </Slider>
    </Box>
  );
}

import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Box, Paper } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import ReplayIcon from '@mui/icons-material/Replay';
import Gallery from '~/components/Gallery/Gallery';


const oldProducts = [
    { name: 'Old Product 1', price: '$50', image: 'https://via.placeholder.com/150' },
    { name: 'Old Product 2', price: '$70', image: 'https://via.placeholder.com/150' },
    { name: 'Old Product 3', price: '$80', image: 'https://via.placeholder.com/150' },
    { name: 'Old Product 4', price: '$90', image: 'https://via.placeholder.com/150' },
  ];

export default function Homepage() {

    const { t } = useTranslation()

    return (
        <>
            <Helmet>
				<title>{import.meta.env.VITE_PROJECT_NAME} | {t("Homepage")}</title>
			</Helmet>

             {/* Banner + Slider */}
      <Box sx={{ maxWidth: '100%', mb: 4 }}>
        <Carousel autoPlay infiniteLoop showThumbs={false}>
          <div>
            <img src="https://via.placeholder.com/1500x500" alt="Banner 1" />
          </div>
          <div>
            <img src="https://via.placeholder.com/1500x500" alt="Banner 2" />
          </div>
          <div>
            <img src="https://via.placeholder.com/1500x500" alt="Banner 3" />
          </div>
        </Carousel>
      </Box>

      {/* 4 Service Icons */}
      <Container sx={{ mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <LocalShippingIcon fontSize="large" />
              <Typography variant="h6">Giao hàng nhanh</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <SupportAgentIcon fontSize="large" />
              <Typography variant="h6">Hỗ trợ 24/7</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <SecurityIcon fontSize="large" />
              <Typography variant="h6">Thanh toán an toàn</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <ReplayIcon fontSize="large" />
              <Typography variant="h6">Chính sách hoàn trả</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Gallery */}
      <Gallery/>
      {/* Old Products Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sản phẩm cũ (Giảm giá mạnh)
        </Typography>
        <Grid container spacing={4}>
          {oldProducts.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200 }}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {product.name}
                  </Typography>
                  <Typography>
                    {product.price}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth>
                    Mua ngay
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
        </>
    )
}

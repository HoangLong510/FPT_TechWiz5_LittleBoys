import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Paper,
  Snackbar,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: 'Câu hỏi chung',
    message: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate('/thank-you');
    }, 3000);
  };

  const faqItems = [
    { question: 'How do I place an order?', answer: 'You can place an order online through our website or by calling directly.' },
    { question: 'What is the return policy?', answer: 'We accept returns within 30 days of purchase.' },
    { question: 'How long does delivery take?', answer: 'The usual delivery time is 3-5 business days.' },
  ];
  

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
        backgroundImage: "url('/Images/bg/living-room-2732939.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Paper
        elevation={3}
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Typography variant="h4" align="center" fontWeight='bold' gutterBottom>
        Contact us
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
          <Tooltip title="Gọi cho chúng tôi">
            <IconButton color="primary" aria-label="phone">
              <PhoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Gửi email cho chúng tôi" >
            <IconButton color="primary" aria-label="email" href="mailto:decorvistafpthcm@gmail.com" >
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ghé thăm chúng tôi">
            <IconButton color="primary" aria-label="location" target='_blank' component={Link} to={'https://maps.app.goo.gl/KdPzavXu21cp1Nts6'}>
              <LocationOnIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Reason for contact"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            margin="normal"
          >
            {['Câu hỏi chung', 'Trạng thái đơn hàng', 'Đổi trả hàng', 'Đổi trả hàng quốc tế', 'Hàng hóa bị hư hỏng', 'Tài khoản của tôi', 'Yêu cầu hủy đơn hàng', 'Khác'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Content"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              sx={{
                mt: 2,
                width: isMobile ? '100%' : 'auto',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(90deg, #ab6e35 50%, #292929 50%)',
                backgroundSize: '200% 100%',
                backgroundPosition: 'right bottom',
                transition: 'all 0.3s ease',
                color: '#fff',
                '&:hover': {
                  backgroundPosition: 'left bottom',
                  transform: 'scale(1.05)',
                },
                '& .MuiButton-startIcon, & .MuiButton-label': {
                  position: 'relative',
                  zIndex: 2,
                },
              }}
            >
              Send message
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>Frequently Asked Questions</Typography>
          {faqItems.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Typography variant="body2" color="text.secondary" align="center">
          To ensure you receive emails from Decor Vista, please check your spam folder and add{' '}
          <a href="mailto:decorvistafpthcm@gmail.com">decorvistafpthcm@gmail.com</a> to your safe senders list.
        </Typography>
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Message sent successfully!"
      />
    </Box>
  );
};

export default ContactUs;
import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
  const faqData = [
    {
      question: 'What is DecorVista?',
      answer:
        'DecorVista is a platform that allows customers to browse home furniture products and connect with professional interior designers.',
    },
    {
      question: 'How can I contact a designer?',
      answer:
        'You can contact a designer by visiting their profile and using the provided contact information or booking an appointment directly through the platform.',
    },
    {
      question: 'Can I save my favorite products?',
      answer:
        'Yes, you can save your favorite products by clicking on the heart icon on each product, and you can access them later from your account.',
    },
    {
      question: 'What does it mean to follow a designer?',
      answer:
        'When you follow a designer, you will receive updates about their latest projects and trends they are sharing.',
    },
    {
      question: 'Is payment and delivery included?',
      answer:
        'No, DecorVista focuses on showcasing and connecting customers with designers. Payment and delivery functionalities are not part of the platform.',
    },
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
        backgroundImage: "url('/Images/bg/faq1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.3)",
      }}
    >
      
        <Container maxWidth="lg" style={{ marginTop: '2rem' , marginBottom: '2rem' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{textShadow: "2px 2px 5px rgba(0,0,0,2)", color: "#fff"}}>
        Frequently Asked Questions (FAQ)
      </Typography>
      <Grid container spacing={2}>
        {faqData.map((faq, index) => (
          <Grid item xs={12} key={index}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
    
  );
};

export default FAQ;
import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqItems = [
  {
    question: 'What is your return policy?',
    answers: [
      'You can return products within 30 days of purchase.',
      'Items must be in original condition.',
    ],
  },
  {
    question: 'How do I track my order?',
    answers: [
      'You will receive an email with tracking information once your order has shipped.',
      'You can also track your order status in your account dashboard.',
    ],
  },
  // Add more FAQ items as needed
];

export default function FAQ() {
  return (
    <Grid container spacing={4} sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            FAQ
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" sx={{ color: '#555' }}>
            Find answers to commonly asked questions. If you need further assistance, feel free to reach out to our support team.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box sx={{ p: 4, mt: 8, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
          {faqItems.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#007bff' }} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {faq.answers.map((answer, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 1, color: '#333' }}>
                    {answer}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

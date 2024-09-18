import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
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
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid item xs={12} md={4}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            FAQ
          </Typography>
          <Typography variant="body1">
            Description about the FAQ section. You can include any relevant information here to help users understand the purpose of the FAQ section.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box sx={{ p: 2, mt:8}}>
          {faqItems.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {faq.answers.map((answer, idx) => (
                  <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
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

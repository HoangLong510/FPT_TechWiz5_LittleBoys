import React from "react";
import { TextField, MenuItem, Button, Box, Typography } from "@mui/material";
import "./Contact.css";

function ContactUs() {
  return (
    <Box
      className="contact-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "primary.main",
      }}
    >
      <Box className="form--contact">
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <span>General Inquiries</span>
            <br />
            <span>decorvistafpthcm@gmail.com</span>
            <br />
          </Typography>
          <Typography component="div" style={{ marginTop: "16px" }}>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Returns
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              link of return page
            </a>
          </Typography>
          <Typography>
            <span>
              <br />
              Send us a message
              <br />
            </span>
          </Typography>
          <Typography>
            To ensure you receive emails from Decor Vista, please check your
            spam folder for messages from Fear of God. Make sure that your email
            settings are up to date by adding our{" "}
            <a
              href="mailto: decorvistafpthcm@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              decorvistafpthcm@gmail.com
            </a>{" "}
            email address to your Safe Senders list.
          </Typography>
        </Box>

        <form
          method="post"
          action="/en-vn/contact#contact_form"
          id="contact_form"
          acceptCharset="UTF-8"
        >
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box className="formControl-group">
              <TextField
                fullWidth
                id="ContactFormName"
                name="contact[name]"
                label="Name"
                placeholder="Name"
                variant="outlined"
                className="formControl"
              />
            </Box>

            <Box className="formControl-group">
              <TextField
                fullWidth
                id="ContactFormReason"
                name="contact[reason]"
                label="Reason"
                select
                variant="outlined"
                className="form-select"
                value="General Inquiry"
              >
                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                <MenuItem value="Order Status">Order Status</MenuItem>
                <MenuItem value="Returns and Exchanges">
                  Returns & Exchanges
                </MenuItem>
                <MenuItem value="International Returns">
                  International Returns
                </MenuItem>
                <MenuItem value="Damages">Damages</MenuItem>
                <MenuItem value="My Account">My Account</MenuItem>
                <MenuItem value="Cancelation Request">
                  Cancelation Request
                </MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Box>

            <Box className="formControl-group">
              <TextField
                fullWidth
                id="ContactFormEmail"
                name="contact[email]"
                label="Email"
                type="email"
                placeholder="Email"
                variant="outlined"
                className="formControl"
              />
            </Box>

            <Box className="formControl-group">
              <TextField
                fullWidth
                id="ContactFormMessage"
                name="contact[body]"
                label="Message"
                placeholder="Message"
                multiline
                rows={6}
                variant="outlined"
                className="formControl"
              />
            </Box>

            <Box className="formControl-group">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="btn"
              >
                Send
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default ContactUs;

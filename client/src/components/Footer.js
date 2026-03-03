import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { styled } from "@mui/material/styles";

const GlassFooter = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "rgba(30,30,60,0.5)",
  borderTop: "1px solid rgba(255,255,255,0.15)",
  backdropFilter: "blur(14px)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3, 0, 2),
  position: "relative",
  zIndex: 50,
  fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  fontSize: "1rem",
  fontWeight: 500,
}));

const Footer = () => (
  <GlassFooter component="footer">
    <Typography variant="body2" color="inherit" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      Made with <span aria-label="love" role="img">❤️</span> by&nbsp;
      <MuiLink
        href="https://www.linkedin.com/in/divanshu-thakur/"
        target="_blank"
        rel="noopener noreferrer"
        color="secondary"
        underline="hover"
        sx={{
          fontWeight: 700,
          letterSpacing: ".02em"
        }}
      >Divanshu Thakur</MuiLink>
    </Typography>
  </GlassFooter>
);

export default Footer;

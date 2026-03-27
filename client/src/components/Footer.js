import React from "react";
import { Box, Typography, Link as MuiLink, Container } from "@mui/material";
import { Favorite } from "@mui/icons-material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 2,
      px: 2,
      mt: 'auto',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
      zIndex: 10,
    }}
  >
    <Container maxWidth="lg">
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
        Built with <Favorite sx={{ color: '#f44336', fontSize: 16 }} /> by{' '}
        <MuiLink
          href="https://www.linkedin.com/in/divanshu-thakur/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'white',
            fontWeight: 600,
            textDecoration: 'none',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '0%',
              height: '1.5px',
              bottom: -1,
              left: 0,
              backgroundColor: 'rgba(147, 51, 234, 0.8)',
              transition: 'all 0.3s ease-in-out',
            },
            '&:hover::after': {
              width: '100%',
            },
          }}
        >
          Divanshu Thakur
        </MuiLink>
        {' '}© {new Date().getFullYear()}
      </Typography>
    </Container>
  </Box>
);

export default Footer;

import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import { styles } from './footer.style';

const Footer: React.FC = () => {
  return (
    <Box sx={styles.footer}>
      <Link href="https://www.linkedin.com/in/lucas-felipe-2b314a150/" target="_blank" rel="noopener" underline="none">
        <Typography variant="body1" sx={styles.footerText}>
          Feito com <span role="img" aria-label="heart">❤️</span> por <span style={{ textDecoration: 'underline' }}>Lucas Felipe Timoteo</span>
        </Typography>
      </Link>
    </Box>
  );
};

export default Footer;
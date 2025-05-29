import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './hero.style';
import { useHeroAnimation } from '../hooks/hero/useHeroAnimation';

const Hero: React.FC = () => {
  const { animate, isSubscriptionPage } = useHeroAnimation();

  return (
    <Box sx={styles.heroContainer}>
      <Typography
        variant="h4"
        component="p"
        sx={{ ...styles.heroText, ...(animate && styles.heroTextAnimate) }}
      >
        {isSubscriptionPage ? 'Navegue entre seus cursos!' : 'Encontre os melhores cursos de tecnologia!'}
      </Typography>
    </Box>
  );
};

export default Hero;
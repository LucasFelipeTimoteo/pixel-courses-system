import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React, { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../contexts/theme/hooks/useThemeContext';
import { styles } from './header.style';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { toggleTheme, mode } = useThemeContext();

  const handleSubscriptionsClick = () => {
    navigate("/subscriptions");
  };

  return (
    <AppBar position="static" color='secondary' sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Link to="/" style={{
          color: 'inherit',
          textDecoration: 'none',
          display: "flex",
          flexDirection: "row"
        }}>
          <SelectAllIcon fontSize="large" />
        </Link>

        <Box sx={styles.navItems}>
          <Link to="/" style={styles.link}>
            <Typography variant="body2" component="div" sx={styles.navItemText}>
              cursos
            </Typography>
          </Link>
          <a target='_blank' href="https://www.linkedin.com/in/lucas-felipe-2b314a150/" style={styles.link}>
            <Typography variant="body2" component="div" sx={styles.navItemText}>
              suporte
            </Typography>
          </a>
        </Box>

        <Box sx={styles.actionIcons}>
          <IconButton color="inherit" onClick={handleSubscriptionsClick}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
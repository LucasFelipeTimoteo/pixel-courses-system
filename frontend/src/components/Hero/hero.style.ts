import type { SxProps } from '@mui/system';
import { keyframes } from '@mui/system';
import heroWallpaper from '../../assets/hero-background.jpg';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const heroContainer: SxProps = {
  zIndex: 3,
  height: '79.4vh',
  backgroundImage: `url(${heroWallpaper})`,
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

const heroText: SxProps = {
  margin: "25px",
  color: 'white',
};

const heroTextAnimate: SxProps = {
  animation: `${slideIn} 1s ease-out`,
};

export const styles = {
  heroContainer,
  heroText,
  heroTextAnimate,
};
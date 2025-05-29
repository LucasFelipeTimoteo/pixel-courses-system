import type { SxProps } from '@mui/system';

const appBar: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  position: "sticky",
  top: '0px',
  zIndex: 2
};

const toolbar: SxProps = {
  display: 'flex',
  justifyContent: 'start',
  gap: 10
};

const actionIcons: SxProps = {
  margin: "0px 0px 0px auto",
  display: 'flex',
  alignItems: 'center',
};

const navItems: SxProps = {
  display: 'flex',
  gap: 2,
};

const navItemText: SxProps = {
  "&:hover": {
    textDecoration: 'underline',
    scale: 1.1
  }
}

const link = { color: 'inherit', textDecoration: 'none' }

export const styles = {
  appBar,
  toolbar,
  actionIcons,
  navItems,
  navItemText,
  link,
};
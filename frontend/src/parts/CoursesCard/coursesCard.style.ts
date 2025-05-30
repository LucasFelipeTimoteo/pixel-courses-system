import type { SxProps } from "@mui/material";

const card: SxProps = {
  width: 270,
  height: 350,
  display: "flex",
  flexDirection: "column",
  overflow: 'hidden',
  '&:hover img': {
    transform: 'scale(1.05)',
  },
};

const LargeCard: SxProps = {
  width: 420,
  height: 350,
  display: "flex",
  flexDirection: "column",
  overflow: 'hidden',
  '&:hover img': {
    transform: 'scale(1.05)',
  },
}

const cardMedia: SxProps = {
  height: '50%',
  objectFit: 'scale-down',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
};

const cardContent: SxProps = {
  padding: 2,
  paddingBottom: 0,
  textAlign: "center",
};

const title: SxProps = {
  fontSize: '1rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
};

const cardText: SxProps = {
  color: 'text.primary',
  marginBottom: 2,
  fontSize: '0.75rem',
};

const cardTimeText: SxProps = {
  color: 'text.primary',
  marginBottom: 0.5,
  fontSize: '0.80rem',
};

const cardTimeIcon: SxProps = {
  verticalAlign: "text-bottom",
  fontSize: '1rem',
}

const cardActions: SxProps = {
  marginTop: "auto",
};

export const styles = {
  card,
  LargeCard,
  cardActions,
  cardContent,
  cardTimeText,
  cardTimeIcon,
  cardMedia,
  cardText,
  title,
};
import type { SxProps } from "@mui/material";

const coursesPageContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 3,
  marginTop: "50px"
}

const title: SxProps = {
  marginBottom: "50px",
  marginLeft: "25px"
}

const intersection = { height: '20px', background: 'transparent' }


export const styles = {
  coursesPageContainer,
  title,
  intersection
}
import { type SxProps } from "@mui/system";

const box: SxProps = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,rgb(189, 23, 180) 0%, #764ba2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paper: SxProps = {
  p: 4,
  borderRadius: 3,
  background: "#fff",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
};

const title: SxProps = {
  color: "#764ba2",
  fontWeight: 700,
};

const form: SxProps = {
  mt: 2,
};

const button: SxProps = {
  mt: 3,
  mb: 2,
  background: "#764ba2",
  fontWeight: "bold",
  fontSize: 16,
  "&:hover": { background: "#5a357a" },
};

const alert: SxProps = {
  mt: 2,
  textAlign: "center",
};

export const styles = {
  alert,
  box,
  button,
  form,
  paper,
  title
}
import { type SxProps } from "@mui/system";

const box: SxProps = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,rgb(22, 135, 201) 0%,rgb(27, 48, 105) 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paper: SxProps = {
  p: 4,
  borderRadius: 3,
  background: "#fff",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
  textAlign: "center"
};

const title: SxProps = {
  color: "rgb(22, 135, 201)",
  fontWeight: 700,
};

const form: SxProps = {
  mt: 2,
};

const button: SxProps = {
  mt: 3,
  mb: 2,
  background: "rgb(22, 135, 201)",
  fontWeight: "bold",
  fontSize: 16,
  "&:hover": { background: "rgb(20, 119, 177)" },
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
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { styles } from './loginPage.styles';

type LoginFormInputs = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await axios.post("http://localhost:3000/login", data)
      reset();
    } catch (error) {
      console.error(error)
      throw error
    }
  };

  return (
    <Box sx={styles.box}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={styles.paper}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={styles.title}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={styles.form}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="email"
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Login"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
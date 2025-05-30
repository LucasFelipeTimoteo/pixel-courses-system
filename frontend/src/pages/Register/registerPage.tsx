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
import { styles } from './registerPage.styles';
import { Link } from "react-router";

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
};

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      const { accessToken, refreshToken } = response.data;
      reset();
      // todo: mudar para armazenamento em cookies http-only
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      location.href = "/"
    } catch (error) {
      console.error(error)
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
            Criar Conta
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={styles.form}
          >
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              {...register("firstName", { required: "Nome é obrigatório" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              autoComplete="given-name"
            />
            <TextField
              label="Sobrenome"
              fullWidth
              margin="normal"
              {...register("lastName", { required: "Sobrenome é obrigatório" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              autoComplete="family-name"
            />
            <TextField
              label="Idade"
              type="number"
              fullWidth
              margin="normal"
              {...register("age", {
                required: "Idade é obrigatória",
                min: { value: 6, message: "Idade mínima é 6" },
              })}
              error={!!errors.age}
              helperText={errors.age?.message}
              slotProps={{ htmlInput: { min: 13 } }}
            />
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
              {isSubmitting ? "Enviando..." : "Registrar"}
            </Button>
            <Link to="/login">login</Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
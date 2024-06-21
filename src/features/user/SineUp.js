import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box, CssBaseline, Avatar } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { addUser } from './userApi';
import { Link  } from "react-router-dom";
const theme = createTheme({
  palette: {
    primary: {
      main: '#f48fb1', // ורוד בהיר
    },
    secondary: {
      main: '#f06292', // ורוד בינוני
    },
    warning: {
      main: '#b27847', // צבע חם כמו הפרווה בתמונה
    },
  },
});

export const SineUp = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");

 const onSubmit = async (data) => {
    try {
      const response = await addUser(data.userName, data.password);
     
setMessage( " משתמש נוסף בהתלחה")
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
      reset();
    } catch (error) {
setMessage("כבר קיימת כזאת סיסמא במערכת נסה סיסמא שונה");
        }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ position: 'absolute', right: 0, top: '40%', transform: 'translateY(-50%)', padding: 2 }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 250,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="userName"
              label={<span style={{ color: 'white' }}>שם משתמש</span>}
              autoComplete="username"
              autoFocus
              {...register("userName", { required: "שדה זה חובה" })}
              error={!!errors.userName}
              helperText={errors.userName?.message}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label={<span style={{ color: 'white' }}>סיסמה</span>}
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "שדה זה חובה" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
    
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'warning.main', '&:hover': { bgcolor: '#cd6839' } }}
            >
              הרשם
            </Button>
            {message && (
  <>
    <Typography color="error">{message}</Typography>
    <Link to="/addOuue">
      <Button variant="contained" color="primary">
        לקביעת תור
      </Button>
    </Link>
  </>
)}

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SineUp;

import React, { useState } from "react";
import { UserLogin } from "./usersApi";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box, CssBaseline, Avatar } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#f48fb1',
    },
    secondary: {
      main: '#f06292',
    },
    warning: {
      main: '#b27847',
    },
  },
});

export const Login = () => {
  const dispatch = useDispatch();
  const [userNotExist, setUserNotExist] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  var flage=false;
  const onSubmit = async (data) => {
  
    try {
     
      const response = await UserLogin(data.userName, data.password);
      setMessage("התחברת בהצלחה " + data.userName);
      setUserNotExist(true);
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
      reset();
      
    } catch (error) {
      setMessage("לא נרשמת עדיין");
      setUserNotExist(false)
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
          <Typography component="h1" variant="h5">התחברות</Typography>
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
              InputLabelProps={{ style: { color: 'white' } }}
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
              InputLabelProps={{ style: { color: 'white' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'warning.main', '&:hover': { bgcolor: '#cd6839' } }}
            >
              התחבר
            </Button>
            {!userNotExist&& (
  <>
    <Link to="/SignUp">
    <Button variant="contained" sx={{ bgcolor: theme.palette.warning.main,width:250 }}>הרשמה</Button>    </Link>
  </>
)}
{userNotExist&&(
  <>
    <Link to="/getAllQueue">
    <Button variant="contained" sx={{ bgcolor: theme.palette.warning.main,width:250 }}>לכניסה לאתר</Button>    </Link>

    </>
)}
    <Typography color="error">{message}</Typography>


          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

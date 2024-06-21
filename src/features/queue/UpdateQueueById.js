import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box, CssBaseline, Avatar } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";

import { updateQ } from "./queueApi";
const theme = createTheme({
    palette: {
      primary: {
        main: '#f48fb1', // ורוד בהיר
      },
      secondary: {
        main: '#f06292', // ורוד בינוני
      },
      warning: {
        main: '#d2691e', // צבע חם כמו הפרווה בתמונה
      },
    },
  });
 export const  UpdateQueue= () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [userExists, setUserExists] = useState(false);
    const [message, setMessage] = useState("");
  
   const onSubmit = async (data) => {
      try {
        const response = await updateQ(id,data.date,data.hour);
        setMessage("עריכת התור התבצעה בהצלחה");
  
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
        reset();
        window.location.href = '/getAllQueue';
      } catch (error) {
        setMessage(" שגיאה")
        } 
      }
 
    return (   <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" sx={{ position: 'absolute', right: 10, top: '40%', transform: 'translateY(-50%)', padding: 2 }}>
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
               ערכית תור
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            {/* <TextField
                margin="normal"
                fullWidth
                label={<span style={{ color: 'white' }}>id</span>}
                type="id"
                id="id"
                autoComplete="current-password"
                {...register("id", { required: "שדה זה חובה" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              /> */}
              <TextField
                margin="normal"
                fullWidth
                id="date"
                  type="Date"
                label={<span style={{ color: 'white' }}>תאריך</span>}
                autoComplete="date"
                autoFocus
                {...register("date", { required: "שדה זה חובה" })}
                error={!!errors.userName}
                helperText={errors.date?.message}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                label={<span style={{ color: 'white' }}>שעה</span>}
                type="text"
                id="hour"
                autoComplete="current-password"
                {...register("hour", { required: "שדה זה חובה" })}
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
                קביעת תור
              </Button>
      
              {message && <Typography color="error">{message}</Typography>}
              {userExists && <Typography color="error">המשתמש כבר קיים במערכת.</Typography>}
            </Box>
          </Box>
        </Container>
      </ThemeProvider> );

};
export default UpdateQueue;
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import "./Home.css";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  height: "60px", // הוספת גובה ל-AppBar
  boxShadow: "0px 9px 6px rgba(0, 0, 0, 0.1)", // הוספת הצללה כדי להדגיש את ה-AppBar
});

const CustomIconButton = styled(IconButton)({
  marginRight: "8px",
});

const CustomTypography = styled(Typography)({
  flexGrow: 1,
  color: "#b27847", // צבע בז' לטקסט
  fontFamily: "'Roboto Slab', serif", // שימוש בפונט מעניין יותר
  fontWeight: "800", // עובי פונט
});

 export const Home = () => {
  return (
    <>
      <CustomAppBar position="static" className="home">
        <Toolbar variant="regular">
          <CustomIconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </CustomIconButton>
          <CustomTypography variant="h3">DogBarberShop</CustomTypography>
        </Toolbar>
      </CustomAppBar>
    </>
  );
};

export default Home;
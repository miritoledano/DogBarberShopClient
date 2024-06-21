import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteQ } from "./queueApi"; // Import GetUserId if needed

export const DeleteQueue = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [message, setMessage] = useState("");

    const onSubmit = async () => {
        try {
            await DeleteQ(id); // Use the ID from the URL
            setMessage("מחיקת התור התבצעה בהצלחה");
            dispatch({ type: "USER_LOGIN_SUCCESS" });
            navigate("/getAllQueue"); // Redirect after deletion
        } catch (error) {
            setMessage("שגיאה");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end", // Align to the right
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                paddingRight: "20px" // Optional: Add some padding for better alignment
            }}
        >
            <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={onSubmit}
                sx={{
                    backgroundColor: "#FFCCCB", // Light warm color
                    color: "#000e",
                    fontSize: "20px",
                    padding: "10px 20px",
                    marginBottom: "20px",
                    '&:hover': {
                        backgroundColor: "#FFB6C1", // Darker shade on hover
                    }
                }}
            >
                האם אתה בטוח שברצונך למחוק את התור הנ"ל ??
            </Button>
            {message && <Typography variant="h6" color="textSecondary">{message}</Typography>}
        </Box>
    );
};

export default DeleteQueue;

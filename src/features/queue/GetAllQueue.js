import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ListItem, ListItemText, List, Typography, Button, Box, TextField } from "@mui/material";
import { GetAllQueues, GetUserId } from "./queueApi"; // ensure correct import
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";


const ScrollableList = styled(Box)(({ theme }) => ({
  maxHeight: "400px",
  overflow: "auto",
  padding: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  boxShadow: theme.shadows[3],
  width: "80%",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
}));

export const GetAllQueue = () => {
  const dispatch = useDispatch();
  const [queues, setQueues] = useState([]);
  const [filteredQueues, setFilteredQueues] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await GetUserId();
        setUserId(id);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    fetchUserId();
  }, []);

  const getQueues = async () => {
    try {
      const response = await GetAllQueues();
      setQueues(response.data);
      setFilteredQueues(response.data);
      setShowList(true);
    } catch (error) {
      setMessage("שגיאה בקבלת התורים");
    }
  };

  const handleFilterByDate = () => {
    const sorted = [...queues].sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredQueues(sorted);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        height: "100vh",
        justifyContent: "center",
        marginLeft: 120,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <Button
        onClick={getQueues}
        variant="contained"
        sx={{
          marginBottom: 2,
          backgroundColor: "#b27847",
          "&:hover": { backgroundColor: "#b27847" },
        }}
      >
        קבל רשימת תורים
      </Button>
      {showList && (
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
          <Button
            onClick={handleFilterByDate}
            variant="contained"
            sx={{ backgroundColor: "#b27847", "&:hover": { backgroundColor: "#b27847" } }}
          >
            סנן לפי תאריך
          </Button>
        </Box>
      )}
      {showList && (
        <ScrollableList>
          <List>
            {filteredQueues.map((queue) => {
              const isCurrentUser = userId?.data === queue.userId;
              return (
                <ListItem key={queue.id} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}>
                  <ListItemText primary={`תאריך: ${queue.date},${queue.userId},${queue.userName} שעה: ${queue.hour}`} />
                  {isCurrentUser && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/UpdateQueue/${queue.id}`}
                        sx={{
                          borderColor: "#b27847",
                          color: "#d2691e",
                          "&:hover": { backgroundColor: "#b27847", color: "#fff" },
                        }}
                      >
                        עריכה
                      </Button>
                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/deleteQ/${queue.id}`}
                        sx={{
                          borderColor: "#d2691e",
                          color: "#d2691e",
                          "&:hover": { backgroundColor: "#b27847", color: "#fff" },
                        }}
                      >
                        למחיקה
                      </Button>
                    </Box>
                  )}
                </ListItem>
              );
            })}
          </List>
        </ScrollableList>
      )}
      {showList && (
        <Link to="/addOuue">
          <Button variant="contained" sx={{ bgcolor: "#d2691e", width: 250, marginTop: 6 }}>
            להוספת תור חדש לחץ כאן
          </Button>
        </Link>
      )}
      {message && <Typography color="error">{message}</Typography>}
    </Box>
  );
};

export default GetAllQueue;

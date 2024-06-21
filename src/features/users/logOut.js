import React from "react";
import { useDispatch } from "react-redux";
import { UserLogOut } from "./usersApi";
import {LogOut} from './usersSlice'
export const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
        const response=  await UserLogOut();
        alert(response.data.message || "התנתקת בהצלחה");
        dispatch(LogOut()); // השתמשי בפעולה מתאימה ל-Redux שלך
    } catch (error) {
        console.error("Error details:", error);
        alert("אירעה שגיאה במהלך התנתקות");
    }
    };

    return (
        <button onClick={handleLogout}>
            להתנתק
        </button>
    );
};

export default Logout;

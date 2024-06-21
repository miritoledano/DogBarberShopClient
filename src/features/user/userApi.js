import axios from "axios";
let baseUrl = "https://localhost:44358/api/User/";


export const addUser = (userName, password) => {
    return axios.post(`${baseUrl}AddUserName`, { userName, password });
};




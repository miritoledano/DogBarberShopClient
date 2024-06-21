import axios from "axios";
let baseUrl = "https://localhost:44358/api/Users/";


export const UserLogin = (userName, password) => {
    return axios.post(`${baseUrl}login`, { userName, password }, { withCredentials: true });
};
export const UserLogOut = () => {
    return axios.get(`${baseUrl}logout`, { withCredentials: true });
};



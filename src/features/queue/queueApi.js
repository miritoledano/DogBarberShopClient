import axios from "axios";
let baseUrl = "https://localhost:44358/api/Queue/";

export const GetAllQueues = () => {
    return axios.get(`${baseUrl}GetAllQueues`);
};

export const addQueue = (date,hour) => {
    return axios.post(`${baseUrl}AddQueue`, {date,hour }, { withCredentials: true });
};


export const GetUserId = () => {
    return axios.get('https://localhost:44358/api/Home/GetUserId', { withCredentials: true });
};
// export const GetUserName = () => {
//     return axios.get('https://localhost:44358/api/Home/GetUserName', { withCredentials: true });
// };
export const DeleteQ = (id) => {
    return axios.delete(`${baseUrl}DeleteQueue/${id}`, { withCredentials: true });
};
export const updateQ = (id, date, hour) => {
    return axios.put(`${baseUrl}UpdateQueue/${id}`, { date, hour }, { withCredentials: true });
};






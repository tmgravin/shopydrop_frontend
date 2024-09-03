import axios from "axios";
import { getUserFromCookies } from "./cookies";

const user = getUserFromCookies();

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosMultipartInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: user && user.jwtToken ? `Bearer ${user.jwtToken}` : "",
  },
});

export const axiosAuthInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    // Authorization: user && user.jwtToken ? `Bearer ${user.jwtToken}` : "",
  },
});

// {
//     "user": {
//         "id": 4,
//         "name": "Vendor 1",
//         "email": "vendor1@gmail.com",
//         "password": "$2a$10$kcpv2HHyBAE3HHDj2mbvZeonxCCO94iOkyTPdaHRoaH6Z2O8UoSjy",
//         "userType": "VENDOR",
//         "loginType": "EMAIL",
//         "createdAt": "2024-08-07 16:28:29.282461",
//         "updatedAt": "2024-08-07 16:28:29.282461"
//     },
//     "sessionId": "F7908BFF086779E998A28FC18EA369C3",
//     "jwtToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IxQGdtYWlsLmNvbSIsImlhdCI6MTcyNTAxMTUwNSwiZXhwIjoxNzI1MDQ3NTA1fQ.TaozOSyDiULG-rGWqa7P6ZNCkltFqYx70kigqUNLxfY"
// }

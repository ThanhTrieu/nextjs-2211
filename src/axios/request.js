import axios from "axios";
export const requestClient = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' }
});
import axios from "axios";

const API_URL = "http://127.0.0.1:4000";
const config = {
    url: { API_URL },
};
const api = axios.create({
    baseURL: config.url.API_URL,
});
export { config, API_URL, api };

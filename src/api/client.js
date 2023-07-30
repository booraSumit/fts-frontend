import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";
const SOCKET_URL = "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
});

export { BASE_URL, SOCKET_URL };

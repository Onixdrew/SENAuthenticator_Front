import axios from "axios";

const instancia = axios.create({
    baseURL: "https://senauthenticator.onrender.com/api/",
    // baseURL: "https://backendsenauthenticator.onrender.com/api/",
    // withCredentials: true
})

export default instancia;
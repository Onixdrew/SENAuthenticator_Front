import axios from "axios";

const instancia = axios.create({
    // baseURL: "https://senauthenticator.onrender.com/api/",
    // baseURL: "https://backendsenauthenticator.onrender.com/api/",
    baseURL: "https://senauthenticator-6nrt.onrender.com/api/",


    // Mi local
    // baseURL: "http://127.0.0.1:8000/api/",
    withCredentials: true  // Enviar cookies automáticamente con la solicitud
})

export default instancia;
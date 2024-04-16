import axios from "axios"

const baseUrl = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

export default baseUrl;
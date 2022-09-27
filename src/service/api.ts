import axios from 'axios';
//https://gestao-custo-noah.vercel.app/
const api = axios.create({
    baseURL: 'http://localhost:3000/'
});

export default api;
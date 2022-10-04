import axios from 'axios';
//https://gestao-custo-noah.vercel.app/
const api = axios.create({
    baseURL: 'https://gestao-custo-noah.vercel.app/'
});

export default api;
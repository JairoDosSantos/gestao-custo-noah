import axios from 'axios';

const api = axios.create({
    baseURL: 'https://gestao-custo-noah.vercel.app/'
});

export default api;
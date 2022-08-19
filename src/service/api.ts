import axios from 'axios';

const api = axios.create({
    baseURL: 'https://JairoDosSantos/gestao-custo-noah/'
});

export default api;
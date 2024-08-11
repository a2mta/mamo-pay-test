import axios from 'axios';

export const axiosMockInstance = axios.create({
  baseURL: process.env.REACT_APP_MOCK_ENDPOINT,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
});

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_MAMO_PAY_API_KEY}`,
    'content-type': 'application/json',
  },
});

export default axiosInstance;

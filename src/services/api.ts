import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

export const createAPI = ():
  AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
  });

  return api;
};

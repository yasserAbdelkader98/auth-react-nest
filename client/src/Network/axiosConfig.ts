import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    document.body.classList.add('spinner');
    return request;
  },
  (error: unknown) => {
    document.body.classList.remove('spinner');
    return Promise.reject(error);
  }
);

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (response) => {
    document.body.classList.remove('spinner');
    return response;
  },
  (error: unknown) => {
    document.body.classList.remove('spinner');

    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config?.url !== '/auth/me' &&
      window.location.pathname !== '/login'
    ) {
      window.location.replace('/login');
    }

    return Promise.reject(error);
  }
);

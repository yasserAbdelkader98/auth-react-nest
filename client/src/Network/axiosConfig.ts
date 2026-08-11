import axios from "axios";

export const AxisInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});


// Add a request interceptor
AxisInstance.interceptors.request.use(
  function (request) {
    // Do something before request is sent
    // SHOW LOADER
    document.body.classList.add('spinner');
    
    return request;
  },
  function (error) {
    console.log(error)
    // Do something with request error
    document.body.classList.remove('spinner');
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxisInstance.interceptors.response.use(
  function (response) {
    // HIDE LOADER
    document.body.classList.remove('spinner');
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // HIDE LOADER
    document.body.classList.remove('spinner');

    if (error.response?.status === 401) {
      localStorage.removeItem('userId');

      if (window.location.pathname !== '/login') {
        window.location.replace('/login');
      }
    }

    return Promise.reject(error);
  }
);

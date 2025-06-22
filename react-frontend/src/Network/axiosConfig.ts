import axios from "axios";

export const AxisInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


// Add a request interceptor
AxisInstance.interceptors.request.use(
  function (request) {
    // Do something before request is sent
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
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
    return Promise.reject(error);
  }
);

import axios from 'axios';
// import appConfig from 'configs/app.config'
// import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from 'constants/api.constant'
// import { PERSIST_STORE_NAME } from 'constants/app.constant'
// import deepParseJson from 'utils/deepParseJson'
// import store from '../store'
// import { onSignOutSuccess } from '../store/auth/sessionSlice'
// import { useSelector } from 'react-redux'

const unauthorizedCode = [401];

// http: //192.168.1.109:3002
// http: //uicommercial.com:3002
const BaseService = axios.create({
  baseURL: "https://uicommercial.com/api",
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
});

const getCookie = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    // console.log(cookieName, cookieValue)
    if (cookieName === "auth_token") {
      return cookieValue;
    }
  }
  return null;
};

BaseService.interceptors.request.use(
  (config) => {
    const token = getCookie();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => {
    if (response.statusText === "OK") response.ok = true;

    return response;
  },
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      // console.log(error.message);
    }

    return response;
  }
);

export default BaseService;

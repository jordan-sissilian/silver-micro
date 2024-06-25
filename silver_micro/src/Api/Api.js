import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import qs from 'qs';

const API_GATEWAY = "/api";

const axiosConfig = {
  timeout: 3000,
};

const tokenInterceptor = config => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const client = axios.create(axiosConfig);
client.interceptors.request.use(tokenInterceptor, error => Promise.reject(error));

// Création d'un équivalent de namespace
const ApiClient = {
  APIClientConnexion: class APIClientConnexion {
    async sendLogin(username, password) {
      const data = qs.stringify({ username, password });
      try {
        const response = await client.post(`${API_GATEWAY}/login`, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const token = response.data.tokenJWT;
        sessionStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        return { username: decoded.username, role: decoded.role };
      } catch (error) {
        console.error("An error occurred during login:", error);
        return null;
      }
    }

    async sendRegister(username, email, tel, password, confirmer_password) {
      const data = qs.stringify({ username, email, tel, password, confirmer_password });
      try {
        await client.post(`${API_GATEWAY}/register`, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        return "ok";
      } catch (error) {
        console.error("An error occurred during registration:", error);
        return null;
      }
    }

    async sendLogout() {
      try {
        await client.post(`${API_GATEWAY}/logout`);
        sessionStorage.removeItem('token');
        return "Logged out successfully";
      } catch (error) {
        console.error("An error occurred during logout:", error);
        return null;
      }
    }
  },

  APIClientRestaurant: class APIClientRestaurant {
    async fetchData(endpoint) {
      try {
        const response = await client.get(`${API_GATEWAY}/${endpoint}`);
        return response.data;
      } catch (error) {
        console.error("An error occurred during data fetching:", error);
        return null;
      }
    }

  }
};

export default ApiClient;

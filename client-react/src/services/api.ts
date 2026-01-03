import axios from 'axios';
import keycloak from '@/lib/keycloak';

const API_BASE_URL = 'http://localhost:8081';

export interface Cour {
  id?: number;
  title: string;
  description: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth interceptor
api.interceptors.request.use(
  (config) => {
    if (keycloak.token) {
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await keycloak.updateToken(5);
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
        return api(originalRequest);
      } catch (refreshError) {
        keycloak.login();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const courService = {
  getCours: async (): Promise<Cour[]> => {
    const response = await api.get('/api/cours');
    return response.data;
  },

  createCour: async (cour: Cour): Promise<void> => {
    await api.post('/api/cour', null, { params: cour });
  },

  authenticate: async (): Promise<void> => {
    await api.get('/api/authentication');
  },
};

export default api;

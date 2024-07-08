import axios from 'axios';
import { AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:5000';

export const signup = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  try {
     const response = await axios.post(`${API_URL}/auth/signup`, { username, email, password });
      return response.data;
  } catch (error) {
    throw error;
  }
 
};

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
     const response = await axios.post(`${API_URL}/auth/login`, { username, password });
     return response.data;
  } catch (error) {
    throw error;
  }
 
};

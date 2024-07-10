import axios from 'axios';
import { AuthResponse } from '../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signup = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  try {
     const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      return response.data;
  } catch (error) {
    throw error;
  }
 
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
     const response = await axios.post(`${API_URL}/auth/login`, { email, password });
     return response.data;
  } catch (error) {
    throw error;
  }
 
};

export interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface AuthResponse {
    access_token: string;
  }
  
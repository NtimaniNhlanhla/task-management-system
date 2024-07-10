export interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
    user: User
  }
  
  export interface AuthResponse {
    user: User;
    access_token: string;
  }

  export interface User {
    name: string,
    email: string,
    id: number
  }
  
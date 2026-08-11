export interface UserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  firstName: string;
  lastName: string;
}

export interface RegisterFormValues extends RegisterRequest {
  confirmPassword: string;
}

export interface AuthContextValue {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserResponse) => void;
  logout: () => void;
}

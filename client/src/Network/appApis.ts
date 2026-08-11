import axiosInstance from './axiosConfig';
import { LoginRequest, RegisterRequest, UserResponse } from '../types/auth';

export const login = (body: LoginRequest) =>
  axiosInstance.post<UserResponse>('/auth/login', body);

export const getCurrentUser = () => axiosInstance.get<UserResponse>('/auth/me');

export const logout = () => axiosInstance.post('/auth/logout');

export const register = (body: RegisterRequest) =>
  axiosInstance.post<UserResponse>('/users/register', body);

export const deleteAccount = () => axiosInstance.delete('/users/me');

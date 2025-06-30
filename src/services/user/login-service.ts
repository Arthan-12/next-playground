import { setToken } from '@/auth/auth';
import axios, { AxiosResponse } from 'axios';
import { UserResponse } from './user-services';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  data?: UserResponse;
  token: string;
}

const API_ENDPOINT = 'http://localhost:3000';

export const loginService = {
  async login(credentials: LoginDTO): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_ENDPOINT}/api/users/login`,
      credentials
    );
    setToken(response.data.token);
    return response.data;
  },
};

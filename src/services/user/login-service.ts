import axios from 'axios';
import { UserResponse } from './user-services';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  data?: UserResponse;
}

const API_ENDPOINT = 'http://localhost:3000';

export const loginService = {
  async login(credentials: LoginDTO): Promise<LoginResponse> {
    const response = await axios.post(
      `${API_ENDPOINT}/api/users/login`,
      credentials
    );
    return response.data;
  },
};

import { buildAuthHeader } from '@/auth/auth';
import axios from 'axios';

interface UserDTO {
  email: string;
  username: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
}

const API_ENDPOINT = 'http://localhost:3000';

export const userService = {
  async createUser(userData: UserDTO): Promise<UserResponse> {
    const response = await axios.post(`${API_ENDPOINT}/api/users`, userData);
    return response.data;
  },

  async getUser(userId: string): Promise<UserResponse> {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  },

  async searchUsers(searchTerm: string): Promise<UserResponse[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return []; // or throw an error or handle it gracefully
    }
    const url = `${API_ENDPOINT}/api/users/search?q=${encodeURIComponent(
      searchTerm
    )}`;
    const response = await axios.get(url, { headers: buildAuthHeader() });
    return response.data.users;
  },
};

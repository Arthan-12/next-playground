export const setToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const getToken = () => {
  const token = localStorage.getItem('auth_token');
  return token;
};

export const buildAuthHeader = () => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };
  return headers;
};

import HttpClient from '../http-common';
import UserInterface from '../interfaces/UserInterface';

const login = async (credentials: {
  email: string;
  password: string;
}): Promise<UserInterface> => {
  const response = await HttpClient.post<UserInterface>(
    '/api/v1/users/login',
    credentials,
  );
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

const register = async (user: {
  nameUser: string;
  firstlastnameUser: string;
  secondLastnameUser?: string;
  emailUser: string;
  phoneUser: string;
  passwordUser: string;
  roleUser: string;
  stateUser: boolean;
  damageCount: number;
}): Promise<UserInterface> => {
  const response = await HttpClient.post<UserInterface>(
    '/api/v1/users/save',
    user,
  );
  return response.data;
};

export default {
  login,
  register,
};

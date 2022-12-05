import api from './index';
import {ErrorResponseType, LoginResponseType} from './types';
import {loadToken} from '../utils';

export async function login(
  email: string,
  password: string,
): Promise<ErrorResponseType | LoginResponseType> {
  return api.public
    .post('/auth/login', {data: {email, password}})
    .then(response => response.data)
    .then(data => {
      if (data.errno === -1) {
        return data;
      }
      return Promise.reject(data.errno);
    });
}

export async function logout(): Promise<ErrorResponseType> {
  const token = await loadToken();
  if (token) {
    const {refreshToken} = token;
    return api.auth
      .post('/auth/logout', {data: {refresh_token: refreshToken}})
      .then(response => response.data)
      .then(data => {
        console.log('data = ', data);
        if (data.errno === -1) {
          return data;
        }
        return Promise.reject(data.errno);
      });
  }
  return Promise.reject();
}

export async function register(
  email: string,
  username: string,
  password: string,
): Promise<LoginResponseType | ErrorResponseType> {
  return api.public
    .post('/auth/register', {data: {email, username, password}})
    .then(response => response.data)
    .then(data => {
      if (data.errno === -1) {
        return data;
      }
      return Promise.reject(data.errno);
    });
}

import { UserData } from '../types/user';
import { request } from './apiClient';

export const getUserData = (): Promise<UserData> => {
  return request<UserData>({
    method: 'GET',
    url: '/users/1',
  });
};
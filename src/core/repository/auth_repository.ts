import { Users } from '@prisma/client';
import { api, ApiMethod } from '@/core/api/api';
import { MainReponse } from '@/core/types/main_response';

export class AuthRepository {
  static login = async (email: string, password: string): Promise<MainReponse<Users> | undefined> => {
    try {
      const response = await api<MainReponse<Users>>({
        url: '/api/auth/login',
        method: ApiMethod.POST,
        body: {
          'email': email,
          'password': password
        }
      });

      if (response) {
        localStorage.setItem('user', JSON.stringify(response?.data));
        localStorage.setItem('token', response?.token ?? '');
      }

      return response;
    } catch (e) {
      throw e;
    }
  };

  static register = async (name: string, email: string, phone: string, password: string): Promise<MainReponse<undefined>> => {
    try {
      const response = await api<MainReponse<undefined>>({
        url: '/api/auth/signup',
        method: ApiMethod.POST,
        body: {
          'name': name,
          'email': email,
          'password': password,
          'phone': phone
        }
      });

      return response!;
    } catch (e) {
      throw e;
    }
  };
}

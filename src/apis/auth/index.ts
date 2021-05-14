import { authRequest } from '../util'
import { IUserSchema } from './schema';

export interface ApiTypes {
  'GET auth/portal_profile_info': IUserSchema;
}

export default {
  /** 获取当前用户信息 */
  getInfo: () => authRequest('GET auth/portal_profile_info', { app: 'tiku' }),
};

export type IUserInfo = IUserSchema['response']['user'];

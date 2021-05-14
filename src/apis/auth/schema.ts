export interface IUser {
  id: number;
  username: string;
  phone: string;
  role: number;
  access_token: string;
  dingtalk_uid: string;
  avatar_url: string;
  status: number;
  has_change_password: boolean;
  portal_role: number[];
  user_role: Array<{
    role_id: number;
    role_name: string;
  }>;
  master_id?: number;
  permission: string[];
}

export type IUserSchema = {
  params: any;
  response: {
    user: IUser;
    date: number;
  };
  path: 'auth/portal_profile_info';
};

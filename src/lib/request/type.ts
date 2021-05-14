import { AxiosResponse } from 'axios';

export interface ApiResult<TData = any> {
  code: number;
  data: TData;
  msg: string;
  message?: string;
  total?: number;
  pager?: {
    total: number;
  };
}

export type InstanceResponse = AxiosResponse<ApiResult>;

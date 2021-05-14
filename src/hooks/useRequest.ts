import { useEffect, useRef } from 'react';
import useSWR, { ConfigInterface, responseInterface } from 'swr';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiTypes } from '@/apis';
import { ApiResult } from '@/lib/request/type';
import useIsBrowserActive from './useBrowserActive';
import { useInterval } from 'react-use';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error = unknown>
  extends Pick<
    responseInterface<Data, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error' | 'mutate'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<ConfigInterface<Data, AxiosError<Error>>, 'initialData'> {
  initialData?: Data;
  /** 激活浏览器tab时刷新接口 */
  cusReloadOnFocus?: boolean;
  hideNotificationError?: boolean;
  /** 是否自动轮训请求 */
  autoRevalidate?: boolean;
  /** 轮训间隔，默认10s */
  revalidateInterval?: number;
}

export default function useRequest<
  URL extends keyof ApiTypes,
  Data extends ApiResult<ApiTypes[URL]['response']>,
  Params extends ApiTypes[URL]['params']
>(
  request: ((params: Params, notificationError?: boolean) => Promise<Data>) | null,
  params: Params,
  config?: Config<Data>,
): Return<Data> {
  const isBrowserActive = useIsBrowserActive();
  const hasRevalidate = useRef<boolean>();

  const { data, error, isValidating, revalidate, mutate } = useSWR(
    request ? JSON.stringify({ ...params, _url: request.name }) : null,
    () => request?.(params, !config?.hideNotificationError) || Object.create(null),
    {
      revalidateOnFocus: false,
      ...config,
    },
  );

  useInterval(revalidate, config?.autoRevalidate ? config.revalidateInterval || 10000 : null);

  useEffect(() => {
    if (!config?.cusReloadOnFocus) {
      return;
    }

    if (isBrowserActive && !hasRevalidate.current) {
      hasRevalidate.current = true;
      revalidate();
    }

    if (!isBrowserActive) {
      hasRevalidate.current = false;
    }
  }, [isBrowserActive, revalidate, config]);

  return {
    data,
    response: data?.data,
    error,
    isValidating,
    revalidate,
    mutate,
  };
}

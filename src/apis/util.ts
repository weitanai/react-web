import { AxiosRequestConfig } from 'axios';
import requestInstance from '@/lib/request';
import { getResponseTransformer } from '@/lib/request/transformResponse';
import { ApiTypes } from './index';
import { ApiResult } from '@/lib/request/type';

/**
 * 根据内容格式化 url
 */
function transformTemplateWithData(template: string, data: Record<any, any>) {
  const extraDta = { ...data };
  const str = template.replace(/:([^$/]+)/g, (matchStr) => {
    const key = matchStr.replace(':', '');
    const value = extraDta[key];

    if (value != null) {
      delete extraDta[key];
      return value.toString();
    } else {
      return matchStr;
    }
  });

  return {
    str,
    extraDta,
  };
}

export function request<URL extends keyof ApiTypes, Data extends ApiTypes[URL]['params']>(
  this: any,
  _url: URL,
  data: Data,
  config?: AxiosRequestConfig,
  prefix = '/grcrmapi',
  notificationError = true,
): Promise<ApiResult<ApiTypes[URL]['response']>> {
  const strArr = _url.split(' ');

  let [type] = strArr.slice(-2, -1);
  let url = strArr[1];

  if (type == null) {
    type = 'GET';
    url = strArr[0];
  }

  type = type.toLocaleLowerCase() as RequestType;

  const { str: requestUrl, extraDta: requestData } = transformTemplateWithData(
    `${prefix}/${url}`,
    data,
  );

  const requestConfig: AxiosRequestConfig = {
    ...config,
  };

  if (!notificationError) {
    requestConfig.transformResponse = getResponseTransformer(false);
  }

  if (isReadRequest(type)) {
    return requestInstance[type](requestUrl, {
      ...requestConfig,
      params: requestData,
    });
  } else if (isUpdateRequest(type)) {
    return requestInstance[type](requestUrl, requestData, requestConfig);
  } else {
    throw new Error(`异常请求类型：${requestUrl}`);
  }
}

export const _request = (prefix: string) => <
  URL extends keyof ApiTypes,
  Data extends ApiTypes[URL]['params']
>(
  url: URL,
  params?: Data,
  notificationError?: boolean,
) => request(url, params, { baseURL: '' }, prefix, notificationError);

/** portalapi */
export const authRequest = _request('/pauthapi/api/1');

/** java-tikuapi */
export const tikuserveRequest = _request('/tikuapi/tikuserveapi/v1');

/** java-批改后台api */
export const learnapiRequest = _request('/tikuapi/learnapi/v1');

/** yapi */
export const yapiRequest = _request('/mock/116/v1/correct-backstage');

/** learapi */
export const learapiRequest = _request('/tikuapi/learnapi/v1');

function isReadRequest(type: string): type is ReadRequestType {
  return ['get', 'head', 'options', 'delete'].includes(type);
}

function isUpdateRequest(type: string): type is UpdateRequestType {
  return ['post', 'put', 'patch'].includes(type);
}

type ReadRequestType = 'get' | 'head' | 'options' | 'delete';
type UpdateRequestType = 'post' | 'put' | 'patch';
type RequestType = ReadRequestType | UpdateRequestType;

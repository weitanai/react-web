/**
 * 处理响应内容
 */

import { notification } from 'antd';
import parseJsonSafe from '../utils/parseJsonSafe';
import { InstanceResponse } from './type';
import isString from 'lodash/isString';

export const NotificationKey = 'ErrorNotificationKey';

export const getResponseTransformer = (notificationError: boolean) => (
  _data: any,
) => {
  let data: InstanceResponse['data'];

  try {
    data = typeof _data === 'string' ? parseJsonSafe(_data) : _data;
  } catch (err) {
    notification.error({
      key: NotificationKey,
      message: `请求异常`,
      description: _data,
    });

    return Promise.reject(_data);
  }

  if (notificationError) {
    let errorMsg = '';
    let errorCode = 0;

    // 自己服务的报错
    if (data && ![0, -4, 200].includes(data.code) && data.code !== undefined) {
      errorCode = data.code;
      errorMsg = data.message || data.msg || '服务端返回异常';
      errorMsg = isString(data.data) ? data.data || errorMsg : errorMsg;
    }

    if (errorCode) {
      notification.warn({
        key: NotificationKey,
        message: `异常码：${errorCode}: `,
        description: errorMsg || '未知请求异常',
      });

      return Promise.reject(data);
    }
  }

  return data;
};

export default getResponseTransformer(true);
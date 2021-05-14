/**
 * 请求函数
 */

import axios from 'axios';
import transformResponse from './transformResponse';

const require = axios.create({
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
  transformResponse,
});

require.interceptors.response.use((data) => data.data);

export default require;

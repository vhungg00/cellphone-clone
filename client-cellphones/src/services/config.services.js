import axios from 'axios';
import queryString from 'query-string';
import { BASE_URL } from '../constants/UserConstant';

export const axiosClient = axios.create({
  baseURL:BASE_URL,
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json',
  },
  paramsSerializer: params => {
    return queryString.stringify(params, {
      encode: false,
    });
  },
});
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);
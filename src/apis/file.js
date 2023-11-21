import axios from 'axios';

export const getFile = (url) => {
  return axios.get(url, {
    responseType: 'blob',
  });
};

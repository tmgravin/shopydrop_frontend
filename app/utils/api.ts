import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 3000,
});

// export const get(api, params) => // {param : value}
// {
//   api += process.env.NEXT_PUBLIC_BASE_URL + api;
//   if(params && params.length > 0){
//     for(let i=0;i<params.length;i++){
//       api += `?${params[i].key}=${params[i].value}`;
//     }
//   }
  
//   return axios.get(api, headers: {});
// }
